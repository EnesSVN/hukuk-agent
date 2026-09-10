import { provider } from "./provider.mjs";
import { embed } from "ai";
import pg from "pg";

const soru = "VERBİS'e ne zaman kaydolmam gerekir?";

const { embedding } = await embed({
  model: provider.embeddingModel(process.env.NVIDIA_EMBED_MODEL!),
  value: soru,
});

const db = new pg.Client({ connectionString: process.env.DATABASE_URL! });
await db.connect();

const { rows } = await db.query(
  `select content,
          embedding <=> $1::halfvec as mesafe
     from documents
    order by mesafe
    limit 5`,
  [JSON.stringify(embedding)],
);

console.log("SORU:", soru, "\n");
rows.forEach((r, i) => {
  console.log(
    `--- ${i + 1}. sonuç | mesafe ${Number(r.mesafe).toFixed(4)} ---`,
  );
  console.log(r.content.slice(0, 300), "\n");
});
await db.end();
