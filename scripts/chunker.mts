export const CHUNK = 800;
export const OVERLAP = 150;

const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  quot: '"',
  apos: "'",
  uuml: "ü",
  Uuml: "Ü",
  ouml: "ö",
  Ouml: "Ö",
  ccedil: "ç",
  Ccedil: "Ç",
  acirc: "â",
  icirc: "î",
  ndash: "–",
  mdash: "—",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201C",
  rdquo: "\u201D",
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => ENTITIES[name] ?? m);
}

export function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function bol(metin: string): string[] {
  const parcalar: string[] = [];
  let start = 0;
  while (start < metin.length) {
    const end = start + CHUNK;
    parcalar.push(metin.slice(start, end));
    start += CHUNK - OVERLAP;
  }
  return parcalar;
}

export function govdeyiAyikla(
  metin: string,
  basIsaret: string,
  sonIsaret: string,
): string {
  const bas = metin.indexOf(basIsaret);
  const son = metin.lastIndexOf(sonIsaret);

  if (bas === -1 || son === -1 || son <= bas) {
    throw new Error(
      `Govde bulunamadi. bas=${bas} ("${basIsaret}"), son=${son} ("${sonIsaret}"). ` +
        `Bu dosya icin isaretleri gozden gecir.`,
    );
  }
  return metin.slice(bas, son);
}
