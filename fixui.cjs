const fs=require('fs');
let t=fs.readFileSync('src/App.jsx','utf8');
t=t.split('\u00c3\u008b').join('\u00cb');
t=t.split('Hyr \u00e2\u0086\u0092').join('Hyr \u2192');
t=t.replace(
  `<div style=marginBottom:16>
<label style=fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6>EMRI I P\u00cbRDORUESIT</label>
<input value={u} onChange={e=>setU(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Emri i \u00ebrdoruesit"
style=width:"100%",padding:"11px 14px",border:"1.5px solid #E8ECF2",borderRadius:10,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box"
onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
</div>`,
  `<div style=marginBottom:16,position:"relative">
  <div style=position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",zIndex:1>
    <Icon name="person" size={18} color="#9DABBE"/>
  </div>
  <input value={u} onChange={e=>setU(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Emri i p\u00ebrdoruesit"
  style=width:"100%",padding:"11px 14px 11px 40px",border:"1.5px solid #E8ECF2",borderRadius:10,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box"
  onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
</div>`
);t=t.replace(
  `<div style=marginBottom:24>
<label style=fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6>FJAL\u00cbKALIMI</label>
<input type="password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022"
style=width:"100%",padding:"11px 14px",border:"1.5px solid #E8ECF2",borderRadius:10,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box"
onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
</div>`,
  `<div style=marginBottom:24,position:"relative">
  <div style=position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",zIndex:1>
    <Icon name="lock" size={18} color="#9DABBE"/>
  </div>
  <input type="password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022"
  style=width:"100%",padding:"11px 14px 11px 40px",border:"1.5px solid #E8ECF2",borderRadius:10,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box"
  onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
</div>`
);t=t.replace(
  `if(loginMode==="pin") return <PinLoginPage clinics={clinics} onLogin={u=>{setUser(u);setPage("dashboard");}} onSwitchToNormal={()=>setLoginMode("normal")}/>;
    return <LoginPage onLogin={u=>{setUser(u);setPage("dashboard");setLoginMode("pin");}}/>;`,
  `const [flipping,setFlipping]=React.useState(false);
    const doFlip=()=>{setFlipping(true);setTimeout(()=>{setLoginMode("normal");setFlipping(false);},400);};
    return (
      <div style=perspective:1200>
        <div style=transition:"transform 0.4s ease",transform:flipping?"rotateY(90deg)":"rotateY(0deg)",transformOrigin:"center">
          {loginMode==="pin"
            ?<PinLoginPage clinics={clinics} onLogin={u=>{setUser(u);setPage("dashboard");}} onSwitchToNormal={doFlip}/>
            :<LoginPage onLogin={u=>{setUser(u);setPage("dashboard");setLoginMode("pin");}}/>
          }
        </div>
      </div>
    );`
);fs.writeFileSync('src/App.jsx',t,'utf8');
console.log('OK');