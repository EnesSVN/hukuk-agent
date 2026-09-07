import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const provider = createOpenAICompatible({
  name: "nvidia",
  baseURL: process.env.NVIDIA_BASE_URL!,
  apiKey: process.env.NVIDIA_API_KEY!,
  // Without this the SDK drops the schema before the request is sent:
  // "responseFormat is not supported ... only supported with structuredOutputs"
  supportsStructuredOutputs: true,
});
