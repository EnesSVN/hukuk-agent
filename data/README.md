# Corpus

Turkish data protection law. Raw sources, intentionally uncleaned — parsing and
chunking are part of the build, not the download.

| File | Document | Source | Format |
|---|---|---|---|
| `kvkk-6698.pdf` | Law No. 6698 on the Protection of Personal Data | mevzuat.gov.tr | PDF, 21 pages, embedded fonts (text extractable) |
| `aydinlatma-tebligi.html` | Communiqué on the Procedures and Principles for Fulfilling the Disclosure Obligation (Official Gazette 30356, 2018-03-10) | resmigazete.gov.tr | HTML, **windows-1254 encoding** |
| `verbis-yonetmelik.html` | Regulation on the Registry of Data Controllers (VERBIS) | kvkk.gov.tr | HTML, UTF-8 |

## Gotchas

- `aydinlatma-tebligi.html` is **not UTF-8**. Decode as `windows-1254` or you get mojibake.
- `kvkk.gov.tr/Icerik/*` pages render their body via JS; `curl` returns the nav shell only.
  The Communiqué had to come from the Official Gazette archive instead.
- All three are public legislative texts.
