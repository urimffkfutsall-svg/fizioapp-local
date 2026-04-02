const fs=require('fs');
let t=fs.readFileSync('src/App.jsx','utf8');
t=t.replace(/\u00e2\u201a\u00ac/g,'\u20ac');
t=t.replace(/\u00e2\u0086\u0092/g,'\u2192');
t=t.replace(/\u00e2\u0086\u0093/g,'\u2193');
t=t.replace(/\u00e2\u0086\u00b5/g,'\u21b5');
fs.writeFileSync('src/App.jsx',t,'utf8');
console.log('OK');