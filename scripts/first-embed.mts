import { provider } from "./provider.mjs";
import { embed } from "ai";

const { embedding, usage } = await embed({
  model: provider.embeddingModel(process.env.NVIDIA_EMBED_MODEL!),
  value: "Kişisel veriler hukuka uygun işlenir",
});

console.log("BOYUT :", embedding.length);
console.log("ILK 5 :", embedding.slice(0, 5));
console.log("USAGE :", usage);
