const fs = require("fs");
let txt = fs.readFileSync("src/App.jsx","utf8");

const map = {
  "Ã«": "ë", "Ã‹": "Ë",
  "Ã©": "é", "Ã‰": "É",
  "Ã ": "à", "Ã€": "À",
  "Ã¢": "â", "Ã‚": "Â",
  "Ã®": "î", "ÃŽ": "Î",
  "Ã´": "ô", "Ã"": "Ô",
  "Ã§": "ç", "Ã‡": "Ç",
  "Ã¨": "è", "Ãˆ": "È",
  "Ã±": "ñ", "Ã'": "Ñ",
  "Ã¼": "ü", "Ãœ": "Ü",
  "Ã¶": "ö", "Ã–": "Ö",
  "Ã¤": "ä", "Ã„": "Ä",
  "Ã¹": "ù", "Ã™": "Ù",
  "Ã¾": "þ", "Ã†": "Æ",
  "â€"": "–", "â€"": "—",
  "â€˜": "'", "â€™": "'",
  "â€œ": '"', "â€": '"',
  "â€¢": "•", "â€¦": "…",
  "KyÃ§": "Kyç", "kyÃ§": "kyç",
  "PrishtinÃ«": "Prishtinë",
  "PejÃ«": "Pejë",
  "MitrovicÃ«": "Mitrovicë",
  "GjilanÃ«": "Gjilanë",
  "qafÃ«s": "qafës",
  "shpatullÃ«s": "shpatullës",
  "kÃ«mbe": "këmbe",
  "NÃ«": "Në",
  "nÃ«": "në",
  "pÃ«r": "për",
  "PÃ«r": "Për",
  "tÃ«": "të",
  "TÃ«": "Të",
  "gjithÃ«": "gjithë",
  "KlinikÃ«s": "Klinikës",
  "ordinancÃ«": "ordinancë",
  "OrdinancÃ«": "Ordinancë",
  "FizioterpisÃ«": "Fizioterapisë",
  "fizioterapisÃ«": "fizioterapisë",
  "ShpejtÃ«": "Shpejtë",
  "shpejtÃ«": "shpejtë",
  "PÃ«rdoruesit": "Përdoruesit",
  "pÃ«rdoruesit": "përdoruesit",
  "PÃ«rdorues": "Përdorues",
  "pÃ«rdorues": "përdorues",
  "FjalÃ«kalimi": "Fjalëkalimi",
  "fjalÃ«kalimi": "fjalëkalimi",
  "KredencialeT": "Kredenciale",
  "janÃ«": "janë",
  "JanÃ«": "Janë",
  "gabimÃ«": "gabimë",
  "provoniÃ«": "provoni",
  "seancat": "seancat",
  "gjetur": "gjetur",
  "â†'": "→",
  "â†"": "←",
  "â†"": "↓",
  "â†'": "↑",
  "â‚¬": "€",
};

for(const [bad, good] of Object.entries(map)){
  txt = txt.split(bad).join(good);
}

// Generic fix per Ã + next char
txt = txt.replace(/Ã«/g,"ë").replace(/Ã‹/g,"Ë");

fs.writeFileSync("src/App.jsx", txt, "utf8");
console.log("OK: encoding u rregullua");
