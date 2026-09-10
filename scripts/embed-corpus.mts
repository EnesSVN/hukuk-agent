import { readFileSync } from "node:fs";
import { htmlToText, govdeyiAyikla, bol } from "./chunker.mjs";
import { provider } from "./provider.mjs";
import { embedMany } from "ai";
import pg from "pg";

const html = readFileSync("data/verbis-yonetmelik.html", "utf-8");
const govde = govdeyiAyikla(htmlToText(html), "BİRİNCİ BÖLÜM", "Yürütme");
const parcalar = bol(govde);
console.log("PARCA :", parcalar.length);

const { embeddings, usage } = await embedMany({
  model: provider.embeddingModel(process.env.NVIDIA_EMBED_MODEL!),
  values: parcalar,
});
console.log("USAGE :", usage);

const db = new pg.Client({ connectionString: process.env.DATABASE_URL! });
await db.connect();
await db.query("delete from documents");

for (let i = 0; i < parcalar.length; i++) {
  await db.query(
    "insert into documents (content, embedding, metadata) values ($1, $2::halfvec, $3)",
    [
      parcalar[i],
      JSON.stringify(embeddings[i]),
      JSON.stringify({ kaynak: "verbis-yonetmelik.html", sira: i }),
    ],
  );
}

const { rows } = await db.query("select count(*) from documents");
console.log("TABLODA :", rows[0].count);
await db.end();
