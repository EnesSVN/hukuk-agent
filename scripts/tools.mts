import { generateText, tool, stepCountIs } from "ai";
import { z } from "zod";
import pg from "pg";

const db = new pg.Client({ connectionString: process.env.DATABASE_URL! });
const tools = {
  hesapla: tool({
    description:
      "Bu tool iki sayiyi alir ve belirtilen islemi uygular (topla, cikar, carp, bol).",
    inputSchema: z.object({
      a: z.number(),
      b: z.number(),
      islem: z.enum(["topla", "cikar", "carp", "bol"]),
    }),
    execute: async ({ a, b, islem }) => {
      let result: number;
      switch (islem) {
        case "topla":
          result = a + b;
          break;
        case "cikar":
          result = a - b;
          break;
        case "carp":
          result = a * b;
          break;
        case "bol":
          result = a / b;
          break;
      }
      return { result };
    },
  }),

  tarih_hesapla: tool({
    description:
      "Bu tool bir baslangic tarihine belirli sayida gun ekler ve sonucu doner. tarih formatini YYYY-MM-DD olarak bekler.",
    inputSchema: z.object({
      baslangicTarihi: z.string(),
      eklenecekGun: z.number(),
    }),
    execute: async ({ baslangicTarihi, eklenecekGun }) => {
      const d = new Date(baslangicTarihi);
      if (isNaN(d.getTime())) return { hata: "gecersiz tarih" };
      d.setDate(d.getDate() + eklenecekGun);
      return { sonucTarihi: d.toISOString().split("T")[0] };
    },
  }),

  veritabani_sorgula: tool({
    description:
      "Bu tool veritabaninda yukumlulukler tablosunda arama yapar. içeriğinde KVKK yükümlülükleri, yasal süreler (kaç gün), madde numaraları, bulunur",
    inputSchema: z.object({
      yukumlulukAdi: z.string(),
    }),
    execute: async ({ yukumlulukAdi }) => {
      const { rows } = await db.query(
        "select ad, madde, sure_gun, aciklama from yukumlulukler where ad ilike $1",
        [`%${yukumlulukAdi}%`],
      );
      return { bulunan: rows.length, kayitlar: rows };
    },
  }),
};

export { tools, db };
