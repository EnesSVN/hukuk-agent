// 20 deliberately messy inputs for the structured-output experiment.
// Clean inputs would teach nothing: these are vague, incomplete, contradictory,
// out of scope, or overloaded on purpose. Roughly:
//   1-5   vague / too short
//   6-10  contradictory or self-undermining
//   11-15 missing the one fact needed to answer
//   16-18 out of KVKK scope
//   19-20 overloaded, several questions at once

export const INPUTS: string[] = [
  // vague / too short
  "şirketimde CV topluyorum ne yapmam lazım",
  "kamera koyduk",
  "müşteri verisi tutuyoruz sorun olur mu",
  "verbis'e girmem gerekiyor mu acaba bilmiyorum",
  "kvkk",

  // contradictory or self-undermining
  "çalışanlarımın sağlık raporlarını tutuyorum ama kişisel veri değil bunlar sadece şirket kaydı",
  "açık rıza aldık zaten, almadık aslında ama sözleşmede yazıyor",
  "veri sorumlusu benim ama aslında bulut sağlayıcısı tutuyor verileri o yüzden onlar sorumlu",
  "hiç kişisel veri işlemiyoruz, sadece isim telefon email adres topluyoruz",
  "verbis kaydı yaptırdık ama envanter hazırlamadık gerek yok galiba",

  // missing the one fact needed
  "yurt dışına veri aktaracağız uygun mu",
  "bir çalışanım verilerinin silinmesini istedi ne kadar sürede cevap vermem lazım",
  "aydınlatma metnini nereye koymam gerekiyor",
  "veri ihlali oldu ne yapmalıyım",
  "kaç kişilik şirketten sonra verbis zorunlu oluyor",

  // out of KVKK scope
  "faturayı kaç yıl saklamam gerekiyor vergi açısından",
  "işten çıkardığım çalışan tazminat davası açtı ne yapmalıyım",
  "web sitem için ticari elektronik ileti izni nasıl alınır",

  // overloaded, several questions at once
  "merhaba biz e-ticaret yapıyoruz müşterilerin adres bilgilerini kargo firmasıyla paylaşıyoruz ayrıca pazarlama için segmentasyon yapıyoruz bir de yurt dışındaki sunucularda yedek tutuyoruz üstelik bazı müşteriler 18 yaş altı olabilir bunların hepsi ayrı ayrı sorun mu acaba nereden başlamalıyım",
  "hastane olarak hasta kayıtlarını tutuyoruz bunlar özel nitelikli veri sanırım ama aynı zamanda sigorta şirketiyle de paylaşıyoruz ve araştırma için anonimleştirip üniversiteye veriyoruz anonimleştirme yeterli mi yoksa açık rıza mı lazım",
];
