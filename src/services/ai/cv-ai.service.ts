import {
  AIProviderError,
  type AIAction,
  type AIProviderId,
  type AIRequestPayload,
  type AIResponsePayload
} from "@/types/ai";
import { aiProviderConfigs, getConfiguredProviders, getProviderApiKey } from "./provider-config";
import { requestGemini } from "./gemini.service";

function systemInstruction(action: AIAction) {
  const base =
    "You are a senior resume writer and ATS optimization assistant. Return only the improved content or analysis, no markdown table, no preamble.";

  const map: Record<AIAction, string> = {
    "improve-summary":
      "Improve the professional summary. Keep it concise, specific, truthful, and ATS friendly. Use first person implied resume style.",
    "improve-bullets":
      "Rewrite the experience bullets using strong action verbs, measurable impact where possible, and clean bullet lines.",
    "match-job-description":
      "Compare the resume content against the job description. Return concise match insights, missing keywords, and practical recommendations.",
    translate:
      "Translate the resume content while preserving resume tone, formatting, job titles, technologies, and proper nouns."
  };

  return `${base}\n${map[action]}`;
}

function buildPrompt(payload: AIRequestPayload) {
  return [
    systemInstruction(payload.action),
    payload.targetLanguage ? `Target language: ${payload.targetLanguage === "id" ? "Bahasa Indonesia" : "English"}` : "",
    payload.context ? `Context:\n${payload.context}` : "",
    `Input:\n${payload.input}`
  ]
    .filter(Boolean)
    .join("\n\n");
}

function isRetryableStatus(status?: number) {
  return !status || [402, 403, 408, 409, 425, 429, 500, 502, 503, 504].includes(status);
}

async function parseError(response: Response, provider: AIProviderId) {
  let detail = "";
  try {
    detail = await response.text();
  } catch {
    detail = response.statusText;
  }

  return new AIProviderError(
    `${provider} request failed with status ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`,
    provider,
    isRetryableStatus(response.status),
    response.status
  );
}

async function requestOpenAICompatible(provider: Exclude<AIProviderId, "gemini" | "claude">, prompt: string) {
  const config = aiProviderConfigs[provider];
  const apiKey = getProviderApiKey(provider);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`
  };

  if (provider === "openrouter") {
    headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    headers["X-Title"] = "CV Builder ATS";
  }

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: systemInstruction("improve-summary") },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 900
    })
  });

  if (!response.ok) {
    throw await parseError(response, provider);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content ?? "";

  if (!text) {
    throw new AIProviderError(`${provider} returned an empty response`, provider, true);
  }

  return String(text).trim();
}

async function requestClaude(prompt: string) {
  const config = aiProviderConfigs.claude;
  const apiKey = getProviderApiKey("claude");

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 900,
      temperature: 0.4,
      system: systemInstruction("improve-summary"),
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    throw await parseError(response, "claude");
  }

  const data = await response.json();
  const text = data?.content?.map((part: { text?: string }) => part.text).join("\n") ?? "";

  if (!text) {
    throw new AIProviderError("Claude returned an empty response", "claude", true);
  }

  return text.trim();
}

async function requestProvider(provider: AIProviderId, prompt: string) {
  if (provider === "gemini") return requestGemini(prompt);
  if (provider === "claude") return requestClaude(prompt);
  return requestOpenAICompatible(provider, prompt);
}

export function getAIAvailability() {
  const providers = getConfiguredProviders();
  return {
    enabled: process.env.NEXT_PUBLIC_ENABLE_AI_ASSISTANT === "true" && providers.length > 0,
    providers
  };
}

export async function runCVAI(payload: AIRequestPayload): Promise<AIResponsePayload> {
  const availability = getAIAvailability();

  if (!availability.enabled) {
    throw new AIProviderError(
      "AI Assistant is unavailable. Please add at least one AI API key and set NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true.",
      "gemini",
      false,
      401
    );
  }

  const prompt = buildPrompt(payload);
  const attemptedProviders: AIProviderId[] = [];
  const errors: string[] = [];

  for (const provider of availability.providers) {
    attemptedProviders.push(provider);

    try {
      const suggestion = await requestProvider(provider, prompt);
      return {
        provider,
        suggestion,
        usedFallback: attemptedProviders.length > 1,
        attemptedProviders
      };
    } catch (error) {
      const providerError =
        error instanceof AIProviderError
          ? error
          : new AIProviderError(error instanceof Error ? error.message : "Unknown AI error", provider, true);

      errors.push(`${provider}: ${providerError.message}`);
      if (!providerError.retryable) {
        break;
      }
    }
  }

  throw new AIProviderError(
    `All configured AI providers failed or ran out of quota. Attempted: ${attemptedProviders.join(", ")}. ${errors.join(" | ")}`,
    attemptedProviders[attemptedProviders.length - 1] ?? "gemini",
    false,
    429
  );
}
