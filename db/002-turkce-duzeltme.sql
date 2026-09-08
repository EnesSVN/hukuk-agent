-- The seed data was written without Turkish characters; the questions use them,
-- so `ilike` never matched and the agent looped until the step limit.
update yukumlulukler set
  ad       = 'ilgili kişi başvurusunu yanıtlama',
  aciklama = 'Veri sorumlusu, başvuruyu en geç 30 gün içinde ücretsiz sonuçlandırır.'
where madde = 'Madde 13';

update yukumlulukler set
  ad       = 'Kurul kararını yerine getirme',
  aciklama = 'Kurul kararları, tebliğ tarihinden itibaren 30 gün içinde yerine getirilir.'
where madde = 'Madde 15';

update yukumlulukler set
  ad       = 'VERBİS kaydı',
  aciklama = 'Veri sorumluları, kişisel veri işlemeye başlamadan önce Sicile kaydolmak zorundadır.'
where madde = 'Madde 16';

update yukumlulukler set
  ad       = 'aydınlatma yükümlülüğü',
  aciklama = 'Kişisel verilerin elde edilmesi sırasında ilgili kişi bilgilendirilir.'
where madde = 'Madde 10';

update yukumlulukler set
  ad       = 'açık rıza',
  aciklama = 'İlgili kişinin açık rızası olmaksızın kişisel veriler işlenemez; istisnalar Madde 5/2de sayılır.'
where madde = 'Madde 5';
