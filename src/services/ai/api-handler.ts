import { NextResponse } from "next/server";
import type { AIAction } from "@/types/ai";
import { runCVAI } from "./cv-ai.service";

export async function handleAIRequest(request: Request, action: AIAction) {
  try {
    const body = await request.json();
    const result = await runCVAI({
      action,
      input: String(body.input || ""),
      context: body.context ? String(body.context) : undefined,
      targetLanguage: body.targetLanguage === "en" ? "en" : body.targetLanguage === "id" ? "id" : undefined
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI request failed.";
    const status = typeof error === "object" && error && "status" in error ? Number(error.status) || 500 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
