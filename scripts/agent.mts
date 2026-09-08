import { provider } from "./provider.mjs";
import { generateText, stepCountIs } from "ai";
import { db, tools } from "./tools.mjs";

const model = provider(process.env.NVIDIA_MODEL_MEDIUM!);

await db.connect();

const result = await generateText({
  model,
  tools,
  stopWhen: stepCountIs(5),
  prompt: "Veri ihlali bildirimi icin yasal sure kac gun?",
});

const cagrilanTools = result.steps.flatMap((s) =>
  s.toolCalls.map((c) => c.toolName),
);

console.log("--- CAGRILAN TOOL'LAR ---", cagrilanTools);
console.log("--- CEVAP ---");
console.log(result.text);

await db.end();
