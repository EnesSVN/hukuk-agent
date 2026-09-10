import { readFileSync } from "node:fs";
import { htmlToText, govdeyiAyikla, bol } from "./chunker.mjs";

const html = readFileSync("data/verbis-yonetmelik.html", "utf-8");
const tamMetin = htmlToText(html);
const metin = govdeyiAyikla(tamMetin, "BİRİNCİ BÖLÜM", "Yürütme");
const parcalar = bol(metin);

console.log("HAM METIN       :", tamMetin.length);
console.log("GOVDE           :", metin.length);
console.log("ATILAN          :", tamMetin.length - metin.length);
console.log("PARCA SAYISI    :", parcalar.length);
console.log("--- ILK PARCA ---");
console.log(parcalar[0]);
