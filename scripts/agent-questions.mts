export type Soru = {
  no: number;
  soru: string;
  beklenen: Array<"hesapla" | "tarih_hesapla" | "veritabani_sorgula">;
};

export const SORULAR: Soru[] = [
  // --- hesapla: too big to do reliably in-head
  { no: 1, soru: "83947 çarpı 2916 kaç eder?", beklenen: ["hesapla"] },
  { no: 2, soru: "1284736 bölü 47 kaç eder?", beklenen: ["hesapla"] },
  { no: 3, soru: "9384756 eksi 2947183 kaç eder?", beklenen: ["hesapla"] },
  { no: 4, soru: "58392 artı 4837291 kaç eder?", beklenen: ["hesapla"] },
  {
    no: 5,
    soru: "7734 ile 8829'u çarparsam sonuç ne olur?",
    beklenen: ["hesapla"],
  },

  // --- tarih_hesapla
  {
    no: 6,
    soru: "2026-03-12 tarihine 30 gün eklersek hangi tarih olur?",
    beklenen: ["tarih_hesapla"],
  },
  {
    no: 7,
    soru: "2026-01-31'den 45 gün sonrası hangi güne denk geliyor?",
    beklenen: ["tarih_hesapla"],
  },
  {
    no: 8,
    soru: "2026-02-28 tarihine 1 gün ekle.",
    beklenen: ["tarih_hesapla"],
  },
  {
    no: 9,
    soru: "2026-11-15 tarihinden 90 gün sonra hangi tarihtir?",
    beklenen: ["tarih_hesapla"],
  },
  {
    no: 10,
    soru: "2026-06-01'e 180 gün eklenince ne çıkar?",
    beklenen: ["tarih_hesapla"],
  },

  // --- veritabani_sorgula
  {
    no: 11,
    soru: "Veri ihlali bildirimi için yasal süre kaç gün?",
    beklenen: ["veritabani_sorgula"],
  },
  {
    no: 12,
    soru: "İlgili kişi başvurusunu kaç gün içinde yanıtlamam gerekiyor?",
    beklenen: ["veritabani_sorgula"],
  },
  {
    no: 13,
    soru: "VERBİS kaydı hangi maddede düzenleniyor?",
    beklenen: ["veritabani_sorgula"],
  },
  {
    no: 14,
    soru: "Aydınlatma yükümlülüğü kaçıncı maddede geçiyor?",
    beklenen: ["veritabani_sorgula"],
  },
  {
    no: 15,
    soru: "Kurul kararını yerine getirmek için kaç günüm var?",
    beklenen: ["veritabani_sorgula"],
  },

  // --- iki tool zinciri: once sureyi bul, sonra tarih hesapla
  {
    no: 16,
    soru: "Veri ihlalini 2026-03-12'de öğrendim. Bildirim için son tarih nedir?",
    beklenen: ["veritabani_sorgula", "tarih_hesapla"],
  },
  {
    no: 17,
    soru: "İlgili kişi başvurusu 2026-05-04'te geldi. En geç hangi tarihte yanıtlamalıyım?",
    beklenen: ["veritabani_sorgula", "tarih_hesapla"],
  },
  {
    no: 18,
    soru: "Kurul kararı 2026-09-01'de tebliğ edildi. Son uygulama tarihi nedir?",
    beklenen: ["veritabani_sorgula", "tarih_hesapla"],
  },
  {
    no: 19,
    soru: "2026-07-20'de veri ihlali oldu. Bildirim süresinin son günü hangi tarih?",
    beklenen: ["veritabani_sorgula", "tarih_hesapla"],
  },
  {
    no: 20,
    soru: "Başvuru 2026-12-15'te alındı. Yanıt için son tarih nedir?",
    beklenen: ["veritabani_sorgula", "tarih_hesapla"],
  },
];
