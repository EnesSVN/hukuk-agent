import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { provider } from "./provider.mjs";
import { generateText } from "ai";
import { TR_TEXT, EN_TEXT } from "./fixtures.mts";
const baseURL = process.env.NVIDIA_BASE_URL!;
const apiKey = process.env.NVIDIA_API_KEY!;

const models = [
  { name: "small", id: process.env.NVIDIA_MODEL_SMALL! },
  { name: "medium", id: process.env.NVIDIA_MODEL_MEDIUM! },
  { name: "large", id: process.env.NVIDIA_MODEL_LARGE! },
];

const rows: Record<string, unknown>[] = [];
const promts = [
  { name: "TR", text: TR_TEXT },
  { name: "EN", text: EN_TEXT },
];

for (const m of models) {
  for (const prompt of promts) {
    for (let i = 0; i <= 2; i++) {
      const datebegin = new Date();
      const result = await generateText({
        model: provider(m.id),
        prompt: prompt.text,
        temperature: 0,
      });
      console.log(m.name, prompt.name, i);
      const dateend = new Date();
      const duration = dateend.getTime() - datebegin.getTime();

      rows.push({
        model: m.name,
        prompt: prompt.name,
        in: result.totalUsage.inputTokens,
        out: result.totalUsage.outputTokens,
        repetition: i,
        duration,
      });
    }
  }
}

console.table(rows);
