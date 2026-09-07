import { generateObject } from "ai";

import { kvkkSchema } from "./kvkk-schema.mjs";
import { provider } from "./provider.mjs";
import { INPUTS } from "./kvkk-inputs.mjs";

const rows: Array<{
  no: number;
  girdi: string;
  durum: "ok" | "ihlal";
  guvenSkoru?: number;
}> = [];
let ihlalSayisi = 0;

for (let no = 1; no <= 10; no++) {
  const input = INPUTS[(no - 1) % 10] ?? "";

  try {
    const result = await generateObject({
      model: provider(process.env.NVIDIA_MODEL_MEDIUM!),
      prompt: input,
      schema: kvkkSchema,
    });

    const durum: "ok" | "ihlal" = result.object ? "ok" : "ihlal";
    if (durum === "ihlal") ihlalSayisi++;
    console.log(`--- ${no} numarali girdi durumu: ${durum} ---`);
    rows.push({
      no,
      girdi: input.slice(0, 40),
      durum,
      guvenSkoru: result.object.guvenSkoru,
    });
  } catch (error) {
    ihlalSayisi++;
    console.error(`--- ${no} numarali girdi patladi ---`);
    console.error(error);

    rows.push({
      no,
      girdi: input.slice(0, 40),
      durum: "ihlal",
      guvenSkoru: 0,
    });
  }
}

console.table(rows);
console.log(`İhlal sayısı: ${ihlalSayisi}`);
