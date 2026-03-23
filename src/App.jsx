import React, { useState, useEffect, useRef } from "react";

/* ── Logo SVG ── */
function Logo({ size = 36, dark = false }) {
  const bowl = dark ? "rgba(255,255,255,0.92)" : "white";
  const id = dark ? "bgD" : "bgL";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d={`M10 52 Q10 90 50 90 Q90 90 90 52 Z`} fill={bowl} opacity="0.92"/>
      <ellipse cx="50" cy="78" rx="26" ry="14" fill={`url(#${id})`} opacity="0.65"/>
      <circle cx="50" cy="38" r="22" fill="#E8552A"/>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8552A" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#E8552A" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Global CSS ── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --accent:#E8552A;--accent2:#ff8a65;
  --ink:#0c0c0e;--ink2:#2c2c2e;--ink3:#48484a;--ink4:#98989e;
  --bg:#dcdce2;--bg2:#d2d2d8;--white:#ffffff;
  --green:#30d158;--blue:#0a84ff;--gold:#ffd60a;--purple:#bf5af2;--teal:#32ade6;
  --g1:rgba(255,255,255,0.72);
  --g2:rgba(255,255,255,0.52);
  --g3:rgba(255,255,255,0.36);
  --gb:blur(28px);
  --gb2:blur(18px);
  --gshadow:0 8px 32px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.95),inset 0 -1px 0 rgba(0,0,0,0.03);
  --gshadow-lg:0 24px 64px rgba(0,0,0,0.12),0 4px 16px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.96);
  --gborder:1px solid rgba(255,255,255,0.88);
  --gborder2:1px solid rgba(255,255,255,0.72);
}
html{scroll-behavior:smooth;overflow-x:hidden}
body{background:var(--bg);color:var(--ink);font-family:'Manrope',sans-serif;-webkit-font-smoothing:antialiased;line-height:1}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.15);border-radius:3px}

/* ─ LOADER ─ */
.ld{position:fixed;inset:0;z-index:9999;background:#080808;display:flex;align-items:center;justify-content:center;flex-direction:column;overflow:hidden;transition:opacity 1.1s,visibility 1.1s}
.ld.out{opacity:0;visibility:hidden;pointer-events:none}
.ld-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(232,85,42,0.14) 0%,transparent 70%);pointer-events:none}
.ld-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px);background-size:40px 40px;opacity:0;animation:dotsIn 1s ease 0.1s forwards}
@keyframes dotsIn{to{opacity:1}}
.ld-ripple{--sz:200px;width:var(--sz);height:var(--sz);position:relative;margin-bottom:36px;animation:rIn 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.2s both}
@keyframes rIn{from{opacity:0;transform:scale(0.3) rotate(-15deg)}to{opacity:1;transform:scale(1) rotate(0)}}
.ld-ring{position:absolute;border-radius:50%;background:linear-gradient(160deg,rgba(232,85,42,0.18),rgba(232,85,42,0.04));border-top:1px solid rgba(232,85,42,0.9);backdrop-filter:blur(4px);animation:ring 2s ease-in-out infinite}
.ld-ring:nth-child(1){inset:40%;z-index:9;border-color:rgba(232,85,42,1)}
.ld-ring:nth-child(2){inset:30%;z-index:8;border-color:rgba(232,85,42,0.7);animation-delay:.2s}
.ld-ring:nth-child(3){inset:20%;z-index:7;border-color:rgba(232,85,42,0.5);animation-delay:.4s}
.ld-ring:nth-child(4){inset:10%;z-index:6;border-color:rgba(232,85,42,0.3);animation-delay:.6s}
.ld-ring:nth-child(5){inset:0;z-index:5;border-color:rgba(232,85,42,0.15);animation-delay:.8s}
.ld-icon{position:absolute;inset:0;display:grid;place-content:center;padding:31%;z-index:10}
@keyframes ring{0%,100%{transform:scale(1);box-shadow:0 8px 20px rgba(0,0,0,0.4)}50%{transform:scale(1.28);box-shadow:0 24px 40px rgba(0,0,0,0.28)}}
.ld-clip{overflow:hidden}
.ld-name{font-size:clamp(56px,10vw,100px);font-weight:900;letter-spacing:-4px;color:#fff;position:relative;animation:nameUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both}
@keyframes nameUp{from{transform:translateY(110%);opacity:0}to{transform:translateY(0);opacity:1}}
.ld-shine{position:absolute;inset:0;background:linear-gradient(120deg,transparent 0%,#fff 30%,rgba(232,85,42,0.9) 55%,#fff 80%,transparent 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;clip-path:inset(0 100% 0 0);animation:shine 1.2s cubic-bezier(0.77,0,0.175,1) 1.4s forwards}
@keyframes shine{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.ld-sub{font-size:11px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.22);margin-top:14px;animation:fadeUp 0.6s 2s both}
.ld-bar{position:absolute;bottom:0;left:0;height:2px;background:linear-gradient(90deg,#E8552A,#ff8a65,transparent);animation:barW 2.2s ease forwards}
@keyframes barW{from{width:0}to{width:100%}}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* ─ NAV ─ */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 48px;transition:all 0.35s}
.nav.filled{background:rgba(240,240,244,0.82);backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);border-bottom:1px solid rgba(255,255,255,0.7);box-shadow:0 1px 0 rgba(0,0,0,0.05),0 4px 24px rgba(0,0,0,0.06)}
.nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none}
.nav-name{font-size:18px;font-weight:900;color:var(--ink);letter-spacing:-0.5px}
.nl{font-size:13px;font-weight:500;color:var(--ink3);text-decoration:none;transition:color 0.2s}
.nl:hover{color:var(--accent)}
.nav-btn{padding:9px 20px;background:rgba(12,12,14,0.88);backdrop-filter:blur(12px);color:#fff;font-size:13px;font-weight:700;border-radius:999px;text-decoration:none;transition:all 0.22s;letter-spacing:-0.1px;border:1px solid rgba(255,255,255,0.08)}
.nav-btn:hover{background:var(--accent);transform:scale(1.04)}

/* ─ SCROLL REVEAL ─ */
.sr{opacity:0;transform:translateY(44px);transition:opacity 1s cubic-bezier(0.16,1,0.3,1),transform 1s cubic-bezier(0.16,1,0.3,1)}
.sr.on{opacity:1;transform:translateY(0)}

/* ─ SECTION LABEL ─ */
.sec-label{display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:var(--accent);margin-bottom:16px}
.sec-label::before,.sec-label::after{content:'';width:18px;height:1px;background:var(--accent)}

/* ─ HERO ─ */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:110px 48px 72px;text-align:center;position:relative;overflow:hidden;background:linear-gradient(180deg,#dedee4 0%,#d5d5dc 55%,#cecdd5 100%)}
.hero-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,0.04) 1.2px,transparent 1.2px);background-size:28px 28px;pointer-events:none;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,#000 0%,transparent 100%)}
.hero-orb1{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(232,85,42,0.09) 0%,transparent 70%);top:-280px;left:50%;transform:translateX(-50%);pointer-events:none}
.hero-orb2{position:absolute;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(10,132,255,0.07) 0%,transparent 70%);bottom:-150px;right:-100px;pointer-events:none}
.hero-orb3{position:absolute;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(191,90,242,0.06) 0%,transparent 70%);bottom:0;left:-80px;pointer-events:none}

