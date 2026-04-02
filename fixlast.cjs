const fs=require('fs');
let t=fs.readFileSync('src/App.jsx','utf8');
t=t.split('\u00e2\u0152\u00ab').join('\u232b');
t=t.split('\u00e2\u2020\u00b5 Ky\u00e7u si Administrator').join('Ky\u00e7u si Administrator');
t=t.split('\u00e2\u2020\u00b5').join('\u21b5');
fs.writeFileSync('src/App.jsx',t,'utf8');
console.log('OK');
