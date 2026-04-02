import { useState, useRef, useEffect } from "react";

// â”€â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PATIENTS = [
  { id:1, name:"Arjeta Krasniqi", age:34, condition:"Dhimbje shpine", sessions:4, total:10, next:"02 Apr", status:"active", phone:"044 123 456", lastVisit:"01 Apr", balance:130, therapist:"Dr. Arta Morina", dob:"12.03.1992", address:"Prishtinë" },
  { id:2, name:"Besnik Morina", age:48, condition:"Gjuri i djathtë", sessions:7, total:12, next:"01 Apr", status:"active", phone:"045 234 567", lastVisit:"29 Mar", balance:65, therapist:"Dr. Blendi Berisha", dob:"05.07.1978", address:"Fushë Kosovë" },
  { id:3, name:"Mimoza Berisha", age:29, condition:"Tension i qafës", sessions:2, total:8, next:"01 Apr", status:"active", phone:"049 345 678", lastVisit:"28 Mar", balance:195, therapist:"Dr. Arta Morina", dob:"22.11.1996", address:"Prishtinë" },
  { id:4, name:"Driton Hoxha", age:55, condition:"Artriti i shpatullës", sessions:9, total:15, next:"03 Apr", status:"active", phone:"044 456 789", lastVisit:"01 Apr", balance:0, therapist:"Dr. Fjolla Gashi", dob:"14.02.1971", address:"Lipjan" },
  { id:5, name:"Liridon Gashi", age:41, condition:"Hernia diskale", sessions:1, total:10, next:"04 Apr", status:"new", phone:"045 567 890", lastVisit:"01 Apr", balance:260, therapist:"Dr. Blendi Berisha", dob:"30.06.1984", address:"Gjilan" },
  { id:6, name:"Valdete Osmani", age:62, condition:"Osteoporoza", sessions:12, total:20, next:"05 Apr", status:"active", phone:"044 678 901", lastVisit:"27 Mar", balance:0, therapist:"Dr. Fjolla Gashi", dob:"08.09.1963", address:"Prishtinë" },
  { id:7, name:"Kujtim Rama", age:37, condition:"Distorsion këmbe", sessions:3, total:6, next:"02 Apr", status:"active", phone:"049 789 012", lastVisit:"30 Mar", balance:90, therapist:"Dr. Arta Morina", dob:"17.04.1988", address:"Mitrovicë" },
  { id:8, name:"Shpresa Aliu", age:52, condition:"Fibromialgjia", sessions:8, total:16, next:"06 Apr", status:"inactive", phone:"044 890 123", lastVisit:"15 Mar", balance:0, therapist:"Dr. Kushtrim Leka", dob:"03.01.1974", address:"Pejë" },
];
const APPOINTMENTS = [
  { id:1, patient:"Arjeta Krasniqi", time:"09:00", duration:45, type:"Fizioterapi", therapist:"Dr. Morina", status:"confirmed", date:"2026-04-01" },
  { id:2, patient:"Besnik Morina", time:"10:30", duration:60, type:"Rehabilitim", therapist:"Dr. Berisha", status:"in-progress", date:"2026-04-01" },
  { id:3, patient:"Mimoza Berisha", time:"12:00", duration:45, type:"Masazh", therapist:"Dr. Morina", status:"waiting", date:"2026-04-01" },
  { id:4, patient:"Driton Hoxha", time:"14:30", duration:30, type:"Elektroterapi", therapist:"Dr. Gashi", status:"confirmed", date:"2026-04-01" },
  { id:5, patient:"Liridon Gashi", time:"16:00", duration:60, type:"Fizioterapi", therapist:"Dr. Berisha", status:"pending", date:"2026-04-01" },
  { id:6, patient:"Kujtim Rama", time:"08:30", duration:45, type:"Ultrasonik", therapist:"Dr. Morina", status:"confirmed", date:"2026-04-02" },
  { id:7, patient:"Valdete Osmani", time:"11:00", duration:60, type:"Rehabilitim", therapist:"Dr. Gashi", status:"confirmed", date:"2026-04-02" },
];
const INVOICES = [
  { id:"F-2026-041", patient:"Arjeta Krasniqi", date:"01 Apr", amount:65, status:"paid", type:"Fizioterapi" },
  { id:"F-2026-040", patient:"Besnik Morina", date:"01 Apr", amount:65, status:"paid", type:"Rehabilitim" },
  { id:"F-2026-039", patient:"Mimoza Berisha", date:"28 Mar", amount:55, status:"pending", type:"Masazh" },
  { id:"F-2026-038", patient:"Liridon Gashi", date:"01 Apr", amount:260, status:"pending", type:"Paket 10 seanca" },
  { id:"F-2026-037", patient:"Kujtim Rama", date:"30 Mar", amount:90, status:"overdue", type:"Paket 6 seanca" },
  { id:"F-2026-036", patient:"Driton Hoxha", date:"27 Mar", amount:75, status:"paid", type:"Elektroterapi" },
];
const STAFF = [
  { name:"Dr. Arta Morina", sessions:142, patients:38, attendance:96, rating:4.9 },
  { name:"Dr. Blendi Berisha", sessions:128, patients:34, attendance:94, rating:4.7 },
  { name:"Dr. Fjolla Gashi", sessions:115, patients:29, attendance:91, rating:4.8 },
  { name:"Dr. Kushtrim Leka", sessions:98, patients:23, attendance:89, rating:4.6 },
];
const INITIAL_CLINICS = [
  {id:1,name:"Ordinanca Krasniqi",city:"Prishtinë",users:4,patients:67,status:"active",revenue:4200,since:"Jan 2024",logo:null,phone:"044 100 200",email:"info@krasniqi.com",address:"Rr. Agim Ramadani 12, Prishtinë",
   admins:[{id:101,name:"Agron Krasniqi",pin:"1234",username:"agron",role:"admin"}],
   treatmentTypes:["Fizioterapi","Rehabilitim","Masazh terapeutik","Elektroterapi","Ultrasonik"]},
  {id:2,name:"Fizio Center Peja",city:"Pejë",users:3,patients:45,status:"active",revenue:3100,since:"Mar 2024",logo:null,phone:"039 200 300",email:"peja@fiziocenter.com",address:"Rr. Mbretëresha Teutë 5, Pejë",
   admins:[{id:102,name:"Blerta Peja",pin:"5678",username:"blerta",role:"admin"}],
   treatmentTypes:["Fizioterapi","Kineziterapi","Lazer terapi"]},
  {id:3,name:"RehabPro Gjilan",city:"Gjilan",users:5,patients:89,status:"active",revenue:5800,since:"Nov 2023",logo:null,phone:"0280 300 400",email:"gjilan@rehabpro.com",address:"Rr. Dëshmorët e Kombit 8, Gjilan",
   admins:[{id:103,name:"Driton Gjilani",pin:"9999",username:"driton",role:"admin"}],
   treatmentTypes:["Fizioterapi","Rehabilitim","Hidroterapi","Akupunkturë"]},
  {id:4,name:"Vita Fizio",city:"Mitrovicë",users:2,patients:23,status:"inactive",revenue:1200,since:"Jun 2024",logo:null,phone:"028 400 500",email:"vita@fizio.com",address:"Rr. Skënderbeu 22, Mitrovicë",
   admins:[],treatmentTypes:["Fizioterapi"]},
  {id:5,name:"Sport Rehab",city:"Prizren",users:3,patients:41,status:"active",revenue:2900,since:"Feb 2024",logo:null,phone:"029 500 600",email:"sport@rehab.com",address:"Rr. Remzi Ademaj 3, Prizren",
   admins:[{id:104,name:"Liridon Prizreni",pin:"1111",username:"liridon",role:"admin"}],
   treatmentTypes:["Fizioterapi","Rehabilitim","Masazh terapeutik"]},
];

// â”€â”€â”€ ICONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Icon = ({ name, size=16, color="currentColor" }) => {
  const s = { width:size, height:size, stroke:color, fill:"none", strokeWidth:1.8, strokeLinecap:"round", strokeLinejoin:"round", display:"block" };
  const icons = {
    dashboard: <svg style={s} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
    patients: <svg style={s} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    calendar: <svg style={s} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    treatments: <svg style={s} viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    payments: <svg style={s} viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg>,
    reports: <svg style={s} viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    clinics: <svg style={s} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    staff: <svg style={s} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
    settings: <svg style={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2"/></svg>,
    bell: <svg style={s} viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
    search: <svg style={s} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
    plus: <svg style={s} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    check: <svg style={s} viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,
    x: <svg style={s} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    edit: <svg style={s} viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    eye: <svg style={s} viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    heart: <svg style={s} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    fizio: <svg style={{...s, fill:"none"}} viewBox="0 0 32 32"><circle cx="16" cy="5" r="2.8" stroke="currentColor" strokeWidth="1.8"/><path d="M10 11c1.5-1.2 3.5-2 6-2s4.5.8 6 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 14l2 3 2-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 14l-2 3-2-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M13 20l-2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 20l2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M11 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 2"/></svg>,
    activity: <svg style={s} viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    logout: <svg style={s} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
    upload: <svg style={s} viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
    print: <svg style={s} viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    building: <svg style={s} viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="21" x2="8" y2="3"/><line x1="16" y1="21" x2="16" y2="3"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/></svg>,
    filter: <svg style={s} viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    download: <svg style={s} viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
    clock: <svg style={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    image: <svg style={s} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  };
  return icons[name] || null;
};

// â”€â”€â”€ HELPERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Avatar = ({ name, size=32, bg="#EBF4FF", color="#2563EB" }) => {
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:bg,color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:600,flexShrink:0}}>
      {initials}
    </div>
  );
};

const Badge = ({ status }) => {
  const map = {
    active:{bg:"#F0FDF4",color:"#15803D",label:"Aktiv"},
    new:{bg:"#EBF4FF",color:"#2563EB",label:"I Ri"},
    inactive:{bg:"#F5F5F5",color:"#6B7280",label:"Joaktiv"},
    confirmed:{bg:"#F0FDF4",color:"#15803D",label:"Konfirmuar"},
    "in-progress":{bg:"#FFFBEB",color:"#92400E",label:"Në progres"},
    waiting:{bg:"#EBF4FF",color:"#2563EB",label:"Në pritje"},
    pending:{bg:"#FEF3C7",color:"#92400E",label:"Pezull"},
    paid:{bg:"#F0FDF4",color:"#15803D",label:"Paguar"},
    overdue:{bg:"#FEF2F2",color:"#991B1B",label:"Vonuar"},
  };
  const s = map[status] || map.active;
  return <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:s.bg,color:s.color,whiteSpace:"nowrap"}}>{s.label}</span>;
};

