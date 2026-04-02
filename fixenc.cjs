const fs = require('fs');
let txt = fs.readFileSync('src/App.jsx', 'latin1');
txt = Buffer.from(txt, 'latin1').toString('utf8');
fs.writeFileSync('src/App.jsx', txt, 'utf8');
console.log('OK: encoding u rregullua');
