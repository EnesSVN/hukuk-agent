import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";

const baseURL = process.env.NVIDIA_BASE_URL!;
const apiKey = process.env.NVIDIA_API_KEY!;
const modelId = process.env.NVIDIA_CHAT_MODEL!;

const provider = createOpenAICompatible({
  name: "nvidia",
  baseURL,
  apiKey,
});

const model = provider(modelId);

const result = await generateText({
  model,
  prompt: "Merhaba, nasılsın?",
});

console.dir(result, { depth: null });
