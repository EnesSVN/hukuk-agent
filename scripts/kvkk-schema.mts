import { z } from "zod";

export const kvkkSchema = z.object({
  konu: z.string(),
  ilgiliMaddeler: z.array(z.string()),
  veriKategorisi: z.enum(["Kişisel Veri", "Özel Nitelikli Kişisel Veri"]),
  riskSeviyesi: z.enum(["Düşük", "Orta", "Yüksek"]),
  gerekceOzeti: z.string(),
  cevaplanabilir: z.boolean(),
  soranTaraf: z.enum(["veri sorumlusu", "ilgili kişi", "veri işleyen"]),
  gerekliAdimlar: z.array(z.string()),
  yukumlulukDoguyorMu: z.boolean(),
  guvenSkoru: z
    .number()
    .describe(
      "0 ile 100 arasında tam sayı. Analizin ne kadar güvenilir olduğu.",
    ),
  eksikBilgi: z
    .string()
    .optional()
    .describe("Eksik bilgi varsa burada belirtilir."),
  yukumlulukTuru: z
    .enum(["aydınlatma", "açık rıza", "VERBİS kaydı", "veri güvenliği", "yok"])
    .describe("Yükümlülük türü belirtilir."),
});
