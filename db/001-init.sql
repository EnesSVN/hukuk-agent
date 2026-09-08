-- KVKK obligations with statutory deadlines.
-- Small on purpose: the point is the tool call, not the data model.

create table if not exists yukumlulukler (
  id          serial primary key,
  ad          text not null,
  madde       text not null,
  sure_gun    int,            -- null = no statutory deadline
  aciklama    text not null
);

insert into yukumlulukler (ad, madde, sure_gun, aciklama) values
  ('veri ihlali bildirimi', 'Madde 12', 3,
   'Veri sorumlusu, ihlali ogrendigi tarihten itibaren 72 saat icinde Kurula bildirir.'),
  ('ilgili kisi basvurusunu yanitlama', 'Madde 13', 30,
   'Veri sorumlusu, basvuruyu en gec 30 gun icinde ucretsiz sonuclandirir.'),
  ('Kurul kararini yerine getirme', 'Madde 15', 30,
   'Kurul kararlari, teblig tarihinden itibaren 30 gun icinde yerine getirilir.'),
  ('VERBIS kaydi', 'Madde 16', null,
   'Veri sorumlulari, kisisel veri islemeye baslamadan once Sicile kaydolmak zorundadir.'),
  ('aydinlatma yukumlulugu', 'Madde 10', null,
   'Kisisel verilerin elde edilmesi sirasinda ilgili kisi bilgilendirilir.'),
  ('acik riza', 'Madde 5', null,
   'Ilgili kisinin acik rizasi olmaksizin kisisel veriler islenemez; istisnalar Madde 5/2de sayilir.')
on conflict do nothing;