const StatCard = ({ icon, label, value, change, changeUp, accent }) => {
  const accents = {
    blue:{bg:"#EBF4FF",color:"#2563EB"},
    green:{bg:"#F0FDF4",color:"#22C55E"},
    amber:{bg:"#FFFBEB",color:"#F59E0B"},
    red:{bg:"#FEF2F2",color:"#EF4444"},
  };
  const a = accents[accent]||accents.blue;
  return (
    <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px"}}>
      <div style={{width:36,height:36,borderRadius:10,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
        <Icon name={icon} size={18} color={a.color}/>
      </div>
      <div style={{fontSize:26,fontWeight:700,color:"#1A2332",lineHeight:1}}>{value}</div>
      <div style={{fontSize:12,color:"#5A6A7E",marginTop:5}}>{label}</div>
      {change && <div style={{fontSize:11,fontWeight:600,color:changeUp?"#22C55E":"#EF4444",marginTop:8}}>{changeUp?"â†‘":"â†“"} {change}</div>}
    </div>
  );
};

// â”€â”€â”€ PIN QUICK LOGIN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PinLoginPage = ({ clinics, onLogin, onSwitchToNormal }) => {
  const [pin,setPin]=useState("");
  const [shake,setShake]=useState(false);
  const [hint,setHint]=useState("");

  const tryPin=(p)=>{
    for(const clinic of clinics){
      for(const admin of (clinic.admins||[])){
        if(admin.pin===p){
          onLogin({username:admin.username,name:admin.name,role:"admin",clinicId:clinic.id,clinicName:clinic.name});
          return true;
        }
      }
    }
    return false;
  };

  const pressKey=(k)=>{
    if(k==="C"){setPin("");setHint("");return;}
    if(k==="âŒ«"){setPin(p=>p.slice(0,-1));return;}
    if(pin.length>=6) return;
    const next=pin+k;
    setPin(next);
    if(!tryPin(next)&&next.length>=6){
      setShake(true);setHint("PIN i gabuar. Provo përsëri.");
      setTimeout(()=>{setShake(false);setPin("");setHint("");},900);
    }
  };

  useEffect(()=>{
    const handler=(e)=>{
      if(e.key>="0"&&e.key<="9") pressKey(e.key);
      else if(e.key==="Backspace") pressKey("âŒ«");
      else if(e.key==="Escape") setPin("");
    };
    window.addEventListener("keydown",handler);
    return ()=>window.removeEventListener("keydown",handler);
  },[pin]);

  return (
    <div style={{minHeight:"100vh",background:"#EEF2F7",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{
        background:"#fff",borderRadius:24,padding:"36px 32px 28px",width:320,
        boxShadow:"0 12px 48px rgba(37,99,235,0.13)",
        transform:shake?"translateX(-8px)":"translateX(0)",transition:"transform .07s"
      }}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:60,height:60,background:"linear-gradient(135deg,#4A90D9,#1D4ED8)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",boxShadow:"0 6px 20px rgba(37,99,235,0.32)"}}>
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="5.5" r="2.8" stroke="white" strokeWidth="1.9"/>
              <path d="M10.5 11.5c1.5-1.3 3.3-2 5.5-2s4 .7 5.5 2" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
              <path d="M16 13v7.5" stroke="white" strokeWidth="2.1" strokeLinecap="round"/>
              <path d="M10 14.5l2.5 3.5M22 14.5l-2.5 3.5" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
              <path d="M13.5 20.5L11.5 27M18.5 20.5L20.5 27" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{fontSize:24,fontWeight:700,color:"#1A2332",letterSpacing:"-0.5px"}}>Fizio<span style={{color:"#2563EB"}}>app</span></div>
          <div style={{fontSize:12,color:"#9DABBE",marginTop:3}}>Kyçje e Shpejtë me PIN</div>
        </div>

        {/* PIN display */}
        <div style={{background:"#F8FAFF",border:"1.5px solid",borderColor:hint?"#FECACA":"#DBEAFE",borderRadius:14,padding:"16px 20px",marginBottom:6,minHeight:56,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {pin.length===0
            ?<span style={{fontSize:13,color:"#C4CCDA",letterSpacing:".02em"}}>Shkruaj kodin PIN</span>
            :<div style={{display:"flex",gap:14,justifyContent:"center"}}>
              {Array.from({length:Math.max(pin.length,1)},(_,i)=>(
                <div key={i} style={{width:13,height:13,borderRadius:"50%",background:i<pin.length?"#2563EB":"#E8ECF2",transition:"background .1s",boxShadow:i<pin.length?"0 0 0 3px rgba(37,99,235,.15)":"none"}}/>
              ))}
            </div>}
        </div>
        {hint
          ?<div style={{fontSize:11,color:"#EF4444",textAlign:"center",marginBottom:6,fontWeight:500}}>{hint}</div>
          :<div style={{fontSize:11,color:"#9DABBE",textAlign:"center",marginBottom:6}}>Shkruaj kodin PIN (1â€“6 shifra)</div>}

        {/* Numpad */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,margin:"14px 0"}}>
          {["1","2","3","4","5","6","7","8","9","C","0","âŒ«"].map(k=>{
            const isC=k==="C", isBs=k==="âŒ«";
            return (
              <button key={k} onClick={()=>pressKey(k)} style={{
                height:56,borderRadius:14,border:"1.5px solid #E8ECF2",
                fontSize:isC||isBs?14:22,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
                background:isC?"#FEF2F2":isBs?"#F5F7FA":"#FAFBFF",
                color:isC?"#EF4444":isBs?"#5A6A7E":"#1A2332",transition:"all .1s"
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=isC?"#FEE2E2":isBs?"#EEF0F3":"#EBF4FF";e.currentTarget.style.borderColor="#2563EB";e.currentTarget.style.transform="scale(0.97)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=isC?"#FEF2F2":isBs?"#F5F7FA":"#FAFBFF";e.currentTarget.style.borderColor="#E8ECF2";e.currentTarget.style.transform="scale(1)";}}>
                {k}
              </button>
            );
          })}
        </div>

        <button onClick={onSwitchToNormal} style={{width:"100%",padding:"12px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:12,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",marginBottom:12,letterSpacing:".02em"}}>
          â†µ Kyçu si Administrator
        </button>
        <div style={{fontSize:10,color:"#9DABBE",textAlign:"center"}}>Tastiera (0â€“9) â€¢ Backspace â€¢ Escape për pastrim</div>
      </div>
    </div>
  );
};

// â”€â”€â”€ NORMAL LOGIN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const LoginPage = ({ onLogin }) => {
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);
  const handleLogin = () => {
    setErr("");
    if((u==="urumi1806"||u==="urimi1806")&&p==="1806"){setLoading(true);setTimeout(()=>onLogin({username:u,role:"superadmin"}),800);}
    else if(u==="admin"&&p==="admin"){setLoading(true);setTimeout(()=>onLogin({username:u,role:"admin",clinicId:3,clinicName:"RehabPro Gjilan"}),800);}
    else if(u==="fizio"&&p==="fizio"){setLoading(true);setTimeout(()=>onLogin({username:u,role:"fizioterapis",clinicId:3,clinicName:"RehabPro Gjilan"}),800);}
    else setErr("Kredencialet janë gabim. Ju lutemi provoni përsëri.");
  };
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#F0F7FF 0%,#FAFAFA 50%,#EBF4FF 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:"rgba(37,99,235,0.05)"}}/>
      <div style={{position:"absolute",bottom:-100,left:-60,width:300,height:300,borderRadius:"50%",background:"rgba(74,144,217,0.07)"}}/>
      <div style={{width:"100%",maxWidth:420,padding:"0 20px",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{margin:"0 auto 16px",width:72,height:72,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:72,height:72,background:"linear-gradient(135deg,#4A90D9,#1D4ED8)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(37,99,235,0.35)"}}>
              <svg width="42" height="42" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="5.5" r="2.8" stroke="white" strokeWidth="1.8"/>
                <path d="M10.5 11.5c1.5-1.3 3.3-2 5.5-2s4 .7 5.5 2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M16 13v7.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 14.5l2.5 3.5M22 14.5l-2.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M13.5 20.5L11.5 27M18.5 20.5L20.5 27" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{position:"absolute",bottom:-2,right:-2,width:22,height:22,background:"#22C55E",borderRadius:"50%",border:"2.5px solid #fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
          </div>
          <h1 style={{fontSize:28,fontWeight:700,color:"#1A2332",margin:0,letterSpacing:"-0.5px"}}>Fizio<span style={{color:"#2563EB"}}>app</span></h1>
          <p style={{color:"#5A6A7E",fontSize:14,marginTop:6}}>Menaxhimi i ordinancave të fizioterapisë</p>
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:32,border:"1px solid #E8ECF2",boxShadow:"0 4px 24px rgba(37,99,235,0.08)"}}>
          <h2 style={{fontSize:18,fontWeight:600,color:"#1A2332",marginBottom:6}}>Hyr në llogari</h2>
          <p style={{fontSize:13,color:"#9DABBE",marginBottom:24}}>Fut kredencialet e tua</p>
          {err&&<div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#991B1B"}}>{err}</div>}
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>EMRI I PÃ‹RDORUESIT</label>
            <input value={u} onChange={e=>setU(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Emri i përdoruesit"
              style={{width:"100%",padding:"11px 14px",border:"1.5px solid #E8ECF2",borderRadius:10,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
          </div>
          <div style={{marginBottom:24}}>
            <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>FJALÃ‹KALIMI</label>
            <input type="password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢"
              style={{width:"100%",padding:"11px 14px",border:"1.5px solid #E8ECF2",borderRadius:10,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
          </div>
          <button onClick={handleLogin} disabled={loading}
            style={{width:"100%",padding:"13px",background:loading?"#93C5FD":"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:loading?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            {loading?"Duke u identifikuar...":"Hyr â†’"}
          </button>
        </div>
      </div>
    </div>
  );
};

// â”€â”€â”€ GLOBAL SEARCH DROPDOWN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const GlobalSearch = ({ onNavigate }) => {
  const [q,setQ]=useState(""); const [open,setOpen]=useState(false); const ref=useRef();
  const results = q.trim().length>0 ? PATIENTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.condition.toLowerCase().includes(q.toLowerCase())||p.phone.includes(q)) : [];
  return (
    <div style={{position:"relative",width:260}} ref={ref}>
      <div style={{display:"flex",alignItems:"center",gap:8,background:"#F8FAFF",border:"1px solid #E8ECF2",borderRadius:9,padding:"7px 12px"}}>
        <Icon name="search" size={14} color="#9DABBE"/>
        <input value={q} onChange={e=>{setQ(e.target.value);setOpen(true);}} onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>setOpen(false),150)}
          placeholder="Kërko pacient, termin..."
          style={{border:"none",outline:"none",fontSize:13,color:"#1A2332",fontFamily:"'DM Sans',sans-serif",flex:1,background:"none"}}/>
        {q&&<div onClick={()=>{setQ("");setOpen(false);}} style={{cursor:"pointer",opacity:.5}}><Icon name="x" size={13} color="#5A6A7E"/></div>}
      </div>
      {open&&results.length>0&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",border:"1px solid #E8ECF2",borderRadius:12,boxShadow:"0 8px 32px rgba(37,99,235,0.12)",zIndex:1000,overflow:"hidden",maxHeight:320,overflowY:"auto"}}>
          <div style={{padding:"8px 12px 6px",fontSize:10,fontWeight:700,color:"#9DABBE",letterSpacing:".08em",textTransform:"uppercase",borderBottom:"1px solid #F1F3F7"}}>
            {results.length} pacientë gjetur
          </div>
          {results.map(p=>{
            const pct=Math.round(p.sessions/p.total*100);
            return (
              <div key={p.id} onMouseDown={()=>{onNavigate("patients",p);setQ("");setOpen(false);}}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid #F5F7FA",transition:"background .1s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#F5F8FF"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <Avatar name={p.name} size={34} bg="#EBF4FF" color="#2563EB"/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>{p.name}</div>
                  <div style={{fontSize:11,color:"#5A6A7E"}}>{p.condition} Â· {p.age} vjeç</div>
                  <div style={{background:"#F1F3F7",borderRadius:20,height:3,width:80,marginTop:4,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:20,background:"#2563EB",width:`${pct}%`}}/>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <Badge status={p.status}/>
                  <div style={{fontSize:10,color:"#9DABBE",marginTop:4}}>{p.phone}</div>
                </div>
              </div>
            );
          })}
          <div onMouseDown={()=>{onNavigate("patients");setOpen(false);}}
            style={{padding:"10px 14px",fontSize:12,color:"#2563EB",fontWeight:600,cursor:"pointer",textAlign:"center",background:"#F8FAFF"}}
            onMouseEnter={e=>e.currentTarget.style.background="#EBF4FF"}
            onMouseLeave={e=>e.currentTarget.style.background="#F8FAFF"}>
            Shiko të gjithë pacientët â†’
          </div>
        </div>
      )}
      {open&&q.trim().length>1&&results.length===0&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",border:"1px solid #E8ECF2",borderRadius:12,boxShadow:"0 8px 32px rgba(0,0,0,.08)",zIndex:1000,padding:"20px",textAlign:"center"}}>
          <div style={{fontSize:24,marginBottom:8}}>ðŸ”</div>
          <div style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>Nuk u gjet asnjë rezultat</div>
          <div style={{fontSize:12,color:"#9DABBE",marginTop:4}}>Provo me emër tjetër</div>
        </div>
      )}
    </div>
  );
};

// â”€â”€â”€ SUPERADMIN DASHBOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SuperadminDashboard = ({ clinics, onDeleteClinic, onUpdateClinic }) => {
  const active=clinics.filter(c=>c.status==="active");
  const totalPatients=clinics.reduce((s,c)=>s+c.patients,0);
  const totalRevenue=clinics.reduce((s,c)=>s+c.revenue,0);
  const totalUsers=clinics.reduce((s,c)=>s+c.users,0);
  const recentActivity=[
    {text:"Ordinanca e re u shtua: Sport Rehab",time:"2h",icon:"clinics",color:"#2563EB",bg:"#EBF4FF"},
    {text:"Admin Agron Krasniqi u kyç me PIN",time:"3h",icon:"staff",color:"#22C55E",bg:"#F0FDF4"},
    {text:"Vita Fizio: abonimi u çaktivizua",time:"5h",icon:"x",color:"#EF4444",bg:"#FEF2F2"},
    {text:"Ordinanca Krasniqi: 67 pacientë aktivë",time:"1d",icon:"patients",color:"#F59E0B",bg:"#FFFBEB"},
  ];
  const [editOpen,setEditOpen]=useState(false);
  const [draft,setDraft]=useState(null);

  const openEdit = (c) => {
    setDraft({
      ...c,
      treatmentTypes: Array.isArray(c.treatmentTypes) ? c.treatmentTypes.join(", ") : (c.treatmentTypes || "")
    });
    setEditOpen(true);
  };

  const saveEdit = () => {
    if(!draft) return;
    const cleaned = {
      ...draft,
      users: Number(draft.users||0),
      patients: Number(draft.patients||0),
      revenue: Number(draft.revenue||0),
      treatmentTypes: String(draft.treatmentTypes||"").split(",").map(s=>s.trim()).filter(Boolean)
    };
    onUpdateClinic && onUpdateClinic(cleaned);
    setEditOpen(false);
    setDraft(null);
  };

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Dashboard Superadmin</h1>
        <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>Pamje e plotë e të gjitha ordinancave</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        {[{icon:"clinics",label:"Ordinanca Aktive",value:active.length,change:`${clinics.length} gjithsej`,up:true,a:"blue"},
          {icon:"patients",label:"Pacientë Total",value:totalPatients,change:"+23 muajin",up:true,a:"green"},
          {icon:"staff",label:"Përdorues Total",value:totalUsers,change:`${clinics.length} ordinanca`,up:true,a:"amber"},
          {icon:"payments",label:"Të Ardhura Total",value:`€${totalRevenue.toLocaleString()}`,change:"+12.4%",up:true,a:"green"}].map(x=>(
          <div key={x.label} style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px"}}>
            <div style={{width:36,height:36,borderRadius:10,background:x.a==="blue"?"#EBF4FF":x.a==="green"?"#F0FDF4":"#FFFBEB",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
              <Icon name={x.icon} size={18} color={x.a==="blue"?"#2563EB":x.a==="green"?"#22C55E":"#F59E0B"}/>
            </div>
            <div style={{fontSize:26,fontWeight:700,color:"#1A2332"}}>{x.value}</div>
            <div style={{fontSize:12,color:"#5A6A7E",marginTop:5}}>{x.label}</div>
            <div style={{fontSize:11,fontWeight:600,color:"#22C55E",marginTop:8}}>â†‘ {x.change}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 360px",gap:16}}>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
          <div style={{padding:"14px 18px",borderBottom:"1px solid #E8ECF2",fontSize:13,fontWeight:600,color:"#1A2332"}}>Të gjitha Ordinancat</div>
          {clinics.map(c=>(
            <div key={c.id} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 18px",borderBottom:"1px solid #F5F7FA"}}
              onMouseEnter={e=>e.currentTarget.style.background="#FAFBFD"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              {c.logo
                ?<div style={{width:38,height:38,borderRadius:10,border:"1px solid #E8ECF2",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff",flexShrink:0}}><img src={c.logo} alt="" style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}/></div>
                :<div style={{width:38,height:38,borderRadius:10,background:c.status==="active"?"#EBF4FF":"#F5F5F5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:c.status==="active"?"#2563EB":"#9DABBE",flexShrink:0}}>{c.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}</div>
              }
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>{c.name}</div>
                <div style={{fontSize:11,color:"#9DABBE"}}>{c.city} Â· {c.patients} pacientë Â· {c.users} përdorues</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>€{c.revenue.toLocaleString()}</div>
                <span style={{padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,background:c.status==="active"?"#F0FDF4":"#F5F5F5",color:c.status==="active"?"#15803D":"#9DABBE"}}>{c.status==="active"?"Aktive":"Joaktive"}</span>
              
  <div style={{display:"flex",gap:8,flexShrink:0,marginLeft:"auto"}}>
    <button onClick={() => openEdit(c)} style={{padding:"7px 10px",borderRadius:10,border:"1px solid #E8ECF2",background:"#fff",cursor:"pointer",fontSize:12,fontWeight:600}}>Edit</button>
    <button onClick={() => onDeleteClinic && onDeleteClinic(c.id)} style={{padding:"7px 10px",borderRadius:10,border:"1px solid #FECACA",background:"#FEF2F2",color:"#991B1B",cursor:"pointer",fontSize:12,fontWeight:600}}>Fshij</button>
  </div>
</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"linear-gradient(135deg,#1D4ED8,#3B82F6)",borderRadius:14,padding:"18px 18px"}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginBottom:4}}>Shpërndarje ordinancash</div>
            {clinics.filter(c=>c.status==="active").map(c=>{
              const pct=Math.round(c.revenue/totalRevenue*100);
              return (
                <div key={c.id} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.85)"}}>{c.name}</span>
                    <span style={{fontSize:11,fontWeight:600,color:"#fff"}}>{pct}%</span>
                  </div>
                  <div style={{background:"rgba(255,255,255,.2)",borderRadius:20,height:5,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:20,background:"#fff",width:`${pct}%`}}/>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"13px 16px",borderBottom:"1px solid #E8ECF2",fontSize:13,fontWeight:600,color:"#1A2332"}}>Aktiviteti i Fundit</div>
            {recentActivity.map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 16px",borderBottom:"1px solid #F5F7FA"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name={a.icon} size={13} color={a.color}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:"#1A2332"}}>{a.text}</div>
                  <div style={{fontSize:10,color:"#9DABBE",marginTop:2}}>{a.time} më parë</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const Dashboard = ({ user }) => {
  const today=APPOINTMENTS.filter(a=>a.date==="2026-04-01");
  const barData=[35,48,55,42,50,20,8];
  const barLabels=["Hë","Ma","Më","En","Pr","Sh","Di"];
  const maxBar=Math.max(...barData);
  return (
    <div>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Mirëmbrëma, {user.role==="superadmin"?"Urimi":user.role==="admin"?"Admin":"Fizioterapis"} ðŸ‘‹</h1>
          <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>E Mërkurë, 1 Prill 2026 Â· Sot keni <strong>{today.length} termine</strong></p>
        </div>
        <div style={{display:"flex",gap:8,background:"#F1F3F7",padding:3,borderRadius:10}}>
          {["Sot","Kjo Javë","Ky Muaj"].map((t,i)=>(
            <div key={t} style={{padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:500,cursor:"pointer",background:i===0?"#fff":"transparent",color:i===0?"#1A2332":"#5A6A7E",boxShadow:i===0?"0 1px 4px rgba(0,0,0,.08)":"none"}}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <StatCard icon="patients" label="Pacientë Aktivë" value="124" change="+12 këtë muaj" changeUp accent="blue"/>
        <StatCard icon="calendar" label="Termine Sot" value={today.length} change="3 mbeten" changeUp accent="green"/>
        <StatCard icon="payments" label="Të Ardhura Mujore" value="€3,240" change="+8.3%" changeUp accent="amber"/>
        <StatCard icon="activity" label="Pa Konfirmim" value="3" change="Kërkon vëmendje" changeUp={false} accent="red"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16,marginBottom:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderBottom:"1px solid #E8ECF2"}}>
              <span style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>Terminet e Sotme</span>
              <span style={{fontSize:12,color:"#2563EB",cursor:"pointer",fontWeight:500}}>Shiko të gjitha â†’</span>
            </div>
            {today.map(a=>(
              <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 18px",borderBottom:"1px solid #F5F7FA"}}>
                <div style={{textAlign:"center",minWidth:44,background:"#F8FAFF",borderRadius:8,padding:"6px 4px"}}>
                  <div style={{fontSize:14,fontWeight:700,color:"#1A2332"}}>{a.time}</div>
                  <div style={{fontSize:9,color:"#9DABBE",marginTop:1}}>{a.duration}min</div>
                </div>
                <Avatar name={a.patient} size={34} bg="#EBF4FF" color="#2563EB"/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,color:"#1A2332"}}>{a.patient}</div>
                  <div style={{fontSize:11,color:"#5A6A7E"}}>{a.type} Â· {a.therapist}</div>
                </div>
                <Badge status={a.status}/>
              </div>
            ))}
          </div>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderBottom:"1px solid #E8ECF2"}}>
              <span style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>Pacientët e Fundit</span>
              <span style={{fontSize:12,color:"#2563EB",cursor:"pointer",fontWeight:500}}>Shiko të gjitha â†’</span>
            </div>
            {PATIENTS.slice(0,4).map(p=>{
              const pct=Math.round(p.sessions/p.total*100);
              return (
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 18px",borderBottom:"1px solid #F5F7FA"}}>
                  <Avatar name={p.name} size={34} bg="#EBF4FF" color="#2563EB"/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:500,color:"#1A2332"}}>{p.name}</div>
                    <div style={{fontSize:11,color:"#5A6A7E"}}>Seanca {p.sessions}/{p.total} Â· {p.condition}</div>
                    <div style={{background:"#F1F3F7",borderRadius:20,height:4,marginTop:6,overflow:"hidden",width:120}}>
                      <div style={{height:"100%",borderRadius:20,background:"#2563EB",width:`${pct}%`}}/>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,fontWeight:500,color:"#1A2332"}}>{p.next}</div>
                    <div style={{fontSize:10,color:"#9DABBE"}}>termin</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:16}}>
            <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:14}}>Performanca Javore</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
              {barData.map((v,i)=>(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{width:"100%",borderRadius:"4px 4px 0 0",background:i===2?"#2563EB":"#EBF4FF",height:`${Math.round(v/maxBar*72)}px`}}/>
                  <div style={{fontSize:9,color:"#9DABBE"}}>{barLabels[i]}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:12,paddingTop:12,borderTop:"1px solid #E8ECF2"}}>
              <div><div style={{fontSize:11,color:"#5A6A7E"}}>Termine/javë</div><div style={{fontSize:16,fontWeight:700,color:"#1A2332"}}>47</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#5A6A7E"}}>Prezenca</div><div style={{fontSize:16,fontWeight:700,color:"#22C55E"}}>94%</div></div>
            </div>
          </div>
          <div style={{background:"linear-gradient(135deg,#2563EB,#4A90D9)",borderRadius:14,padding:"18px 16px",color:"white"}}>
            <div style={{fontSize:12,opacity:.8,marginBottom:4}}>Të ardhurat e muajit</div>
            <div style={{fontSize:28,fontWeight:700,marginBottom:2}}>€3,240</div>
            <div style={{fontSize:12,opacity:.8,marginBottom:16}}>Prill 2026</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[{l:"Paguar",v:"€2,860"},{l:"Në pritje",v:"€380"},{l:"Fatura",v:"38"},{l:"Seanca",v:"142"}].map(x=>(
                <div key={x.l} style={{background:"rgba(255,255,255,.15)",borderRadius:8,padding:"8px 10px"}}>
                  <div style={{fontSize:11,opacity:.8}}>{x.l}</div>
                  <div style={{fontSize:15,fontWeight:700}}>{x.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"14px 16px",borderBottom:"1px solid #E8ECF2",fontSize:13,fontWeight:600,color:"#1A2332"}}>Aktiviteti</div>
            {[{icon:"check",bg:"#F0FDF4",ic:"#22C55E",text:"Arjeta kreu seancën 4-të",time:"2h"},
              {icon:"payments",bg:"#EBF4FF",ic:"#2563EB",text:"Faturë paguar €65",time:"3h"},
              {icon:"patients",bg:"#FFFBEB",ic:"#F59E0B",text:"Pacient i ri: Liridon Gashi",time:"5h"}].map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 16px",borderBottom:"1px solid #F5F7FA"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name={a.icon} size={13} color={a.ic}/>
                </div>
                <div>
                  <div style={{fontSize:12,color:"#1A2332"}}>{a.text}</div>
                  <div style={{fontSize:11,color:"#9DABBE",marginTop:2}}>{a.time} më parë</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// â”€â”€â”€ PATIENTS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PatientsPage = ({ initialSelected=null }) => {
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(initialSelected);
  const [filter,setFilter]=useState("all");

  const filtered=PATIENTS.filter(p=>{
    const ms=p.name.toLowerCase().includes(search.toLowerCase())||p.condition.toLowerCase().includes(search.toLowerCase())||p.phone.includes(search);
    const mf=filter==="all"||p.status===filter;
    return ms&&mf;
  });

  if(selected){
    const p=selected; const pct=Math.round(p.sessions/p.total*100);
    return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <button onClick={()=>setSelected(null)} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>â† Kthehu</button>
          <h1 style={{fontSize:20,fontWeight:700,color:"#1A2332",margin:0}}>Profili i Pacientit</h1>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20,textAlign:"center"}}>
              <Avatar name={p.name} size={64} bg="#EBF4FF" color="#2563EB"/>
              <h2 style={{fontSize:17,fontWeight:700,color:"#1A2332",marginTop:12,marginBottom:4}}>{p.name}</h2>
              <div style={{fontSize:13,color:"#5A6A7E",marginBottom:8}}>{p.condition}</div>
              <Badge status={p.status}/>
              <div style={{marginTop:16,padding:"12px 0",borderTop:"1px solid #E8ECF2"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,textAlign:"left"}}>
                  {[{l:"Mosha",v:p.age+" vj"},{l:"Datëlindja",v:p.dob},{l:"Telefon",v:p.phone},{l:"Adresa",v:p.address},{l:"Fizioterapis",v:p.therapist},{l:"Bilanci",v:`€${p.balance}`}].map(x=>(
                    <div key={x.l}><div style={{fontSize:10,color:"#9DABBE",fontWeight:600,textTransform:"uppercase"}}>{x.l}</div><div style={{fontSize:12,fontWeight:500,color:"#1A2332",marginTop:2}}>{x.v}</div></div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:16}}>
              <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:12}}>Progresi i Trajtimit</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:12,color:"#5A6A7E"}}>Seancat</span>
                <span style={{fontSize:12,fontWeight:600,color:"#1A2332"}}>{p.sessions}/{p.total}</span>
              </div>
              <div style={{background:"#F1F3F7",borderRadius:20,height:8,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:20,background:"linear-gradient(90deg,#4A90D9,#2563EB)",width:`${pct}%`}}/>
              </div>
              <div style={{fontSize:11,color:"#5A6A7E",marginTop:6}}>{pct}% e planit të trajtimit</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid #E8ECF2",fontSize:13,fontWeight:600,color:"#1A2332"}}>SOAP Shënime Klinike</div>
              {[{date:"01 Apr",therapist:"Dr. Morina",s:"Dhimbje e poshtme e shpinës, intensitet 6/10",o:"ROM kufizuar, tensioni muskulor i lartë",a:"Lumbalgjia akute",p:"Termokompresa + masazh 3x/javë"},
                {date:"25 Mar",therapist:"Dr. Morina",s:"Dhimbje 4/10, përmirësim i lehtë",o:"ROM i përmirësuar 20%, tensioni zvogëluar",a:"Lumbalgjia subakute",p:"Vazhdo planin aktual, shto ushtrime"}].map((n,i)=>(
                <div key={i} style={{padding:"14px 18px",borderBottom:"1px solid #F5F7FA"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{fontSize:12,fontWeight:600,color:"#1A2332"}}>{n.date}</span>
                    <span style={{fontSize:11,color:"#9DABBE"}}>{n.therapist}</span>
                  </div>
                  {[["S â€” Subjektive",n.s],["O â€” Objektive",n.o],["A â€” Vlerësimi",n.a],["P â€” Plani",n.p]].map(([l,v])=>(
                    <div key={l} style={{marginBottom:5}}>
                      <span style={{fontSize:10,fontWeight:700,color:"#2563EB",marginRight:6}}>{l}</span>
                      <span style={{fontSize:12,color:"#5A6A7E"}}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Pacientët</h1>
          <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>{filtered.length} pacientë</p>
        </div>
        <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          <Icon name="plus" size={15} color="#fff"/> Pacient i Ri
        </button>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:"#fff",border:"1px solid #E8ECF2",borderRadius:10,padding:"9px 14px"}}>
          <Icon name="search" size={15} color="#9DABBE"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Kërko pacient..." style={{border:"none",outline:"none",fontSize:13,color:"#1A2332",fontFamily:"'DM Sans',sans-serif",flex:1,background:"none"}}/>
          {search&&<div onClick={()=>setSearch("")} style={{cursor:"pointer",opacity:.5}}><Icon name="x" size={13} color="#5A6A7E"/></div>}
        </div>
        {["all","active","new","inactive"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{padding:"9px 16px",border:"1px solid",borderColor:filter===f?"#2563EB":"#E8ECF2",borderRadius:10,background:filter===f?"#EBF4FF":"#fff",color:filter===f?"#2563EB":"#5A6A7E",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            {f==="all"?"Të gjithë":f==="active"?"Aktivë":f==="new"?"Të Rinj":"Joaktivë"}
          </button>
        ))}
      </div>
      <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr 80px",padding:"10px 18px",borderBottom:"1px solid #E8ECF2",fontSize:11,fontWeight:700,color:"#9DABBE",textTransform:"uppercase",letterSpacing:".06em"}}>
          <span>Pacienti</span><span>Diagnoza</span><span>Seancat</span><span>Termin</span><span>Statusi</span><span></span>
        </div>
        {filtered.length===0&&(
          <div style={{padding:40,textAlign:"center",color:"#9DABBE"}}>
            <div style={{fontSize:32,marginBottom:8}}>ðŸ”</div>
            <div style={{fontSize:14,fontWeight:600,color:"#5A6A7E"}}>Nuk u gjet asnjë pacient</div>
            <div style={{fontSize:12,marginTop:4}}>Provo kërkim tjetër</div>
          </div>
        )}
        {filtered.map(p=>{
          const pct=Math.round(p.sessions/p.total*100);
          return (
            <div key={p.id} onClick={()=>setSelected(p)}
              style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr 80px",padding:"14px 18px",borderBottom:"1px solid #F5F7FA",alignItems:"center",cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.background="#FAFBFD"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <Avatar name={p.name} size={34} bg="#EBF4FF" color="#2563EB"/>
                <div><div style={{fontSize:13,fontWeight:500,color:"#1A2332"}}>{p.name}</div><div style={{fontSize:11,color:"#9DABBE"}}>{p.age} vjeç</div></div>
              </div>
              <div style={{fontSize:12,color:"#5A6A7E"}}>{p.condition}</div>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:"#1A2332"}}>{p.sessions}/{p.total}</div>
                <div style={{background:"#F1F3F7",borderRadius:20,height:3,width:60,marginTop:4,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:20,background:"#2563EB",width:`${pct}%`}}/>
                </div>
              </div>
              <div style={{fontSize:12,color:"#1A2332",fontWeight:500}}>{p.next}</div>
              <Badge status={p.status}/>
              <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
                <div style={{width:28,height:28,border:"1px solid #E8ECF2",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={e=>{e.stopPropagation();setSelected(p);}}>
                  <Icon name="eye" size={13} color="#5A6A7E"/>
                </div>
                <div style={{width:28,height:28,border:"1px solid #E8ECF2",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={e=>e.stopPropagation()}>
                  <Icon name="edit" size={13} color="#5A6A7E"/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// â”€â”€â”€ APPOINTMENTS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const AppointmentsPage = () => {
  const [activeDay,setActiveDay]=useState(1);
  const days=Array.from({length:30},(_,i)=>i+1);
  const dayNames=["Di","Hë","Ma","Më","En","Pr","Sh"];
  const getDayName=d=>dayNames[(d+1)%7];
  const dayAppts=APPOINTMENTS.filter(a=>parseInt(a.date.split("-")[2])===activeDay);
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Terminet</h1>
          <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>Prill 2026</p>
        </div>
        <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          <Icon name="plus" size={15} color="#fff"/> Termin i Ri
        </button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {days.map(d=>{
          const hasAppt=APPOINTMENTS.some(a=>parseInt(a.date.split("-")[2])===d);
          return (
            <div key={d} onClick={()=>setActiveDay(d)} style={{flexShrink:0,width:52,padding:"10px 4px",borderRadius:12,border:"1px solid",textAlign:"center",cursor:"pointer",borderColor:activeDay===d?"#2563EB":"#E8ECF2",background:activeDay===d?"linear-gradient(135deg,#4A90D9,#2563EB)":"#fff"}}>
              <div style={{fontSize:10,fontWeight:600,color:activeDay===d?"rgba(255,255,255,.8)":"#9DABBE",marginBottom:4}}>{getDayName(d)}</div>
              <div style={{fontSize:15,fontWeight:700,color:activeDay===d?"#fff":"#1A2332"}}>{d}</div>
              {hasAppt&&<div style={{width:5,height:5,borderRadius:"50%",background:activeDay===d?"rgba(255,255,255,.6)":"#2563EB",margin:"4px auto 0"}}/>}
            </div>
          );
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:16}}>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
          <div style={{padding:"14px 18px",borderBottom:"1px solid #E8ECF2"}}>
            <span style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>{dayAppts.length} terme â€” {activeDay} Prill</span>
          </div>
          {dayAppts.length===0?(
            <div style={{padding:40,textAlign:"center",color:"#9DABBE",fontSize:14}}>Nuk ka termine për këtë ditë</div>
          ):dayAppts.map(a=>(
            <div key={a.id} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderBottom:"1px solid #F5F7FA",cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.background="#FAFBFD"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{textAlign:"center",minWidth:52,background:"#F8FAFF",borderRadius:10,padding:"8px 6px"}}>
                <div style={{fontSize:16,fontWeight:700,color:"#1A2332"}}>{a.time}</div>
                <div style={{fontSize:10,color:"#9DABBE",marginTop:2}}>{a.duration}min</div>
              </div>
              <Avatar name={a.patient} size={38} bg="#EBF4FF" color="#2563EB"/>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:500,color:"#1A2332"}}>{a.patient}</div>
                <div style={{fontSize:12,color:"#5A6A7E",marginTop:2}}>{a.type}</div>
                <div style={{fontSize:11,color:"#9DABBE",marginTop:1}}>{a.therapist}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                <Badge status={a.status}/>
                <div style={{display:"flex",gap:6}}>
                  <div style={{padding:"4px 10px",border:"1px solid #E8ECF2",borderRadius:6,fontSize:11,cursor:"pointer",color:"#5A6A7E"}}>Edit</div>
                  <div style={{padding:"4px 10px",border:"1px solid #FECACA",borderRadius:6,fontSize:11,cursor:"pointer",color:"#991B1B",background:"#FEF2F2"}}>Anulo</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:16}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <button style={{width:24,height:24,border:"1px solid #E8ECF2",borderRadius:6,background:"none",cursor:"pointer",fontSize:12}}>â€¹</button>
                <span style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>Prill 2026</span>
                <button style={{width:24,height:24,border:"1px solid #E8ECF2",borderRadius:6,background:"none",cursor:"pointer",fontSize:12}}>â€º</button>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
              {["Hë","Ma","Më","En","Pr","Sh","Di"].map(d=>(
                <div key={d} style={{textAlign:"center",fontSize:10,fontWeight:600,color:"#9DABBE",padding:"4px 0"}}>{d}</div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
              {[30,31,...Array.from({length:30},(_,i)=>i+1),1,2,3].map((d,i)=>{
                const isCurrent=i>=2&&i<=31;
                const isActive=isCurrent&&d===activeDay;
                const hasAppt=isCurrent&&APPOINTMENTS.some(a=>parseInt(a.date.split("-")[2])===d);
                return (
                  <div key={i} onClick={()=>isCurrent&&setActiveDay(d)}
                    style={{height:30,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,fontSize:12,cursor:isCurrent?"pointer":"default",position:"relative",color:isActive?"#fff":!isCurrent?"#D1D5DB":"#1A2332",background:isActive?"#2563EB":"transparent",fontWeight:isActive?700:400}}>
                    {d}
                    {hasAppt&&!isActive&&<div style={{position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",width:4,height:4,background:"#2563EB",borderRadius:"50%"}}/>}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:16}}>
            <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:12}}>Statistika Javore</div>
            {[{l:"Termine",v:47,max:60},{l:"Konfirmuara",v:44,max:47},{l:"Anulluara",v:3,max:10}].map(s=>(
              <div key={s.l} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,color:"#5A6A7E"}}>{s.l}</span>
                  <span style={{fontSize:12,fontWeight:600,color:"#1A2332"}}>{s.v}</span>
                </div>
                <div style={{background:"#F1F3F7",borderRadius:20,height:5,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:20,background:"#2563EB",width:`${Math.round(s.v/s.max*100)}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// â”€â”€â”€ PAYMENTS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PaymentsPage = () => {
  const [tab,setTab]=useState("all");
  const filtered=tab==="all"?INVOICES:INVOICES.filter(i=>i.status===tab);
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Pagesat & Financat</h1>
          <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>Prill 2026</p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 16px",border:"1px solid #E8ECF2",borderRadius:10,background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>
            <Icon name="download" size={14} color="#5A6A7E"/> Eksporto
          </button>
          <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            <Icon name="plus" size={15} color="#fff"/> Faturë e Re
          </button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <StatCard icon="payments" label="Total Mujoror" value="€3,240" change="+8.3% vs muajit parë" changeUp accent="blue"/>
        <StatCard icon="check" label="Paguar" value="€2,860" change="38 fatura" changeUp accent="green"/>
        <StatCard icon="clock" label="Në Pritje" value="€380" change="3 fatura" changeUp={false} accent="amber"/>
        <StatCard icon="x" label="Vonuara" value="€90" change="1 faturë" changeUp={false} accent="red"/>
      </div>
      <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",gap:4,padding:"12px 16px",borderBottom:"1px solid #E8ECF2",background:"#FAFBFD"}}>
          {[{k:"all",l:"Të gjitha"},{k:"paid",l:"Paguar"},{k:"pending",l:"Në pritje"},{k:"overdue",l:"Vonuara"}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"6px 14px",borderRadius:8,border:"none",background:tab===t.k?"#2563EB":"transparent",color:tab===t.k?"#fff":"#5A6A7E",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{t.l}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr 1fr 1fr 0.8fr 80px",padding:"10px 18px",borderBottom:"1px solid #E8ECF2",fontSize:11,fontWeight:700,color:"#9DABBE",textTransform:"uppercase",letterSpacing:".06em"}}>
          <span>Nr. Faturës</span><span>Pacienti</span><span>Shërbimi</span><span>Data</span><span>Shuma</span><span>Statusi</span>
        </div>
        {filtered.map(inv=>(
          <div key={inv.id}
            style={{display:"grid",gridTemplateColumns:"1fr 1.2fr 1fr 1fr 0.8fr 80px",padding:"14px 18px",borderBottom:"1px solid #F5F7FA",alignItems:"center"}}
            onMouseEnter={e=>e.currentTarget.style.background="#FAFBFD"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <span style={{fontSize:13,fontWeight:600,color:"#2563EB"}}>{inv.id}</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Avatar name={inv.patient} size={28} bg="#EBF4FF" color="#2563EB"/>
              <span style={{fontSize:13,color:"#1A2332"}}>{inv.patient}</span>
            </div>
            <span style={{fontSize:12,color:"#5A6A7E"}}>{inv.type}</span>
            <span style={{fontSize:12,color:"#5A6A7E"}}>{inv.date}</span>
            <span style={{fontSize:14,fontWeight:700,color:"#1A2332"}}>€{inv.amount}</span>
            <Badge status={inv.status}/>
          </div>
        ))}
      </div>
    </div>
  );
};

// â”€â”€â”€ SHARED CLINICS STATE (lifted up via props) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const INITIAL_CLINICS_2 = [
  {id:1,name:"Ordinanca Krasniqi",city:"Prishtinë",users:4,patients:67,status:"active",revenue:4200,since:"Jan 2024",logo:null,phone:"044 100 200",email:"info@krasniqi.com",address:"Rr. Agim Ramadani 12, Prishtinë"},
  {id:2,name:"Fizio Center Peja",city:"Pejë",users:3,patients:45,status:"active",revenue:3100,since:"Mar 2024",logo:null,phone:"039 200 300",email:"peja@fiziocenter.com",address:"Rr. Mbretëresha Teutë 5, Pejë"},
  {id:3,name:"RehabPro Gjilan",city:"Gjilan",users:5,patients:89,status:"active",revenue:5800,since:"Nov 2023",logo:null,phone:"0280 300 400",email:"gjilan@rehabpro.com",address:"Rr. Dëshmorët e Kombit 8, Gjilan"},
  {id:4,name:"Vita Fizio",city:"Mitrovicë",users:2,patients:23,status:"inactive",revenue:1200,since:"Jun 2024",logo:null,phone:"028 400 500",email:"vita@fizio.com",address:"Rr. Skënderbeu 22, Mitrovicë"},
  {id:5,name:"Sport Rehab",city:"Prizren",users:3,patients:41,status:"active",revenue:2900,since:"Feb 2024",logo:null,phone:"029 500 600",email:"sport@rehab.com",address:"Rr. Remzi Ademaj 3, Prizren"},
];

// â”€â”€â”€ CLINICS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ClinicsPage = ({ clinics, setClinics }) => {
  const [view,setView]=useState("list"); // list | add | detail | addAdmin | addTreatType | addTherapy
  const [selected,setSelected]=useState(null);
  const [logoPreview,setLogoPreview]=useState(null);
  const [form,setForm]=useState({name:"",city:"",phone:"",email:"",address:""});
  const [adminForm,setAdminForm]=useState({name:"",username:"",pin:""});
  const [newType,setNewType]=useState("");
  const [therapyForm,setTherapyForm]=useState({patient:"",type:"",date:"",duration:45,notes:"",therapist:""});
  const [selectedPatientForTherapy,setSelectedPatientForTherapy]=useState(null);
  const [toast,setToast]=useState("");
  const fileRef=useRef();
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(""),2500);};

  const handleFile=e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setLogoPreview(ev.target.result);r.readAsDataURL(f);}};

  const handleSubmit=()=>{
    if(!form.name.trim()||!form.city.trim()){showToast("âš  Plotëso fushat e detyrueshme!");return;}
    const nc={id:Date.now(),name:form.name,city:form.city,phone:form.phone,email:form.email,address:form.address,
      users:1,patients:0,status:"active",revenue:0,since:"Apr 2026",logo:logoPreview,admins:[],
      treatmentTypes:["Fizioterapi","Rehabilitim","Masazh terapeutik"]};
    setClinics(prev=>[...prev,nc]);
    setView("list");setLogoPreview(null);setForm({name:"",city:"",phone:"",email:"",address:""});
    showToast("âœ“ Ordinanca u regjistrua!");
  };

  const toggleStatus=id=>setClinics(prev=>prev.map(c=>c.id===id?{...c,status:c.status==="active"?"inactive":"active"}:c));

  const addAdmin=()=>{
    if(!adminForm.name||!adminForm.pin){showToast("âš  Emri dhe PIN janë të detyrueshëm!");return;}
    const newAdmin={id:Date.now(),name:adminForm.name,username:adminForm.username||adminForm.name.toLowerCase().replace(/\s/g,""),pin:adminForm.pin,role:"admin"};
    setClinics(prev=>prev.map(c=>c.id===selected.id?{...c,admins:[...(c.admins||[]),newAdmin],users:(c.users||0)+1}:c));
    setSelected(prev=>({...prev,admins:[...(prev.admins||[]),newAdmin]}));
    setAdminForm({name:"",username:"",pin:""});setView("detail");
    showToast("âœ“ Administratori u shtua me PIN: "+adminForm.pin);
  };

  const removeAdmin=(clinicId,adminId)=>{
    setClinics(prev=>prev.map(c=>c.id===clinicId?{...c,admins:(c.admins||[]).filter(a=>a.id!==adminId),users:Math.max(0,(c.users||1)-1)}:c));
    setSelected(prev=>({...prev,admins:(prev.admins||[]).filter(a=>a.id!==adminId)}));
    showToast("âœ“ Administratori u largua");
  };

  const addTreatmentType=()=>{
    if(!newType.trim()){return;}
    setClinics(prev=>prev.map(c=>c.id===selected.id?{...c,treatmentTypes:[...(c.treatmentTypes||[]),newType.trim()]}:c));
    setSelected(prev=>({...prev,treatmentTypes:[...(prev.treatmentTypes||[]),newType.trim()]}));
    setNewType("");setView("detail");
    showToast("âœ“ Lloji i trajtimit u shtua!");
  };

  const removeTreatType=(clinicId,type)=>{
    setClinics(prev=>prev.map(c=>c.id===clinicId?{...c,treatmentTypes:(c.treatmentTypes||[]).filter(t=>t!==type)}:c));
    setSelected(prev=>({...prev,treatmentTypes:(prev.treatmentTypes||[]).filter(t=>t!==type)}));
    showToast("âœ“ Lloji u largua");
  };

  const printTherapyA4=(therapy,clinic)=>{
    const w=window.open("","_blank","width=870,height=1100");
    const logoHtml=clinic.logo
      ? `<img src="${clinic.logo}" style="width:52px;height:52px;object-fit:contain;border-radius:10px;border:1px solid #E8ECF2;padding:3px;background:#F8FAFF;"/>`
      : `<div style="width:52px;height:52px;background:linear-gradient(135deg,#4A90D9,#1D4ED8);border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:700;font-family:'DM Sans',sans-serif;">${clinic.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}</div>`;
    w.document.write(`<!DOCTYPE html><html lang="sq"><head><meta charset="UTF-8"/>
<title>Terapi â€” ${therapy.patient} â€” ${clinic.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'DM Sans',sans-serif;background:#fff;color:#1A2332;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4 portrait;margin:16mm 14mm}
  @media print{.no-print{display:none!important}}
  .header{display:flex;align-items:center;justify-content:space-between;padding-bottom:16px;border-bottom:3px solid #2563EB;margin-bottom:22px}
  .clinic-info .name{font-size:20px;font-weight:700;color:#1A2332}
  .clinic-info .sub{font-size:11px;color:#5A6A7E;margin-top:2px}
  .header-right{text-align:right}
  .badge{background:#EBF4FF;color:#2563EB;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;display:inline-block;letter-spacing:.05em;margin-bottom:5px}
  .header-right p{font-size:10px;color:#9DABBE;margin-top:2px}
  .title-block{background:linear-gradient(135deg,#1D4ED8,#3B82F6);border-radius:12px;padding:18px 22px;color:#fff;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center}
  .title-block h2{font-size:17px;font-weight:700;margin-bottom:3px}
  .title-block p{font-size:11px;opacity:.85}
  .period{background:rgba(255,255,255,.2);border-radius:8px;padding:6px 14px;font-size:12px;font-weight:600}
  .info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px}
  .info-box{background:#F8FAFF;border:1px solid #DBEAFE;border-radius:10px;padding:14px 16px}
  .info-box .lbl{font-size:10px;font-weight:700;color:#9DABBE;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px}
  .info-box .val{font-size:14px;font-weight:600;color:#1A2332}
  .section-title{font-size:12px;font-weight:700;color:#1A2332;margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid #E8ECF2;display:flex;align-items:center;gap:8px}
  .section-title::before{content:"";display:inline-block;width:3px;height:14px;background:#2563EB;border-radius:2px}
  .notes-box{background:#F8FAFF;border:1px solid #E8ECF2;border-radius:10px;padding:16px;margin-bottom:20px;font-size:13px;color:#5A6A7E;line-height:1.7;min-height:80px}
  .sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px}
  .sig-box{border-top:1.5px solid #1A2332;padding-top:8px;font-size:11px;color:#5A6A7E}
  .footer{border-top:1px solid #E8ECF2;padding-top:12px;margin-top:24px;display:flex;justify-content:space-between;font-size:10px;color:#9DABBE}
  .no-print{padding:14px 0;display:flex;gap:10px}
  .btn-p{padding:9px 20px;background:#2563EB;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif}
  .btn-c{padding:9px 16px;border:1px solid #E8ECF2;background:#fff;border-radius:8px;font-size:13px;cursor:pointer;color:#5A6A7E;font-family:'DM Sans',sans-serif}
</style></head><body>
<div style="max-width:210mm;margin:0 auto">
  <div class="no-print">
    <button class="btn-p" onclick="window.print()">ðŸ–¨ï¸ Printo A4</button>
    <button class="btn-c" onclick="window.close()">âœ• Mbyll</button>
  </div>
  <div class="header">
    <div style="display:flex;align-items:center;gap:14px">
      ${logoHtml}
      <div class="clinic-info">
        <div class="name">${clinic.name}</div>
        <div class="sub">${clinic.city} Â· ${clinic.phone||""}</div>
        <div class="sub">${clinic.address||""}</div>
      </div>
    </div>
    <div class="header-right">
      <div class="badge">TERAPI ZYRTARE</div>
      <p>Gjeneruar: ${new Date().toLocaleDateString("sq")}</p>
      <p>Ref: TH-${Date.now().toString().slice(-6)}</p>
    </div>
  </div>
  <div class="title-block">
    <div>
      <h2>Raporti i Terapisë</h2>
      <p>${clinic.name} â€” ${clinic.city}</p>
    </div>
    <div class="period">${therapy.date||"Prill 2026"}</div>
  </div>
  <div class="info-grid">
    <div class="info-box"><div class="lbl">Pacienti</div><div class="val">${therapy.patient}</div></div>
    <div class="info-box"><div class="lbl">Lloji i Terapisë</div><div class="val">${therapy.type}</div></div>
    <div class="info-box"><div class="lbl">Fizioterapis</div><div class="val">${therapy.therapist||"â€”"}</div></div>
    <div class="info-box"><div class="lbl">Data</div><div class="val">${therapy.date||"â€”"}</div></div>
    <div class="info-box"><div class="lbl">Kohëzgjatja</div><div class="val">${therapy.duration||45} min</div></div>
    <div class="info-box"><div class="lbl">Statusi</div><div class="val" style="color:#15803D">âœ“ Kryer</div></div>
  </div>
  <div class="section-title">Shënime Klinike & Vërejtje</div>
  <div class="notes-box">${therapy.notes||"Nuk ka shënime shtesë."}</div>
  <div class="section-title">Progresi & Rekomandimet</div>
  <div class="notes-box" style="min-height:100px">Shkruaj progresin dhe rekomandimet për seancën tjetër...</div>
  <div class="sig-grid">
    <div class="sig-box">Nënshkrimi i Fizioterapistit: ${therapy.therapist||""}</div>
    <div class="sig-box">Nënshkrimi i Pacientit: ${therapy.patient}</div>
  </div>
  <div class="footer">
    <span>${clinic.name} Â· ${clinic.city} Â· Fizioapp</span>
    <span>Â© Fizioapp 2026 â€” Konfidencial</span>
  </div>
</div>
</body></html>`);
    w.document.close();
  };

  const inputStyle={width:"100%",padding:"10px 13px",border:"1.5px solid #E8ECF2",borderRadius:9,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box",background:"#fff"};

  // â”€â”€ ADD THERAPY FOR PATIENT â”€â”€
  if(view==="addTherapy"&&selected) return (
    <div>
      {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button onClick={()=>setView("detail")} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>â† Kthehu</button>
        <h1 style={{fontSize:20,fontWeight:700,color:"#1A2332",margin:0}}>Shto Terapi â€” {selected.name}</h1>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:20}}>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:28}}>
          <h3 style={{fontSize:14,fontWeight:600,color:"#1A2332",marginBottom:20,marginTop:0}}>Detajet e Terapisë</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Pacienti *</label>
              <input value={therapyForm.patient} onChange={e=>setTherapyForm(p=>({...p,patient:e.target.value}))} placeholder="Emri i pacientit" style={inputStyle}
                onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Fizioterapis</label>
              <input value={therapyForm.therapist} onChange={e=>setTherapyForm(p=>({...p,therapist:e.target.value}))} placeholder="Dr. Emri Mbiemri" style={inputStyle}
                onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Lloji i Terapisë *</label>
              <select value={therapyForm.type} onChange={e=>setTherapyForm(p=>({...p,type:e.target.value}))} style={{...inputStyle,cursor:"pointer"}}>
                <option value="">-- Zgjidh llojin --</option>
                {(selected.treatmentTypes||[]).map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Data</label>
              <input type="date" value={therapyForm.date} onChange={e=>setTherapyForm(p=>({...p,date:e.target.value}))} style={inputStyle}
                onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Kohëzgjatja (min)</label>
              <input type="number" value={therapyForm.duration} onChange={e=>setTherapyForm(p=>({...p,duration:parseInt(e.target.value)||45}))} style={inputStyle}
                onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
            </div>
          </div>
          <div style={{marginTop:16}}>
            <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Shënime Klinike</label>
            <textarea value={therapyForm.notes} onChange={e=>setTherapyForm(p=>({...p,notes:e.target.value}))} placeholder="Diagnoza, progresi, vërejtje klinike..."
              style={{...inputStyle,height:100,resize:"vertical"}} onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
          </div>
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button onClick={()=>{
              if(!therapyForm.patient||!therapyForm.type){showToast("âš  Pacienti dhe lloji janë të detyrueshëm!");return;}
              showToast("âœ“ Terapia u regjistrua!");
              printTherapyA4(therapyForm,selected);
            }} style={{padding:"11px 22px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              Regjistro & Printo A4
            </button>
            <button onClick={()=>{
              if(!therapyForm.patient||!therapyForm.type){showToast("âš  Pacienti dhe lloji janë të detyrueshëm!");return;}
              showToast("âœ“ Terapia u regjistrua!");setView("detail");
            }} style={{padding:"11px 18px",border:"1px solid #E8ECF2",borderRadius:9,background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>
              Regjistro pa Print
            </button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:18}}>
            <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:12}}>Llojet disponueshme</div>
            {(selected.treatmentTypes||[]).map(t=>(
              <div key={t} onClick={()=>setTherapyForm(p=>({...p,type:t}))}
                style={{padding:"9px 12px",borderRadius:8,marginBottom:4,cursor:"pointer",fontSize:13,
                  background:therapyForm.type===t?"#EBF4FF":"#F8FAFF",
                  color:therapyForm.type===t?"#2563EB":"#1A2332",
                  border:"1px solid",borderColor:therapyForm.type===t?"#2563EB":"transparent",
                  fontWeight:therapyForm.type===t?600:400}}>
                {t}
              </div>
            ))}
            {(selected.treatmentTypes||[]).length===0&&<div style={{fontSize:12,color:"#9DABBE"}}>Nuk ka lloje të regjistruara.</div>}
          </div>
          <div style={{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:12,padding:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#92400E",marginBottom:4}}>ðŸ’¡ PDF automatik</div>
            <div style={{fontSize:11,color:"#78350F"}}>Klikimi i "Regjistro & Printo A4" do hapë automatikisht dokumentin profesional A4 gati për printim ose ruajtje si PDF.</div>
          </div>
        </div>
      </div>
    </div>
  );

  // â”€â”€ ADD TREATMENT TYPE â”€â”€
  if(view==="addTreatType"&&selected) return (
    <div>
      {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button onClick={()=>setView("detail")} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>â† Kthehu</button>
        <h1 style={{fontSize:20,fontWeight:700,color:"#1A2332",margin:0}}>Lloje Trajtimesh â€” {selected.name}</h1>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20}}>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:24}}>
          <div style={{fontSize:14,fontWeight:600,color:"#1A2332",marginBottom:4}}>Llojet aktuale</div>
          <div style={{fontSize:12,color:"#9DABBE",marginBottom:16}}>{(selected.treatmentTypes||[]).length} lloje të regjistruara</div>
          {(selected.treatmentTypes||[]).map(t=>(
            <div key={t} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#F8FAFF",border:"1px solid #E8ECF2",borderRadius:9,marginBottom:8}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#2563EB",flexShrink:0}}/>
              <span style={{flex:1,fontSize:13,color:"#1A2332",fontWeight:500}}>{t}</span>
              <button onClick={()=>removeTreatType(selected.id,t)} style={{padding:"4px 10px",border:"1px solid #FECACA",borderRadius:6,background:"#FEF2F2",fontSize:11,color:"#991B1B",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Largo
              </button>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:24}}>
          <div style={{fontSize:14,fontWeight:600,color:"#1A2332",marginBottom:16}}>Shto Lloj të Ri</div>
          <input value={newType} onChange={e=>setNewType(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTreatmentType()} placeholder="p.sh. Akupunkturë" style={inputStyle}
            onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
          <div style={{marginTop:14,fontSize:11,color:"#9DABBE",marginBottom:10}}>Ose zgjidh nga lista standarde:</div>
          {["Fizioterapi","Rehabilitim","Masazh terapeutik","Elektroterapi","Ultrasonik","Termokompresa","Akupunkturë","Kineziterapi","Hidroterapi","Lazer terapi","Osteopatia","Manual terapi"].filter(t=>!(selected.treatmentTypes||[]).includes(t)).map(t=>(
            <div key={t} onClick={()=>setNewType(t)} style={{padding:"7px 12px",borderRadius:7,marginBottom:4,cursor:"pointer",fontSize:12,color:"#5A6A7E",background:"#F5F7FF",transition:"all .1s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#EBF4FF";e.currentTarget.style.color="#2563EB";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#F5F7FF";e.currentTarget.style.color="#5A6A7E";}}>
              + {t}
            </div>
          ))}
          <button onClick={addTreatmentType} style={{width:"100%",marginTop:16,padding:"11px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            Shto Llojin
          </button>
        </div>
      </div>
    </div>
  );

  // â”€â”€ ADD ADMIN â”€â”€
  if(view==="addAdmin"&&selected) return (
    <div>
      {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button onClick={()=>setView("detail")} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>â† Kthehu</button>
        <h1 style={{fontSize:20,fontWeight:700,color:"#1A2332",margin:0}}>Shto Administrator â€” {selected.name}</h1>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:20}}>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:28}}>
          <div style={{fontSize:14,fontWeight:600,color:"#1A2332",marginBottom:20}}>Detajet e Administratorit</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            {[{l:"Emri i plotë *",k:"name",ph:"Emri Mbiemri"},
              {l:"Username",k:"username",ph:"emri.mbiemri"},
            ].map(f=>(
              <div key={f.k}>
                <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>{f.l}</label>
                <input value={adminForm[f.k]} onChange={e=>setAdminForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
              </div>
            ))}
          </div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>PIN i Kyçjes së Shpejtë *</label>
            <div style={{position:"relative",display:"flex",alignItems:"center"}}>
              <input value={adminForm.pin} onChange={e=>setAdminForm(p=>({...p,pin:e.target.value.replace(/\D/g,"").slice(0,6)}))} placeholder="p.sh. 1234" maxLength={6}
                style={{...inputStyle,letterSpacing:adminForm.pin?"8px":"0px",fontWeight:700,fontSize:18}}
                onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
            </div>
            <div style={{fontSize:11,color:"#9DABBE",marginTop:6}}>Ky PIN do përdoret për kyçje të shpejtë në ekranin numpad. 1â€“6 shifra.</div>
          </div>
          <div style={{padding:"12px 14px",background:"#EBF4FF",border:"1px solid #BFDBFE",borderRadius:10,marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"#2563EB",marginBottom:3}}>ðŸ“± Si funksionon kyçja me PIN</div>
            <div style={{fontSize:11,color:"#1D4ED8"}}>Kur aplikacioni hapet, shfaqet numpad. Administratori shtyp PIN-in e vet dhe kyçet direkt në ordinancën e tij pa nevojë për username/fjalëkalim.</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setView("detail")} style={{padding:"11px 20px",border:"1px solid #E8ECF2",borderRadius:9,background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>Anulo</button>
            <button onClick={addAdmin} style={{padding:"11px 26px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Shto Administratorin</button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:18}}>
            <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:12}}>Administratorët aktualë</div>
            {(selected.admins||[]).length===0
              ?<div style={{fontSize:12,color:"#9DABBE",textAlign:"center",padding:20}}>Nuk ka admin të regjistruar</div>
              :(selected.admins||[]).map(a=>(
                <div key={a.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"#F8FAFF",borderRadius:9,border:"1px solid #E8ECF2",marginBottom:8}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#4A90D9,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0}}>
                    {a.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600,color:"#1A2332"}}>{a.name}</div>
                    <div style={{fontSize:10,color:"#9DABBE"}}>PIN: {a.pin} Â· {a.username}</div>
                  </div>
                </div>
              ))}
          </div>
          <div style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:12,padding:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#15803D",marginBottom:4}}>âœ“ Siguri e PIN-it</div>
            <div style={{fontSize:11,color:"#166534"}}>Ã‡do admin ka PIN unik. Sistemi kontrollon automatikisht konfliktet e PIN-it midis ordinancave.</div>
          </div>
        </div>
      </div>
    </div>
  );

  // â”€â”€ CLINIC DETAIL â”€â”€
  if(view==="detail"&&selected) return (
    <div>
      {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button onClick={()=>setView("list")} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>â† Kthehu</button>
        <h1 style={{fontSize:20,fontWeight:700,color:"#1A2332",margin:0,flex:1}}>{selected.name}</h1>
        <button onClick={()=>setView("addTherapy")} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",background:"#F0FDF4",color:"#15803D",border:"1px solid #BBF7D0",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          + Shto Terapi
        </button>
        <button onClick={()=>setView("addTreatType")} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",background:"#EBF4FF",color:"#2563EB",border:"1px solid #BFDBFE",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          + Lloj Trajtimi
        </button>
        <button onClick={()=>setView("addAdmin")} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          + Admin & PIN
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20,textAlign:"center"}}>
            {selected.logo
              ?<div style={{width:80,height:80,borderRadius:16,border:"1px solid #E8ECF2",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"#F8FAFF",margin:"0 auto 12px"}}>
                <img src={selected.logo} alt="" style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}/>
              </div>
              :<div style={{width:80,height:80,borderRadius:16,background:"linear-gradient(135deg,#4A90D9,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:700,color:"#fff",margin:"0 auto 12px"}}>
                {selected.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
              </div>}
            <div style={{fontSize:17,fontWeight:700,color:"#1A2332",marginBottom:4}}>{selected.name}</div>
            <div style={{fontSize:12,color:"#5A6A7E",marginBottom:10}}>{selected.city}</div>
            <span style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:selected.status==="active"?"#F0FDF4":"#F5F5F5",color:selected.status==="active"?"#15803D":"#9DABBE"}}>
              {selected.status==="active"?"Aktive":"Joaktive"}
            </span>
            <div style={{marginTop:16,borderTop:"1px solid #E8ECF2",paddingTop:14,textAlign:"left"}}>
              {[{l:"Telefon",v:selected.phone||"â€”"},{l:"Email",v:selected.email||"â€”"},{l:"Adresa",v:selected.address||"â€”"},{l:"Aktive nga",v:selected.since}].map(x=>(
                <div key={x.l} style={{marginBottom:8}}>
                  <div style={{fontSize:10,color:"#9DABBE",fontWeight:600,textTransform:"uppercase"}}>{x.l}</div>
                  <div style={{fontSize:12,fontWeight:500,color:"#1A2332",marginTop:1,wordBreak:"break-all"}}>{x.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>Llojet e Trajtimeve</div>
              <button onClick={()=>setView("addTreatType")} style={{fontSize:11,color:"#2563EB",border:"none",background:"none",cursor:"pointer",fontWeight:600}}>+ Shto</button>
            </div>
            {(selected.treatmentTypes||[]).map(t=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:"#F8FAFF",borderRadius:7,marginBottom:6}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#2563EB",flexShrink:0}}/>
                <span style={{flex:1,fontSize:12,color:"#1A2332"}}>{t}</span>
                <button onClick={()=>removeTreatType(selected.id,t)} style={{border:"none",background:"none",cursor:"pointer",color:"#9DABBE",fontSize:14,lineHeight:1}}>Ã—</button>
              </div>
            ))}
            {(selected.treatmentTypes||[]).length===0&&<div style={{fontSize:12,color:"#9DABBE"}}>Nuk ka lloje trajtimi.</div>}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #E8ECF2"}}>
              <span style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>Administratorët & PIN ({(selected.admins||[]).length})</span>
              <button onClick={()=>setView("addAdmin")} style={{fontSize:12,color:"#2563EB",border:"none",background:"none",cursor:"pointer",fontWeight:600}}>+ Shto Admin</button>
            </div>
            {(selected.admins||[]).length===0
              ?<div style={{padding:30,textAlign:"center",color:"#9DABBE",fontSize:13}}>Nuk ka administratorë. Shto admin me PIN për kyçje të shpejtë.</div>
              :(selected.admins||[]).map(a=>(
                <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderBottom:"1px solid #F5F7FA"}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#4A90D9,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",flexShrink:0}}>
                    {a.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>{a.name}</div>
                    <div style={{fontSize:11,color:"#9DABBE"}}>@{a.username} Â· Admin Ordinancës</div>
                  </div>
                  <div style={{background:"#EBF4FF",borderRadius:10,padding:"6px 14px",textAlign:"center"}}>
                    <div style={{fontSize:10,color:"#9DABBE",marginBottom:2}}>PIN</div>
                    <div style={{fontSize:18,fontWeight:700,color:"#2563EB",letterSpacing:"4px"}}>{a.pin}</div>
                  </div>
                  <button onClick={()=>removeAdmin(selected.id,a.id)} style={{padding:"6px 12px",border:"1px solid #FECACA",borderRadius:7,background:"#FEF2F2",fontSize:11,color:"#991B1B",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Largo</button>
                </div>
              ))}
          </div>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:18}}>
            <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:14}}>Statistika</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {[{l:"Pacientë",v:selected.patients},{l:"Përdorues",v:selected.users},{l:"Të Ardhura",v:`€${(selected.revenue||0).toLocaleString()}`},{l:"Aktive nga",v:selected.since}].map(x=>(
                <div key={x.l} style={{background:"#F8FAFF",borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:700,color:"#1A2332"}}>{x.v}</div>
                  <div style={{fontSize:10,color:"#9DABBE",marginTop:3}}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // â”€â”€ ADD FORM â”€â”€
  if(view==="add") return (
    <div>
      {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button onClick={()=>setView("list")} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>â† Kthehu</button>
        <h1 style={{fontSize:20,fontWeight:700,color:"#1A2332",margin:0}}>Ordinancë e Re</h1>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20}}>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:28}}>
          <h3 style={{fontSize:14,fontWeight:600,color:"#1A2332",marginBottom:20,marginTop:0}}>Informacionet e Ordinancës</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {[{l:"Emri i Ordinancës *",k:"name",ph:"p.sh. Fizio Center"},
              {l:"Qyteti *",k:"city",ph:"p.sh. Prishtinë"},
              {l:"Telefon",k:"phone",ph:"044 000 000"},
              {l:"Email",k:"email",ph:"info@ordinanca.com"},
            ].map(f=>(
              <div key={f.k}>
                <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>{f.l}</label>
                <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:16}}>
            <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Adresa</label>
            <input value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} placeholder="Rruga, Nr., Qyteti" style={inputStyle}
              onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
          </div>
          <div style={{display:"flex",gap:10,marginTop:24}}>
            <button onClick={()=>setView("list")} style={{padding:"11px 24px",border:"1px solid #E8ECF2",borderRadius:9,background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>Anulo</button>
            <button onClick={handleSubmit} style={{padding:"11px 28px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Regjistro Ordinancën</button>
          </div>
        </div>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:24}}>
          <h3 style={{fontSize:14,fontWeight:600,color:"#1A2332",marginBottom:6,marginTop:0}}>Logo e Ordinancës</h3>
          <p style={{fontSize:12,color:"#9DABBE",marginBottom:20}}>Ngarko logon nga kompjuteri yt (PNG, JPG, SVG).</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
          {logoPreview
            ?<div style={{textAlign:"center"}}>
              <div style={{width:120,height:120,borderRadius:14,border:"2px solid #E8ECF2",margin:"0 auto 16px",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"#F8FAFF"}}>
                <img src={logoPreview} alt="logo" style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}/>
              </div>
              <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                <button onClick={()=>fileRef.current.click()} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>Ndrysho</button>
                <button onClick={()=>setLogoPreview(null)} style={{padding:"7px 14px",border:"1px solid #FECACA",borderRadius:8,background:"#FEF2F2",fontSize:12,fontWeight:500,cursor:"pointer",color:"#991B1B",fontFamily:"'DM Sans',sans-serif"}}>Largo</button>
              </div>
            </div>
            :<div onClick={()=>fileRef.current.click()} style={{border:"2px dashed #BFDBFE",borderRadius:14,padding:"32px 20px",textAlign:"center",cursor:"pointer",background:"#F8FAFF"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#2563EB";e.currentTarget.style.background="#EBF4FF";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.background="#F8FAFF";}}>
              <div style={{fontSize:28,marginBottom:8}}>ðŸ–¼</div>
              <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:4}}>Kliko për të ngarkuar</div>
              <div style={{fontSize:11,color:"#9DABBE"}}>PNG, JPG, SVG â€” max 5MB</div>
            </div>}
        </div>
      </div>
    </div>
  );

  // â”€â”€ LIST VIEW â”€â”€
  return (
    <div>
      {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Menaxhimi i Ordinancave</h1>
          <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>{clinics.length} ordinanca gjithsej</p>
        </div>
        <button onClick={()=>setView("add")} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          <Icon name="plus" size={15} color="#fff"/> Ordinancë e Re
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px"}}>
          <div style={{width:36,height:36,borderRadius:10,background:"#EBF4FF",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Icon name="clinics" size={18} color="#2563EB"/></div>
          <div style={{fontSize:26,fontWeight:700,color:"#1A2332"}}>{clinics.filter(c=>c.status==="active").length}</div>
          <div style={{fontSize:12,color:"#5A6A7E",marginTop:5}}>Ordinanca Aktive</div>
        </div>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px"}}>
          <div style={{width:36,height:36,borderRadius:10,background:"#F0FDF4",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Icon name="patients" size={18} color="#22C55E"/></div>
          <div style={{fontSize:26,fontWeight:700,color:"#1A2332"}}>{clinics.reduce((s,c)=>s+c.patients,0)}</div>
          <div style={{fontSize:12,color:"#5A6A7E",marginTop:5}}>Pacientë Total</div>
        </div>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px"}}>
          <div style={{width:36,height:36,borderRadius:10,background:"#FFFBEB",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Icon name="staff" size={18} color="#F59E0B"/></div>
          <div style={{fontSize:26,fontWeight:700,color:"#1A2332"}}>{clinics.reduce((s,c)=>s+(c.admins||[]).length,0)}</div>
          <div style={{fontSize:12,color:"#5A6A7E",marginTop:5}}>Adminë me PIN</div>
        </div>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px"}}>
          <div style={{width:36,height:36,borderRadius:10,background:"#F0FDF4",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Icon name="payments" size={18} color="#22C55E"/></div>
          <div style={{fontSize:26,fontWeight:700,color:"#1A2332"}}>€{clinics.reduce((s,c)=>s+c.revenue,0).toLocaleString()}</div>
          <div style={{fontSize:12,color:"#5A6A7E",marginTop:5}}>Të Ardhura Total</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:14}}>
        {clinics.map(c=>(
          <div key={c.id} style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"box-shadow .15s"}}
            onClick={()=>{setSelected({...c});setView("detail");}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(37,99,235,.1)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{padding:"16px 18px",borderBottom:"1px solid #E8ECF2",display:"flex",alignItems:"center",gap:12}}>
              {c.logo
                ?<div style={{width:42,height:42,borderRadius:10,border:"1px solid #E8ECF2",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"#F8FAFF",flexShrink:0}}>
                  <img src={c.logo} alt="" style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}/>
                </div>
                :<div style={{width:42,height:42,borderRadius:12,background:c.status==="active"?"#EBF4FF":"#F5F5F5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:14,fontWeight:700,color:c.status==="active"?"#2563EB":"#9DABBE"}}>
                  {c.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                </div>}
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:600,color:"#1A2332",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                <div style={{fontSize:12,color:"#9DABBE"}}>{c.city}</div>
              </div>
              <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:c.status==="active"?"#F0FDF4":"#F5F5F5",color:c.status==="active"?"#15803D":"#9DABBE"}}>{c.status==="active"?"Aktive":"Joaktive"}</span>
            </div>
            <div style={{padding:"14px 18px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
                {[{l:"Pacientë",v:c.patients},{l:"Adminë PIN",v:(c.admins||[]).length},{l:"Të Ardhura",v:`€${c.revenue.toLocaleString()}`}].map(x=>(
                  <div key={x.l}><div style={{fontSize:10,color:"#9DABBE",fontWeight:600,textTransform:"uppercase"}}>{x.l}</div><div style={{fontSize:13,fontWeight:700,color:"#1A2332",marginTop:2}}>{x.v}
  <div style={{display:"flex",gap:8,flexShrink:0,marginLeft:"auto"}}>
    <button onClick={() => openEdit(c)} style={{padding:"7px 10px",borderRadius:10,border:"1px solid #E8ECF2",background:"#fff",cursor:"pointer",fontSize:12,fontWeight:600}}>Edit</button>
    <button onClick={() => onDeleteClinic && onDeleteClinic(c.id)} style={{padding:"7px 10px",borderRadius:10,border:"1px solid #FECACA",background:"#FEF2F2",color:"#991B1B",cursor:"pointer",fontSize:12,fontWeight:600}}>Fshij</button>
  </div>
</div></div>
                ))}
              </div>
              {(c.treatmentTypes||[]).length>0&&(
                <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
                  {(c.treatmentTypes||[]).slice(0,3).map(t=>(
                    <span key={t} style={{padding:"2px 8px",background:"#F1F3F7",borderRadius:20,fontSize:10,color:"#5A6A7E"}}>{t}</span>
                  ))}
                  {(c.treatmentTypes||[]).length>3&&<span style={{padding:"2px 8px",background:"#EBF4FF",borderRadius:20,fontSize:10,color:"#2563EB"}}>+{(c.treatmentTypes||[]).length-3}</span>}
                </div>
              )}
              <div style={{display:"flex",gap:8}}>
                <button onClick={e=>{e.stopPropagation();setSelected({...c});setView("detail");}} style={{flex:1,padding:"8px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>Menaxho</button>
                <button onClick={e=>{e.stopPropagation();toggleStatus(c.id);}} style={{flex:1,padding:"8px",border:"1px solid",borderRadius:8,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
                  borderColor:c.status==="active"?"#FECACA":"#BBF7D0",background:c.status==="active"?"#FEF2F2":"#F0FDF4",color:c.status==="active"?"#991B1B":"#15803D"}}>
                  {c.status==="active"?"Ã‡aktivizo":"Aktivizo"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// â”€â”€â”€ REPORTS + PER-CLINIC A4 PRINT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ReportsPage = ({ clinics }) => {
  const months=["Jan","Feb","Mar","Apr","Maj","Qer","Kor","Gus","Sht","Tet","Nën","Dhj"];
  const revenue=[1800,2100,2800,3240,0,0,0,0,0,0,0,0];
  const patients_=[45,52,67,89,0,0,0,0,0,0,0,0];
  const maxRev=Math.max(...revenue.filter(v=>v>0));
  const maxPat=Math.max(...patients_.filter(v=>v>0));
  const [selectedClinic,setSelectedClinic]=useState(clinics[0]||null);

  // Per-clinic mock stats
  const clinicStats = {
    1:{patients:67,sessions:142,revenue:4200,attendance:96,paid:3800,pending:400,invoices:38},
    2:{patients:45,sessions:98,revenue:3100,attendance:91,paid:2700,pending:400,invoices:27},
    3:{patients:89,sessions:187,revenue:5800,attendance:94,paid:5200,pending:600,invoices:52},
    4:{patients:23,sessions:41,revenue:1200,attendance:82,paid:1100,pending:100,invoices:14},
    5:{patients:41,sessions:89,revenue:2900,attendance:90,paid:2500,pending:400,invoices:31},
  };
  const getStats = (c) => clinicStats[c?.id] || {patients:c?.patients||0,sessions:0,revenue:c?.revenue||0,attendance:90,paid:c?.revenue||0,pending:0,invoices:0};

  const generateLogoHtml = (clinic) => {
    if (clinic.logo) {
      return `<img src="${clinic.logo}" alt="${clinic.name} logo" style="width:46px;height:46px;object-fit:contain;border-radius:8px;border:1px solid #E8ECF2;background:#F8FAFF;padding:3px;"/>`;
    }
    const initials = clinic.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    return `<div style="width:46px;height:46px;background:linear-gradient(135deg,#4A90D9,#1D4ED8);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;font-weight:700;font-family:'DM Sans',sans-serif;box-shadow:0 4px 12px rgba(37,99,235,0.3)">${initials}</div>`;
  };

  const handlePrint = (clinic) => {
    if(!clinic) return;
    const st = getStats(clinic);
    const w = window.open("","_blank","width=870,height=1200");
    const revenueRows = [1800,2100,2800,Math.round(st.revenue*0.9)].map((v,i)=>{
      const h=Math.round(v/Math.max(1800,2100,2800,st.revenue*0.9)*80);
      const cols=["#BFDBFE","#93C5FD","#60A5FA","#2563EB"];
      const ms=["Jan","Feb","Mar","Apr"];
      return `<div class="bar-col"><div class="bar-val">€${v.toLocaleString()}</div><div class="bar-fill" style="height:${h}px;background:${cols[i]}"></div><div class="bar-month">${ms[i]}</div></div>`;
    }).join("")+["Maj","Qer","Kor","Gus","Sht","Tet","Nën","Dhj"].map(m=>`<div class="bar-col"><div class="bar-fill" style="height:6px;background:#F1F3F7"></div><div class="bar-month">${m}</div></div>`).join("");

    const html=`<!DOCTYPE html>
<html lang="sq">
<head>
<meta charset="UTF-8"/>
<title>Raport â€” ${clinic.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'DM Sans',sans-serif;background:#fff;color:#1A2332;font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4 portrait;margin:16mm 14mm 16mm 14mm}
  @media print{.no-print{display:none!important}.page-break{page-break-before:always}}
  .page{max-width:210mm;margin:0 auto}
  /* â”€â”€ HEADER â”€â”€ */
  .header{display:flex;align-items:center;justify-content:space-between;padding-bottom:16px;border-bottom:3px solid #2563EB;margin-bottom:20px}
  .clinic-brand{display:flex;align-items:center;gap:14px}
  .clinic-name-block .cname{font-size:20px;font-weight:700;color:#1A2332;letter-spacing:-.4px}
  .clinic-name-block .csub{font-size:11px;color:#5A6A7E;margin-top:2px}
  .clinic-name-block .caddr{font-size:10px;color:#9DABBE;margin-top:1px}
  .header-right{text-align:right}
  .powered{font-size:9px;color:#9DABBE;margin-bottom:4px;letter-spacing:.05em;text-transform:uppercase}
  .fizio-brand{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-bottom:5px}
  .fizio-icon{width:22px;height:22px;background:linear-gradient(135deg,#4A90D9,#1D4ED8);border-radius:6px;display:flex;align-items:center;justify-content:center}
  .fizio-name{font-size:13px;font-weight:700;color:#1A2332}
  .fizio-name b{color:#2563EB}
  .report-badge{background:#EBF4FF;color:#2563EB;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;display:inline-block;letter-spacing:.05em}
  .header-right p{font-size:10px;color:#9DABBE;margin-top:3px}
  /* â”€â”€ TITLE BLOCK â”€â”€ */
  .title-block{background:linear-gradient(135deg,#1D4ED8,#3B82F6);border-radius:12px;padding:18px 22px;margin-bottom:20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
  .title-block h2{font-size:17px;font-weight:700;margin-bottom:3px}
  .title-block p{font-size:11px;opacity:.85}
  .period{background:rgba(255,255,255,.2);border-radius:8px;padding:6px 14px;font-size:12px;font-weight:600;white-space:nowrap}
  /* â”€â”€ KPI â”€â”€ */
  .kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}
  .kpi{background:#F8FAFF;border:1px solid #DBEAFE;border-radius:10px;padding:13px 14px}
  .kpi-icon{font-size:16px;margin-bottom:7px}
  .kpi-val{font-size:21px;font-weight:700;color:#1A2332;line-height:1}
  .kpi-label{font-size:10px;color:#5A6A7E;margin-top:4px}
  .kpi-change{font-size:9px;font-weight:600;color:#22C55E;margin-top:4px}
  /* â”€â”€ SUMMARY BOX â”€â”€ */
  .summary-box{background:linear-gradient(135deg,#1D4ED8,#2563EB);border-radius:10px;padding:14px 18px;color:#fff;margin-bottom:18px}
  .summary-box h3{font-size:10px;opacity:.75;font-weight:600;margin-bottom:10px;text-transform:uppercase;letter-spacing:.07em}
  .summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
  .summary-item .s-val{font-size:17px;font-weight:700}
  .summary-item .s-lbl{font-size:9px;opacity:.7;margin-top:2px}
  /* â”€â”€ SECTION â”€â”€ */
  .section{margin-bottom:18px}
  .section-title{font-size:12px;font-weight:700;color:#1A2332;margin-bottom:10px;display:flex;align-items:center;gap:8px;padding-bottom:7px;border-bottom:1px solid #E8ECF2}
  .section-title::before{content:'';display:inline-block;width:3px;height:14px;background:#2563EB;border-radius:2px;flex-shrink:0}
  /* â”€â”€ CHART â”€â”€ */
  .chart-container{background:#F8FAFF;border:1px solid #E8ECF2;border-radius:10px;padding:14px}
  .bars{display:flex;align-items:flex-end;gap:7px;height:85px;margin-bottom:5px}
  .bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px}
  .bar-fill{width:100%;border-radius:3px 3px 0 0}
  .bar-month{font-size:8px;color:#9DABBE;font-weight:600}
  .bar-val{font-size:7px;color:#2563EB;font-weight:600}
  /* â”€â”€ TABLE â”€â”€ */
  table{width:100%;border-collapse:collapse;font-size:11px}
  table thead tr{background:#EBF4FF}
  table th{padding:8px 11px;text-align:left;font-size:9px;font-weight:700;color:#2563EB;text-transform:uppercase;letter-spacing:.06em}
  table td{padding:8px 11px;border-bottom:1px solid #F1F3F7;color:#1A2332;vertical-align:middle}
  table tbody tr:last-child td{border-bottom:none}
  .badge{padding:2px 7px;border-radius:20px;font-size:9px;font-weight:700}
  .badge-green{background:#F0FDF4;color:#15803D}
  .badge-amber{background:#FFFBEB;color:#92400E}
  .badge-red{background:#FEF2F2;color:#991B1B}
  /* â”€â”€ STAFF â”€â”€ */
  .staff-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
  .staff-card{background:#F8FAFF;border:1px solid #E8ECF2;border-radius:9px;padding:11px 13px;display:flex;align-items:center;gap:11px}
  .staff-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#4A90D9,#2563EB);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;flex-shrink:0}
  .staff-name{font-size:12px;font-weight:600;color:#1A2332}
  .staff-stats{font-size:10px;color:#5A6A7E;margin-top:2px}
  .staff-rating{font-size:11px;font-weight:700;color:#F59E0B;margin-left:auto;white-space:nowrap}
  .prog-bar{background:#E8ECF2;border-radius:20px;height:3px;overflow:hidden;margin-top:3px;width:100px}
  .prog-fill{height:100%;border-radius:20px;background:linear-gradient(90deg,#4A90D9,#2563EB)}
  /* â”€â”€ TWO COL â”€â”€ */
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:13px}
  /* â”€â”€ APPT SUMMARY â”€â”€ */
  .appt-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
  .appt-box{border-radius:8px;padding:11px;text-align:center}
  .appt-val{font-size:19px;font-weight:700}
  .appt-lbl{font-size:9px;opacity:.85;margin-top:2px}
  /* â”€â”€ FOOTER â”€â”€ */
  .footer{border-top:1.5px solid #E8ECF2;padding-top:12px;margin-top:18px;display:flex;justify-content:space-between;align-items:center}
  .footer-left .f-main{font-size:10px;font-weight:600;color:#1A2332;margin-bottom:2px}
  .footer-left .f-sub{font-size:9px;color:#9DABBE}
  .footer-right{text-align:right}
  .page-num{font-size:10px;color:#2563EB;font-weight:700}
  .confidential{font-size:8px;color:#C4CCDA;margin-top:2px}
  /* â”€â”€ NO PRINT â”€â”€ */
  .no-print{padding:14px 0;display:flex;gap:10px;align-items:center}
  .btn-print{padding:9px 20px;background:#2563EB;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:6px}
  .btn-close{padding:9px 16px;border:1px solid #E8ECF2;background:#fff;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;color:#5A6A7E;font-family:'DM Sans',sans-serif}
  .preview-note{font-size:11px;color:#9DABBE;margin-left:4px}
</style>
</head>
<body>
<div class="page">

  <div class="no-print">
    <button class="btn-print" onclick="window.print()">ðŸ–¨ï¸ Printo A4</button>
    <button class="btn-close" onclick="window.close()">âœ• Mbyll</button>
    <span class="preview-note">Raport për: <strong>${clinic.name}</strong> â€” ${clinic.city}</span>
  </div>

  <!-- HEADER WITH CLINIC LOGO -->
  <div class="header">
    <div class="clinic-brand">
      ${generateLogoHtml(clinic)}
      <div class="clinic-name-block">
        <div class="cname">${clinic.name}</div>
        <div class="csub">${clinic.city}, Kosovë Â· ${clinic.phone||''}</div>
        <div class="caddr">${clinic.address||''}</div>
      </div>
    </div>
    <div class="header-right">
      <div class="powered">Powered by</div>
      <div class="fizio-brand">
        <div class="fizio-icon"><svg width="14" height="14" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="5.5" r="2.8" stroke="white" stroke-width="2"/><path d="M10.5 11.5c1.5-1.3 3.3-2 5.5-2s4 .7 5.5 2" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M16 13v7.5" stroke="white" stroke-width="2.2" stroke-linecap="round"/><path d="M10 14.5l2.5 3.5" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M22 14.5l-2.5 3.5" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M13.5 20.5L11.5 27" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M18.5 20.5L20.5 27" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
        <span class="fizio-name">Fizio<b>app</b></span>
      </div>
      <div class="report-badge">RAPORT ZYRTAR</div>
      <p>Gjeneruar: 01 Prill 2026 Â· 14:32</p>
      <p>Ref: RPT-${clinic.id}-2026-04</p>
    </div>
  </div>

  <!-- TITLE -->
  <div class="title-block">
    <div>
      <h2>Raport Mujor i Performancës</h2>
      <p>${clinic.name} â€” ${clinic.city} Â· Aktiv që nga ${clinic.since}</p>
    </div>
    <div class="period">Prill 2026</div>
  </div>

  <!-- KPI -->
  <div class="kpi-grid">
    <div class="kpi"><div class="kpi-icon">ðŸ‘¥</div><div class="kpi-val">${st.patients}</div><div class="kpi-label">Pacientë Aktivë</div><div class="kpi-change">â†‘ +8 vs muajit parë</div></div>
    <div class="kpi"><div class="kpi-icon">ðŸ“…</div><div class="kpi-val">${st.sessions}</div><div class="kpi-label">Seanca Totale</div><div class="kpi-change">â†‘ +14 vs muajit parë</div></div>
    <div class="kpi"><div class="kpi-icon">ðŸ’¶</div><div class="kpi-val">€${st.revenue.toLocaleString()}</div><div class="kpi-label">Të Ardhura</div><div class="kpi-change">â†‘ +8.3% rritje</div></div>
    <div class="kpi"><div class="kpi-icon">âœ…</div><div class="kpi-val">${st.attendance}%</div><div class="kpi-label">Prezenca</div><div class="kpi-change">â†‘ +2.1% muajin</div></div>
  </div>

  <!-- SUMMARY -->
  <div class="summary-box">
    <h3>Përmbledhja Financiare â€” Prill 2026</h3>
    <div class="summary-grid">
      <div class="summary-item"><div class="s-val">€${st.paid.toLocaleString()}</div><div class="s-lbl">Pagesa të mbledhura</div></div>
      <div class="summary-item"><div class="s-val">€${st.pending.toLocaleString()}</div><div class="s-lbl">Në pritje të pagesës</div></div>
      <div class="summary-item"><div class="s-val">${st.invoices}</div><div class="s-lbl">Fatura të lëshuara</div></div>
      <div class="summary-item"><div class="s-val">€${Math.round(st.revenue/Math.max(st.sessions,1))}</div><div class="s-lbl">Mesatarja për seancë</div></div>
      <div class="summary-item"><div class="s-val">${clinic.users}</div><div class="s-lbl">Stafi aktiv</div></div>
      <div class="summary-item"><div class="s-val">${Math.round(st.paid/st.revenue*100)||97}%</div><div class="s-lbl">Shkalla e mbledhjes</div></div>
    </div>
  </div>

  <!-- CHART -->
  <div class="section">
    <div class="section-title">Grafiku i Të Ardhurave Mujore â€” 2026</div>
    <div class="chart-container">
      <div class="bars">${revenueRows}</div>
    </div>
  </div>

  <div class="two-col">
    <!-- PATIENTS -->
    <div class="section">
      <div class="section-title">Pacientët Kryesorë</div>
      <table>
        <thead><tr><th>Pacienti</th><th>Diagnoza</th><th>Progres</th></tr></thead>
        <tbody>
          ${PATIENTS.slice(0,6).map(p=>{
            const pct=Math.round(p.sessions/p.total*100);
            return `<tr><td><strong>${p.name}</strong><br/><span style="font-size:9px;color:#9DABBE">${p.age} vj.</span></td><td style="font-size:10px;color:#5A6A7E">${p.condition}</td><td><div style="font-size:10px;font-weight:700;color:#2563EB">${pct}%</div><div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div></td></tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
    <!-- INVOICES -->
    <div class="section">
      <div class="section-title">Faturat e Fundit</div>
      <table>
        <thead><tr><th>Nr. Faturës</th><th>Shuma</th><th>Statusi</th></tr></thead>
        <tbody>
          ${INVOICES.map(inv=>{
            const bc=inv.status==="paid"?"badge-green":inv.status==="overdue"?"badge-red":"badge-amber";
            const bl=inv.status==="paid"?"Paguar":inv.status==="overdue"?"Vonuar":"Pritje";
            return `<tr><td><strong style="font-size:10px;color:#2563EB">${inv.id}</strong><br/><span style="font-size:9px;color:#9DABBE">${inv.patient}</span></td><td><strong>€${inv.amount}</strong></td><td><span class="badge ${bc}">${bl}</span></td></tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  </div>

  <!-- STAFF -->
  <div class="section">
    <div class="section-title">Performanca e Stafit</div>
    <div class="staff-grid">
      ${STAFF.map(s=>{
        const initials=s.name.split(" ").slice(1).map(w=>w[0]).join("").slice(0,2);
        return `<div class="staff-card"><div class="staff-avatar">${initials}</div><div style="flex:1"><div class="staff-name">${s.name}</div><div class="staff-stats">${s.sessions} seanca Â· ${s.patients} pac. Â· ${s.attendance}%</div><div class="prog-bar"><div class="prog-fill" style="width:${s.attendance}%"></div></div></div><div class="staff-rating">${s.rating} â˜…</div></div>`;
      }).join("")}
    </div>
  </div>

  <!-- APPOINTMENTS -->
  <div class="section">
    <div class="section-title">Terminet e Muajit</div>
    <div class="appt-grid">
      <div class="appt-box" style="background:#EBF4FF"><div class="appt-val" style="color:#2563EB">${Math.round(st.sessions*1.3)}</div><div class="appt-lbl" style="color:#2563EB">Të planifikuara</div></div>
      <div class="appt-box" style="background:#F0FDF4"><div class="appt-val" style="color:#15803D">${st.sessions}</div><div class="appt-lbl" style="color:#15803D">Të kryera</div></div>
      <div class="appt-box" style="background:#FEF2F2"><div class="appt-val" style="color:#991B1B">${Math.round(st.sessions*0.07)}</div><div class="appt-lbl" style="color:#991B1B">Të anuluara</div></div>
      <div class="appt-box" style="background:#FFFBEB"><div class="appt-val" style="color:#92400E">${st.attendance}%</div><div class="appt-lbl" style="color:#92400E">Prezenca</div></div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-left">
      <div class="f-main">${clinic.name} Â· ${clinic.city}</div>
      <div class="f-sub">Raport gjeneruar nga Fizioapp â€” 01 Prill 2026 në 14:32 Â· Ref: RPT-${clinic.id}-2026-04</div>
    </div>
    <div class="footer-right">
      <div class="page-num">Faqe 1 / 1</div>
      <div class="confidential">Â© Fizioapp 2026 â€” Konfidencial</div>
    </div>
  </div>

</div>
</body>
</html>`;
    w.document.write(html);
    w.document.close();
  };

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Raportet & Statistikat</h1>
          <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>Zgjidh ordinancën dhe printo raportin</p>
        </div>
      </div>

      {/* Clinic selector for print */}
      <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20,marginBottom:20}}>
        <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:14}}>Printo Raport A4 â€” Zgjidh Ordinancën</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:16}}>
          {clinics.map(c=>(
            <div key={c.id} onClick={()=>setSelectedClinic(c)}
              style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:10,border:"1.5px solid",cursor:"pointer",transition:"all .15s",
                borderColor:selectedClinic?.id===c.id?"#2563EB":"#E8ECF2",
                background:selectedClinic?.id===c.id?"#EBF4FF":"#FAFBFD"}}
              onMouseEnter={e=>{if(selectedClinic?.id!==c.id)e.currentTarget.style.borderColor="#BFDBFE";}}
              onMouseLeave={e=>{if(selectedClinic?.id!==c.id)e.currentTarget.style.borderColor="#E8ECF2";}}>
              {c.logo ? (
                <div style={{width:34,height:34,borderRadius:8,border:"1px solid #E8ECF2",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff",flexShrink:0}}>
                  <img src={c.logo} alt="" style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}/>
                </div>
              ) : (
                <div style={{width:34,height:34,borderRadius:8,background:selectedClinic?.id===c.id?"#2563EB":"#E8ECF2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12,fontWeight:700,color:selectedClinic?.id===c.id?"#fff":"#5A6A7E"}}>
                  {c.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                </div>
              )}
              <div style={{minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,color:selectedClinic?.id===c.id?"#2563EB":"#1A2332",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                <div style={{fontSize:10,color:"#9DABBE"}}>{c.city} Â· {c.status==="active"?"Aktive":"Joaktive"}</div>
              </div>
              {selectedClinic?.id===c.id&&<div style={{marginLeft:"auto",flexShrink:0,width:16,height:16,borderRadius:"50%",background:"#2563EB",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>}
            </div>
          ))}
        </div>

        {selectedClinic && (
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:"linear-gradient(135deg,#EBF4FF,#F0F7FF)",borderRadius:10,border:"1px solid #BFDBFE"}}>
            {selectedClinic.logo ? (
              <div style={{width:44,height:44,borderRadius:10,border:"1px solid #E8ECF2",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff",flexShrink:0}}>
                <img src={selectedClinic.logo} alt="" style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}/>
              </div>
            ) : (
              <div style={{width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,#4A90D9,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:15,fontWeight:700,color:"#fff"}}>
                {selectedClinic.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
              </div>
            )}
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>{selectedClinic.name}</div>
              <div style={{fontSize:11,color:"#5A6A7E"}}>{selectedClinic.city} Â· {selectedClinic.phone||"â€”"} Â· {selectedClinic.address||"â€”"}</div>
              <div style={{fontSize:10,color:"#9DABBE",marginTop:1}}>
                {selectedClinic.logo ? "âœ“ Logo e ngarkuar â€” do shfaqet në raport" : "âš  Pa logo â€” do përdoret shkronjat fillestare"}
              </div>
            </div>
            <button onClick={()=>handlePrint(selectedClinic)}
              style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",flexShrink:0}}>
              <Icon name="print" size={15} color="#fff"/> Printo Raportin A4
            </button>
          </div>
        )}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <StatCard icon="patients" label="Pacientë Total" value={clinics.reduce((s,c)=>s+c.patients,0)} change="+18% ky vit" changeUp accent="blue"/>
        <StatCard icon="calendar" label="Seanca Total" value="847" change="+245 vs viti parë" changeUp accent="green"/>
        <StatCard icon="payments" label="Të Ardhura YTD" value={`€${clinics.reduce((s,c)=>s+c.revenue,0).toLocaleString()}`} change="+22.4%" changeUp accent="amber"/>
        <StatCard icon="activity" label="Prezenca Mesatare" value="94%" change="+2.1%" changeUp accent="green"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20}}>
          <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:16}}>Të Ardhurat Mujore â€” 2026</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:8,height:120}}>
            {months.map((m,i)=>(
              <div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:"100%",borderRadius:"4px 4px 0 0",background:revenue[i]>0?(i===3?"linear-gradient(180deg,#4A90D9,#2563EB)":"#BFDBFE"):"#F5F7FA",height:`${revenue[i]>0?Math.round(revenue[i]/maxRev*100):8}px`}}/>
                <div style={{fontSize:9,color:i===3?"#2563EB":"#9DABBE",fontWeight:i===3?700:400}}>{m}
  <div style={{display:"flex",gap:8,flexShrink:0,marginLeft:"auto"}}>
    <button onClick={() => openEdit(c)} style={{padding:"7px 10px",borderRadius:10,border:"1px solid #E8ECF2",background:"#fff",cursor:"pointer",fontSize:12,fontWeight:600}}>Edit</button>
    <button onClick={() => onDeleteClinic && onDeleteClinic(c.id)} style={{padding:"7px 10px",borderRadius:10,border:"1px solid #FECACA",background:"#FEF2F2",color:"#991B1B",cursor:"pointer",fontSize:12,fontWeight:600}}>Fshij</button>
  </div>
</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20}}>
          <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:16}}>Pacientë të Rinj â€” 2026</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:8,height:120}}>
            {months.map((m,i)=>(
              <div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:"100%",borderRadius:"4px 4px 0 0",background:patients_[i]>0?(i===3?"#22C55E":"#BBF7D0"):"#F5F7FA",height:`${patients_[i]>0?Math.round(patients_[i]/maxPat*100):8}px`}}/>
                <div style={{fontSize:9,color:i===3?"#22C55E":"#9DABBE",fontWeight:i===3?700:400}}>{m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:"1px solid #E8ECF2",fontSize:13,fontWeight:600,color:"#1A2332"}}>Performanca e Stafit</div>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr 1fr",padding:"10px 18px",borderBottom:"1px solid #E8ECF2",fontSize:11,fontWeight:700,color:"#9DABBE",textTransform:"uppercase",letterSpacing:".06em"}}>
          <span>Fizioterapis</span><span>Seanca</span><span>Pacientë</span><span>Prezenca</span><span>Vlerësimi</span>
        </div>
        {STAFF.map(s=>(
          <div key={s.name} style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr 1fr",padding:"14px 18px",borderBottom:"1px solid #F5F7FA",alignItems:"center"}}
            onMouseEnter={e=>e.currentTarget.style.background="#FAFBFD"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Avatar name={s.name.split(" ").slice(1).join(" ")} size={32} bg="#EBF4FF" color="#2563EB"/>
              <span style={{fontSize:13,fontWeight:500,color:"#1A2332"}}>{s.name}</span>
            </div>
            <span style={{fontSize:13,fontWeight:600,color:"#1A2332"}}>{s.sessions}</span>
            <span style={{fontSize:13,color:"#1A2332"}}>{s.patients}</span>
            <span style={{fontSize:13,fontWeight:600,color:s.attendance>=95?"#22C55E":s.attendance>=90?"#F59E0B":"#EF4444"}}>{s.attendance}%</span>
            <div style={{display:"flex",alignItems:"center",gap:4}}>
              <span style={{fontSize:13,fontWeight:700,color:"#1A2332"}}>{s.rating}</span>
              <span style={{fontSize:13,color:"#F59E0B"}}>â˜…</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// â”€â”€â”€ MAIN APP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function FizioApp() {
  const [user,setUser]=useState(null);
  const [page,setPage]=useState("dashboard");
  const [patientToOpen,setPatientToOpen]=useState(null);
  const [clinics,setClinics]=useState(INITIAL_CLINICS);

  // SUPERADMIN: edit + delete ordinanca (vetem local state)
  const onDeleteClinic = (id) => {
    if(!confirm("A je i sigurt qe do ta fshish ordinancen?")) return;
    setClinics(prev => prev.filter(c => c.id !== id));
  };

  const onUpdateClinic = (clinic) => {
    setClinics(prev => prev.map(c => c.id === clinic.id ? clinic : c));
  };
  const [loginMode,setLoginMode]=useState("pin"); // "pin" | "normal"

  // Superadmin nav â€” NO patient/appointment/treatment/payment/report items
  const superadminNav=[
    {id:"dashboard",label:"Dashboard",icon:"dashboard"},
    {id:"clinics",label:"Ordinancat",icon:"clinics"},
    {id:"staff",label:"Stafi Global",icon:"staff"},
    {id:"settings",label:"Cilësimet",icon:"settings"},
  ];

  // Admin/Fizioterapis nav â€” full clinical access
  const clinicNav=[
    {id:"dashboard",label:"Dashboard",icon:"dashboard",roles:["admin","fizioterapis"]},
    {id:"patients",label:"Pacientët",icon:"patients",badge:124,roles:["admin","fizioterapis"]},
    {id:"appointments",label:"Terminet",icon:"calendar",badge:8,roles:["admin","fizioterapis"]},
    {id:"treatments",label:"Trajtimet",icon:"treatments",roles:["admin","fizioterapis"]},
    {id:"payments",label:"Pagesat",icon:"payments",roles:["admin"]},
    {id:"reports",label:"Raportet",icon:"reports",roles:["admin"]},
    {id:"staff",label:"Stafi",icon:"staff",roles:["admin"]},
    {id:"settings",label:"Cilësimet",icon:"settings",roles:["admin","fizioterapis"]},
  ];

  // Show PIN login first (for admins), then normal login for superadmin
  if(!user){
    if(loginMode==="pin") return <PinLoginPage clinics={clinics} onLogin={u=>{setUser(u);setPage("dashboard");}} onSwitchToNormal={()=>setLoginMode("normal")}/>;
    return <LoginPage onLogin={u=>{setUser(u);setPage("dashboard");setLoginMode("pin");}}/>;
  }

  const isSuperadmin=user.role==="superadmin";
  const visibleNav=isSuperadmin ? superadminNav : clinicNav.filter(n=>n.roles.includes(user.role));
  const roleLabel={superadmin:"Superadmin",admin:"Admin Ordinancës",fizioterapis:"Fizioterapis"}[user.role];
  const userClinic=!isSuperadmin ? clinics.find(c=>c.id===user.clinicId) : null;

  const handleNavigate=(pg,patient=null)=>{
    setPage(pg);
    setPatientToOpen(patient||null);
  };

  // â”€â”€ TREATMENTS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const TreatmentsPage = () => {
    const TREATMENT_TYPES = ["Fizioterapi","Rehabilitim","Masazh terapeutik","Elektroterapi","Ultrasonik","Termokompresa","Akupunkturë","Kineziterapi","Hidroterapi","Lazer terapi"];
    const initPlans = [
      {id:1,patient:"Arjeta Krasniqi",type:"Fizioterapi",therapist:"Dr. Arta Morina",startDate:"01 Mar 2026",endDate:"30 Apr 2026",sessions:10,done:4,status:"active",price:65,notes:"Dhimbje e poshtme, progresi i mirë",exercises:["Shtirje lumbare","Forcim barkut","Ushtrim posture"]},
      {id:2,patient:"Besnik Morina",type:"Rehabilitim",therapist:"Dr. Blendi Berisha",startDate:"10 Feb 2026",endDate:"10 May 2026",sessions:12,done:7,status:"active",price:80,notes:"Pas operacionit të gjurit, rekuperim i mirë",exercises:["Fleksion gjuri","Forcim kuadricepsit","Shëtitje e kontrolluar"]},
      {id:3,patient:"Mimoza Berisha",type:"Masazh terapeutik",therapist:"Dr. Arta Morina",startDate:"15 Mar 2026",endDate:"15 Apr 2026",sessions:8,done:2,status:"active",price:55,notes:"Tension muskulor i qafës dhe shpatullave",exercises:["Rrotullim qafe","Shtirje shpatullash","Lëvizje kokë"]},
      {id:4,patient:"Driton Hoxha",type:"Elektroterapi",therapist:"Dr. Fjolla Gashi",startDate:"01 Jan 2026",endDate:"31 Mar 2026",sessions:15,done:9,status:"active",price:75,notes:"Artrit kronik, efikasitet i lartë me TENS",exercises:["TENS 20 min","Ngrohje e butë","Lëvizje pasive"]},
      {id:5,patient:"Shpresa Aliu",type:"Kineziterapi",therapist:"Dr. Kushtrim Leka",startDate:"01 Dec 2025",endDate:"01 Mar 2026",sessions:16,done:16,status:"completed",price:70,notes:"Plani i kompletuar me sukses",exercises:["Program i plotë kinez."]},
      {id:6,patient:"Liridon Gashi",type:"Hidroterapi",therapist:"Dr. Blendi Berisha",startDate:"01 Apr 2026",endDate:"30 May 2026",sessions:10,done:1,status:"active",price:90,notes:"Hernia diskale L4-L5, fillim i hershëm",exercises:["Ushtrime në ujë","Flotim i kontrolluar","Shtirje në ujë"]},
    ];
    const [plans,setPlans]=useState(initPlans);
    const [view,setView]=useState("list"); // list | detail | new
    const [selected,setSelected]=useState(null);
    const [filterStatus,setFilterStatus]=useState("all");
    const [showSOAP,setShowSOAP]=useState(false);
    const [soap,setSoap]=useState({s:"",o:"",a:"",p:""});
    const [newPlan,setNewPlan]=useState({patient:"",type:"Fizioterapi",therapist:"",sessions:10,price:65,startDate:"",notes:""});
    const [toast,setToast]=useState("");

    const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),2500);};

    const filtered=plans.filter(p=>filterStatus==="all"||p.status===filterStatus);

    const addSession=(id)=>{
      setPlans(prev=>prev.map(p=>{
        if(p.id!==id) return p;
        const done=Math.min(p.done+1,p.sessions);
        const status=done>=p.sessions?"completed":p.status;
        return {...p,done,status};
      }));
      if(selected?.id===id) setSelected(prev=>({...prev,done:Math.min(prev.done+1,prev.sessions)}));
      showToast("âœ“ Seanca u regjistrua me sukses!");
    };

    const saveSOAP=()=>{
      showToast("âœ“ Shënimet SOAP u ruajtën!");
      setShowSOAP(false);setSoap({s:"",o:"",a:"",p:""});
    };

    const submitNewPlan=()=>{
      if(!newPlan.patient||!newPlan.therapist){showToast("âš  Plotëso fushat e detyrueshme!");return;}
      const plan={
        id:Date.now(),patient:newPlan.patient,type:newPlan.type,therapist:newPlan.therapist,
        startDate:newPlan.startDate||"01 Apr 2026",endDate:"",sessions:parseInt(newPlan.sessions)||10,
        done:0,status:"active",price:parseInt(newPlan.price)||65,notes:newPlan.notes,exercises:[]
      };
      setPlans(prev=>[plan,...prev]);
      setView("list");setNewPlan({patient:"",type:"Fizioterapi",therapist:"",sessions:10,price:65,startDate:"",notes:""});
      showToast("âœ“ Plani i trajtimit u shtua!");
    };

    const inp=(k,v)=>setNewPlan(p=>({...p,[k]:v}));
    const inputStyle={width:"100%",padding:"10px 13px",border:"1.5px solid #E8ECF2",borderRadius:9,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box",background:"#fff"};

    // â”€â”€ NEW PLAN FORM â”€â”€
    if(view==="new") return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <button onClick={()=>setView("list")} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>â† Kthehu</button>
          <h1 style={{fontSize:20,fontWeight:700,color:"#1A2332",margin:0}}>Plan i Ri Trajtimi</h1>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20}}>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:28}}>
            <h3 style={{fontSize:14,fontWeight:600,color:"#1A2332",marginBottom:20,marginTop:0}}>Detajet e Planit</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {[
                {l:"Pacienti *",k:"patient",ph:"Emri i pacientit"},
                {l:"Fizioterapis *",k:"therapist",ph:"Dr. Emri Mbiemri"},
                {l:"Ã‡mimi për seancë (€)",k:"price",ph:"65",t:"number"},
                {l:"Numri i seancave",k:"sessions",ph:"10",t:"number"},
                {l:"Data e fillimit",k:"startDate",ph:"",t:"date"},
              ].map(f=>(
                <div key={f.k}>
                  <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>{f.l}</label>
                  <input value={newPlan[f.k]} type={f.t||"text"} onChange={e=>inp(f.k,e.target.value)} placeholder={f.ph}
                    style={inputStyle} onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Lloji i Trajtimit</label>
                <select value={newPlan.type} onChange={e=>inp("type",e.target.value)} style={{...inputStyle,cursor:"pointer"}}>
                  {TREATMENT_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{marginTop:16}}>
              <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Shënime klinike</label>
              <textarea value={newPlan.notes} onChange={e=>inp("notes",e.target.value)} placeholder="Diagnoza, qëllimi i trajtimit, vërejtje..."
                style={{...inputStyle,height:90,resize:"vertical"}}/>
            </div>
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button onClick={()=>setView("list")} style={{padding:"11px 24px",border:"1px solid #E8ECF2",borderRadius:9,background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>Anulo</button>
              <button onClick={submitNewPlan} style={{padding:"11px 28px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Krijo Planin</button>
            </div>
          </div>
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20}}>
            <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:14}}>Llojet e trajtimeve</div>
            {TREATMENT_TYPES.map(t=>(
              <div key={t} onClick={()=>inp("type",t)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:8,marginBottom:4,cursor:"pointer",
                background:newPlan.type===t?"#EBF4FF":"transparent",border:"1px solid",borderColor:newPlan.type===t?"#2563EB":"transparent"}}
                onMouseEnter={e=>{if(newPlan.type!==t)e.currentTarget.style.background="#F5F7FF";}}
                onMouseLeave={e=>{if(newPlan.type!==t)e.currentTarget.style.background="transparent";}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:newPlan.type===t?"#2563EB":"#D1D5DB",flexShrink:0}}/>
                <span style={{fontSize:13,color:newPlan.type===t?"#2563EB":"#1A2332",fontWeight:newPlan.type===t?600:400}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // â”€â”€ DETAIL VIEW â”€â”€
    if(view==="detail"&&selected) {
      const p=selected; const pct=Math.round(p.done/p.sessions*100);
      const totalVal=p.sessions*p.price; const paidVal=p.done*p.price;
      return (
        <div>
          {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <button onClick={()=>{setView("list");setSelected(null);}} style={{padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>â† Kthehu</button>
            <h1 style={{fontSize:20,fontWeight:700,color:"#1A2332",margin:0,flex:1}}>Plani i Trajtimit</h1>
            <button onClick={()=>addSession(p.id)} disabled={p.done>=p.sessions}
              style={{padding:"9px 18px",background:p.done>=p.sessions?"#E8ECF2":"linear-gradient(135deg,#22C55E,#16A34A)",color:p.done>=p.sessions?"#9DABBE":"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:p.done>=p.sessions?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              + Regjistro Seancë
            </button>
            <button onClick={()=>setShowSOAP(true)} style={{padding:"9px 18px",background:"#EBF4FF",color:"#2563EB",border:"1px solid #BFDBFE",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              ðŸ“‹ SOAP Note
            </button>
          </div>

          {showSOAP&&(
            <div style={{background:"#fff",border:"2px solid #BFDBFE",borderRadius:14,padding:24,marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <span style={{fontSize:14,fontWeight:600,color:"#1A2332"}}>Shënim SOAP i Ri â€” {p.patient}</span>
                <button onClick={()=>setShowSOAP(false)} style={{border:"none",background:"none",cursor:"pointer",fontSize:18,color:"#9DABBE"}}>Ã—</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {[{k:"s",l:"S â€” Subjektive",ph:"Ã‡farë raporton pacienti? Dhimbje, simptoma..."},
                  {k:"o",l:"O â€” Objektive",ph:"Gjetjet fizike, matjet, vëzhgimet..."},
                  {k:"a",l:"A â€” Vlerësimi",ph:"Diagnoza, progresi, interpretimi..."},
                  {k:"p",l:"P â€” Plani",ph:"Trajtimi i radhës, ushtrimet, rekomandimet..."}].map(f=>(
                  <div key={f.k}>
                    <label style={{fontSize:11,fontWeight:700,color:"#2563EB",display:"block",marginBottom:6,letterSpacing:".04em"}}>{f.l}</label>
                    <textarea value={soap[f.k]} onChange={e=>setSoap(pr=>({...pr,[f.k]:e.target.value}))} placeholder={f.ph}
                      style={{width:"100%",padding:"10px",border:"1.5px solid #E8ECF2",borderRadius:8,fontSize:12,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box",resize:"vertical",minHeight:80,background:"#FAFBFD"}}
                      onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:10,marginTop:14}}>
                <button onClick={saveSOAP} style={{padding:"9px 22px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Ruaj SOAP</button>
                <button onClick={()=>setShowSOAP(false)} style={{padding:"9px 16px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",fontSize:13,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>Anulo</button>
              </div>
            </div>
          )}

          <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:16}}>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:14}}>Detajet e Planit</div>
                {[{l:"Pacienti",v:p.patient},{l:"Lloji",v:p.type},{l:"Fizioterapis",v:p.therapist},
                  {l:"Fillimi",v:p.startDate},{l:"Mbarimi",v:p.endDate||"â€”"},{l:"Statusi",v:p.status}].map(x=>(
                  <div key={x.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F5F7FA"}}>
                    <span style={{fontSize:12,color:"#9DABBE",fontWeight:600}}>{x.l}</span>
                    <span style={{fontSize:12,fontWeight:500,color:"#1A2332",textAlign:"right",maxWidth:160}}>{x.v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:12}}>Progresi</div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:28,fontWeight:700,color:"#2563EB"}}>{p.done}<span style={{fontSize:16,color:"#9DABBE"}}>/{p.sessions}</span></span>
                  <span style={{fontSize:22,fontWeight:700,color:pct>=100?"#22C55E":"#1A2332"}}>{pct}%</span>
                </div>
                <div style={{background:"#F1F3F7",borderRadius:20,height:10,overflow:"hidden",marginBottom:10}}>
                  <div style={{height:"100%",borderRadius:20,background:pct>=100?"#22C55E":"linear-gradient(90deg,#4A90D9,#2563EB)",width:`${pct}%`,transition:"width .5s"}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
                  <div style={{background:"#F0FDF4",borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
                    <div style={{fontSize:16,fontWeight:700,color:"#15803D"}}>€{paidVal}</div>
                    <div style={{fontSize:10,color:"#16A34A",marginTop:2}}>E paguar</div>
                  </div>
                  <div style={{background:"#F8FAFF",borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
                    <div style={{fontSize:16,fontWeight:700,color:"#1A2332"}}>€{totalVal}</div>
                    <div style={{fontSize:10,color:"#9DABBE",marginTop:2}}>Total plan</div>
                  </div>
                </div>
              </div>
              <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:12}}>Ushtrimet</div>
                {p.exercises.map((ex,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #F5F7FA"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:"#EBF4FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:10,fontWeight:700,color:"#2563EB"}}>{i+1}</div>
                    <span style={{fontSize:12,color:"#1A2332"}}>{ex}</span>
                  </div>
                ))}
                {p.exercises.length===0&&<div style={{fontSize:12,color:"#9DABBE"}}>Nuk ka ushtrime të caktuara</div>}
              </div>
            </div>
            <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:20}}>
              <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:4}}>Shënime Klinike</div>
              <div style={{fontSize:12,color:"#5A6A7E",marginBottom:16}}>{p.notes}</div>
              <div style={{fontSize:13,fontWeight:600,color:"#1A2332",marginBottom:12}}>Historia e Seancave</div>
              {Array.from({length:p.done},(_, i)=>{
                const daysAgo=p.done-i; const d=new Date(2026,3,1); d.setDate(d.getDate()-(daysAgo-1)*3);
                const dateStr=`${d.getDate().toString().padStart(2,"0")} ${["Jan","Feb","Mar","Apr","Maj","Qer"][d.getMonth()]} ${d.getFullYear()}`;
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,background:"#F8FAFF",border:"1px solid #E8ECF2",marginBottom:8}}>
                    <div style={{width:32,height:32,borderRadius:8,background:"#EBF4FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#2563EB",flexShrink:0}}>S{i+1}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:500,color:"#1A2332"}}>Seanca {i+1} â€” {p.type}</div>
                      <div style={{fontSize:11,color:"#9DABBE"}}>{dateStr} Â· {p.therapist}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:4,background:"#F0FDF4",padding:"4px 10px",borderRadius:20}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:"#22C55E"}}/>
                      <span style={{fontSize:11,fontWeight:600,color:"#15803D"}}>Kryer</span>
                    </div>
                  </div>
                );
              })}
              {p.done===0&&<div style={{padding:30,textAlign:"center",color:"#9DABBE",fontSize:13}}>Nuk ka seanca të regjistruara akoma.</div>}
            </div>
          </div>
        </div>
      );
    }

    // â”€â”€ LIST VIEW â”€â”€
    return (
      <div>
        {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Trajtimet</h1>
            <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>{filtered.length} plane trajtimi</p>
          </div>
          <button onClick={()=>setView("new")} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            <Icon name="plus" size={15} color="#fff"/> Plan i Ri
          </button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
          {[{l:"Plane Aktive",v:plans.filter(p=>p.status==="active").length,a:"blue",i:"treatments"},
            {l:"Të Kompletuara",v:plans.filter(p=>p.status==="completed").length,a:"green",i:"check"},
            {l:"Seanca Totale",v:plans.reduce((s,p)=>s+p.done,0),a:"amber",i:"calendar"},
            {l:"Të Ardhura",v:`€${plans.reduce((s,p)=>s+p.done*p.price,0).toLocaleString()}`,a:"green",i:"payments"}].map(x=>(
            <div key={x.l} style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:"18px 20px"}}>
              <div style={{width:36,height:36,borderRadius:10,background:x.a==="blue"?"#EBF4FF":x.a==="green"?"#F0FDF4":"#FFFBEB",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
                <Icon name={x.i} size={18} color={x.a==="blue"?"#2563EB":x.a==="green"?"#22C55E":"#F59E0B"}/>
              </div>
              <div style={{fontSize:26,fontWeight:700,color:"#1A2332"}}>{x.v}</div>
              <div style={{fontSize:12,color:"#5A6A7E",marginTop:5}}>{x.l}</div>
            </div>
          ))}
        </div>

        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {[{k:"all",l:"Të gjitha"},{k:"active",l:"Aktive"},{k:"completed",l:"Të kompletuara"}].map(f=>(
            <button key={f.k} onClick={()=>setFilterStatus(f.k)} style={{padding:"8px 16px",border:"1px solid",borderColor:filterStatus===f.k?"#2563EB":"#E8ECF2",borderRadius:9,background:filterStatus===f.k?"#EBF4FF":"#fff",color:filterStatus===f.k?"#2563EB":"#5A6A7E",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{f.l}</button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:14}}>
          {filtered.map(p=>{
            const pct=Math.round(p.done/p.sessions*100);
            return (
              <div key={p.id} style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"box-shadow .15s"}}
                onClick={()=>{setSelected(p);setView("detail");}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(37,99,235,.1)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{padding:"16px 18px",borderBottom:"1px solid #E8ECF2",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:p.status==="completed"?"#22C55E":"#2563EB",flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:"#1A2332"}}>{p.patient}</div>
                      <div style={{fontSize:11,color:"#9DABBE"}}>{p.therapist}</div>
                    </div>
                  </div>
                  <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:p.status==="completed"?"#F0FDF4":"#EBF4FF",color:p.status==="completed"?"#15803D":"#2563EB"}}>
                    {p.status==="completed"?"Kompletuar":"Aktiv"}
                  </span>
                </div>
                <div style={{padding:"14px 18px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                    <div style={{padding:"3px 10px",background:"#F1F3F7",borderRadius:20,fontSize:11,fontWeight:500,color:"#5A6A7E"}}>{p.type}</div>
                    <div style={{fontSize:11,color:"#9DABBE"}}>€{p.price}/seancë</div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:12,color:"#5A6A7E"}}>Progresi</span>
                    <span style={{fontSize:12,fontWeight:600,color:"#1A2332"}}>{p.done}/{p.sessions} seanca</span>
                  </div>
                  <div style={{background:"#F1F3F7",borderRadius:20,height:7,overflow:"hidden",marginBottom:12}}>
                    <div style={{height:"100%",borderRadius:20,background:pct>=100?"#22C55E":"linear-gradient(90deg,#4A90D9,#2563EB)",width:`${pct}%`,transition:"width .5s"}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:11,color:"#9DABBE"}}>{p.startDate}</span>
                    <span style={{fontSize:13,fontWeight:700,color:pct>=100?"#22C55E":"#2563EB"}}>{pct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // â”€â”€ SETTINGS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const SettingsPage = () => {
    const [activeTab,setActiveTab]=useState("profile");
    const [profile,setProfile]=useState({name:"Urimi Admin",email:"urimi@fizioapp.com",phone:"044 111 222",role:"Superadmin",clinic:"RehabPro Gjilan",language:"Shqip",timezone:"UTC+1"});
    const [clinic,setClinic]=useState({name:"RehabPro Gjilan",city:"Gjilan",address:"Rr. Dëshmorët e Kombit 8",phone:"0280 300 400",email:"gjilan@rehabpro.com",website:"www.rehabpro.com",taxId:"811234567"});
    const [notif,setNotif]=useState({emailAppt:true,smsAppt:true,emailPayment:true,smsPayment:false,reminderHours:24,emailReports:true,systemAlerts:true});
    const [security,setSecurity]=useState({currentPw:"",newPw:"",confirmPw:""});
    const [prices,setPrices]=useState([
      {id:1,service:"Fizioterapi",price:65,duration:45,active:true},
      {id:2,service:"Rehabilitim",price:80,duration:60,active:true},
      {id:3,service:"Masazh terapeutik",price:55,duration:45,active:true},
      {id:4,service:"Elektroterapi",price:75,duration:30,active:true},
      {id:5,service:"Ultrasonik",price:60,duration:30,active:true},
      {id:6,service:"Hidroterapi",price:90,duration:60,active:false},
      {id:7,service:"Lazer terapi",price:85,duration:30,active:true},
    ]);
    const [toast,setToast]=useState("");
    const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),2500);};

    const inpP=(k,v)=>setProfile(pr=>({...pr,[k]:v}));
    const inpC=(k,v)=>setClinic(pr=>({...pr,[k]:v}));
    const inpN=(k,v)=>setNotif(pr=>({...pr,[k]:v}));
    const inpS=(k,v)=>setSecurity(pr=>({...pr,[k]:v}));
    const togglePrice=(id)=>setPrices(prev=>prev.map(p=>p.id===id?{...p,active:!p.active}:p));
    const updatePrice=(id,field,val)=>setPrices(prev=>prev.map(p=>p.id===id?{...p,[field]:val}:p));

    const inputStyle={width:"100%",padding:"10px 13px",border:"1.5px solid #E8ECF2",borderRadius:9,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",boxSizing:"border-box",background:"#fff"};
    const saveBtn=(label,action)=>(
      <button onClick={()=>{action&&action();showToast("âœ“ Ndryshimet u ruajtën!");}}
        style={{padding:"10px 24px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
        {label||"Ruaj Ndryshimet"}
      </button>
    );
    const Toggle=({on,onChange})=>(
      <div onClick={()=>onChange(!on)} style={{width:44,height:24,borderRadius:12,background:on?"#2563EB":"#D1D5DB",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
        <div style={{position:"absolute",top:3,left:on?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
      </div>
    );

    const tabs=[{k:"profile",l:"Profili Im"},{k:"clinic",l:"Ordinanca"},{k:"notifications",l:"Njoftimet"},{k:"prices",l:"Ã‡mimet"},{k:"security",l:"Siguria"},{k:"appearance",l:"Pamja"}];

    return (
      <div>
        {toast&&<div style={{position:"fixed",top:24,right:24,background:"#1A2332",color:"#fff",padding:"12px 20px",borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}
        <div style={{marginBottom:24}}>
          <h1 style={{fontSize:22,fontWeight:700,color:"#1A2332",margin:0}}>Cilësimet</h1>
          <p style={{fontSize:13,color:"#5A6A7E",marginTop:4}}>Menaxho profilin, ordinancën dhe preferencat</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:20,alignItems:"start"}}>
          {/* Tab sidebar */}
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:8,position:"sticky",top:0}}>
            {tabs.map(t=>(
              <div key={t.k} onClick={()=>setActiveTab(t.k)}
                style={{padding:"10px 14px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:activeTab===t.k?600:400,
                  color:activeTab===t.k?"#2563EB":"#5A6A7E",background:activeTab===t.k?"#EBF4FF":"transparent",marginBottom:2,transition:"all .12s"}}
                onMouseEnter={e=>{if(activeTab!==t.k)e.currentTarget.style.background="#F5F7FF";}}
                onMouseLeave={e=>{if(activeTab!==t.k)e.currentTarget.style.background="transparent";}}>
                {t.l}
              </div>
            ))}
          </div>

          {/* Content */}
          <div style={{background:"#fff",border:"1px solid #E8ECF2",borderRadius:14,padding:28,minHeight:400}}>

            {/* PROFILE */}
            {activeTab==="profile"&&(
              <div>
                <div style={{fontSize:16,fontWeight:700,color:"#1A2332",marginBottom:6}}>Profili Im</div>
                <div style={{fontSize:13,color:"#5A6A7E",marginBottom:24}}>Menaxho informacionet personale</div>
                <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28,padding:16,background:"#F8FAFF",borderRadius:12,border:"1px solid #E8ECF2"}}>
                  <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#4A90D9,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",flexShrink:0}}>
                    {profile.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <div style={{fontSize:16,fontWeight:700,color:"#1A2332"}}>{profile.name}</div>
                    <div style={{fontSize:12,color:"#5A6A7E",marginTop:2}}>{profile.role} Â· {profile.clinic}</div>
                    <div style={{fontSize:11,color:"#9DABBE",marginTop:1}}>{profile.email}</div>
                  </div>
                  <button style={{marginLeft:"auto",padding:"7px 14px",border:"1px solid #E8ECF2",borderRadius:8,background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>
                    Ndrysho Foton
                  </button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                  {[{l:"Emri i plotë",k:"name"},{l:"Email",k:"email"},{l:"Telefon",k:"phone"},{l:"Gjuha",k:"language",type:"select",opts:["Shqip","English","Deutsch"]}].map(f=>(
                    <div key={f.k}>
                      <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>{f.l}</label>
                      {f.type==="select"?(
                        <select value={profile[f.k]} onChange={e=>inpP(f.k,e.target.value)} style={{...inputStyle,cursor:"pointer"}}>
                          {f.opts.map(o=><option key={o}>{o}</option>)}
                        </select>
                      ):(
                        <input value={profile[f.k]} onChange={e=>inpP(f.k,e.target.value)} style={inputStyle}
                          onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
                      )}
                    </div>
                  ))}
                </div>
                {saveBtn("Ruaj Profilin")}
              </div>
            )}

            {/* CLINIC */}
            {activeTab==="clinic"&&(
              <div>
                <div style={{fontSize:16,fontWeight:700,color:"#1A2332",marginBottom:6}}>Informacionet e Ordinancës</div>
                <div style={{fontSize:13,color:"#5A6A7E",marginBottom:24}}>Detajet zyrtare të ordinancës suaj</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                  {[{l:"Emri i Ordinancës",k:"name"},{l:"Qyteti",k:"city"},{l:"Telefon",k:"phone"},{l:"Email zyrtar",k:"email"},{l:"Faqja web",k:"website"},{l:"NUI/NIPT",k:"taxId"}].map(f=>(
                    <div key={f.k}>
                      <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>{f.l}</label>
                      <input value={clinic[f.k]} onChange={e=>inpC(f.k,e.target.value)} style={inputStyle}
                        onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
                    </div>
                  ))}
                </div>
                <div style={{marginBottom:20}}>
                  <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>Adresa e plotë</label>
                  <input value={clinic.address} onChange={e=>inpC("address",e.target.value)} style={inputStyle}
                    onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
                </div>
                {saveBtn("Ruaj Ndryshimet")}
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab==="notifications"&&(
              <div>
                <div style={{fontSize:16,fontWeight:700,color:"#1A2332",marginBottom:6}}>Cilësimet e Njoftimeve</div>
                <div style={{fontSize:13,color:"#5A6A7E",marginBottom:24}}>Kontrollo si dhe kur të njoftohet stafi dhe pacientët</div>
                {[
                  {section:"Terminet",items:[
                    {k:"emailAppt",l:"Email për termine të reja",d:"Merr email kur caktohet termin i ri"},
                    {k:"smsAppt",l:"SMS për termine",d:"Dërgo SMS konfirmimi pacientëve"},
                  ]},
                  {section:"Pagesat",items:[
                    {k:"emailPayment",l:"Email për pagesa",d:"Njoftim kur bëhet pagesa"},
                    {k:"smsPayment",l:"SMS për pagesa vonuara",d:"SMS automatik për faturat e vonuara"},
                  ]},
                  {section:"Sistemi",items:[
                    {k:"emailReports",l:"Raport javor me email",d:"Merr raport të performancës çdo javë"},
                    {k:"systemAlerts",l:"Njoftimet e sistemit",d:"Alarme për gabime dhe probleme teknike"},
                  ]},
                ].map(sec=>(
                  <div key={sec.section} style={{marginBottom:20}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#9DABBE",textTransform:"uppercase",letterSpacing:".07em",marginBottom:10}}>{sec.section}</div>
                    {sec.items.map(it=>(
                      <div key={it.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:"#F8FAFF",borderRadius:10,border:"1px solid #E8ECF2",marginBottom:8}}>
                        <div>
                          <div style={{fontSize:13,fontWeight:500,color:"#1A2332"}}>{it.l}</div>
                          <div style={{fontSize:11,color:"#9DABBE",marginTop:2}}>{it.d}</div>
                        </div>
                        <Toggle on={notif[it.k]} onChange={v=>inpN(it.k,v)}/>
                      </div>
                    ))}
                  </div>
                ))}
                <div style={{marginBottom:20}}>
                  <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:8}}>Kohë para terminit për reminder (orë)</label>
                  <div style={{display:"flex",gap:8}}>
                    {[1,2,12,24,48].map(h=>(
                      <button key={h} onClick={()=>inpN("reminderHours",h)}
                        style={{padding:"8px 16px",border:"1px solid",borderColor:notif.reminderHours===h?"#2563EB":"#E8ECF2",borderRadius:8,background:notif.reminderHours===h?"#EBF4FF":"#fff",color:notif.reminderHours===h?"#2563EB":"#5A6A7E",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                        {h}h
                      </button>
                    ))}
                  </div>
                </div>
                {saveBtn("Ruaj Cilësimet")}
              </div>
            )}

            {/* PRICES */}
            {activeTab==="prices"&&(
              <div>
                <div style={{fontSize:16,fontWeight:700,color:"#1A2332",marginBottom:6}}>Lista e Ã‡mimeve</div>
                <div style={{fontSize:13,color:"#5A6A7E",marginBottom:24}}>Cakto çmimet dhe kohëzgjatjen për çdo shërbim</div>
                <div style={{background:"#F8FAFF",borderRadius:12,overflow:"hidden",border:"1px solid #E8ECF2",marginBottom:20}}>
                  <div style={{display:"grid",gridTemplateColumns:"2fr 100px 90px 80px",padding:"10px 16px",borderBottom:"1px solid #E8ECF2",fontSize:11,fontWeight:700,color:"#9DABBE",textTransform:"uppercase",letterSpacing:".06em"}}>
                    <span>Shërbimi</span><span>Ã‡mimi (€)</span><span>Kohëzgjatja</span><span>Aktiv</span>
                  </div>
                  {prices.map(p=>(
                    <div key={p.id} style={{display:"grid",gridTemplateColumns:"2fr 100px 90px 80px",padding:"12px 16px",borderBottom:"1px solid #F1F3F7",alignItems:"center",background:p.active?"transparent":"#FAFAFA"}}
                      onMouseEnter={e=>e.currentTarget.style.background=p.active?"#F5F8FF":"#F5F5F5"}
                      onMouseLeave={e=>e.currentTarget.style.background=p.active?"transparent":"#FAFAFA"}>
                      <span style={{fontSize:13,fontWeight:500,color:p.active?"#1A2332":"#9DABBE"}}>{p.service}</span>
                      <div style={{display:"flex",alignItems:"center",gap:4}}>
                        <span style={{fontSize:12,color:"#9DABBE"}}>€</span>
                        <input type="number" value={p.price} onChange={e=>updatePrice(p.id,"price",parseInt(e.target.value)||0)}
                          style={{width:60,padding:"5px 8px",border:"1px solid #E8ECF2",borderRadius:6,fontSize:12,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",textAlign:"center"}}
                          onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:4}}>
                        <input type="number" value={p.duration} onChange={e=>updatePrice(p.id,"duration",parseInt(e.target.value)||0)}
                          style={{width:50,padding:"5px 8px",border:"1px solid #E8ECF2",borderRadius:6,fontSize:12,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#1A2332",textAlign:"center"}}
                          onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
                        <span style={{fontSize:11,color:"#9DABBE"}}>min</span>
                      </div>
                      <Toggle on={p.active} onChange={()=>togglePrice(p.id)}/>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:10}}>
                  {saveBtn("Ruaj Ã‡mimet")}
                  <button onClick={()=>setPrices(prev=>[...prev,{id:Date.now(),service:"Shërbim i Ri",price:60,duration:45,active:true}])}
                    style={{padding:"10px 18px",border:"1px solid #E8ECF2",borderRadius:9,background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",color:"#5A6A7E",fontFamily:"'DM Sans',sans-serif"}}>
                    + Shto Shërbim
                  </button>
                </div>
              </div>
            )}

            {/* SECURITY */}
            {activeTab==="security"&&(
              <div>
                <div style={{fontSize:16,fontWeight:700,color:"#1A2332",marginBottom:6}}>Siguria e Llogarisë</div>
                <div style={{fontSize:13,color:"#5A6A7E",marginBottom:24}}>Ndrysho fjalëkalimin dhe cilësimet e sigurisë</div>
                <div style={{maxWidth:400}}>
                  {[{l:"Fjalëkalimi aktual",k:"currentPw"},{l:"Fjalëkalimi i ri",k:"newPw"},{l:"Konfirmo fjalëkalimin e ri",k:"confirmPw"}].map(f=>(
                    <div key={f.k} style={{marginBottom:16}}>
                      <label style={{fontSize:12,fontWeight:600,color:"#5A6A7E",display:"block",marginBottom:6}}>{f.l}</label>
                      <input type="password" value={security[f.k]} onChange={e=>inpS(f.k,e.target.value)} style={inputStyle}
                        onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#E8ECF2"}/>
                    </div>
                  ))}
                  {security.newPw&&security.confirmPw&&security.newPw!==security.confirmPw&&(
                    <div style={{padding:"10px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:9,fontSize:12,color:"#991B1B",marginBottom:16}}>
                      âš  Fjalëkalimet nuk përputhen
                    </div>
                  )}
                  {saveBtn("Ndrysho Fjalëkalimin")}
                </div>
                <div style={{marginTop:32,paddingTop:24,borderTop:"1px solid #E8ECF2"}}>
                  <div style={{fontSize:14,fontWeight:600,color:"#1A2332",marginBottom:6}}>Sesionet Aktive</div>
                  <div style={{fontSize:13,color:"#5A6A7E",marginBottom:16}}>Pajisjet ku jeni të kyçur aktualisht</div>
                  {[{d:"Windows 11 Â· Chrome",l:"Gjilan, Kosovë",t:"Aktiv tani",c:"#22C55E"},{d:"iPhone 14 Â· Safari",l:"Prishtinë, Kosovë",t:"3 orë më parë",c:"#F59E0B"}].map((s,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:"#F8FAFF",borderRadius:10,border:"1px solid #E8ECF2",marginBottom:8}}>
                      <div style={{width:36,height:36,borderRadius:9,background:"#EBF4FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                        {i===0?"ðŸ’»":"ðŸ“±"}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:500,color:"#1A2332"}}>{s.d}</div>
                        <div style={{fontSize:11,color:"#9DABBE"}}>{s.l}</div>
                      </div>
                      <span style={{fontSize:11,fontWeight:600,color:s.c}}>{s.t}</span>
                      {i!==0&&<button style={{padding:"5px 12px",border:"1px solid #FECACA",borderRadius:7,background:"#FEF2F2",fontSize:11,color:"#991B1B",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Dil</button>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APPEARANCE */}
            {activeTab==="appearance"&&(
              <div>
                <div style={{fontSize:16,fontWeight:700,color:"#1A2332",marginBottom:6}}>Pamja e Aplikacionit</div>
                <div style={{fontSize:13,color:"#5A6A7E",marginBottom:24}}>Personalizo pamjen dhe ndërfaqen</div>
                <div style={{marginBottom:24}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#5A6A7E",marginBottom:12,textTransform:"uppercase",letterSpacing:".07em"}}>Tema</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                    {[{k:"light",l:"E Bardhë",desc:"Minimalist & e pastër",preview:"#FAFAFA"},
                      {k:"blue",l:"Blu Profesionale",desc:"Kryesore aktuale",preview:"#EBF4FF"},
                      {k:"dark",l:"E Errët",desc:"Rehat nate",preview:"#1A2332"}].map(t=>(
                      <div key={t.k} style={{border:"2px solid",borderColor:t.k==="blue"?"#2563EB":"#E8ECF2",borderRadius:12,padding:16,cursor:"pointer",textAlign:"center",background:t.k==="blue"?"#EBF4FF":"#fff"}}>
                        <div style={{width:"100%",height:48,borderRadius:8,background:t.preview,border:"1px solid #E8ECF2",marginBottom:10}}/>
                        <div style={{fontSize:13,fontWeight:600,color:t.k==="blue"?"#2563EB":"#1A2332"}}>{t.l}</div>
                        <div style={{fontSize:11,color:"#9DABBE",marginTop:2}}>{t.desc}</div>
                        {t.k==="blue"&&<div style={{fontSize:10,fontWeight:700,color:"#2563EB",marginTop:6}}>âœ“ AKTIVE</div>}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:24}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#5A6A7E",marginBottom:12,textTransform:"uppercase",letterSpacing:".07em"}}>Madhësia e shkronjave</div>
                  <div style={{display:"flex",gap:8}}>
                    {["E vogël","Normale","E madhe"].map((s,i)=>(
                      <button key={s} style={{padding:"8px 20px",border:"1px solid",borderColor:i===1?"#2563EB":"#E8ECF2",borderRadius:9,background:i===1?"#EBF4FF":"#fff",color:i===1?"#2563EB":"#5A6A7E",fontSize:12+i,fontWeight:i===1?600:400,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{s}</button>
                    ))}
                  </div>
                </div>
                {saveBtn("Apliko Ndryshimet")}
              </div>
            )}

          </div>
        </div>
      </div>
    );
  };

  const renderPage=()=>{
    if(page==="dashboard") return isSuperadmin
      ? <SuperadminDashboard clinics={clinics} onDeleteClinic={onDeleteClinic} onUpdateClinic={onUpdateClinic} />
      : <Dashboard user={user}/>;
    if(page==="patients") return <PatientsPage initialSelected={patientToOpen} key={patientToOpen?.id||"list"}/>;
    if(page==="appointments") return <AppointmentsPage/>;
    if(page==="payments") return <PaymentsPage/>;
    if(page==="treatments") return <TreatmentsPage/>;
    if(page==="clinics") return <ClinicsPage clinics={clinics} setClinics={setClinics}/>;
    if(page==="reports") return <ReportsPage clinics={clinics}/>;
    if(page==="settings") return <SettingsPage/>;
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"50vh",color:"#9DABBE"}}>
        <div style={{fontSize:40,marginBottom:12}}>ðŸš§</div>
        <div style={{fontSize:16,fontWeight:600,color:"#5A6A7E"}}>Duke u ndërtuar...</div>
        <div style={{fontSize:13,marginTop:6}}>Ky seksion vjen së shpejti</div>
      </div>
    );
  };

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',sans-serif",background:"#F8FAFF",overflow:"hidden"}}>
      <aside style={{width:240,background:"#fff",borderRight:"1px solid #E8ECF2",display:"flex",flexDirection:"column",flexShrink:0,height:"100vh"}}>
        <div style={{padding:"18px 18px 14px",borderBottom:"1px solid #E8ECF2",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#4A90D9,#1D4ED8)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 3px 10px rgba(37,99,235,0.3)"}}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="5.5" r="2.8" stroke="white" strokeWidth="1.9"/>
              <path d="M10.5 11.5c1.5-1.3 3.3-2 5.5-2s4 .7 5.5 2" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
              <path d="M16 13v7.5" stroke="white" strokeWidth="2.1" strokeLinecap="round"/>
              <path d="M10 14.5l2.5 3.5" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
              <path d="M22 14.5l-2.5 3.5" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
              <path d="M13.5 20.5L11.5 27" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
              <path d="M18.5 20.5L20.5 27" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
              <path d="M11 15.5h10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2.5"/>
            </svg>
          </div>
          <span style={{fontSize:20,fontWeight:700,color:"#1A2332",letterSpacing:"-0.5px"}}>Fizio<span style={{color:"#2563EB"}}>app</span></span>
        </div>
        {isSuperadmin&&(
          <div style={{margin:"10px 12px 0",padding:"8px 12px",background:"linear-gradient(135deg,#EBF4FF,#F0F7FF)",border:"1px solid #BFDBFE",borderRadius:10}}>
            <div style={{fontSize:10,fontWeight:700,color:"#2563EB",letterSpacing:".06em"}}>SUPERADMIN</div>
            <div style={{fontSize:11,color:"#5A6A7E",marginTop:1}}>Kontroll i plotë i sistemit</div>
          </div>
        )}
        {!isSuperadmin&&userClinic&&(
          <div style={{margin:"10px 12px 0",padding:"8px 12px",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:10}}>
            <div style={{fontSize:10,fontWeight:700,color:"#15803D",letterSpacing:".06em"}}>ORDINANCA</div>
            <div style={{fontSize:12,fontWeight:600,color:"#1A2332",marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{userClinic.name}</div>
          </div>
        )}
        <nav style={{padding:"10px 0",flex:1,overflowY:"auto"}}>
          <div style={{padding:"0 12px 6px"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#C4CCDA",letterSpacing:".08em",textTransform:"uppercase",padding:"6px 8px 4px"}}>Kryesore</div>
            {visibleNav.slice(0,4).map(n=>(
              <div key={n.id} onClick={()=>{setPage(n.id);setPatientToOpen(null);}}
                style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:9,cursor:"pointer",marginBottom:2,background:page===n.id?"#EBF4FF":"transparent",color:page===n.id?"#2563EB":"#5A6A7E",fontWeight:page===n.id?600:400,fontSize:13}}
                onMouseEnter={e=>{if(page!==n.id){e.currentTarget.style.background="#F5F7FF";e.currentTarget.style.color="#1A2332";}}}
                onMouseLeave={e=>{if(page!==n.id){e.currentTarget.style.background="transparent";e.currentTarget.style.color="#5A6A7E";}}}>
                <Icon name={n.icon} size={16} color={page===n.id?"#2563EB":"#9DABBE"}/>
                <span style={{flex:1}}>{n.label}</span>
                {n.badge&&<span style={{background:page===n.id?"#2563EB":"#F1F3F7",color:page===n.id?"#fff":"#5A6A7E",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20}}>{n.badge}</span>}
              </div>
            ))}
          </div>
          <div style={{padding:"0 12px 6px"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#C4CCDA",letterSpacing:".08em",textTransform:"uppercase",padding:"6px 8px 4px"}}>Menaxhimi</div>
            {visibleNav.slice(4).map(n=>(
              <div key={n.id} onClick={()=>{setPage(n.id);setPatientToOpen(null);}}
                style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:9,cursor:"pointer",marginBottom:2,background:page===n.id?"#EBF4FF":"transparent",color:page===n.id?"#2563EB":"#5A6A7E",fontWeight:page===n.id?600:400,fontSize:13}}
                onMouseEnter={e=>{if(page!==n.id){e.currentTarget.style.background="#F5F7FF";e.currentTarget.style.color="#1A2332";}}}
                onMouseLeave={e=>{if(page!==n.id){e.currentTarget.style.background="transparent";e.currentTarget.style.color="#5A6A7E";}}}>
                <Icon name={n.icon} size={16} color={page===n.id?"#2563EB":"#9DABBE"}/>
                <span>{n.label}</span>
                {n.id==="clinics"&&<span style={{marginLeft:"auto",background:"#FEF2F2",color:"#991B1B",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20}}>SU</span>}
              </div>
            ))}
          </div>
        </nav>
        <div style={{padding:"12px 16px",borderTop:"1px solid #E8ECF2"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <Avatar name={user.name||( isSuperadmin?"Urimi Admin":user.role==="admin"?"Admin":"Fizioterapis")} size={34} bg="linear-gradient(135deg,#4A90D9,#2563EB)" color="#fff"/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:"#1A2332",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                {user.name||(isSuperadmin?"Urimi Admin":user.role==="admin"?"Admin Klinikës":"Fizioterapis")}
              </div>
              <div style={{fontSize:11,color:"#9DABBE"}}>{roleLabel}</div>
            </div>
          </div>
          <div onClick={()=>{setUser(null);setLoginMode("pin");}} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,cursor:"pointer",color:"#9DABBE",fontSize:12,fontWeight:500,border:"1px solid #F1F3F7"}}
            onMouseEnter={e=>{e.currentTarget.style.background="#FEF2F2";e.currentTarget.style.color="#991B1B";e.currentTarget.style.borderColor="#FECACA";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#9DABBE";e.currentTarget.style.borderColor="#F1F3F7";}}>
            <Icon name="logout" size={13} color="currentColor"/> Dil nga llogaria
          </div>
        </div>
      </aside>

      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{background:"#fff",borderBottom:"1px solid #E8ECF2",padding:"0 24px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontSize:15,fontWeight:600,color:"#1A2332"}}>
            {visibleNav.find(n=>n.id===page)?.label||"Dashboard"}
            {!isSuperadmin&&userClinic&&<span style={{fontSize:12,color:"#9DABBE",fontWeight:400,marginLeft:10}}>â€” {userClinic.name}</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {!isSuperadmin&&<GlobalSearch onNavigate={handleNavigate}/>}
            <div style={{width:36,height:36,borderRadius:9,border:"1px solid #E8ECF2",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}}>
              <Icon name="bell" size={16} color="#5A6A7E"/>
              <div style={{position:"absolute",top:7,right:7,width:6,height:6,background:"#EF4444",borderRadius:"50%",border:"1.5px solid #fff"}}/>
            </div>
            {!isSuperadmin&&(
              <button style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",background:"linear-gradient(135deg,#4A90D9,#2563EB)",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                <Icon name="plus" size={14} color="#fff"/>
                {page==="patients"?"Pacient i Ri":page==="appointments"?"Termin i Ri":"Shto të Re"}
              </button>
            )}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"22px 24px"}}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}