/* ─ GLASS SURFACES — universal tokens ─ */
.g-card{background:var(--g1);backdrop-filter:var(--gb);-webkit-backdrop-filter:var(--gb);border:var(--gborder);box-shadow:var(--gshadow)}
.g-card-sm{background:var(--g2);backdrop-filter:var(--gb2);-webkit-backdrop-filter:var(--gb2);border:var(--gborder2);box-shadow:0 4px 16px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.9)}
.g-row-even{background:rgba(255,255,255,0.62);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.g-row-odd{background:rgba(248,248,252,0.58);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.g-header{background:rgba(235,235,241,0.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.7)}
.g-bar{background:rgba(238,238,244,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.g-inset{background:rgba(230,230,238,0.7);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.6)}

/* ─ PREVIEW WINDOW ─ */
.pwin{background:rgba(255,255,255,0.76);backdrop-filter:blur(36px);-webkit-backdrop-filter:blur(36px);border:1px solid rgba(255,255,255,0.92);border-radius:24px;box-shadow:0 48px 100px rgba(0,0,0,0.16),0 8px 28px rgba(0,0,0,0.07),inset 0 1px 0 rgba(255,255,255,0.98);overflow:hidden}
.pwin-bar{background:rgba(232,232,238,0.94);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.7)}
.pwin-dot{width:12px;height:12px;border-radius:50%}
.pwin-tabs{display:flex;gap:2px;background:rgba(195,195,204,0.65);border-radius:10px;padding:3px;backdrop-filter:blur(10px)}
.pwin-tab{padding:6px 18px;border-radius:8px;border:none;font-size:12px;font-weight:700;font-family:'Manrope',sans-serif;cursor:pointer;transition:all 0.18s;white-space:nowrap}
.pwin-kpi-cell{flex:1;padding:22px 12px;text-align:center;position:relative;overflow:hidden;background:rgba(255,255,255,0.5);backdrop-filter:blur(12px)}
.pwin-kpi-cell+.pwin-kpi-cell{border-left:1px solid rgba(255,255,255,0.7)}
.pwin-tbl-head{display:grid;padding:10px 20px;background:rgba(230,230,238,0.88);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.65)}
.pwin-tbl-row-e{display:grid;padding:13px 20px;border-bottom:1px solid rgba(255,255,255,0.5);background:rgba(255,255,255,0.58);backdrop-filter:blur(14px);align-items:center;transition:background 0.15s}
.pwin-tbl-row-o{display:grid;padding:13px 20px;border-bottom:1px solid rgba(255,255,255,0.5);background:rgba(245,245,252,0.55);backdrop-filter:blur(14px);align-items:center;transition:background 0.15s}
.pwin-tbl-row-e:hover,.pwin-tbl-row-o:hover{background:rgba(255,255,255,0.75)}
.pwin-action-bar{padding:11px 20px;background:rgba(230,230,238,0.92);backdrop-filter:blur(20px);display:flex;gap:8px;border-top:1px solid rgba(255,255,255,0.65)}
.pwin-action-btn{padding:6px 12px;background:rgba(255,255,255,0.88);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.95);border-radius:8px;font-size:11px;font-weight:700;color:#3a3a3c;cursor:default;font-family:'Manrope',sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.pwin-ticket{padding:14px 16px;border-radius:14px;margin-bottom:8px;border:1px solid rgba(255,255,255,0.75);transition:all 0.2s;backdrop-filter:blur(14px)}
.pwin-ticket:hover{transform:translateX(3px)}
.pwin-q-card{border-radius:14px;padding:14px 16px;margin-bottom:9px;display:flex;align-items:center;gap:13px;backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.72);transition:all 0.2s}
.pwin-q-card:hover{transform:translateX(3px)}

/* ─ STAT BOX ─ */
.stat-box{background:rgba(255,255,255,0.72);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,0.92);border-radius:22px;padding:32px 20px;text-align:center;transition:all 0.32s cubic-bezier(0.16,1,0.3,1);box-shadow:0 6px 24px rgba(0,0,0,0.07),inset 0 1px 0 rgba(255,255,255,0.98),inset 0 -1px 0 rgba(0,0,0,0.02)}
.stat-box:hover{transform:translateY(-7px);background:rgba(255,255,255,0.88)}

/* ─ GLASS SECTION WRAP ─ */
.glass-section{background:rgba(255,255,255,0.38);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border-top:1px solid rgba(255,255,255,0.75);border-bottom:1px solid rgba(255,255,255,0.75)}
.glass-section-alt{background:rgba(248,248,254,0.42);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-top:1px solid rgba(255,255,255,0.7);border-bottom:1px solid rgba(255,255,255,0.7)}

/* ─ MODULE CARD ─ */
.mc{background:rgba(255,255,255,0.68);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,0.88);border-radius:24px;overflow:hidden;transition:all 0.38s cubic-bezier(0.16,1,0.3,1);cursor:default;box-shadow:0 6px 28px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.96)}
.mc:hover{transform:translateY(-9px);box-shadow:0 36px 80px rgba(0,0,0,0.13);border-color:rgba(255,255,255,0.98);background:rgba(255,255,255,0.82)}
.mc-img{width:100%;height:170px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.mc-body{padding:28px 28px 32px}
.mc-pill{padding:4px 12px;border-radius:99px;font-size:10px;font-weight:600;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.8);color:var(--ink3);font-family:'Manrope',sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.05)}
.mc-expand{background:rgba(255,255,255,0.6);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.82);border-radius:14px;padding:16px}

/* ─ MOCKUP WIN ─ */
.mwin{background:rgba(255,255,255,0.82);backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);border:1px solid rgba(255,255,255,0.94);border-radius:22px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,0.13),0 6px 24px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.98)}
.mwin-chrome{background:rgba(230,230,238,0.94);backdrop-filter:blur(20px);padding:13px 18px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.72)}
.mwin-dot{width:11px;height:11px;border-radius:50%}
.mwin-kpi{background:rgba(255,255,255,0.52);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.65)}
.mwin-row-e{background:rgba(255,255,255,0.62);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.5)}
.mwin-row-o{background:rgba(245,245,252,0.58);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.5)}
.mwin-q-row{background:rgba(235,235,244,0.78);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.72);border-radius:13px}
.mwin-doc-row{backdrop-filter:blur(14px);border:1px solid rgba(0,0,0,0.04);border-radius:12px}
.mwin-footer{background:rgba(230,230,238,0.92);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.65)}

/* ─ CURSOR CARDS ─ */
.cc{background:rgba(255,255,255,0.65);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:26px;position:relative;overflow:hidden;transition:all 0.32s cubic-bezier(0.16,1,0.3,1);cursor:default;box-shadow:0 4px 20px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.98)}
.cc:hover{transform:translateY(-7px);box-shadow:0 24px 56px rgba(0,0,0,0.1);border-color:rgba(255,255,255,0.98);background:rgba(255,255,255,0.82)}
.cc-stripe{position:absolute;bottom:0;left:0;right:0;height:3px;border-radius:0 0 20px 20px;opacity:0;transition:opacity 0.3s}
.cc:hover .cc-stripe{opacity:1}
.cc-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.82);box-shadow:0 2px 10px rgba(0,0,0,0.06)}

/* ─ CHIP / BADGE ─ */
.chip{padding:6px 14px;background:rgba(255,255,255,0.78);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.92);border-radius:99px;font-size:12px;color:var(--ink);font-weight:700;font-family:'Manrope',sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:inline-block}

/* ─ SVC ROW ─ */
.svc-row{background:rgba(255,255,255,0.04);padding:22px 30px;display:flex;align-items:center;gap:20px;border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s}
.svc-row:hover{background:rgba(255,255,255,0.1)}
.svc-row:last-child{border-bottom:none}

/* ─ TESTI ─ */
.tc{background:rgba(255,255,255,0.66);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,0.90);border-radius:24px;padding:32px;box-shadow:0 6px 28px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.98)}
.tc:hover{transform:translateY(-4px);box-shadow:0 20px 56px rgba(0,0,0,0.09)}
.tc{transition:all 0.3s}

/* ─ DEPT CARD ─ */
.dc{background:rgba(255,255,255,0.64);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:26px;transition:all 0.3s;box-shadow:0 4px 18px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.96)}
.dc:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(0,0,0,0.1);background:rgba(255,255,255,0.82)}

/* ─ STATS DARK ─ */
.sd-num{font-size:44px;font-weight:900;letter-spacing:-2px;line-height:1}
.sd-cell{padding:40px 28px;backdrop-filter:blur(16px);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);transition:background 0.3s}
.sd-cell:hover{background:rgba(255,255,255,0.08)}

