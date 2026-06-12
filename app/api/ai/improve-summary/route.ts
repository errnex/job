import { handleAIRequest } from "@/services/ai/api-handler";

export async function POST(request: Request) {
  return handleAIRequest(request, "improve-summary");
}
