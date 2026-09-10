import { CIFTLER } from "./pairs.mjs";
import { provider } from "./provider.mjs";
import { embedMany, cosineSimilarity } from "ai";

const { embeddings, usage } = await embedMany({
  model: provider.embeddingModel(process.env.NVIDIA_EMBED_MODEL!),
  values: CIFTLER.flatMap((c) => [c.a, c.b]),
});

const satirlar = CIFTLER.map((c, i) => ({
  no: c.no,
  tip: c.tip,

  mesafe: Number(
    (1 - cosineSimilarity(embeddings[i * 2], embeddings[i * 2 + 1])).toFixed(4),
  ),
  a: c.a.slice(0, 34),
  b: c.b.slice(0, 34),
}));

satirlar.sort((x, y) => x.mesafe - y.mesafe);

console.table(satirlar);
console.log("USAGE :", usage);
