import { db, tools } from "./tools.mjs";
import { SORULAR, type Soru } from "./agent-questions.mjs";
import { generateText, stepCountIs } from "ai";
import { provider } from "./provider.mjs";

const model = provider(process.env.NVIDIA_MODEL_MEDIUM!);
const BEKLEME_MS = 3000;

await db.connect();

const uyu = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Row = {
  no: number;
  soru: string;
  beklenen: string;
  cagrilan: string;
  dogru: boolean;
  hata: string;
};

async function sor(soru: Soru): Promise<Row | null> {
  try {
    const result = await generateText({
      model,
      tools,
      stopWhen: stepCountIs(5),
      prompt: soru.soru,
    });

    const cagrilan = result.steps.flatMap((s) =>
      s.toolCalls.map((c) => c.toolName),
    );

    return {
      no: soru.no,
      soru: soru.soru.slice(0, 30),
      beklenen: soru.beklenen.join("+"),
      cagrilan: cagrilan.join("+") || "-",
      dogru: soru.beklenen.every((b) => cagrilan.includes(b)),
      hata: "",
    };
  } catch (error) {
    console.error(`    ${soru.no} PATLADI: ${(error as Error).name}`);
    return null;
  }
}

const rows: Row[] = [];
let kalan: Soru[] = [...SORULAR];

for (let tur = 1; tur <= 3 && kalan.length > 0; tur++) {
  console.log(`===== TUR ${tur} — ${kalan.length} soru =====`);
  const buTurPatlayan: Soru[] = [];

  for (const soru of kalan) {
    console.log(`--- SORU ${soru.no} ---`);
    const row = await sor(soru);
    if (row) rows.push(row);
    else buTurPatlayan.push(soru);
    await uyu(BEKLEME_MS);
  }

  kalan = buTurPatlayan;
  if (kalan.length > 0) {
    console.log(
      `TUR ${tur} sonunda ${kalan.length} soru patlamis, tekrar denenecek.`,
    );
    await uyu(10000);
  }
}

for (const soru of kalan) {
  rows.push({
    no: soru.no,
    soru: soru.soru.slice(0, 30),
    beklenen: soru.beklenen.join("+"),
    cagrilan: "-",
    dogru: false,
    hata: "3 turda da patladi",
  });
}

await db.end();

rows.sort((a, b) => a.no - b.no);
console.table(rows);

const dogruSayisi = rows.filter((r) => r.dogru).length;
const hataSayisi = rows.filter((r) => r.hata).length;
console.log(`DOGRU: ${dogruSayisi}/${rows.length}`);
console.log(`3 TURDA DA PATLAYAN: ${hataSayisi}`);
