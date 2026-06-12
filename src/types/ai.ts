export type AIProviderId =
  | "gemini"
  | "openai"
  | "claude"
  | "openrouter"
  | "grok"
  | "deepseek";

export type AIAction =
  | "improve-summary"
  | "improve-bullets"
  | "match-job-description"
  | "translate";

export type AIRequestPayload = {
  action: AIAction;
  input: string;
  context?: string;
  targetLanguage?: "id" | "en";
};

export type AIResponsePayload = {
  provider: AIProviderId;
  suggestion: string;
  usedFallback: boolean;
  attemptedProviders: AIProviderId[];
};

export type AIProviderConfig = {
  id: AIProviderId;
  label: string;
  apiKeyEnv: string;
  model: string;
  endpoint: string;
};

export class AIProviderError extends Error {
  provider: AIProviderId;
  status?: number;
  retryable: boolean;

  constructor(message: string, provider: AIProviderId, retryable = true, status?: number) {
    super(message);
    this.name = "AIProviderError";
    this.provider = provider;
    this.retryable = retryable;
    this.status = status;
  }
}
