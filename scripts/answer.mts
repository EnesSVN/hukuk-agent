import { embed, generateText } from "ai";
import pg from "pg";
import { provider } from "./provider.mjs";

const db = new pg.Client({ connectionString: process.env.DATABASE_URL! });
await db.connect();

export const getir = async (useQuery: string) => {
  const { embedding } = await embed({
    model: provider.embeddingModel(process.env.NVIDIA_EMBED_MODEL!),
    value: useQuery,
  });

  const { rows } = await db.query(
    "select id, content, embedding <=> $1::halfvec as mesafe from documents order by mesafe limit 5",
    [JSON.stringify(embedding)],
  );
  return rows;
};

export const baglamKur = async (useQuery: string) => {
  const baglam = await getir(useQuery);

  return baglam.map((row) => `[chunk ${row.id}]\n${row.content}`).join("\n\n");
};

const SISTEM = ` sen bir hukuk danışmanısın. Kullanıcıdan gelen soruları, bağlamı dikkate alarak yanıtla. chunk içinde olmayan bilgiyi asla ve asla verme, doğru olduğunu bilsen bile.

Her bilginin sonuna onu hangi parçadan aldığını köşeli parantezle yaz, örneğin: [chunk 29].

Sorunun cevabı verilen parçalarda yoksa başka hiçbir şey yazmadan sadece şu cümleyi yaz: Bu bilgi verilen kaynaklarda yok.`;

const RED = "Bu bilgi verilen kaynaklarda yok";

async function cevapla(soru: string): Promise<string> {
  const { text } = await generateText({
    model: provider(process.env.NVIDIA_MODEL_MEDIUM!),
    system: SISTEM,
    prompt: `${await baglamKur(soru)}\n\nSoru: ${soru}`,
  });
  return text;
}

const SORULAR = [
  { no: 1, soru: "VERBİS'e ne zaman kaydolmam gerekir?", korpustaVar: true },
  { no: 2, soru: "Veri Sorumluları Sicilini kim tutar?", korpustaVar: true },
  {
    no: 3,
    soru: "Türkiye'de yerleşik olmayan veri sorumluları Sicile nasıl kaydolur?",
    korpustaVar: true,
  },
  {
    no: 4,
    soru: "Veri ihlali kaç saat içinde Kurula bildirilmeli?",
    korpustaVar: false,
  },
  { no: 5, soru: "Fatura kaç yıl saklanmalı?", korpustaVar: false },
];

const satirlar = [];
for (const s of SORULAR) {
  console.log(`--- SORU ${s.no} ---`);
  const cevap = await cevapla(s.soru);
  const reddetti = cevap.includes(RED);
  const alintiVar = cevap.includes("[chunk");

  const dogru = s.korpustaVar ? !reddetti && alintiVar : reddetti;

  satirlar.push({
    no: s.no,
    korpustaVar: s.korpustaVar,
    reddetti,
    alintiVar,
    dogru,
  });
  console.log(cevap, "\n");
}

console.table(satirlar);
console.log(
  `DOGRU: ${satirlar.filter((r) => r.dogru).length}/${satirlar.length}`,
);

await db.end();