/* ─ BADGE ─ */
.badge-live{background:rgba(48,209,88,0.15);backdrop-filter:blur(8px);color:#1a8038;border:1px solid rgba(48,209,88,0.3)}
.badge-soon{background:rgba(255,159,10,0.14);backdrop-filter:blur(8px);color:#9b6400;border:1px solid rgba(255,159,10,0.28)}
.badge-plan{background:rgba(10,132,255,0.12);backdrop-filter:blur(8px);color:#0055aa;border:1px solid rgba(10,132,255,0.22)}

/* ─ HOW STEP ─ */
.how-step:hover .step-num{background:var(--accent);color:#fff;border-color:transparent}

@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(48,209,88,0.4)}50%{box-shadow:0 0 0 6px rgba(48,209,88,0)}}
@keyframes dp{0%,100%{box-shadow:0 0 8px #30d158}50%{box-shadow:0 0 20px #30d158}}

@media(max-width:900px){
  .nav{padding:0 20px}.nav-links{display:none!important}
  .hero{padding:96px 20px 48px}
  .hero-grid{grid-template-columns:1fr!important}
  .g2{grid-template-columns:1fr!important}
  .g3{grid-template-columns:1fr!important}
  .g4{grid-template-columns:1fr 1fr!important}
  .ms-grid{grid-template-columns:1fr!important}
}
`;

/* ── HOOKS ─────────────────────────────────────────────────── */
function useSY(){ const [y,setY]=useState(0); useEffect(()=>{ const fn=()=>setY(window.scrollY); window.addEventListener("scroll",fn,{passive:true}); fn(); return()=>window.removeEventListener("scroll",fn); },[]); return y; }
function useRv(t=0.08){ const r=useRef(null); const [v,sv]=useState(false); useEffect(()=>{ const el=r.current; if(!el)return; const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting){sv(true);o.disconnect();} },{threshold:t}); o.observe(el); return()=>o.disconnect(); },[t]); return[r,v]; }
function Sr({children,d=0,style={}}){ const[r,v]=useRv(0.07); return <div ref={r} className={`sr${v?" on":""}`} style={{transitionDelay:`${d}s`,...style}}>{children}</div>; }

/* ── LOADER ─────────────────────────────────────────────────── */
function Loader({out}){
  return(
    <div className={`ld${out?" out":""}`}>
      <div className="ld-bg"/><div className="ld-dots"/>
      <div className="ld-ripple">
        <div className="ld-icon"><Logo size={60} dark/></div>
        {[1,2,3,4,5].map(i=><div key={i} className="ld-ring"/>)}
      </div>
      <div className="ld-clip"><div className="ld-name">SpaceO<div className="ld-shine">SpaceO</div></div></div>
      <div className="ld-sub">Hospital Intelligence Platform</div>
      <div className="ld-bar"/>
    </div>
  );
}

/* ── NAV ────────────────────────────────────────────────────── */
function Nav(){
  const y=useSY();
  return(
    <nav className={`nav${y>24?" filled":""}`}>
      <a href="#" className="nav-brand">
        <Logo size={32}/><span className="nav-name">SpaceO</span>
      </a>
      <div className="nav-links" style={{display:"flex",alignItems:"center",gap:28}}>
        {["Platform","Modules","Services","Contact"].map(l=><a key={l} href={`#${l.toLowerCase()}`} className="nl">{l}</a>)}
        <a href="mailto:spaceo@aims.in" className="nav-btn">Get Demo →</a>
      </div>
    </nav>
  );
}

/* ── HERO PREVIEW (interactive tabs) ───────────────────────── */
function HeroPreview(){
  const[tab,setTab]=useState("assets");
  const[tick,setTick]=useState(0);
  useEffect(()=>{ const iv=setInterval(()=>setTick(t=>t+1),2200); return()=>clearInterval(iv); },[]);
  const rows=[
    {id:"ASSH-CPU-001",item:"CPU",brand:"DELL",dept:"IT",cond:"GOOD",c:"#30d158"},
    {id:"ASSH-LAP-012",item:"LAPTOP",brand:"LENOVO",dept:"NURSING",cond:"GOOD",c:"#30d158"},
    {id:"KLGD-PRN-003",item:"PRINTER",brand:"EPSON",dept:"ACCOUNTS",cond:"INACTIVE",c:"#ff9f0a"},
    {id:"ASSH-SRV-001",item:"SERVER",brand:"DELL",dept:"IT",cond:"GOOD",c:"#30d158"},
    {id:"AHPT-MON-007",item:"MONITOR",brand:"HP",dept:"RADIOLOGY",cond:"BAD",c:"#ff453a"},
  ];
  const tickets=[
    {no:"TKT-0012",title:"PC running very slow",st:"In Progress",sc:"#0a84ff"},
    {no:"TKT-0011",title:"Printer not responding",st:"Resolved",sc:"#30d158"},
    {no:"TKT-0010",title:"Network issue in OT",st:"Pending",sc:"#ff9f0a"},
    {no:"TKT-0009",title:"Screen flickering",st:"Assigned",sc:"#bf5af2"},
  ];
  const qs=[
    {dept:"Radiology",n:47+tick%3,w:12-tick%3,pct:72,c:"#bf5af2"},
    {dept:"Pharmacy",n:23,w:8,pct:48,c:"#0a84ff"},
    {dept:"OPD",n:115,w:21+tick%2,pct:87,c:"#30d158"},
    {dept:"OT",n:3,w:2,pct:18,c:"#ff9f0a"},
  ];
  const kpis={
    assets:[["52","Total","#0a84ff"],["45","Good","#30d158"],["7","Attn","#ff9f0a"],["0","Retired","#ff453a"]],
    tickets:[["12","Total","#0c0c0e"],["3","Pending","#ff9f0a"],["5","Active","#0a84ff"],["4","Done","#30d158"]],
    queue:[["47","Radiology","#bf5af2"],["23","Pharmacy","#0a84ff"],["115","OPD","#30d158"],["3","OT","#ff9f0a"]],
  };
  return(
    <div className="pwin" style={{width:"100%"}}>
      {/* chrome */}
      <div className="pwin-bar">
        <div style={{display:"flex",gap:5}}>
          {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} className="pwin-dot" style={{background:c}}/>)}
        </div>
        <div style={{flex:1,display:"flex",justifyContent:"center"}}>
          <div className="pwin-tabs">
            {[["assets","🖥️ Assets"],["tickets","🎫 Tickets"],["queue","🔢 Queue"]].map(([k,l])=>(
              <button key={k} className="pwin-tab" onClick={()=>setTab(k)}
                style={{background:tab===k?"#fff":"transparent",color:tab===k?"#0c0c0e":"#98989e",boxShadow:tab===k?"0 1px 6px rgba(0,0,0,0.14)":"none"}}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <span style={{fontSize:11,fontWeight:700,color:"#98989e"}}>SpaceO · AIMS</span>
      </div>
      {/* KPIs */}
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.65)"}}>
        {kpis[tab].map(([n,l,c],i)=>(
          <div key={l} className="pwin-kpi-cell">
            <div style={{fontFamily:"'Manrope',sans-serif",fontSize:32,fontWeight:900,color:c,letterSpacing:"-1.5px",lineHeight:1}}>{n}</div>
            <div style={{fontFamily:"'Manrope',sans-serif",fontSize:10,color:"#98989e",marginTop:6,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.7px"}}>{l}</div>
          </div>
        ))}
      </div>
      {/* Asset table */}
      {tab==="assets" && <>
        <div className="pwin-tbl-head" style={{gridTemplateColumns:"1.7fr 0.9fr 0.9fr 1fr 0.85fr"}}>
          {["ASSET ID","ITEM","BRAND","DEPT","STATUS"].map(h=><div key={h} style={{fontSize:9,fontWeight:800,color:"#98989e",letterSpacing:"0.9px",fontFamily:"'Manrope',sans-serif"}}>{h}</div>)}
        </div>
        {rows.map((r,i)=>(
          <div key={r.id} className={i%2===0?"pwin-tbl-row-e":"pwin-tbl-row-o"} style={{gridTemplateColumns:"1.7fr 0.9fr 0.9fr 1fr 0.85fr"}}>
            <div style={{fontSize:10,fontFamily:"monospace",color:"#0a84ff",fontWeight:800}}>{r.id}</div>
            <div style={{fontSize:12,color:"#0c0c0e",fontWeight:700,fontFamily:"'Manrope',sans-serif"}}>{r.item}</div>
            <div style={{fontSize:12,color:"#48484a",fontFamily:"'Manrope',sans-serif"}}>{r.brand}</div>
            <div style={{fontSize:12,color:"#48484a",fontFamily:"'Manrope',sans-serif"}}>{r.dept}</div>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:r.c,flexShrink:0}}/>
              <span style={{fontSize:10,fontWeight:700,color:r.c,fontFamily:"'Manrope',sans-serif"}}>{r.cond}</span>
            </div>
          </div>
        ))}
        <div className="pwin-action-bar">
          {["📥 Import","📤 Export","＋ New Asset","⟳ Sync"].map(b=>(
            <div key={b} className="pwin-action-btn">{b}</div>
          ))}
        </div>
      </>}
      {/* Tickets */}
      {tab==="tickets" && <div style={{padding:"14px"}}>
        {tickets.map((t,i)=>(
          <div key={t.no} className="pwin-ticket" style={{background:i%2===0?"rgba(248,248,252,0.72)":"rgba(255,255,255,0.72)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
              <span style={{fontSize:11,fontFamily:"monospace",color:"#0a84ff",fontWeight:800}}>{t.no}</span>
              <span style={{fontSize:10,padding:"3px 11px",borderRadius:99,background:`${t.sc}18`,color:t.sc,fontWeight:700,fontFamily:"'Manrope',sans-serif"}}>{t.st}</span>
            </div>
            <div style={{fontSize:13,fontWeight:600,color:"#0c0c0e",fontFamily:"'Manrope',sans-serif"}}>{t.title}</div>
          </div>
        ))}
      </div>}
      {/* Queue */}
      {tab==="queue" && <div style={{padding:"14px"}}>
        {qs.map(q=>(
          <div key={q.dept} className="pwin-q-card" style={{background:"rgba(235,235,244,0.75)"}}>
            <div style={{width:50,height:50,borderRadius:13,background:`${q.c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontSize:20,fontWeight:900,color:q.c,fontFamily:"'Manrope',sans-serif"}}>{q.n}</span>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:"#0c0c0e",marginBottom:6,fontFamily:"'Manrope',sans-serif"}}>{q.dept}</div>
              <div style={{height:5,background:"rgba(0,0,0,0.08)",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${q.pct}%`,background:q.c,borderRadius:3,transition:"width 1s ease"}}/>
              </div>
            </div>
            <div style={{textAlign:"right",minWidth:40}}>
              <div style={{fontSize:18,fontWeight:900,color:q.c,lineHeight:1,fontFamily:"'Manrope',sans-serif"}}>{Math.max(0,q.w)}</div>
              <div style={{fontSize:9,color:"#98989e",marginTop:3,fontWeight:700,letterSpacing:"0.5px",fontFamily:"'Manrope',sans-serif"}}>WAITING</div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}

/* ── HERO ───────────────────────────────────────────────────── */
function Hero(){
  const y=useSY();
  const[show,setShow]=useState(false);
  const[cnt,setCnt]=useState({a:0,t:0,d:0});
  useEffect(()=>{
    const t1=setTimeout(()=>setShow(true),2600);
    const t2=setTimeout(()=>{
      let a=0,t=0,d=0;
      const iv=setInterval(()=>{
        a=Math.min(1247,a+21); t=Math.min(248,t+5); d=Math.min(16,d+1);
        setCnt({a,t,d}); if(a>=1247&&d>=16)clearInterval(iv);
      },28);
    },3100);
    return()=>{clearTimeout(t1);clearTimeout(t2);};
  },[]);
  const S=(delay)=>({
    opacity:show?1:0,
    transform:show?"translateY(0) skewY(0)":"translateY(44px) skewY(2.5deg)",
    transition:`opacity 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });
  const SX=(delay)=>({
    opacity:show?1:0,
    transform:show?"translateY(0)":"translateY(32px)",
    transition:`opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });
  return(
    <section className="hero">
      <div className="hero-dots"/><div className="hero-orb1"/><div className="hero-orb2"/><div className="hero-orb3"/>
      <div style={{maxWidth:1100,width:"100%",margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
        {/* live badge */}
        <div style={{...S(0),display:"inline-flex",alignItems:"center",gap:8,padding:"9px 20px",background:"rgba(232,85,42,0.09)",backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",border:"1px solid rgba(232,85,42,0.25)",borderRadius:999,fontSize:12,fontWeight:700,color:"#c0421a",marginBottom:36,boxShadow:"0 2px 12px rgba(232,85,42,0.12),inset 0 1px 0 rgba(255,255,255,0.3)"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#30d158",boxShadow:"0 0 8px #30d158",animation:"dp 2s infinite",flexShrink:0}}/>
          Live at Avitis Institute of Medical Sciences, Nemmara
        </div>
        {/* H1 */}
        <h1 style={{fontFamily:"'Manrope',sans-serif",fontWeight:900,letterSpacing:"-5px",lineHeight:0.92,color:"#0c0c0e",marginBottom:36,textAlign:"center"}}>
          <span style={{display:"block",fontSize:"clamp(80px,11.5vw,152px)",...S(0.05)}}>Smarter</span>
          <span style={{display:"block",fontSize:"clamp(80px,11.5vw,152px)",...S(0.14)}}>Hospitals</span>
          <span style={{display:"block",fontSize:"clamp(80px,11.5vw,152px)",background:"linear-gradient(125deg,#E8552A 0%,#ff9a6c 45%,#E8552A 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",...S(0.23)}}>
            Start Here.
          </span>
        </h1>
        {/* Sub */}
        <p style={{fontFamily:"'Manrope',sans-serif",fontSize:19,fontWeight:400,color:"#48484a",lineHeight:1.75,maxWidth:560,marginBottom:44,...SX(0.38)}}>
          SpaceO is the unified intelligence platform for hospitals — assets, patients, staff and quality operations in one beautifully simple system.
        </p>
        {/* Buttons */}
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:60,...SX(0.48)}}>
          <a href="#modules" style={{padding:"15px 34px",background:"#0c0c0e",color:"#fff",fontSize:15,fontWeight:800,borderRadius:999,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:9,boxShadow:"0 6px 24px rgba(0,0,0,0.22)",transition:"all 0.25s",letterSpacing:"-0.2px"}}
            onMouseEnter={e=>{e.currentTarget.style.background="#E8552A";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(232,85,42,0.4)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="#0c0c0e";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 6px 24px rgba(0,0,0,0.22)"}}>
            Explore Platform
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="mailto:spaceo@aims.in" style={{padding:"15px 32px",background:"rgba(255,255,255,0.8)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.95)",color:"#0c0c0e",fontSize:15,fontWeight:700,borderRadius:999,textDecoration:"none",boxShadow:"0 2px 14px rgba(0,0,0,0.08)",transition:"all 0.25s",letterSpacing:"-0.2px"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 14px rgba(0,0,0,0.08)"}}>
            Request Demo
          </a>
        </div>
        {/* Stat grid — wider, taller boxes */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,maxWidth:860,width:"100%",marginBottom:72,...SX(0.58)}} className="g4">
          {[[cnt.a.toLocaleString()+"+","Assets Tracked","#E8552A"],[cnt.t+"+","Tickets Closed","#30d158"],[cnt.d+"+","Departments","#0a84ff"],["24/7","Availability","#32ade6"]].map(([n,l,c])=>(
            <div key={l} className="stat-box"
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 16px 40px ${c}28`}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 14px rgba(0,0,0,0.06)"}}>
              <div style={{fontFamily:"'Manrope',sans-serif",fontSize:36,fontWeight:900,color:c,letterSpacing:"-2px",lineHeight:1,marginBottom:10}}>{n}</div>
              <div style={{fontFamily:"'Manrope',sans-serif",fontSize:11,color:"#98989e",fontWeight:700,letterSpacing:"0.4px",lineHeight:1.4}}>{l}</div>
            </div>
          ))}
        </div>
        {/* Preview — full width, centered */}
        <div style={{width:"100%",maxWidth:1060,...SX(0.66),transform:show?`translateY(${y*0.03}px)`:"translateY(32px)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,padding:"8px 18px",background:"rgba(255,255,255,0.78)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.92)",borderRadius:12,fontSize:12,fontWeight:700,color:"#0c0c0e",boxShadow:"0 2px 10px rgba(0,0,0,0.07)"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#30d158",boxShadow:"0 0 6px #30d158"}}/>
              Live app preview · Click the tabs
            </div>
          </div>
          <HeroPreview/>
          <div style={{display:"flex",gap:10,marginTop:16,justifyContent:"center",flexWrap:"wrap"}}>
            {["🖥️ 52 Assets","🎫 12 Tickets","🔢 Queue Live","👨‍⚕️ 8 Doctors"].map(t=>(
              <div key={t} style={{padding:"8px 18px",background:"rgba(255,255,255,0.78)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.92)",borderRadius:999,fontSize:12,fontWeight:700,color:"#48484a",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CURSOR CARDS ───────────────────────────────────────────── */
const CC_DATA=[
  {icon:"🖥️",title:"IT Asset Management",sub:"Devices, QR labels & ticketing",c:"#0a84ff",bg:"rgba(10,132,255,0.09)",badge:"Live",bClass:"badge-live"},
  {icon:"💬",title:"Patient Feedback & CQI",sub:"Surveys, CQI scores & NABH",c:"#30d158",bg:"rgba(48,209,88,0.09)",badge:"Coming",bClass:"badge-soon"},
  {icon:"🔢",title:"Queue Management",sub:"Tokens, boards & wait-time AI",c:"#ff9f0a",bg:"rgba(255,159,10,0.09)",badge:"Coming",bClass:"badge-soon"},
  {icon:"⚠️",title:"Incident Management",sub:"CAPA, RCA & audit trails",c:"#ff453a",bg:"rgba(255,69,58,0.09)",badge:"Coming",bClass:"badge-soon"},
  {icon:"👨‍⚕️",title:"Doctor Availability",sub:"Live status & lobby boards",c:"#bf5af2",bg:"rgba(191,90,242,0.09)",badge:"Coming",bClass:"badge-soon"},
  {icon:"🔧",title:"Biomedical Equipment",sub:"PPM, calibration & AMC",c:"#32ade6",bg:"rgba(50,173,230,0.09)",badge:"Coming",bClass:"badge-soon"},
  {icon:"📋",title:"Quality Assurance",sub:"NABH/JCI compliance tools",c:"#30d158",bg:"rgba(48,209,88,0.09)",badge:"Planned",bClass:"badge-plan"},
  {icon:"💊",title:"Pharmacy Inventory",sub:"Stock, expiry & reorder AI",c:"#ff9f0a",bg:"rgba(255,159,10,0.09)",badge:"Planned",bClass:"badge-plan"},
];

function CursorCards(){
  return(
    <section id="platform" className="glass-section-alt" style={{padding:"80px 48px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <Sr style={{textAlign:"center",marginBottom:52}}>
          <div className="sec-label" style={{justifyContent:"center"}}>Platform Modules</div>
          <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,letterSpacing:"-2px",color:"#0c0c0e",marginBottom:10}}>
            Everything your hospital needs
          </h2>
          <p style={{fontFamily:"'Manrope',sans-serif",fontSize:15,color:"#68686e",fontWeight:400}}>Hover each card to explore. Deploy one module or the full suite.</p>
        </Sr>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}} className="g4">
          {CC_DATA.map((c,i)=>(
            <Sr key={c.title} d={i*0.055}>
              <div className="cc">
                <div className="cc-stripe" style={{background:`linear-gradient(90deg,${c.c},${c.c}55)`}}/>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
                  <div className="cc-icon" style={{background:c.bg}}>{c.icon}</div>
                  <span style={{padding:"3px 9px",borderRadius:99,fontSize:9,fontWeight:800,letterSpacing:"0.5px",textTransform:"uppercase",fontFamily:"'Manrope',sans-serif"}} className={c.bClass}>{c.badge}</span>
                </div>
                <div style={{fontFamily:"'Manrope',sans-serif",fontSize:14,fontWeight:800,color:"#0c0c0e",marginBottom:5,letterSpacing:"-0.3px"}}>{c.title}</div>
                <div style={{fontFamily:"'Manrope',sans-serif",fontSize:12,fontWeight:500,color:"#68686e",lineHeight:1.5}}>{c.sub}</div>
              </div>
            </Sr>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── MODULES DATA ───────────────────────────────────────────── */
const MODS=[
  {key:"asset",n:"01",live:true,c:"#0a84ff",bg:"rgba(10,132,255,0.08)",icon:"🖥️",title:"IT Asset Management",sub:"Complete visibility over every IT device",desc:"Register, assign and monitor every IT device across all hospital locations. Smart auto-IDs, QR thermal labels, warranty expiry alerts and a complete ticket-based support workflow with multi-level HOD approval.",details:["30+ fields per asset record","Bulk Excel/CSV import with duplicate detection","QR thermal label printing (38×25mm)","HOD approval chain for IT support tickets","Warranty expiry alerts & department tracking","Role-based access — Admin, IT Staff, HOD, End User","Automated daily MySQL database backup","Department-wise analytics dashboard"],pills:["Asset Registry","QR Labels","IT Ticketing","HOD Approval","Analytics","Import/Export"]},
  {key:"feedback",n:"02",live:false,c:"#30d158",bg:"rgba(48,209,88,0.08)",icon:"💬",title:"Patient Feedback & CQI",sub:"Continuous quality improvement through data",desc:"Multi-channel patient satisfaction at every touchpoint — OPD, wards, discharge, pharmacy. Structured CQI scoring drives quality improvement with automated dashboards for NABH/JCI accreditation.",details:["Customisable survey templates per department","QR/kiosk/tablet feedback capture","Department-wise CQI benchmarking","Trend analysis & satisfaction reports","NABH/JCI accreditation-ready exports","Complaint escalation workflow","Staff performance via patient ratings","Monthly automated quality reports"],pills:["Survey Builder","CQI Reports","Sentiment AI","NABH Ready","Complaint Tracking"]},
  {key:"queue",n:"03",live:false,c:"#ff9f0a",bg:"rgba(255,159,10,0.08)",icon:"🔢",title:"Queue Management",sub:"Eliminate wait-time frustration everywhere",desc:"Smart token-based queuing for Radiology, Pharmacy, OT and OPD. Live digital display boards, SMS alerts and AI-powered wait time estimation reduce patient anxiety across all service points.",details:["Self-service or counter token kiosk","Live display boards for waiting areas","SMS/WhatsApp wait alerts","Multi-counter routing per department","Radiology, Pharmacy, OPD, OT support","Real-time admin oversight dashboard","Wait time analytics & reporting","Priority token support for emergencies"],pills:["Token Kiosk","Live Boards","SMS Alerts","Wait Time AI","Priority Tokens"]},
  {key:"incident",n:"04",live:false,c:"#ff453a",bg:"rgba(255,69,58,0.08)",icon:"⚠️",title:"Incident Management",sub:"Structured safety reporting & CAPA tracking",desc:"Streamlined clinical and operational incident reporting. Root cause analysis tools, CAPA workflow management and accreditation-ready audit trails ensure patient safety is maintained and documented.",details:["Simple reporting for all staff levels","Clinical & operational incident categories","RCA guided workflow","CAPA action assignment & tracking","Deadline reminders for corrective actions","Audit-ready exports","Near-miss & adverse event tracking","Regulatory submission-ready documentation"],pills:["Incident Log","CAPA Workflow","RCA Tools","Audit Reports","Near-miss"]},
  {key:"doctor",n:"05",live:false,c:"#bf5af2",bg:"rgba(191,90,242,0.08)",icon:"👨‍⚕️",title:"Doctor Availability",sub:"Real-time physician status for patients & staff",desc:"Live physician schedule display for waiting areas, patient screens and mobile devices. Patients instantly know who is on duty, which consultation room they're in and estimated waiting time.",details:["Real-time availability status per doctor","Consultation room assignment display","Estimated consultation wait time","Lobby and ward display board support","Patient-facing web view (no login)","Schedule sync with HIS/HMIS","On-call doctor tracking","Shift handover status updates"],pills:["Live Status","Lobby Boards","HIS Sync","Room Assignment","Patient View"]},
  {key:"biomedical",n:"06",live:false,c:"#32ade6",bg:"rgba(50,173,230,0.08)",icon:"🔧",title:"Biomedical Equipment",sub:"Medical device lifecycle & compliance",desc:"Complete lifecycle management for all medical devices — procurement to decommission. PPM schedules, calibration records, AMC tracking and NABH/JCI compliance reporting keep every device audit-ready.",details:["Full biomedical device registry","PPM scheduler with alerts","Calibration certificate tracking","AMC and warranty contract management","CSSD equipment tracking","NABH/JCI compliance reports","Breakdown & downtime incident log","Vendor performance & SLA tracking"],pills:["PPM Scheduler","Calibration Log","AMC Tracker","NABH Reports","Breakdown Log"]},
];

function ModIllustration({mod}){
  return(
    <div className="mc-img" style={{background:mod.bg,position:"relative"}}>
      <div style={{position:"absolute",top:-30,right:-30,width:130,height:130,borderRadius:"50%",background:mod.c,opacity:0.07}}/>
      <div style={{position:"absolute",bottom:-20,left:-20,width:90,height:90,borderRadius:"50%",background:mod.c,opacity:0.05}}/>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
        <div style={{width:64,height:64,borderRadius:18,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:`0 6px 24px ${mod.c}22`}}>{mod.icon}</div>
        <div style={{fontFamily:"'Manrope',sans-serif",fontSize:12,fontWeight:700,color:mod.c}}>{mod.sub}</div>
      </div>
    </div>
  );
}

function ModCard({mod,delay}){
  const[r,v]=useRv(0.06);
  const[open,setOpen]=useState(false);
  return(
    <div ref={r} className="mc" style={{opacity:v?1:0,transform:v?'translateY(0)':'translateY(36px)',transition:`opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s,transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`}}>
      <ModIllustration mod={mod}/>
      <div className="mc-body">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <span style={{padding:"3px 10px",background:mod.bg,border:`1px solid ${mod.c}28`,borderRadius:99,fontSize:10,fontWeight:800,letterSpacing:"0.8px",textTransform:"uppercase",color:mod.c}}>{mod.live?"Live":"Coming"} · {mod.n}</span>
          <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",color:mod.c,fontSize:12,fontWeight:700,padding:"4px 8px",borderRadius:8,transition:"background 0.2s",fontFamily:"'Manrope',sans-serif"}}
            onMouseEnter={e=>e.currentTarget.style.background=mod.bg}
            onMouseLeave={e=>e.currentTarget.style.background="none"}>
            {open?"Less ↑":"More ↓"}
          </button>
        </div>
        <div style={{fontFamily:"'Manrope',sans-serif",fontSize:17,fontWeight:800,color:"#0c0c0e",marginBottom:5,letterSpacing:"-0.4px",lineHeight:1.2}}>{mod.title}</div>
        <div style={{fontFamily:"'Manrope',sans-serif",fontSize:13,color:"#48484a",lineHeight:1.7,marginBottom:16,fontWeight:400}}>{mod.desc}</div>
        {open&&(
          <div className="mc-expand" style={{marginBottom:16,background:mod.bg}}>
            <div style={{fontFamily:"'Manrope',sans-serif",fontSize:10,fontWeight:800,color:mod.c,letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>What's included</div>
            {mod.details.map((d,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:7}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:mod.c,flexShrink:0,marginTop:5}}/>
                <span style={{fontFamily:"'Manrope',sans-serif",fontSize:12,color:"#2c2c2e",lineHeight:1.5,fontWeight:400}}>{d}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {mod.pills.map(p=><span key={p} className="mc-pill">{p}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ── MOCKUP WINDOWS ─────────────────────────────────────────── */
function MockupAsset(){
  const rows=[
    {id:"ASSH-CPU-001",item:"CPU",brand:"DELL",dept:"IT",cond:"GOOD",c:"#30d158"},
    {id:"ASSH-LAP-012",item:"LAPTOP",brand:"LENOVO",dept:"NURSING",cond:"GOOD",c:"#30d158"},
    {id:"KLGD-PRN-003",item:"PRINTER",brand:"EPSON",dept:"ACCOUNTS",cond:"INACTIVE",c:"#ff9f0a"},
    {id:"ASSH-SRV-001",item:"SERVER",brand:"DELL",dept:"IT",cond:"GOOD",c:"#30d158"},
    {id:"AHPT-MON-007",item:"MONITOR",brand:"HP",dept:"RADIOLOGY",cond:"BAD",c:"#ff453a"},
  ];
  return(
    <div className="mwin" style={{maxWidth:560}}>
      <div className="mwin-chrome">
        <div style={{display:"flex",gap:5}}>{["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} className="mwin-dot" style={{background:c}}/>)}</div>
        <div style={{flex:1,textAlign:"center",fontSize:11,fontWeight:700,color:"#98989e",fontFamily:"'Manrope',sans-serif"}}>IT Asset Registry — AIMS · 52 assets</div>
      </div>
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.65)"}}>
        {[["52","Total","#0a84ff"],["45","Good","#30d158"],["7","Attn","#ff9f0a"],["0","Retired","#ff453a"]].map(([n,l,c])=>(
          <div key={l} className="pwin-kpi-cell" style={{padding:"14px 8px"}}>
            <div style={{fontSize:22,fontWeight:900,color:c,letterSpacing:"-1px",lineHeight:1,fontFamily:"'Manrope',sans-serif"}}>{n}</div>
            <div style={{fontSize:9,color:"#98989e",marginTop:3,textTransform:"uppercase",letterSpacing:"0.7px",fontWeight:700,fontFamily:"'Manrope',sans-serif"}}>{l}</div>
          </div>
        ))}
      </div>
      <div className="pwin-tbl-head" style={{gridTemplateColumns:"1.7fr 0.9fr 0.9fr 1fr 0.8fr",padding:"9px 18px"}}>
        {["ASSET ID","ITEM","BRAND","DEPT","STATUS"].map(h=><div key={h} style={{fontSize:9,fontWeight:800,color:"#98989e",letterSpacing:"0.8px",fontFamily:"'Manrope',sans-serif"}}>{h}</div>)}
      </div>
      {rows.map((r,i)=>(
        <div key={r.id} className={i%2===0?"mwin-row-e":"mwin-row-o"} style={{display:"grid",gridTemplateColumns:"1.7fr 0.9fr 0.9fr 1fr 0.8fr",padding:"11px 18px"}}>
          <div style={{fontSize:10,fontFamily:"monospace",color:"#0a84ff",fontWeight:800}}>{r.id}</div>
          <div style={{fontSize:12,color:"#0c0c0e",fontWeight:700,fontFamily:"'Manrope',sans-serif"}}>{r.item}</div>
          <div style={{fontSize:12,color:"#48484a",fontFamily:"'Manrope',sans-serif"}}>{r.brand}</div>
          <div style={{fontSize:12,color:"#48484a",fontFamily:"'Manrope',sans-serif"}}>{r.dept}</div>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:r.c}}/>
            <span style={{fontSize:10,fontWeight:800,color:r.c,fontFamily:"'Manrope',sans-serif"}}>{r.cond}</span>
          </div>
        </div>
      ))}
      <div className="pwin-action-bar">
        {["Import","Export","+ New Asset","⟳ Sync"].map(b=><div key={b} style={{padding:"5px 11px",background:"rgba(255,255,255,0.9)",border:"1px solid rgba(0,0,0,0.08)",borderRadius:7,fontSize:10,fontWeight:700,color:"#3a3a3c",cursor:"default",fontFamily:"'Manrope',sans-serif"}}>{b}</div>)}
      </div>
    </div>
  );
}

function MockupQueue(){
  const[t,st]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>st(x=>x+1),2100);return()=>clearInterval(iv);},[]);
  const qs=[{dept:"Radiology",n:47+t%3,w:12-t%3,pct:72,c:"#bf5af2"},{dept:"Pharmacy",n:23,w:8,pct:48,c:"#0a84ff"},{dept:"OPD",n:115,w:21+t%2,pct:87,c:"#30d158"},{dept:"OT",n:3,w:2,pct:18,c:"#ff9f0a"}];
  return(
    <div className="mwin" style={{maxWidth:430}}>
      <div style={{background:"linear-gradient(135deg,#0c0c0e,#1a1a28)",padding:"20px 22px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <span style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,0.4)",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Manrope',sans-serif"}}>SpaceO Queue</span>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#30d158",boxShadow:"0 0 6px #30d158",animation:"dp 1.5s infinite"}}/>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:700,fontFamily:"'Manrope',sans-serif"}}>LIVE</span>
          </div>
        </div>
        <div style={{fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",fontFamily:"'Manrope',sans-serif"}}>Live Queue Status</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:4,fontFamily:"'Manrope',sans-serif"}}>Updated every 30 seconds</div>
      </div>
      <div style={{padding:"14px",background:"rgba(255,255,255,0.62)",backdropFilter:"blur(16px)",display:"flex",flexDirection:"column",gap:10}}>
        {qs.map(q=>(
          <div key={q.dept} className="mwin-q-row" style={{padding:"13px 15px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:48,height:48,borderRadius:12,background:`${q.c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontSize:20,fontWeight:900,color:q.c,fontFamily:"'Manrope',sans-serif"}}>{q.n}</span>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:"#0c0c0e",marginBottom:5,fontFamily:"'Manrope',sans-serif"}}>{q.dept}</div>
              <div style={{height:4,background:"rgba(0,0,0,0.07)",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${q.pct}%`,background:q.c,borderRadius:2,transition:"width 0.9s ease"}}/>
              </div>
            </div>
            <div style={{textAlign:"right",minWidth:38}}>
              <div style={{fontSize:18,fontWeight:900,color:q.c,lineHeight:1,fontFamily:"'Manrope',sans-serif"}}>{Math.max(0,q.w)}</div>
              <div style={{fontSize:9,color:"#98989e",marginTop:2,fontWeight:700,letterSpacing:"0.5px",fontFamily:"'Manrope',sans-serif"}}>WAITING</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mwin-footer" style={{padding:"9px 14px",textAlign:"center"}}>
        <span style={{fontSize:10,color:"#98989e",fontWeight:700,fontFamily:"'Manrope',sans-serif"}}>Display sync active · 4 counters online</span>
      </div>
    </div>
  );
}

function MockupDoctors(){
  const docs=[
    {name:"Dr. Arun Menon",dept:"Cardiology",status:"Available",room:"OPD-3",c:"#30d158"},
    {name:"Dr. Priya Nair",dept:"Radiology",status:"In OT",room:"OT-1",c:"#ff9f0a"},
    {name:"Dr. Rahul Varma",dept:"Orthopedics",status:"On Break",room:"OPD-7",c:"#ff453a"},
    {name:"Dr. Sreeja K.",dept:"Gynecology",status:"Available",room:"OPD-2",c:"#30d158"},
  ];
  return(
    <div className="mwin" style={{maxWidth:470}}>
      <div className="mwin-chrome">
        <div style={{display:"flex",gap:5}}>{["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} className="mwin-dot" style={{background:c}}/>)}</div>
        <div style={{flex:1,textAlign:"center",fontSize:11,fontWeight:700,color:"#98989e",fontFamily:"'Manrope',sans-serif"}}>Doctor Availability — Today</div>
      </div>
      <div style={{padding:"12px",background:"rgba(255,255,255,0.62)",backdropFilter:"blur(16px)",display:"flex",flexDirection:"column",gap:8}}>
        {docs.map((d,i)=>(
          <div key={d.name} className="mwin-doc-row" style={{display:"flex",alignItems:"center",gap:12,padding:"11px 13px",background:i%2===0?"rgba(235,235,244,0.8)":"rgba(255,255,255,0.78)"}}>
            <div style={{width:38,height:38,borderRadius:"50%",background:`${d.c}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:17}}>👨‍⚕️</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:"#0c0c0e",marginBottom:2,fontFamily:"'Manrope',sans-serif"}}>{d.name}</div>
              <div style={{fontSize:11,color:"#98989e",fontFamily:"'Manrope',sans-serif"}}>{d.dept} · {d.room}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 11px",borderRadius:99,background:`${d.c}18`}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:d.c}}/>
              <span style={{fontSize:10,fontWeight:800,color:d.c,fontFamily:"'Manrope',sans-serif"}}>{d.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mwin-footer" style={{padding:"9px 13px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:10,color:"#98989e",fontWeight:600,fontFamily:"'Manrope',sans-serif"}}>12 doctors scheduled today</span>
        <span style={{fontSize:10,fontWeight:800,color:"#30d158",fontFamily:"'Manrope',sans-serif"}}>8 available now</span>
      </div>
    </div>
  );
}

/* ── MOCKUP SECTION ─────────────────────────────────────────── */
function MockupSection({label,title,sub,chips=[],children,flip=false,bg="rgba(244,244,246,0.75)"}){
  const[r,v]=useRv(0.06);
  const textSide=(
    <div ref={r} style={{opacity:v?1:0,transform:v?'translateX(0)':flip?'translateX(36px)':'translateX(-36px)',transition:'all 0.95s cubic-bezier(0.16,1,0.3,1)'}}>
      <div className="sec-label">{label}</div>
      <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"clamp(26px,3.2vw,42px)",fontWeight:900,letterSpacing:"-2px",lineHeight:1.06,color:"#0c0c0e",marginBottom:18}}>{title}</h2>
      <p style={{fontFamily:"'Manrope',sans-serif",fontSize:16,fontWeight:400,color:"#48484a",lineHeight:1.78,marginBottom:24}}>{sub}</p>
      {chips.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:8}}>{chips.map(c=><span key={c} className="chip">{c}</span>)}</div>}
    </div>
  );
  const mockSide=(
    <div style={{opacity:v?1:0,transform:v?'translateX(0)':flip?'translateX(-36px)':'translateX(36px)',transition:'all 0.95s cubic-bezier(0.16,1,0.3,1) 0.12s'}}>{children}</div>
  );
  return(
    <section style={{padding:"100px 48px",background:bg,backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",borderTop:"1px solid rgba(255,255,255,0.7)",borderBottom:"1px solid rgba(255,255,255,0.7)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:76,alignItems:"center"}} className="ms-grid">
        {flip?<>{mockSide}{textSide}</>:<>{textSide}{mockSide}</>}
      </div>
    </section>
  );
}

/* ── DARK STATS ─────────────────────────────────────────────── */
function StatsDark(){
  return(
    <section style={{padding:"80px 48px",background:"linear-gradient(160deg,#080808 0%,#101018 55%,#0c0c14 100%)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:640,height:360,background:"radial-gradient(ellipse,rgba(232,85,42,0.09) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <Sr style={{textAlign:"center",marginBottom:52}}>
          <div className="sec-label" style={{justifyContent:"center",color:"rgba(232,85,42,0.9)"}}>
            Why SpaceO
          </div>
          <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"clamp(28px,3.5vw,46px)",fontWeight:900,letterSpacing:"-2px",color:"#fff",marginBottom:12}}>Built different. Deployed faster.</h2>
          <p style={{fontFamily:"'Manrope',sans-serif",fontSize:16,color:"rgba(255,255,255,0.38)",fontWeight:400}}>No cloud. No subscriptions. Runs entirely on your hospital network.</p>
        </Sr>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2,background:"rgba(255,255,255,0.04)",borderRadius:22,overflow:"hidden"}} className="g4">
          {[["₹ 0","Cloud Cost","Host on your own server","#E8552A"],["48h","Go Live","Sign-up to live in 48 hours","#0a84ff"],["99.9%","Uptime","LAN = no internet needed","#ffd60a"],["NABH","Compliant","Built for accreditation audits","#32ade6"]].map(([n,l,s,c],i)=>(
            <Sr key={l} d={i*0.1}>
              <div className="sd-cell" style={{borderRight:i<3?"1px solid rgba(255,255,255,0.06)":"none"}}>
                <div className="sd-num" style={{color:c,fontFamily:"'Manrope',sans-serif",marginBottom:6}}>{n}</div>
                <div style={{fontFamily:"'Manrope',sans-serif",fontSize:15,fontWeight:800,color:"rgba(255,255,255,0.85)",marginBottom:6,letterSpacing:"-0.3px"}}>{l}</div>
                <div style={{fontFamily:"'Manrope',sans-serif",fontSize:12,color:"rgba(255,255,255,0.28)",lineHeight:1.55,fontWeight:400}}>{s}</div>
              </div>
            </Sr>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES ───────────────────────────────────────────────── */
const SVCS=[
  ["IT Asset Management","Full registry, QR labels, ticketing, analytics dashboard","Live"],
  ["Patient Feedback & CQI","Surveys, real-time feedback, dept-wise CQI scoring","Soon"],
  ["Incident Management","Incident log, root cause analysis, CAPA workflow","Soon"],
  ["Queue Management","Token kiosks, live boards, OPD/Pharmacy/Radiology","Soon"],
  ["Doctor Availability","Live schedule display, consultation status boards","Soon"],
  ["Biomedical Equipment","PPM, calibration records, AMC contracts, NABH","Soon"],
  ["Housekeeping & Facilities","Cleaning schedules, complaint routing, SLA tracking","Planned"],
  ["Staff Roster & Attendance","Shift scheduling, leave management, overtime tracking","Planned"],
  ["Pharmacy Inventory","Stock management, expiry alerts, reorder automation","Planned"],
  ["Accreditation Dashboard","NABH/JCI checklist, document control, audit reports","Planned"],
];
const BD={Live:"badge-live",Soon:"badge-soon",Planned:"badge-plan"};

function Services(){
  return(
    <section id="services" style={{padding:"100px 48px",background:"linear-gradient(180deg,#080808 0%,#101018 50%,#0a0a12 100%)"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <Sr style={{textAlign:"center",marginBottom:56}}>
          <div className="sec-label" style={{justifyContent:"center",color:"rgba(232,85,42,0.85)"}}>All Services</div>
          <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"clamp(28px,4vw,52px)",fontWeight:900,letterSpacing:"-2.5px",lineHeight:1.04,color:"#fff",marginBottom:12}}>Everything in SpaceO</h2>
          <p style={{fontFamily:"'Manrope',sans-serif",fontSize:15,color:"rgba(255,255,255,0.3)"}}>10 modules · one platform · fully integrated</p>
        </Sr>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:22,overflow:"hidden",border:"1px solid rgba(255,255,255,0.07)"}}>
          {SVCS.map(([t,d,b],i)=>(
            <Sr key={t} d={i*0.04}>
              <div className="svc-row">
                <div style={{fontFamily:"monospace",fontSize:12,fontWeight:800,color:"rgba(255,255,255,0.15)",minWidth:28}}>{String(i+1).padStart(2,"0")}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Manrope',sans-serif",fontSize:15,fontWeight:800,color:"rgba(255,255,255,0.9)",marginBottom:3,letterSpacing:"-0.3px"}}>{t}</div>
                  <div style={{fontFamily:"'Manrope',sans-serif",fontSize:12,color:"rgba(255,255,255,0.28)",fontWeight:400}}>{d}</div>
                </div>
                <span style={{padding:"4px 12px",borderRadius:99,fontSize:10,fontWeight:800,flexShrink:0,fontFamily:"'Manrope',sans-serif",letterSpacing:"0.3px"}} className={BD[b]}>{b}</span>
              </div>
            </Sr>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── DEPTS ──────────────────────────────────────────────────── */
const DEPTS=[
  {e:"💻",l:"IT Department",s:"Asset registry, tickets, audit logs, access control",c:"#0a84ff",bg:"rgba(10,132,255,0.08)"},
  {e:"🏥",l:"Quality Assurance",s:"CQI, incident tracking, CAPA, NABH compliance",c:"#30d158",bg:"rgba(48,209,88,0.08)"},
  {e:"💊",l:"Pharmacy",s:"Queue tokens, dispensing status, patient boards",c:"#ff9f0a",bg:"rgba(255,159,10,0.08)"},
  {e:"🔬",l:"Radiology & Labs",s:"Equipment tracking, appointment queues, TAT",c:"#bf5af2",bg:"rgba(191,90,242,0.08)"},
  {e:"🫀",l:"Critical Care",s:"Real-time equipment readiness and critical alerts",c:"#ff453a",bg:"rgba(255,69,58,0.08)"},
  {e:"👩‍⚕️",l:"Nursing Stations",s:"Asset assignment, ticket raising, dept portal",c:"#32ade6",bg:"rgba(50,173,230,0.08)"},
  {e:"🏗️",l:"Facility Management",s:"Housekeeping, maintenance, SLA compliance",c:"#ffd60a",bg:"rgba(255,214,10,0.08)"},
  {e:"📊",l:"Administration",s:"Doctor schedules, analytics, KPIs, accreditation",c:"#30d158",bg:"rgba(48,209,88,0.08)"},
];

function Depts(){
  return(
    <section className="glass-section-alt" style={{padding:"100px 48px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <Sr style={{textAlign:"center",marginBottom:52}}>
          <div className="sec-label" style={{justifyContent:"center"}}>Built For</div>
          <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"clamp(26px,3.5vw,44px)",fontWeight:900,letterSpacing:"-2px",color:"#0c0c0e",marginBottom:12}}>Every department. Every floor.</h2>
          <p style={{fontFamily:"'Manrope',sans-serif",fontSize:15,color:"#68686e"}}>From the server room to the ICU — SpaceO has it covered.</p>
        </Sr>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}} className="g4">
          {DEPTS.map((d,i)=>(
            <Sr key={d.l} d={i*0.06}>
              <div className="dc" style={{textAlign:"center"}}>
                <div style={{width:56,height:56,borderRadius:16,background:d.bg,backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.75)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:26,boxShadow:"0 2px 10px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.9)"}}>{d.e}</div>
                <div style={{fontFamily:"'Manrope',sans-serif",fontSize:14,fontWeight:800,color:"#0c0c0e",marginBottom:6,letterSpacing:"-0.2px"}}>{d.l}</div>
                <div style={{fontFamily:"'Manrope',sans-serif",fontSize:12,color:"#68686e",lineHeight:1.6}}>{d.s}</div>
              </div>
            </Sr>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ───────────────────────────────────────────── */
function Testimonials(){
  const items=[
    {q:'"Finally a system that IT staff actually enjoy using. The asset tracking and HOD approval workflow is exactly what we needed."',name:"IT Manager",dept:"AIMS, Nemmara",e:"💻"},
    {q:'"Queue management boards transformed the waiting experience in Radiology and Pharmacy. Patients are noticeably calmer."',name:"Operations Head",dept:"Multi-Specialty Hospital",e:"🏥"},
    {q:'"SpaceO helped us get NABH-ready faster. The documentation and audit reporting is exactly what reviewers want to see."',name:"Quality Manager",dept:"NABH Accredited Hospital",e:"📋"},
  ];
  return(
    <section className="glass-section" style={{padding:"100px 48px"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <Sr style={{textAlign:"center",marginBottom:48}}>
          <div className="sec-label" style={{justifyContent:"center"}}>From The Field</div>
          <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"clamp(26px,3.2vw,42px)",fontWeight:900,letterSpacing:"-1.8px",color:"#0c0c0e"}}>What hospitals are saying.</h2>
        </Sr>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}} className="g3">
          {items.map(({q,name,dept,e},i)=>(
            <Sr key={i} d={i*0.1}>
              <div className="tc">
                <div style={{fontSize:26,marginBottom:16}}>{e}</div>
                <p style={{fontFamily:"'Manrope',sans-serif",fontSize:14,color:"#2c2c2e",lineHeight:1.75,marginBottom:22,fontStyle:"italic",fontWeight:400}}>{q}</p>
                <div style={{borderTop:"1px solid rgba(0,0,0,0.07)",paddingTop:14}}>
                  <div style={{fontFamily:"'Manrope',sans-serif",fontSize:13,fontWeight:800,color:"#0c0c0e"}}>{name}</div>
                  <div style={{fontFamily:"'Manrope',sans-serif",fontSize:12,color:"#98989e",marginTop:2}}>{dept}</div>
                </div>
              </div>
            </Sr>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────── */
function CTA(){
  return(
    <section style={{padding:"100px 48px",background:"linear-gradient(180deg,rgba(236,236,240,0.85) 0%,rgba(228,228,232,0.9) 100%)",textAlign:"center"}}>
      <Sr>
        <div style={{maxWidth:660,margin:"0 auto",background:"linear-gradient(160deg,#0a0a0a 0%,#14141e 100%)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:32,padding:"72px 52px",position:"relative",overflow:"hidden",boxShadow:"0 40px 90px rgba(0,0,0,0.22)"}}>
          <div style={{position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",width:360,height:260,background:"radial-gradient(ellipse,rgba(232,85,42,0.14) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:22}}>
              <Logo size={52} dark/>
            </div>
            <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"clamp(28px,4.5vw,50px)",fontWeight:900,color:"#fff",letterSpacing:"-2.5px",lineHeight:1.05,marginBottom:18}}>
              Ready to modernise<br/>
              <span style={{background:"linear-gradient(125deg,#E8552A,#ff9a6c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>your hospital?</span>
            </h2>
            <p style={{fontFamily:"'Manrope',sans-serif",fontSize:16,color:"rgba(255,255,255,0.45)",marginBottom:36,lineHeight:1.65}}>
              Deploy SpaceO on your LAN in 48 hours. No cloud. No subscriptions.<br/>Your data, your network, your control.
            </p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <a href="mailto:spaceo@aims.in" style={{padding:"14px 30px",background:"#E8552A",color:"#fff",fontSize:15,fontWeight:800,borderRadius:999,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8,boxShadow:"0 4px 24px rgba(232,85,42,0.45)",transition:"all 0.25s",letterSpacing:"-0.2px"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.03)";e.currentTarget.style.boxShadow="0 8px 32px rgba(232,85,42,0.55)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 4px 24px rgba(232,85,42,0.45)"}}>
                Request a Demo →
              </a>
              <a href="#modules" style={{padding:"14px 26px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.14)",color:"rgba(255,255,255,0.75)",fontSize:15,fontWeight:700,borderRadius:999,textDecoration:"none",transition:"all 0.25s",letterSpacing:"-0.2px"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";e.currentTarget.style.transform="translateY(-3px)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.transform=""}}>
                View All Modules
              </a>
            </div>
          </div>
        </div>
      </Sr>
    </section>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────── */
function Footer(){
  return(
    <footer style={{background:"#080808",padding:"56px 48px 40px",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:40,marginBottom:48}} className="g4">
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <Logo size={30} dark/>
              <span style={{fontFamily:"'Manrope',sans-serif",fontSize:17,fontWeight:900,color:"#f2f2f4",letterSpacing:"-0.5px"}}>SpaceO</span>
            </div>
            <p style={{fontFamily:"'Manrope',sans-serif",fontSize:13,color:"rgba(255,255,255,0.28)",lineHeight:1.65,fontWeight:400,maxWidth:190}}>Hospital Intelligence Platform. Built for the people who keep healthcare running.</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:16,padding:"6px 13px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:99}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"#30d158",boxShadow:"0 0 6px #30d158"}}/>
              <span style={{fontFamily:"'Manrope',sans-serif",fontSize:10,color:"rgba(255,255,255,0.28)",fontWeight:700}}>All systems operational</span>
            </div>
          </div>
          {[["Platform",["Asset Management","Patient Feedback","Queue Management","All Modules"]],["Company",["About SpaceO","Case Studies","Pricing","Contact"]],["Resources",["Documentation","NABH Compliance","Implementation Guide","Support"]]].map(([h,links])=>(
            <div key={h}>
              <div style={{fontFamily:"'Manrope',sans-serif",fontSize:10,fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.22)",marginBottom:16}}>{h}</div>
              {links.map(l=>(
                <a key={l} href="#" style={{display:"block",fontFamily:"'Manrope',sans-serif",fontSize:13,color:"rgba(255,255,255,0.38)",textDecoration:"none",marginBottom:8,transition:"color 0.2s",fontWeight:400}}
                  onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.88)"}
                  onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.38)"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:"'Manrope',sans-serif",fontSize:11,color:"rgba(255,255,255,0.16)",fontWeight:400}}>© 2026 SpaceO · Avitis Institute of Medical Sciences · Nemmara, Palakkad, Kerala</div>
          <div style={{fontFamily:"'Manrope',sans-serif",fontSize:11,color:"rgba(255,255,255,0.16)",fontWeight:400}}>Designed for healthcare. Built with care.</div>
        </div>
      </div>
    </footer>
  );
}

/* ── APP ────────────────────────────────────────────────────── */
export default function App(){
  const[loaded,setLoaded]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),2500);return()=>clearTimeout(t);},[]);
  return(
    <>
      <style dangerouslySetInnerHTML={{__html:G}}/>
      <Loader out={loaded}/>
      <Nav/>
      <Hero/>
      <CursorCards/>
      <section id="modules" className="glass-section" style={{padding:"100px 48px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <Sr style={{textAlign:"center",marginBottom:56}}>
            <div className="sec-label" style={{justifyContent:"center"}}>Core Modules</div>
            <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"clamp(28px,4vw,52px)",fontWeight:900,letterSpacing:"-2.5px",lineHeight:1.04,color:"#0c0c0e",marginBottom:14}}>
              Every system a hospital<br/>
              <span style={{background:"linear-gradient(125deg,#E8552A,#ff9a6c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>needs in one place.</span>
            </h2>
            <p style={{fontFamily:"'Manrope',sans-serif",fontSize:15,color:"#68686e",fontWeight:400,maxWidth:460,margin:"0 auto"}}>Deploy one module or the full suite. Click "More" on any card to see what's included.</p>
          </Sr>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}} className="g3">
            {MODS.map((m,i)=><ModCard key={m.n} mod={m} delay={i*0.07}/>)}
          </div>
        </div>
      </section>
      <MockupSection label="Asset Management" title="Every IT asset. Tracked. Always." sub="Register, assign and monitor every piece of IT equipment across all hospital locations. Smart auto-IDs, QR thermal labels, warranty alerts and a complete ticket workflow with HOD approval." bg="rgba(244,244,248,0.72)" flip={false} chips={["30+ fields per asset","Bulk Excel import","QR thermal labels","Role-based access"]}>
        <MockupAsset/>
      </MockupSection>
      <MockupSection label="Queue Management" title="No more crowded waiting areas." sub="Real-time token queuing for Pharmacy, Radiology, OT and OPD. Live display boards update as patients are called. Reduce wait frustration and manage crowd flow intelligently." bg="rgba(255,255,255,0.78)" flip={true} chips={["Token kiosk display","Live counter boards","SMS wait alerts","Wait time AI"]}>
        <MockupQueue/>
      </MockupSection>
      <MockupSection label="Doctor Availability" title="Know who's available. Right now." sub="Live physician schedule for lobby screens and patient-facing mobile views. Staff and patients always know who's on duty, which room they're in and estimated wait time." bg="rgba(244,244,248,0.72)" flip={false} chips={["Live status board","Lobby display","HIS sync","Room assignment"]}>
        <MockupDoctors/>
      </MockupSection>
      <Depts/>
      <StatsDark/>
      <Services/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </>
  );
}
