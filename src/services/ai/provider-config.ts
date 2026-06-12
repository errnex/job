import type { AIProviderConfig, AIProviderId } from "@/types/ai";

export const aiProviderConfigs: Record<AIProviderId, AIProviderConfig> = {
  gemini: {
    id: "gemini",
    label: "Gemini",
    apiKeyEnv: "GEMINI_API_KEY",
    model: "gemini-1.5-flash",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
  },
  openai: {
    id: "openai",
    label: "OpenAI",
    apiKeyEnv: "OPENAI_API_KEY",
    model: "gpt-4o-mini",
    endpoint: "https://api.openai.com/v1/chat/completions"
  },
  claude: {
    id: "claude",
    label: "Claude",
    apiKeyEnv: "ANTHROPIC_API_KEY",
    model: "claude-3-5-haiku-latest",
    endpoint: "https://api.anthropic.com/v1/messages"
  },
  openrouter: {
    id: "openrouter",
    label: "OpenRouter",
    apiKeyEnv: "OPENROUTER_API_KEY",
    model: "openai/gpt-4o-mini",
    endpoint: "https://openrouter.ai/api/v1/chat/completions"
  },
  grok: {
    id: "grok",
    label: "Grok",
    apiKeyEnv: "GROK_API_KEY",
    model: "grok-2-latest",
    endpoint: "https://api.x.ai/v1/chat/completions"
  },
  deepseek: {
    id: "deepseek",
    label: "DeepSeek",
    apiKeyEnv: "DEEPSEEK_API_KEY",
    model: "deepseek-chat",
    endpoint: "https://api.deepseek.com/chat/completions"
  }
};

const fallbackOrder: AIProviderId[] = ["gemini", "openai", "claude", "openrouter", "grok", "deepseek"];

export function getProviderOrder() {
  const fromEnv = process.env.AI_PROVIDER_ORDER?.split(",")
    .map((provider) => provider.trim().toLowerCase())
    .filter((provider): provider is AIProviderId => provider in aiProviderConfigs);

  return fromEnv?.length ? fromEnv : fallbackOrder;
}

export function getProviderApiKey(provider: AIProviderId) {
  const config = aiProviderConfigs[provider];
  if (provider === "grok") {
    return process.env.GROK_API_KEY || process.env.XAI_API_KEY || "";
  }

  return process.env[config.apiKeyEnv] || "";
}

export function getConfiguredProviders() {
  return getProviderOrder().filter((provider) => Boolean(getProviderApiKey(provider)));
}
