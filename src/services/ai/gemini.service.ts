import { AIProviderError } from "@/types/ai";
import { aiProviderConfigs, getProviderApiKey } from "./provider-config";

export async function requestGemini(prompt: string) {
  const config = aiProviderConfigs.gemini;
  const apiKey = getProviderApiKey("gemini");
  const endpoint = config.endpoint.replace("{model}", config.model);

  const response = await fetch(`${endpoint}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 900
      }
    })
  });

  if (!response.ok) {
    throw new AIProviderError(`Gemini request failed with status ${response.status}`, "gemini", true, response.status);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text).join("\n") ?? "";

  if (!text) {
    throw new AIProviderError("Gemini returned an empty response", "gemini", true);
  }

  return text.trim();
}
