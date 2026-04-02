const fs = require('fs');
let t = fs.readFileSync('src/App.jsx', 'utf8');

// === 1. FIX ENCODING ===
// Â· → · (middle dot)
t = t.split('\u00c2\u00b7').join('\u00b7');
// ðŸ" → 🔍
t = t.split('\u00f0\u0178\u201c\u201d').join('\ud83d\udd0d');
t = t.split('\u00f0\u009f\u0094\u008d').join('\ud83d\udd0d');
// â€" → – (en dash in appointments)
t = t.split('\u00e2\u20ac\u201c').join('\u2013');
// Ã‡ → Ç
t = t.split('\u00c3\u2021').join('\u00c7');
// â† → ← (back arrow)
t = t.split('\u00e2\u2020\u2019').join('\u2190');
t = t.split('\u00e2\u2020').join('\u2190');

// === 2. ADD PATIENT DIAGNOSES/THERAPY STATE + TABS ===
// Replace the existing if(selected) block with new comprehensive detail view
const OLD_SELECTED = `  if(selected){
    const p=selected; const pct=Math.round(p.sessions/p.total*100);
    return (`;

const NEW_SELECTED = `  const [patTab,setPatTab]=React.useState("profili");
  const [diagnoses,setDiagnoses]=React.useState([
    {id:1,date:"28 Mar 2026",title:"Lumbalgjia kronike",desc:"Dhimbje të forta në rajonin lumbar, shkaktuar nga qëndrimi i gjatë në pozicion ulur.",doctor:"Dr. Arta Morina",severity:"moderate"},
    {id:2,date:"15 Feb 2026",title:"Tension muskulor i qafës",desc:"Tension i muskujve sternocleidomastoid dhe trapezius.",doctor:"Dr. Blendi Berisha",severity:"mild"}
  ]);
  const [newDiag,setNewDiag]=React.useState({title:"",desc:"",doctor:"",severity:"mild"});
  const [showDiagForm,setShowDiagForm]=React.useState(false);
  const [therapies,setTherapies]=React.useState([
    {id:1,date:"01 Apr 2026",type:"Fizioterapi",duration:45,therapist:"Dr. Arta Morina",notes:"Ushtrime të shtrirjes dhe forcimit të muskulaturës lumbare. Pacienti toleroi mirë trajtimin.",status:"done"},
    {id:2,date:"29 Mar 2026",type:"Ultrasonik",duration:20,therapist:"Dr. Arta Morina",notes:"Aplikim i terapisë ultrasound në zonën lumbare, intensitet 1.5 W/cm².",status:"done"},
    {id:3,date:"28 Mar 2026",type:"Elektroterapi",duration:30,therapist:"Dr. Blendi Berisha",notes:"TENS terapia për lehtësim dhimbjeje.",status:"done"}
  ]);
  const [newTher,setNewTher]=React.useState({type:"Fizioterapi",duration:45,therapist:"",notes:""});
  const [showTherForm,setShowTherForm]=React.useState(false);
  const [notes,setNotes]=React.useState("Pacienti është kooperativ dhe tregon progres të mirë. Rekomandohet vazhdimi i seancave 3x në javë.");
  const [history,setHistory]=React.useState("Operacion i shtyllës kurrizore në 2019. Diabeti tip 2 i diagnostikuar në 2021. Nuk ka alergji të njohura ndaj barnave.");

  const severityColor={mild:"#22C55E",moderate:"#F59E0B",severe:"#EF4444"};
  const severityLabel={mild:"E lehtë",moderate:"Mesatare",severe:"E rëndë"};
  const tabStyle=(id)=>({padding:"9px 18px",border:"none",borderBottom:patTab===id?"2px solid #2563EB":"2px solid transparent",background:"transparent",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:patTab===id?600:400,color:patTab===id?"#2563EB":"#5A6A7E",cursor:"pointer"});
  const inpS={width:"100%",padding:"9px 12px",border:"1.5px solid #E8ECF2",borderRadius:9,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box"};

  if(selected){
    const p=selected; const pct=Math.round(p.sessions/p.total*100);
    return (`;

t = t.replace(OLD_SELECTED, NEW_SELECTED);

// === 3. REPLACE DETAIL VIEW CONTENT ===
// Find and replace everything inside the if(selected) return block
// We look for the header section and replace the whole detail view
const OLD_DETAIL_START = `        <div style=display:"flex",alignItems:"center",gap:12,marginBottom:24>
          <button onClick={()=>setSelected(null)} style=padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif">\u2190</div>`;

