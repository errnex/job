"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Textarea } from "@/components/shared/Textarea";
import { useResumeBuilderStore } from "@/store/resume-builder.store";

type AIEndpoint = "improve-summary" | "improve-bullets" | "match-job-description" | "translate";

async function requestAI(endpoint: AIEndpoint, input: string, context?: string, targetLanguage?: "id" | "en") {
  const response = await fetch(`/api/ai/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, context, targetLanguage })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "AI request failed.");
  return data as { suggestion: string; provider: string; usedFallback: boolean; attemptedProviders: string[] };
}

export function AIAssistantPanel() {
  const resume = useResumeBuilderStore((state) => state.resumeData);
  const updateSummary = useResumeBuilderStore((state) => state.updateSummary);
  const [input, setInput] = useState(resume.summary);
  const [jobDescription, setJobDescription] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [meta, setMeta] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const aiEnabled = process.env.NEXT_PUBLIC_ENABLE_AI_ASSISTANT === "true";

  async function run(endpoint: AIEndpoint, targetLanguage?: "id" | "en") {
    setError("");
    setSuggestion("");
    setMeta("");

    try {
      setIsLoading(true);
      const result = await requestAI(
        endpoint,
        input || resume.summary || JSON.stringify(resume),
        endpoint === "match-job-description" ? jobDescription : JSON.stringify(resume),
        targetLanguage
      );
      setSuggestion(result.suggestion);
      setMeta(
        `Provider: ${result.provider}${result.usedFallback ? ` (fallback from ${result.attemptedProviders.join(", ")})` : ""}`
      );
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "AI request failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {!aiEnabled ? (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          AI Assistant is unavailable. Please add API key dan set NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true.
        </div>
      ) : null}
      <Textarea
        label="AI input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Masukkan summary, bullet experience, atau konten CV yang ingin dibantu AI."
      />
      <Textarea
        label="Job description for matching"
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Opsional: paste job description untuk match dan keyword ATS."
      />
      <div className="flex flex-wrap gap-2">
        <Button type="button" disabled={!aiEnabled || isLoading} onClick={() => run("improve-summary")}>
          <Sparkles size={16} />
          Improve Summary
        </Button>
        <Button type="button" variant="secondary" disabled={!aiEnabled || isLoading} onClick={() => run("improve-bullets")}>
          Improve Bullets
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={!aiEnabled || isLoading}
          onClick={() => run("match-job-description")}
        >
          Match JD
        </Button>
        <Button type="button" variant="secondary" disabled={!aiEnabled || isLoading} onClick={() => run("translate", "en")}>
          Translate EN
        </Button>
        <Button type="button" variant="secondary" disabled={!aiEnabled || isLoading} onClick={() => run("translate", "id")}>
          Translate ID
        </Button>
      </div>
      {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {suggestion ? (
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">AI Suggestion</p>
              {meta ? <p className="text-xs text-slate-500">{meta}</p> : null}
            </div>
            <div className="flex gap-2">
              <Button type="button" onClick={() => updateSummary(suggestion)}>
                Accept to Summary
              </Button>
              <Button type="button" variant="ghost" onClick={() => setSuggestion("")}>
                Reject
              </Button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm text-slate-700">{suggestion}</pre>
        </div>
      ) : null}
    </div>
  );
}