const NEW_DETAIL = `        {/* BACK BUTTON + HEADER */}
        <div style=display:"flex",alignItems:"center",gap:12,marginBottom:24>
          <button onClick={()=>{setSelected(null);setPatTab("profili");}} style=padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6>
            <Icon name="chevron-left" size={14} color="#5A6A7E"/> Kthehu
          </button>
          <h2 style=fontSize:18,fontWeight:700,color:"#1A2332",margin:0>{p.name}</h2>
          <Badge status={p.status}/>
        </div>

        {/* PATIENT HEADER CARD */}
        <div style=background:"linear-gradient(135deg,#EBF4FF,#F0F7FF)",border:"1px solid #DBEAFE",borderRadius:16,padding:"20px 24px",marginBottom:20,display:"flex",alignItems:"center",gap:20>
          <Avatar name={p.name} size={56} bg="#2563EB" color="#fff"/>
          <div style=flex:1>
            <div style=fontSize:16,fontWeight:700,color:"#1A2332">{p.name}</div>
            <div style=fontSize:13,color:"#5A6A7E",marginTop:2>{p.age} vjeç · {p.dob} · {p.address}</div>
            <div style=fontSize:12,color:"#2563EB",marginTop:4,fontWeight:500>{p.condition}</div>
          </div>
          <div style=display:"flex",gap:24>
            <div style=textAlign:"center">
              <div style=fontSize:20,fontWeight:700,color:"#2563EB">{p.sessions}/{p.total}</div>
              <div style=fontSize:11,color:"#9DABBE">Seanca</div>
            </div>
            <div style=textAlign:"center">
              <div style=fontSize:20,fontWeight:700,color:"#22C55E">€{p.balance}</div>
              <div style=fontSize:11,color:"#9DABBE">Balancë</div>
            </div>
            <div style=textAlign:"center">
              <div style=fontSize:20,fontWeight:700,color:"#F59E0B">{pct}%</div>
              <div style=fontSize:11,color:"#9DABBE">Progres</div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style=borderBottom:"1px solid #E8ECF2",marginBottom:20,display:"flex",gap:4>
          {[["profili","person","Profili"],["diagnoza","activity","Diagnoza"],["terapite","treatments","Terapitë"],["historia","calendar","Historia"],["shenime","edit","Shënime"]].map(([id,icon,label])=>(
            <button key={id} onClick={()=>setPatTab(id)} style={tabStyle(id)}>
              <span style=display:"flex",alignItems:"center",gap:6><Icon name={icon} size={13} color={patTab===id?"#2563EB":"#9DABBE"}/>{label}</span>
            </button>
          ))}
        </div>

        {/* TAB: PROFILI */}
        {patTab==="profili"&&(
          <div style=display:"grid",gridTemplateColumns:"1fr 1fr",gap:16>
            {[["Emri i plotë",p.name],["Mosha",p.age+" vjeç"],["Datëlindja",p.dob],["Adresa",p.address],["Telefon",p.phone],["Vizita e fundit",p.lastVisit],["Termini i ardhshëm",p.next],["Fizioterapisti",p.therapist]].map(([l,v])=>(
              <div key={l} style=background:"#fff",border:"1px solid #E8ECF2",borderRadius:12,padding:"14px 16px">
                <div style=fontSize:11,fontWeight:600,color:"#9DABBE",marginBottom:4,textTransform:"uppercase",letterSpacing:".05em">{l}</div>
                <div style=fontSize:14,fontWeight:500,color:"#1A2332">{v}</div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: DIAGNOZA */}
        {patTab==="diagnoza"&&(
          <div>
            <div style=display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16>
              <div style=fontSize:15,fontWeight:700,color:"#1A2332">Diagnozat ({diagnoses.length})</div>
              <button onClick={()=>setShowDiagForm(!showDiagForm)} style=padding:"8px 16px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6>
                <Icon name="plus" size={12} color="#fff"/> Diagnozë e Re
              </button>
            </div>
            {showDiagForm&&(
              <div style=background:"#F8FAFF",border:"1.5px solid #DBEAFE",borderRadius:14,padding:18,marginBottom:16>
                <div style=fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:14>Shto Diagnozë të Re</div>
                <div style=display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12>
                  <div><div style=fontSize:11,fontWeight:600,color:"#5A6A7E",marginBottom:5>TITULLI *</div>
                    <input value={newDiag.title} onChange={e=>setNewDiag(d=>({...d,title:e.target.value}))} placeholder="p.sh. Lumbalgjia" style={inpS} onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/></div>
                  <div><div style=fontSize:11,fontWeight:600,color:"#5A6A7E",marginBottom:5>MJEKU</div>
                    <input value={newDiag.doctor} onChange={e=>setNewDiag(d=>({...d,doctor:e.target.value}))} placeholder="Dr. Emri" style={inpS} onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/></div>
                </div>
                <div style=marginBottom:12><div style=fontSize:11,fontWeight:600,color:"#5A6A7E",marginBottom:5>ASHPËRSIA</div>
                  <div style=display:"flex",gap:8>
                    {["mild","moderate","severe"].map(s=>(
                      <button key={s} onClick={()=>setNewDiag(d=>({...d,severity:s}))} style=padding:"6px 14px",borderRadius:20,border:"1.5px solid",borderColor:newDiag.severity===s?severityColor[s]:"#E8ECF2",background:newDiag.severity===s?severityColor[s]+"20":"#fff",color:newDiag.severity===s?severityColor[s]:"#5A6A7E",fontSize:12,fontWeight:500,cursor:"pointer">{severityLabel[s]}</button>
                    ))}
                  </div>
                </div>
                <div style=marginBottom:14><div style=fontSize:11,fontWeight:600,color:"#5A6A7E",marginBottom:5>PËRSHKRIMI</div>
                  <textarea value={newDiag.desc} onChange={e=>setNewDiag(d=>({...d,desc:e.target.value}))} placeholder="Përshkrim i detajuar i diagnozës..." style=...inpS,height:80,resize:"vertical" onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/></div>
                <div style=display:"flex",gap:10>
                  <button onClick={()=>{if(!newDiag.title)return;const now=new Date();setDiagnoses(d=>[{id:Date.now(),date:now.toLocaleDateString("sq-AL",{day:"2-digit",month:"short",year:"numeric"}),...newDiag},... d]);setNewDiag({title:"",desc:"",doctor:"",severity:"mild"});setShowDiagForm(false);}} style=padding:"9px 20px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif">Ruaj Diagnozën</button>
                  <button onClick={()=>setShowDiagForm(false)} style=padding:"9px 16px",border:"1px solid #E8ECF2",borderRadius:9,background:"#fff",fontSize:13,color:"#5A6A7E",cursor:"pointer",fontFamily:"'DM Sans',sans-serif">Anulo</button>
                </div>
              </div>
            )}
            <div style=display:"flex",flexDirection:"column",gap:12>
              {diagnoses.map(d=>(
                <div key={d.id} style=background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"16px 18px">
                  <div style=display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8>
                    <div>
                      <div style=fontSize:14,fontWeight:700,color:"#1A2332">{d.title}</div>
                      <div style=fontSize:11,color:"#9DABBE",marginTop:2>{d.date} · {d.doctor}</div>
                    </div>
                    <span style=padding:"3px 10px",borderRadius:20,background:severityColor[d.severity]+"20",color:severityColor[d.severity],fontSize:11,fontWeight:600>{severityLabel[d.severity]}</span>
                  </div>
                  {d.desc&&<div style=fontSize:13,color:"#5A6A7E",lineHeight:1.5>{d.desc}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TERAPITË */}
        {patTab==="terapite"&&(
          <div>
            <div style=display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16>
              <div style=fontSize:15,fontWeight:700,color:"#1A2332">Seancat e Terapisë ({therapies.length})</div>
              <button onClick={()=>setShowTherForm(!showTherForm)} style=padding:"8px 16px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6>
                <Icon name="plus" size={12} color="#fff"/> Seancë e Re
              </button>
            </div>
            {showTherForm&&(
              <div style=background:"#F8FAFF",border:"1.5px solid #DBEAFE",borderRadius:14,padding:18,marginBottom:16>
                <div style=fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:14>Regjistro Seancë të Re</div>
                <div style=display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12>
                  <div><div style=fontSize:11,fontWeight:600,color:"#5A6A7E",marginBottom:5>LLOJI</div>
                    <select value={newTher.type} onChange={e=>setNewTher(d=>({...d,type:e.target.value}))} style=...inpS,cursor:"pointer">
                      {["Fizioterapi","Rehabilitim","Masazh terapeutik","Elektroterapi","Ultrasonik","Kineziterapi","Lazer terapi","Akupunkturë"].map(o=><option key={o}>{o}</option>)}
                    </select></div>
                  <div><div style=fontSize:11,fontWeight:600,color:"#5A6A7E",marginBottom:5>KOHËZGJATJA (min)</div>
                    <input type="number" value={newTher.duration} onChange={e=>setNewTher(d=>({...d,duration:e.target.value}))} style={inpS} onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/></div>
                  <div><div style=fontSize:11,fontWeight:600,color:"#5A6A7E",marginBottom:5>FIZIOTERAPISTI</div>
                    <input value={newTher.therapist} onChange={e=>setNewTher(d=>({...d,therapist:e.target.value}))} placeholder="Dr. Emri" style={inpS} onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/></div>
                </div>
                <div style=marginBottom:14><div style=fontSize:11,fontWeight:600,color:"#5A6A7E",marginBottom:5>SHËNIMET E SEANCËS</div>
                  <textarea value={newTher.notes} onChange={e=>setNewTher(d=>({...d,notes:e.target.value}))} placeholder="Ushtrimet e kryera, vërejtjet klinike..." style=...inpS,height:80,resize:"vertical" onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/></div>
                <div style=display:"flex",gap:10>
                  <button onClick={()=>{const now=new Date();setTherapies(d=>[{id:Date.now(),date:now.toLocaleDateString("sq-AL",{day:"2-digit",month:"short",year:"numeric"}),...newTher,status:"done"},...d]);setNewTher({type:"Fizioterapi",duration:45,therapist:"",notes:""});setShowTherForm(false);}} style=padding:"9px 20px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif">Ruaj Seancën</button>
                  <button onClick={()=>setShowTherForm(false)} style=padding:"9px 16px",border:"1px solid #E8ECF2",borderRadius:9,background:"#fff",fontSize:13,color:"#5A6A7E",cursor:"pointer",fontFamily:"'DM Sans',sans-serif">Anulo</button>
                </div>
              </div>
            )}
            <div style=display:"flex",flexDirection:"column",gap:10>
              {therapies.map(th=>(
                <div key={th.id} style=background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"14px 18px",display:"flex",gap:16,alignItems:"flex-start">
                  <div style=width:42,height:42,borderRadius:10,background:"#EBF4FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0>
                    <Icon name="treatments" size={18} color="#2563EB"/>
                  </div>
                  <div style=flex:1>
                    <div style=display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4>
                      <div style=fontSize:13,fontWeight:600,color:"#1A2332">{th.type}</div>
                      <div style=fontSize:11,color:"#9DABBE">{th.date} · {th.duration} min</div>
                    </div>
                    <div style=fontSize:12,color:"#5A6A7E",marginBottom:4>{th.therapist}</div>
                    {th.notes&&<div style=fontSize:12,color:"#5A6A7E",background:"#F8FAFF",padding:"8px 10px",borderRadius:8,lineHeight:1.5>{th.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: HISTORIA */}
        {patTab==="historia"&&(
          <div>
            <div style=fontSize:15,fontWeight:700,color:"#1A2332",marginBottom:16>Historia Mjekësore</div>
            <div style=background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px",marginBottom:16>
              <div style=fontSize:12,fontWeight:600,color:"#9DABBE",marginBottom:8,textTransform:"uppercase",letterSpacing:".05em">Sëmundjet & Operacionet e Kaluara</div>
              <textarea value={history} onChange={e=>setHistory(e.target.value)} style=...inpS,height:120,resize:"vertical",border:"none",padding:0,fontSize:13,lineHeight:1.6 onFocus={e=>e.target.style.borderColor="transparent"} onBlur={e=>e.target.style.borderColor="transparent"}/>
            </div>
            <div style=background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px">
              <div style=fontSize:12,fontWeight:600,color:"#9DABBE",marginBottom:12,textTransform:"uppercase",letterSpacing:".05em">Seancat — Progres</div>
              <div style=display:"flex",alignItems:"center",gap:12,marginBottom:8>
                <div style=flex:1,background:"#F1F3F7",borderRadius:20,height:8,overflow:"hidden">
                  <div style=height:"100%",borderRadius:20,background:"linear-gradient(90deg,#4A90D9,#2563EB)",width:pct+"%",transition:"width .3s"/>
                </div>
                <div style=fontSize:13,fontWeight:700,color:"#2563EB",minWidth:40>{pct}%</div>
              </div>
              <div style=fontSize:12,color:"#9DABBE">{p.sessions} nga {p.total} seanca të kryera</div>
            </div>
          </div>
        )}

        {/* TAB: SHËNIME */}
        {patTab==="shenime"&&(
          <div>
            <div style=fontSize:15,fontWeight:700,color:"#1A2332",marginBottom:16>Shënime Klinike</div>
            <div style=background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px">
              <div style=fontSize:12,fontWeight:600,color:"#9DABBE",marginBottom:8,textTransform:"uppercase",letterSpacing:".05em">Shënime të Lira</div>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={8} style=...inpS,resize:"vertical",fontSize:13,lineHeight:1.7 onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"} placeholder="Shkruaj shënime klinike këtu..."/>
              <button onClick={()=>alert("Shënimet u ruajtën!")} style=marginTop:12,padding:"9px 20px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif">Ruaj Shënimet</button>
            </div>
          </div>
        )}
`;

// Find the old detail content and replace it
// The old detail starts with the header div and ends before the closing of if(selected) return
const oldDetailRe = /\s*<div style=\{\{display:"flex",alignItems:"center",gap:12,marginBottom:24\}\}>\s*<button onClick=\{\(\)=>setSelected\(null\)\}[^<]*<\/div>/;
t = t.replace(oldDetailRe, '\n' + NEW_DETAIL);

fs.writeFileSync('src/App.jsx', t, 'utf8');
console.log('OK - Patient detail + encoding fixed');