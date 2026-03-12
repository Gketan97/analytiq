import { useState, useEffect, useReducer } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — STYLES
// ─────────────────────────────────────────────────────────────────────────────
(function injectStyles() {
  if (document.getElementById("aq-styles")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(link);

  const s = document.createElement("style");
  s.id = "aq-styles";
  s.textContent = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{background:#08080A}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.28}}

    .aq{font-family:'DM Sans',sans-serif;background:#08080A;min-height:100vh;color:#E8E3DB;overflow-x:hidden;position:relative}
    .aq::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 55% 35% at 18% 8%,rgba(255,140,60,.045) 0%,transparent 60%),radial-gradient(ellipse 40% 28% at 82% 85%,rgba(60,120,255,.03) 0%,transparent 60%);pointer-events:none;z-index:0}

    .hdr{position:fixed;top:0;left:0;right:0;z-index:200;height:50px;padding:0 26px;display:flex;align-items:center;justify-content:space-between;background:rgba(8,8,10,.93);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.055)}
    .hdr-logo{font-family:'Syne',sans-serif;font-size:13px;font-weight:800;letter-spacing:.2em;color:#FF8C3C;text-transform:uppercase}
    .hdr-mid{font-family:'DM Mono',monospace;font-size:10px;color:rgba(232,227,219,.3);letter-spacing:.1em;text-transform:uppercase}
    .hdr-right{display:flex;align-items:center;gap:7px;font-family:'DM Mono',monospace;font-size:10px;color:rgba(232,227,219,.36)}
    .lean-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,140,60,.16);border:1px solid rgba(255,140,60,.32);transition:all .3s}
    .lean-dot.on{background:#FF8C3C;box-shadow:0 0 5px rgba(255,140,60,.4)}

    .main{position:relative;z-index:1;padding-top:50px;min-height:100vh;display:flex;flex-direction:column;align-items:center}
    .wrap{width:100%;max-width:648px;padding:34px 22px 92px;animation:fadeUp .4s ease}

    .prog{position:fixed;bottom:0;left:0;right:0;z-index:200;padding:11px 26px 15px;background:linear-gradient(transparent,rgba(8,8,10,.97))}
    .prog-track{height:2px;background:rgba(255,255,255,.05);border-radius:1px;overflow:hidden;margin-bottom:7px}
    .prog-fill{height:100%;background:linear-gradient(90deg,#FF8C3C,#FFb86c);border-radius:1px;transition:width .55s ease}
    .prog-lbl{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,.16);letter-spacing:.12em;text-transform:uppercase;text-align:center}

    .eyebrow{font-family:'DM Mono',monospace;font-size:10px;color:#FF8C3C;letter-spacing:.22em;text-transform:uppercase;opacity:.76;margin-bottom:22px}
    .display{font-family:'Syne',sans-serif;font-size:clamp(30px,5.2vw,50px);font-weight:800;line-height:1.06;color:#E8E3DB;margin-bottom:6px}
    .mono-sub{font-family:'DM Mono',monospace;font-size:12px;color:rgba(255,140,60,.58);letter-spacing:.08em;margin-bottom:30px}
    .act-lbl{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,140,60,.48);letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px}
    .act-lbl::after{content:'';flex:1;height:1px;background:rgba(255,140,60,.1)}
    .scene-lbl{font-family:'DM Mono',monospace;font-size:9px;color:rgba(232,227,219,.2);letter-spacing:.15em;text-transform:uppercase;margin-bottom:4px}
    .sec-head{font-family:'Syne',sans-serif;font-size:19px;font-weight:700;color:#E8E3DB;line-height:1.3;margin-bottom:5px}
    .body-text{font-size:13px;line-height:1.67;color:rgba(232,227,219,.68)}
    .body-text strong{color:#E8E3DB;font-weight:500}

    .btn{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;border:none;border-radius:3px;padding:11px 24px;cursor:pointer;transition:all .16s;font-weight:500}
    .btn-p{color:#08080A;background:#FF8C3C}
    .btn-p:hover:not(:disabled){background:#FFa45c;transform:translateY(-1px)}
    .btn-p:disabled{opacity:.28;cursor:default;transform:none}
    .btn-g{color:rgba(232,227,219,.4);background:transparent;border:1px solid rgba(255,255,255,.1)}
    .btn-g:hover{border-color:rgba(255,255,255,.2);color:#E8E3DB}
    .btn-hint{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,140,60,.38);background:transparent;border:1px solid rgba(255,140,60,.13);border-radius:3px;padding:7px 13px;cursor:pointer;transition:all .16s}
    .btn-hint:hover{border-color:rgba(255,140,60,.3);color:rgba(255,140,60,.72)}

    .card{background:rgba(255,255,255,.017);border:1px solid rgba(255,255,255,.065);border-radius:6px;padding:17px}
    .card-o{background:rgba(255,140,60,.038);border:1px solid rgba(255,140,60,.13);border-radius:6px;padding:17px}
    .card-g{background:rgba(76,175,132,.042);border:1px solid rgba(76,175,132,.16);border-radius:6px;padding:17px}
    .card-r{background:rgba(255,107,107,.042);border:1px solid rgba(255,107,107,.15);border-radius:6px;padding:17px}
    .card-b{background:rgba(60,120,255,.038);border:1px solid rgba(60,120,255,.13);border-radius:6px;padding:17px}
    .clbl{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:7px}
    .lo{color:rgba(255,140,60,.6)} .lg{color:rgba(76,175,132,.6)} .lr{color:rgba(255,107,107,.6)} .lb{color:rgba(100,160,255,.6)} .ld{color:rgba(232,227,219,.2)}

    .slack{background:#15181C;border-radius:6px;padding:15px 17px;margin-bottom:16px;border:1px solid rgba(255,255,255,.048)}
    .slack-ch{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,.2);letter-spacing:.1em;text-transform:uppercase;padding-bottom:10px;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,.048)}
    .slack-row{display:flex;gap:9px;align-items:flex-start;margin-bottom:11px}
    .slack-row:last-child{margin-bottom:0}
    .slack-av{width:27px;height:27px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:10px;font-weight:700}
    .av-pm{background:rgba(60,120,255,.2);color:#7aA8FF} .av-you{background:rgba(255,140,60,.17);color:#FF8C3C} .av-sup{background:rgba(130,60,255,.18);color:#a585FF} .av-mon{background:rgba(60,190,120,.17);color:#4DC888}
    .slack-name{font-size:12px;font-weight:500;color:rgba(255,255,255,.6);margin-bottom:2px}
    .slack-name span{font-size:10px;color:rgba(255,255,255,.18);font-weight:400;margin-left:6px;font-family:'DM Mono',monospace}
    .slack-txt{font-size:13px;line-height:1.62;color:rgba(232,227,219,.74)}

    .mcq-q{font-size:14px;line-height:1.67;color:rgba(232,227,219,.84);margin-bottom:13px;padding:12px 16px;background:rgba(255,255,255,.018);border-left:2px solid rgba(255,140,60,.3);border-radius:0 4px 4px 0;font-style:italic}
    .mcq-opts{display:flex;flex-direction:column;gap:7px}
    .mcq-opt{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border:1px solid rgba(255,255,255,.065);border-radius:5px;cursor:pointer;transition:all .15s;background:rgba(255,255,255,.008);width:100%;text-align:left}
    .mcq-opt:hover:not(.locked){border-color:rgba(255,255,255,.16);background:rgba(255,255,255,.022)}
    .sel{border-color:rgba(255,140,60,.4)!important;background:rgba(255,140,60,.048)!important}
    .correct{border-color:rgba(76,175,132,.5)!important;background:rgba(76,175,132,.05)!important}
    .wrong{border-color:rgba(255,107,107,.3)!important;background:rgba(255,107,107,.042)!important}
    .locked{cursor:default}
    .mcq-letter{font-family:'DM Mono',monospace;font-size:10px;font-weight:500;color:rgba(255,255,255,.24);flex-shrink:0;padding-top:1px;width:13px}
    .sel .mcq-letter{color:#FF8C3C} .correct .mcq-letter{color:#4CAF84} .wrong .mcq-letter{color:#FF6B6B}
    .mcq-txt{font-size:13px;line-height:1.52;color:rgba(232,227,219,.68)}
    .sel .mcq-txt{color:#E8E3DB}
    .mcq-expl{font-size:11px;line-height:1.5;color:rgba(232,227,219,.38);margin-top:5px;padding-top:5px;border-top:1px solid rgba(255,255,255,.055);font-style:italic;animation:fadeIn .3s ease}

    .ttags{display:flex;gap:4px;flex-wrap:wrap;margin-top:10px;animation:fadeIn .3s ease}
    .tag{font-family:'DM Mono',monospace;font-size:9px;padding:2px 6px;border-radius:2px;letter-spacing:.07em;text-transform:uppercase}
    .tag-b{background:rgba(60,120,255,.09);color:rgba(120,170,255,.75);border:1px solid rgba(60,120,255,.15)}
    .tag-f{background:rgba(255,60,60,.07);color:rgba(255,110,110,.65);border:1px solid rgba(255,60,60,.12)}

    .dtbl{background:rgba(255,255,255,.012);border:1px solid rgba(255,255,255,.055);border-radius:5px;overflow:hidden;font-family:'DM Mono',monospace;font-size:11px;margin-top:9px}
    .dtbl-hdr{display:grid;padding:7px 12px;background:rgba(255,255,255,.02);border-bottom:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.26);font-size:9px;letter-spacing:.08em;text-transform:uppercase}
    .dtbl-row{display:grid;padding:7px 12px;border-bottom:1px solid rgba(255,255,255,.03);color:rgba(232,227,219,.65)}
    .dtbl-row:last-child{border-bottom:none}
    .dtbl-row:hover{background:rgba(255,255,255,.014)}
    .pos{color:#4CAF84} .neg{color:#FF6B6B} .neu{color:rgba(232,227,219,.35)}

    .fw-row{display:grid;grid-template-columns:158px 70px 78px 1fr;gap:5px;align-items:center;padding:6px 10px;border-radius:3px;font-family:'DM Mono',monospace;font-size:10px;color:rgba(232,227,219,.55);margin-bottom:4px;background:rgba(255,255,255,.012)}
    .fw-top{background:rgba(255,140,60,.052)}
    .fw-rank{color:#FF8C3C;font-size:9px}

    .gate{background:rgba(60,120,255,.036);border:1px solid rgba(60,120,255,.12);border-radius:6px;padding:16px;animation:fadeUp .4s ease}
    .gate-lbl{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:rgba(100,160,255,.5);margin-bottom:6px}
    .gate-q{font-size:13px;line-height:1.64;color:rgba(232,227,219,.78);margin-bottom:10px;font-style:italic}
    .gate-ta{width:100%;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.085);border-radius:3px;padding:10px 12px;color:#E8E3DB;font-family:'DM Sans',sans-serif;font-size:12px;line-height:1.62;resize:none;outline:none;transition:border-color .15s;min-height:76px}
    .gate-ta:focus{border-color:rgba(100,160,255,.3)}
    .gate-ta::placeholder{color:rgba(255,255,255,.16)}

    .ai-eval{background:rgba(255,255,255,.014);border:1px solid rgba(255,255,255,.058);border-radius:5px;padding:12px;margin-top:8px;animation:fadeUp .35s ease}
    .ai-lbl{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,.18);letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px;display:flex;align-items:center;gap:6px}
    .ai-dots span{display:inline-block;width:3px;height:3px;border-radius:50%;background:rgba(255,140,60,.48);animation:pulse 1.2s ease infinite}
    .ai-dots span:nth-child(2){animation-delay:.2s} .ai-dots span:nth-child(3){animation-delay:.4s}
    .ai-txt{font-size:12px;line-height:1.64;color:rgba(232,227,219,.68)}
    .ai-pass{color:rgba(76,175,132,.86)} .ai-fail{color:rgba(255,107,107,.8)}
    .chk-list{display:flex;flex-direction:column;gap:5px;margin-top:7px}
    .chk-item{display:flex;align-items:flex-start;gap:7px;font-size:11px;color:rgba(232,227,219,.5);line-height:1.5}
    .chk-p .chk-ico{color:#4CAF84} .chk-f .chk-ico{color:rgba(255,107,107,.5)}
    .chk-ico{font-family:'DM Mono',monospace;font-size:10px;flex-shrink:0;padding-top:1px}

    .hint-box{background:rgba(255,140,60,.034);border:1px solid rgba(255,140,60,.12);border-radius:5px;padding:10px 13px;margin-top:8px;animation:fadeUp .3s ease}
    .hint-lbl{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,140,60,.5);letter-spacing:.14em;text-transform:uppercase;margin-bottom:4px}
    .hint-txt{font-size:12px;line-height:1.62;color:rgba(232,227,219,.6);font-style:italic}

    .blind-hdr{background:rgba(255,107,107,.038);border:1px solid rgba(255,107,107,.15);border-radius:5px;padding:12px 16px;margin-bottom:15px;display:flex;justify-content:space-between;align-items:center}
    .blind-lbl{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,107,107,.7);letter-spacing:.15em;text-transform:uppercase}
    .timer{font-family:'DM Mono',monospace;font-weight:500}
    .t-ok{font-size:19px;color:#FF6B6B} .t-mid{font-size:19px;color:#FFa25c} .t-hot{font-size:19px;animation:pulse .75s ease infinite;color:#FF6B6B}

    .ba-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:12px}
    .ba-bef{background:rgba(255,107,107,.036);border:1px solid rgba(255,107,107,.11);border-radius:5px;padding:12px}
    .ba-aft{background:rgba(76,175,132,.036);border:1px solid rgba(76,175,132,.12);border-radius:5px;padding:12px}
    .ba-lbl{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px}
    .ba-bef .ba-lbl{color:rgba(255,107,107,.5)} .ba-aft .ba-lbl{color:rgba(76,175,132,.5)}
    .ba-txt{font-size:12px;line-height:1.64;color:rgba(232,227,219,.62)}
    .beh-row{display:flex;align-items:center;gap:7px;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.038)}
    .beh-row:last-child{border-bottom:none}
    .beh-chk{font-family:'DM Mono',monospace;font-size:10px;width:13px;flex-shrink:0}
    .by{color:rgba(76,175,132,.8)} .by .beh-chk{color:#4CAF84} .bn{color:rgba(232,227,219,.28)} .bn .beh-chk{color:rgba(232,227,219,.17)}
    .dc-item{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(232,227,219,.58);padding:6px 10px;background:rgba(255,140,60,.03);border:1px solid rgba(255,140,60,.088);border-radius:3px;margin-bottom:5px;transition:opacity .3s}
    .dc-ico{color:#FF8C3C;font-family:'DM Mono',monospace;font-size:11px;flex-shrink:0}

    .intro{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(100vh - 50px);text-align:center;padding:34px 22px;animation:fadeIn .7s ease}
    .phase-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:34px;width:100%;max-width:440px}
    .phase-card{padding:12px 8px;border:1px solid rgba(255,255,255,.065);border-radius:5px;text-align:center}
    .phase-card.active{border-color:rgba(255,140,60,.24);background:rgba(255,140,60,.03)}
    .pc-lbl{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.2);letter-spacing:.15em;text-transform:uppercase;margin-bottom:4px}
    .phase-card.active .pc-lbl{color:#FF8C3C}
    .pc-name{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:rgba(255,255,255,.28)}
    .phase-card.active .pc-name{color:#E8E3DB}

    .divider{height:1px;background:rgba(255,255,255,.05);margin:16px 0}
    .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
    .mt{margin-top:13px} .mt-sm{margin-top:8px}
    .anim{animation:fadeUp .42s ease}
    .score-ring{width:66px;height:66px;border-radius:50%;border:2px solid rgba(76,175,132,.24);display:flex;align-items:center;justify-content:center;margin:0 auto 12px}
    .score-n{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#4CAF84}
    .root-confirm{background:rgba(76,175,132,.045);border:1px solid rgba(76,175,132,.18);border-radius:5px;padding:12px 16px;margin-top:12px;text-align:center}
    .rc-lbl{font-family:'DM Mono',monospace;font-size:9px;color:#4CAF84;letter-spacing:.15em;text-transform:uppercase;margin-bottom:5px}
    .answered-txt{padding:7px 10px;background:rgba(255,255,255,.014);border:1px solid rgba(255,255,255,.055);border-radius:3px;font-size:12px;color:rgba(232,227,219,.5);line-height:1.62;margin-bottom:8px;font-style:italic}
  `;
  document.head.appendChild(s);
})();

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const S = {
  INTRO:"INTRO", DOMAIN_CAL:"DOMAIN_CAL", DOMAIN_SCORE:"DOMAIN_SCORE",
  ACT1:"ACT1", ACT1_GATE:"ACT1_GATE",
  ACT2_WIN:"ACT2_WIN", ACT2_DECOMP:"ACT2_DECOMP", ACT2_GATE:"ACT2_GATE",
  ACT3_HYP:"ACT3_HYP", ACT3_RANK:"ACT3_RANK", ACT3_GATE:"ACT3_GATE",
  ACT4_SEG:"ACT4_SEG", ACT4_INTERP:"ACT4_INTERP", ACT4_CONFIRM:"ACT4_CONFIRM", ACT4_GATE:"ACT4_GATE",
  ACT5_TRAP:"ACT5_TRAP", ACT5_GATE:"ACT5_GATE",
  ACT6_BLIND:"ACT6_BLIND", ACT6_EVAL:"ACT6_EVAL",
  ACT7_RECOM:"ACT7_RECOM", EXIT_GATE:"EXIT_GATE", DEBRIEF:"DEBRIEF",
};

const PCT = {
  INTRO:0,DOMAIN_CAL:5,DOMAIN_SCORE:11,ACT1:16,ACT1_GATE:21,
  ACT2_WIN:26,ACT2_DECOMP:31,ACT2_GATE:36,ACT3_HYP:41,ACT3_RANK:46,ACT3_GATE:51,
  ACT4_SEG:56,ACT4_INTERP:61,ACT4_CONFIRM:66,ACT4_GATE:71,
  ACT5_TRAP:75,ACT5_GATE:79,ACT6_BLIND:84,ACT6_EVAL:89,
  ACT7_RECOM:93,EXIT_GATE:97,DEBRIEF:100,
};

// Socratic hints — never give the answer
const HINTS = {
  "1.1":"What haven't you defined yet before pulling any data?",
  "1.2":"You know the drop happened Tuesday. But is Tuesday always like this?",
  "1.3":"DAU is a count. What are the additive components you can break it into?",
  "1.4":"You have 5 hours and 5 hypotheses. What two criteria should determine the order?",
  "1.5":"You've established the drop is in returning users. Which dimension maps directly to that?",
  "1.6":"Two metrics are moving together. What would you need to observe to say one caused the other?",
  "1.7":"What happened to DAU on Wednesday when notification sends resumed?",
  "1.8":"A one-off company-wide drop and a recurring city-specific pattern — are these structurally the same?",
};

const DC = [
  { q:"In food delivery, what single channel drives the highest percentage of app opens on a typical day?",
    opts:["Organic / direct (user opens app themselves)","Push notifications","Email campaigns","Social media ads"],
    correct:1,
    flash:"Push notifications drive ~34% of app opens. This will be directly relevant to what you find in this case.",
    explanations:[
      "Organic opens rely on the user deciding to order unprompted. Push creates the impulse — structural difference.",
      "Correct. Push is the primary re-engagement trigger in food delivery. ~34% of all app opens.",
      "Email open rates in food delivery are under 5%. Too slow and low-volume for daily DAU impact.",
      "Paid social drives acquisition — new users entering the funnel. Not daily re-engagement of existing users.",
    ]},
  { q:"A food delivery company's DAU drops 15% on a Tuesday. Before looking at any data, which root cause category is historically most common for same-day DAU drops?",
    opts:["Competitor launched an aggressive offer","A product bug affecting checkout flow","Notification volume dropped — fewer users were re-engaged","Restaurant supply reduced — fewer options drove users away"],
    correct:2,
    flash:"Notification drop is the most common driver of same-day DAU decline. The mechanism is direct: fewer triggers → fewer opens → lower DAU.",
    explanations:[
      "Competitor offers affect acquisition and some switching — but brand loyalty is stickier than a 15% same-day swing.",
      "Checkout bugs hurt conversion after app open. DAU itself would stay normal — users open, then fail to order.",
      "Correct. Notification volume is the most direct lever on same-day DAU. Fewer pushes = fewer opens.",
      "Supply affects order completion and satisfaction scores. Users still open the app to browse — DAU wouldn't drop this fast.",
    ]},
  { q:"Swiggy reports DAU dropped. What is the most important clarification to make before starting any investigation?",
    opts:["What cities are affected","What DAU means exactly — how is it measured","Whether competitors had any launches this week","What the engineering team deployed on Tuesday"],
    correct:1,
    flash:"Three different teams can show three different DAU numbers for the same day. Clarifying is not optional.",
    explanations:[
      "City breakdown is useful — but only after you know what you're measuring. Segmenting an undefined metric is meaningless.",
      "Correct. App opens, sessions with search, and orders placed can all show different numbers. Define first.",
      "Competitor context is useful background — but you still don't know what DAU means in this context.",
      "Engineering deploys are worth checking — but not before you've defined the metric you're investigating.",
    ]},
  { q:"You're investigating a DAU drop. Which of these is the correct decomposition of DAU?",
    opts:["Mobile users + Desktop users + Tablet users","Mumbai + Bangalore + Delhi + Other cities","New users acquired + Returning users retained + Resurrected users − Churned users","Food orders + Instamart + Dineout"],
    correct:2,
    flash:"DAU = New + Returning + Resurrected. This immediately tells you whether you have an acquisition problem or a retention problem.",
    explanations:[
      "Platform decomposition is a segmentation cut — useful later. It doesn't explain why users aren't returning.",
      "Geographic decomposition is also a cut, not a structural decomposition of the metric itself.",
      "Correct. This is the user lifecycle decomposition. Each component has a distinct driver, owner, and fix.",
      "Product line breakdown works for revenue metrics — not for understanding user activity patterns.",
    ]},
  { q:"Restaurant X in Bangalore shows 40% fewer orders on Tuesday vs Monday. A junior analyst presents this as significant. What's the senior analyst's first question?",
    opts:["Which cuisine does restaurant X serve","What's the total order volume — is this statistically meaningful","Did restaurant X change their menu on Tuesday","What is restaurant X's average rating"],
    correct:1,
    flash:"A 40% drop in 2% of users is not a 40% problem — it's a 0.8% problem. Sample size is the first filter. Always.",
    explanations:[
      "Cuisine context is useful for forming hypotheses — but only after confirming the signal is statistically real.",
      "Correct. Restaurant X might have had 5 orders Monday and 3 on Tuesday. That's noise, not signal.",
      "Menu changes are worth investigating — but only once you've confirmed the signal is large enough to matter.",
      "Rating is useful context — but sample size is the question that could invalidate the entire finding in one step.",
    ]},
];

const BEHAVIOURS = [
  {key:"B1",label:"Clarify metric first"},
  {key:"B2",label:"Establish baseline"},
  {key:"B3",label:"Decompose before hypothesise"},
  {key:"B4",label:"Identify metric type"},
  {key:"B5",label:"Segment user type first"},
  {key:"B6",label:"Rank hypotheses"},
  {key:"B7",label:"Verify correlation"},
  {key:"B8",label:"Domain knowledge as ranker"},
];

const ALL_CARDS = [
  "Notification mechanics in food delivery",
  "DAU decomposition — user lifecycle segments",
  "Hypothesis ranking framework (P × T)",
  "Correlation verification — the confirmation test",
  "30-day baseline pattern",
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — STATE
// ─────────────────────────────────────────────────────────────────────────────
const INIT = {
  screen:"INTRO",
  dcIdx:0,
  dcAnswers:[],      // FIX #2: actual indices, not null
  dc2Answer:null,    // for dynamic debrief
  leans:0,           // FIX #5: properly wired
  shaped:{},         // { B1:true, ... } — FIX #13
  cardsEarned:[],    // FIX #14
  blindAns:"",
  exitAns:"",
  timer:240,
  timerRunning:false,
};

function reducer(st, a) {
  switch(a.type) {
    case "GO": return {...st, screen:a.screen};
    case "DC_ANSWER": {
      const dcAnswers = [...st.dcAnswers, a.idx];
      const dc2Answer = a.dcIdx === 1 ? a.idx : st.dc2Answer;
      return {...st, dcAnswers, dc2Answer, dcIdx: st.dcIdx + 1};
    }
    case "LEAN":    return {...st, leans: st.leans + 1};
    case "SHAPE":   { const shaped={...st.shaped}; a.bs.forEach(b=>{shaped[b]=true;}); return {...st,shaped}; }
    case "CARD":    return st.cardsEarned.includes(a.card) ? st : {...st, cardsEarned:[...st.cardsEarned, a.card]};
    case "BLIND":   return {...st, blindAns:a.val};
    case "EXIT":    return {...st, exitAns:a.val};
    case "TSTART":  return {...st, timer:240, timerRunning:true};
    case "TSTOP":   return {...st, timerRunning:false};
    case "TICK":    return st.timer<=1 ? {...st,timer:0,timerRunning:false} : {...st,timer:st.timer-1};
    default: return st;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — API
// ─────────────────────────────────────────────────────────────────────────────
async function callClaude(question, answer, criteria, signal) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", signal,
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        model:"claude-sonnet-4-20250514", max_tokens:700,
        messages:[{role:"user",content:`Analytics training evaluator. Be direct and honest.

Question: "${question}"
Student answer: "${answer}"
Criteria:
${criteria.map((c,i)=>`${i+1}. ${c}`).join("\n")}

JSON only, no markdown:
{"pass":boolean,"checklist":[{"criterion":"...","pass":boolean,"note":"max 8 words"}],"feedback":"2 sentences max"}`}]
      }),
    });
    const data = await res.json();
    const txt = data.content[0].text.replace(/```json|```/g,"").trim();
    return JSON.parse(txt);
  } catch(e) {
    if(e.name==="AbortError") return null;
    return {pass:answer.trim().length>50,checklist:criteria.map(c=>({criterion:c,pass:true,note:""})),feedback:"Response recorded."};
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function Hdr({mid, leans, showLeans=true}) {
  return (
    <header className="hdr">
      <div className="hdr-logo">Analytiq</div>
      <div className="hdr-mid">{mid}</div>
      {showLeans
        ? <div className="hdr-right">
            <span>Leans</span>
            {[0,1,2].map(i=><div key={i} className={`lean-dot${i<leans?" on":""}`}/>)}
          </div>
        : <div style={{width:80}}/>}
    </header>
  );
}

function Prog({pct, label}) {
  return (
    <div className="prog">
      <div className="prog-track"><div className="prog-fill" style={{width:`${pct}%`}}/></div>
      <div className="prog-lbl">{label}</div>
    </div>
  );
}

// Director note: abortController cleans up if user navigates away mid-eval
function AIEval({question, answer, criteria, onPass, onFail}) {
  const [status, setStatus] = useState("thinking");
  const [result, setResult] = useState(null);

  useEffect(()=>{
    const ctrl = new AbortController();
    callClaude(question, answer, criteria, ctrl.signal).then(r=>{
      if(!r) return;
      setResult(r); setStatus("done");
    });
    return ()=>ctrl.abort();
  },[]);

  return (
    <div className="ai-eval">
      <div className="ai-lbl">
        {status==="thinking"
          ? <><span>AI evaluating</span><div className="ai-dots"><span/><span/><span/></div></>
          : <span>Evaluation</span>}
      </div>
      {status==="done" && result && (<>
        <p className={`ai-txt ${result.pass?"ai-pass":"ai-fail"}`}>{result.pass?"✓ ":"✗ "}{result.feedback}</p>
        <div className="chk-list">
          {result.checklist.map((item,i)=>(
            <div key={i} className={`chk-item ${item.pass?"chk-p":"chk-f"}`}>
              <span className="chk-ico">{item.pass?"◆":"◇"}</span>
              <span>{item.criterion}{item.note?` — ${item.note}`:""}</span>
            </div>
          ))}
        </div>
        <div className="row mt">
          {result.pass
            ? <button className="btn btn-p" onClick={onPass}>Continue →</button>
            : <><button className="btn btn-p" onClick={onPass}>Continue anyway →</button>
               <button className="btn btn-g" onClick={onFail}>Try again</button></>}
        </div>
      </>)}
    </div>
  );
}

function Gate({question, criteria, onPass}) {
  const [ans, setAns] = useState("");
  const [sub, setSub] = useState(false);
  const ready = ans.trim().length >= 20;
  return (
    <div className="gate">
      <div className="gate-lbl">◈ Reconstruction gate — AI evaluates</div>
      <div className="gate-q">{question}</div>
      {!sub
        ? (<>
            <textarea className="gate-ta" value={ans} rows={4} onChange={e=>setAns(e.target.value)} placeholder="Type your response..."/>
            <div className="row mt">
              <button className="btn btn-p" disabled={!ready} onClick={()=>setSub(true)}>
                {ready?"Submit for evaluation":"Write more..."}
              </button>
            </div>
          </>)
        : (<>
            <div className="answered-txt">{ans}</div>
            <AIEval question={question} answer={ans} criteria={criteria} onPass={onPass} onFail={()=>setSub(false)}/>
          </>)}
    </div>
  );
}

// FIX #1: key={} on parent remounts MCQ cleanly — no state leaks across questions
// FIX #2: onAny(sel, isCorrect) returns actual index
// FIX #5: hint button fires onLean → dispatch LEAN
// FIX #8: target tags shown only after reveal
function MCQ({question, opts, correct, cons={}, hintId, onLean, onAny, isDC=false, dcData=null}) {
  const [sel, setSel]       = useState(null);
  const [revealed, setRev]  = useState(false);
  const [showFlash, setFlash] = useState(false);
  const [showHint, setHint] = useState(false);
  const isCorrect = sel === correct;

  const lock = () => {
    if(sel===null) return;
    setRev(true);
    setTimeout(()=>setFlash(true), 460);
  };

  const handleHint = () => { setHint(true); if(onLean) onLean(); };

  return (
    <div>
      <div className="mcq-q">{question}</div>
      <div className="mcq-opts">
        {opts.map((opt,i)=>{
          let cls="";
          if(revealed){ cls=i===correct?"correct":i===sel?"wrong":""; cls+=" locked"; }
          else { cls=i===sel?"sel":""; }
          return (
            <button key={i} className={`mcq-opt ${cls}`} onClick={()=>!revealed&&setSel(i)}>
              <span className="mcq-letter">{String.fromCharCode(65+i)}</span>
              <div style={{flex:1}}>
                <div className="mcq-txt">{opt}</div>
                {/* DC option explanations after reveal */}
                {isDC && revealed && dcData && <div className="mcq-expl">{dcData.explanations[i]}</div>}
              </div>
            </button>
          );
        })}
      </div>

      {/* FIX #8: tags only after reveal */}
      {revealed && cons.targets && (
        <div className="ttags">
          {cons.targets.bs?.map(b=><span key={b} className="tag tag-b">{b}</span>)}
          {cons.targets.fs?.map(f=><span key={f} className="tag tag-f">{f}</span>)}
        </div>
      )}

      {!revealed && (
        <div className="row mt">
          <button className="btn btn-p" disabled={sel===null} onClick={lock}>Lock in answer</button>
          {/* FIX #5: hint wired */}
          {hintId && !showHint && <button className="btn-hint" onClick={handleHint}>Need a hint?</button>}
        </div>
      )}

      {showHint && !revealed && (
        <div className="hint-box">
          <div className="hint-lbl">◈ Hint</div>
          <div className="hint-txt">"{HINTS[hintId]}"</div>
        </div>
      )}

      {revealed && !isCorrect && cons[sel]!=null && (
        <div className="card-r mt anim">
          <div className="clbl lr">⚠ Consequence</div>
          <p className="body-text">{cons[sel]}</p>
        </div>
      )}

      {showFlash && (<>
        {cons.flash && (
          <div className="card-o mt anim">
            <div className="clbl lo">◈ Domain flash</div>
            <p className="body-text">"{cons.flash}"</p>
          </div>
        )}
        <div className="row mt">
          {/* FIX #2: pass actual sel + isCorrect */}
          <button className="btn btn-p" onClick={()=>onAny&&onAny(sel,isCorrect)}>
            {isCorrect?"Continue →":"Got it — continue →"}
          </button>
        </div>
      </>)}
    </div>
  );
}

function DataTable({cols, rows, grid}) {
  return (
    <div className="dtbl">
      <div className="dtbl-hdr" style={{gridTemplateColumns:grid}}>
        {cols.map(c=><span key={c}>{c}</span>)}
      </div>
      {rows.map((row,i)=>(
        <div key={i} className="dtbl-row" style={{
          gridTemplateColumns:grid,
          fontWeight:row.bold?500:400,
          borderTop:row.sep?"1px solid rgba(255,255,255,.07)":undefined,
        }}>
          {row.cells.map((cell,j)=><span key={j} className={cell.cls||""}>{cell.v}</span>)}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — SCREENS
// Contract: function Screen({state, dispatch}) — all useState at top level
// ─────────────────────────────────────────────────────────────────────────────
const go = (dispatch, screen) => dispatch({type:"GO", screen});

function ScreenIntro({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="The Thinking Gym" showLeans={false}/>
      <div className="main">
        <div className="intro">
          <div className="eyebrow">Flight Simulator for Analysts</div>
          <h1 className="display">Learn to think.<br/>Not just answer.</h1>
          <p className="mono-sub">Swiggy DAU Drop · Case Study 01</p>
          <p style={{fontSize:14,lineHeight:1.7,color:"rgba(232,227,219,.5)",maxWidth:420,marginBottom:34}}>
            A PM pings you at 9am. DAU dropped 12% WoW. Answer needed by 5pm. You are a junior analyst handling your first escalation.
          </p>
          <div className="phase-grid">
            {[["Phase 1","Learn",true],["Phase 2","Practice",false],["Phase 3","Perform",false]].map(([ph,name,active])=>(
              <div key={ph} className={`phase-card${active?" active":""}`}>
                <div className="pc-lbl">{ph}</div>
                <div className="pc-name">{name}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-p" onClick={()=>go(dispatch,S.DOMAIN_CAL)}>Begin case →</button>
        </div>
      </div>
    </div>
  );
}

function ScreenDomainCal({state, dispatch}) {
  const q = DC[state.dcIdx];
  return (
    <div className="aq">
      <Hdr mid={`Domain Calibration · ${state.dcIdx+1} / 5`} showLeans={false}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Pre-case · Domain calibration</div>
          <p style={{fontSize:12,color:"rgba(232,227,219,.3)",marginBottom:16,fontFamily:"DM Mono,monospace",letterSpacing:".05em"}}>
            5 questions. Activates your priors. No gatekeeping — calibrates the case to you.
          </p>
          {/* FIX #1: key forces remount on each question */}
          <MCQ
            key={state.dcIdx}
            isDC dcData={q}
            question={q.q} opts={q.opts} correct={q.correct}
            cons={{flash:q.flash}}
            onAny={(sel)=>{
              // FIX #2: dispatch actual sel index
              dispatch({type:"DC_ANSWER", idx:sel, dcIdx:state.dcIdx});
              if(state.dcIdx>=4) go(dispatch, S.DOMAIN_SCORE);
            }}
          />
        </div>
      </div>
      <Prog pct={(state.dcIdx/5)*11} label="Domain Calibration"/>
    </div>
  );
}

function ScreenDomainScore({state, dispatch}) {
  // FIX #2: score from actual answers
  const score = state.dcAnswers.filter((a,i)=>a===DC[i]?.correct).length;
  return (
    <div className="aq">
      <Hdr mid="Domain Baseline" showLeans={false}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Domain baseline</div>
          <div className="score-ring"><span className="score-n">{score}/5</span></div>
          <h2 className="sec-head" style={{textAlign:"center",marginBottom:5}}>
            {score>=4?"Strong domain baseline.":score>=2?"Some gaps to address.":"Significant gaps identified."}
          </h2>
          <p style={{fontSize:12,color:"rgba(232,227,219,.36)",textAlign:"center",marginBottom:22,lineHeight:1.65,fontFamily:"DM Mono,monospace"}}>
            {score}/5 correct. The case fills these gaps — not by telling you, but by showing you the cost of not having them.
          </p>
          <div className="card" style={{marginBottom:20}}>
            <p className="body-text"><strong>The case begins now.</strong> You are a junior analyst at Swiggy. 9:07am. Answer needed by 5pm. No playbook. Every decision has a consequence.</p>
          </div>
          <button className="btn btn-p" onClick={()=>go(dispatch,S.ACT1)}>Enter the case →</button>
        </div>
      </div>
    </div>
  );
}

function ScreenAct1({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 1 · The Brief" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 1 · The brief</div>
          <div className="scene-lbl">Decision 1.1 · The First Move</div>
          <div className="slack">
            <div className="slack-ch">#analytics-escalations</div>
            <div className="slack-row">
              <div className="slack-av av-pm">PS</div>
              <div>
                <div className="slack-name">Priya Sharma <span>[PM, Growth] · 9:07am</span></div>
                <div className="slack-txt">Hey — just got flagged by leadership. Our DAU dropped 12% WoW as of yesterday. Started Tuesday. No product deploys that day that we know of. Need a root cause and a recommendation by 5pm. Can you take this?</div>
              </div>
            </div>
            <div className="slack-row">
              <div className="slack-av av-you">Me</div>
              <div>
                <div className="slack-name">You <span>9:09am</span></div>
                <div className="slack-txt">On it.</div>
              </div>
            </div>
          </div>
          <MCQ key="act1"
            question="Before you open any dashboard or pull any data, what is your first move?"
            opts={["Pull the DAU trend for the last 30 days to see the full picture","Ask Priya what exactly DAU means — how is it being measured","Check the engineering deploy log for Tuesday","Look at whether competitors launched anything this week"]}
            correct={1} hintId="1.1"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{bs:["B1"],fs:["F1.1 · Metric Ambiguity Blindness"]},
              0:"You pull the 30-day trend. Priya asks which DAU definition you used — app opens, sessions with search, or orders placed. They're showing different things. 1h 40m of analysis potentially invalidated.",
              2:"You check the deploy log. Nothing on Tuesday. 45 minutes on a dead end. You still don't know what DAU means.",
              3:"You check competitor activity. Nothing significant. 40 minutes confirming absence of evidence. You still don't know what you're measuring.",
              flash:"Three different teams can show three different DAU numbers for the same day — all correct by their own definitions. Senior analysts clarify in the first message. Not after the analysis is done.",
            }}
            onAny={(_,isCorrect)=>{ if(isCorrect) dispatch({type:"SHAPE",bs:["B1"]}); go(dispatch,S.ACT1_GATE); }}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT1} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct1Gate({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 1 · Gate" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 1 · Reconstruction gate</div>
          <Gate
            question="In your own words — why do you clarify the metric definition before pulling any data? What specific risk does skipping this create?"
            criteria={["Mentions rework risk or analysis invalidation","Understands different definitions can produce different numbers for the same day","Shows the specific consequence — not just 'it's important'"]}
            onPass={()=>go(dispatch,S.ACT2_WIN)}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT1_GATE} label="Phase 1 · Learn"/>
    </div>
  );
}

// FIX #3: correct-path output gated on local state, not rendered unconditionally
function ScreenAct2Win({state, dispatch}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="aq">
      <Hdr mid="Act 2 · Scoping" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 2 · Scoping the investigation</div>
          <div className="scene-lbl">Decision 1.2 · The Time Window</div>
          <div className="card" style={{marginBottom:14}}>
            <p className="body-text"><strong>Context confirmed:</strong> DAU = unique users who opened the app at least once. Drop confirmed at 12% WoW, starting Tuesday.</p>
          </div>
          <MCQ key="act2_win"
            question="What time window do you pull first to understand this drop?"
            opts={["Last 7 days — that's when the drop happened","Last 30 days — establish a baseline and check for patterns","Last 90 days — account for any seasonal trends","Tuesday to today — isolate the exact drop window precisely"]}
            correct={1} hintId="1.2"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{bs:["B2"],fs:["F1.4 · Missing Time Dimension"]},
              0:"You pull 7-day data. Drop is clear. Three hours later: 'Is this drop unusual for a Tuesday? What's the Tuesday baseline?' You don't know. Meeting paused.",
              2:"90 days is more than you need — you'll drown in seasonal noise before confirming whether Tuesday is even anomalous.",
              3:"Tuesday-to-today shows the drop but can't tell you if Tuesday is always lower. No baseline. Can't call this an anomaly.",
              flash:"Food delivery has strong day-of-week patterns. Always establish the baseline before declaring an anomaly. The 30-day view answers: is this normal for a Tuesday? Is the drop accelerating or recovering?",
            }}
            onAny={(_,isCorrect)=>{
              if(isCorrect){ dispatch({type:"SHAPE",bs:["B2"]}); dispatch({type:"CARD",card:"30-day baseline pattern"}); }
              setRevealed(true);
            }}
          />
          {/* FIX #3: output only after MCQ answered */}
          {revealed && (
            <div className="card-g mt anim">
              <div className="clbl lg">◆ 30-day baseline output</div>
              <p className="body-text mt-sm">Three prior Tuesdays are normal. <strong>This Tuesday is the anomaly.</strong></p>
              <p className="body-text mt-sm">Normal Tuesday DAU: ~2.4M &nbsp;·&nbsp; This Tuesday: ~2.1M &nbsp;·&nbsp; Drop: <strong style={{color:"#FF6B6B"}}>300K users</strong></p>
              <div className="row mt">
                <button className="btn btn-p" onClick={()=>go(dispatch,S.ACT2_DECOMP)}>Continue →</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Prog pct={PCT.ACT2_WIN} label="Phase 1 · Learn"/>
    </div>
  );
}

// FIX #3: decomp table gated on local revealed state
function ScreenAct2Decomp({state, dispatch}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="aq">
      <Hdr mid="Act 2 · Decomposition" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="scene-lbl">Decision 1.3 · Metric Decomposition</div>
          <MCQ key="act2_decomp"
            question="Before segmenting, what type of metric is DAU — and what does that tell you about where to look?"
            opts={["DAU is a rate metric — it measures the percentage of total users who are active","DAU is a volume metric — it measures a count of users, decomposable into additive components","DAU is a quality metric — it measures how engaged users are with the product","DAU is a composite metric — it combines multiple behaviours into one number"]}
            correct={1} hintId="1.3"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{bs:["B3","B4"],fs:["F2.2","F2.3"]},
              flash:"This decomposition takes 90 seconds and eliminates 60% of root causes. Anything acquisition-related — marketing, App Store, referrals — is eliminated. The problem is re-engagement failure.",
            }}
            onAny={(_,isCorrect)=>{
              if(isCorrect){ dispatch({type:"SHAPE",bs:["B3","B4"]}); dispatch({type:"CARD",card:"DAU decomposition — user lifecycle segments"}); }
              setRevealed(true);
            }}
          />
          {/* FIX #3: table only after answer */}
          {revealed && (
            <div className="card-g mt anim">
              <div className="clbl lg">◆ Decomposition output</div>
              <DataTable grid="1.4fr 1fr 1fr 1fr"
                cols={["Segment","This Tue","Last Tue","Change"]}
                rows={[
                  {cells:[{v:"New users"},{v:"142K"},{v:"138K"},{v:"+3%",cls:"pos"}]},
                  {cells:[{v:"Returning users"},{v:"1,621K"},{v:"1,940K"},{v:"-16%",cls:"neg"}]},
                  {cells:[{v:"Resurrected"},{v:"187K"},{v:"184K"},{v:"+2%",cls:"pos"}]},
                  {cells:[{v:"Total DAU"},{v:"1,950K"},{v:"2,262K"},{v:"-14%",cls:"neg"}],bold:true,sep:true},
                ]}
              />
              <p className="body-text mt-sm">Drop is <strong>entirely in returning users</strong>. New acquisition flat. This is a <strong>re-engagement problem</strong>.</p>
              <div className="row mt">
                <button className="btn btn-p" onClick={()=>go(dispatch,S.ACT2_GATE)}>Continue →</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Prog pct={PCT.ACT2_DECOMP} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct2Gate({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 2 · Gate" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 2 · Reconstruction gate</div>
          <Gate
            question="The decomposition showed returning users down 16%, new users flat. Name two root cause categories you can immediately eliminate — and explain why the decomposition lets you eliminate them."
            criteria={["Acquisition-related causes eliminated (marketing, App Store, referral)","Understands flat new users means top-of-funnel is working","Can connect decomposition output to hypothesis elimination"]}
            onPass={()=>go(dispatch,S.ACT3_HYP)}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT2_GATE} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct3Hyp({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 3 · Hypothesis" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 3 · Hypothesis formation</div>
          <div className="scene-lbl">Decision 1.4 · Hypothesis Generation</div>
          <MCQ key="act3_hyp"
            question="Generate your hypotheses for why returning users didn't open the app this Tuesday. Which set is most complete and correctly structured?"
            opts={[
              "1. Product bug  2. Bad reviews  3. Competitor offer  4. Price increase  5. Weather",
              "1. Re-engagement trigger failed  2. Supply-side issue  3. Product/app experience degraded  4. External demand suppressor  5. Competitive pull",
              "1. Notification problem  2. Server issue  3. Zomato launched offer  4. It's just Tuesday",
              "1. Unhappy with service quality  2. Delivery times increased  3. Prices went up  4. App got bad reviews",
            ]}
            correct={1} hintId="1.4"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{fs:["F3.1 · Random Hypothesis Generation"],bs:["B8"]},
              flash:"The correct set maps to distinct parts of the re-engagement mechanism: trigger, supply, experience, external, competitive. A structured tree — not a brainstorm. Ensures you don't miss entire root cause categories.",
            }}
            onAny={()=>{ dispatch({type:"CARD",card:"Hypothesis ranking framework (P × T)"}); go(dispatch,S.ACT3_RANK); }}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT3_HYP} label="Phase 1 · Learn"/>
    </div>
  );
}

// FIX #4: ranking framework hidden until after MCQ answered
function ScreenAct3Rank({state, dispatch}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="aq">
      <Hdr mid="Act 3 · Ranking" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="scene-lbl">Decision 1.5 · Hypothesis Ranking</div>
          <MCQ key="act3_rank"
            question="You have 5 hypotheses and 5 hours. In what order do you investigate?"
            opts={[
              "1. Re-engagement trigger  2. Supply issue  3. App experience  4. External  5. Competitive",
              "1. Supply issue  2. App experience  3. Re-engagement trigger  4. Competitive  5. External",
              "1. External suppressor  2. Competitive  3. Supply  4. App experience  5. Re-engagement",
              "Investigate all simultaneously — one query per hypothesis",
            ]}
            correct={0} hintId="1.4"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{bs:["B6"],fs:["F3.2 · Random Investigation Order"]},
              3:"90 minutes later you have 5 partial signals and no confirmed root cause. Priya: 'What's the root cause? Meeting is in 3 hours.' You don't know.",
              flash:"Rank by Probability × Testability. Re-engagement trigger scores highest on both: ~34% of opens (high probability) and notification logs are immediate (high testability).",
            }}
            onAny={(_,isCorrect)=>{ if(isCorrect) dispatch({type:"SHAPE",bs:["B6"]}); setRevealed(true); }}
          />
          {/* FIX #4: framework only visible after answer */}
          {revealed && (
            <div className="card-o mt anim">
              <div className="clbl lo">◆ Ranking framework</div>
              <p style={{fontSize:11,color:"rgba(232,227,219,.32)",fontFamily:"DM Mono,monospace",marginBottom:8}}>Rank by: Probability × Testability</p>
              {[
                ["Re-engagement trigger","High","Immediate","Rank 1",true],
                ["Supply issue","Med-High","30 mins","Rank 2",false],
                ["App experience","Medium","Immediate","Rank 3",false],
                ["External suppressor","Low","Immediate","Rank 4",false],
                ["Competitive pull","Low","Slow","Rank 5",false],
              ].map(([n,p,t,r,top])=>(
                <div key={n} className={`fw-row${top?" fw-top":""}`}>
                  <span>{n}</span>
                  <span style={{color:top?"#4CAF84":"inherit"}}>{p}</span>
                  <span>{t}</span>
                  <span className="fw-rank">{r}</span>
                </div>
              ))}
              <div className="row mt">
                <button className="btn btn-p" onClick={()=>go(dispatch,S.ACT3_GATE)}>Continue →</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Prog pct={PCT.ACT3_RANK} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct3Gate({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 3 · Gate" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 3 · Reconstruction gate</div>
          <Gate
            question="Rank these two hypotheses and explain your reasoning: Hypothesis X: Users are unhappy with delivery time increases. Hypothesis Y: Push notification send volume dropped Tuesday morning."
            criteria={["Y ranked first","Reasoning includes testability — notification logs are immediate","Reasoning connects to the returning user drop specifically","Bonus: delivery time dissatisfaction appears in completion/ratings, not DAU"]}
            onPass={()=>go(dispatch,S.ACT4_SEG)}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT3_GATE} label="Phase 1 · Learn"/>
    </div>
  );
}

// FIX #3: notification table gated on local revealed state
function ScreenAct4Seg({state, dispatch}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="aq">
      <Hdr mid="Act 4 · Data Investigation" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 4 · Data investigation</div>
          <div className="scene-lbl">Decision 1.6 · Segmentation Sequence</div>
          <MCQ key="act4_seg"
            question="You're investigating the notification hypothesis. How do you cut the notification data first?"
            opts={["By city — Mumbai, Bangalore, Delhi, Others","By platform — Android vs iOS vs Web","By user segment — new vs returning vs lapsed","By time of day — morning vs afternoon vs evening sends"]}
            correct={2} hintId="1.5"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{bs:["B5"],fs:["F4.2 · Wrong Segmentation Sequence"]},
              0:"You find the drop is uniform across all cities. You already knew the DAU drop was returning-user specific. Wrong dimension for the pattern. 10 minutes, no new information.",
              1:"Platform cuts are useful later — but you've established this is a returning user problem. Platform doesn't map to that.",
              3:"Time-of-day is a valid secondary cut — but you haven't first confirmed which user segment is affected.",
              flash:"Always segment on the dimension that matches the pattern you've identified. The pattern is in returning users — so the first cut is user type.",
            }}
            onAny={(_,isCorrect)=>{ if(isCorrect) dispatch({type:"SHAPE",bs:["B5"]}); setRevealed(true); }}
          />
          {/* FIX #3: table only after answer */}
          {revealed && (
            <div className="card-g mt anim">
              <div className="clbl lg">◆ Notification send by user segment</div>
              <DataTable grid="1.4fr 1fr 1fr 1fr"
                cols={["Segment","Sent Tue","Last Tue","Change"]}
                rows={[
                  {cells:[{v:"New users"},{v:"892K"},{v:"887K"},{v:"+1%",cls:"pos"}]},
                  {cells:[{v:"Returning"},{v:"412K"},{v:"891K"},{v:"-54%",cls:"neg"}]},
                  {cells:[{v:"Lapsed"},{v:"124K"},{v:"128K"},{v:"-3%",cls:"neu"}]},
                ]}
              />
              <p className="body-text mt-sm">Returning user notification volume dropped <strong>54% on Tuesday</strong>. Matches exactly the segment showing the DAU drop.</p>
              <div className="row mt">
                <button className="btn btn-p" onClick={()=>go(dispatch,S.ACT4_INTERP)}>Continue →</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Prog pct={PCT.ACT4_SEG} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct4Interp({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 4 · Interpretation" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="scene-lbl">Decision 1.7 · Interpretation</div>
          <div className="card-r" style={{marginBottom:13}}>
            <div className="clbl lr">⚡ Most important decision in the case</div>
          </div>
          <MCQ key="act4_interp"
            question="The output shows returning user notification volume dropped 54% on Tuesday. What does this tell you?"
            opts={[
              "Notifications caused the DAU drop. This is the root cause. Escalate immediately.",
              "Notification drop is correlated with DAU drop in the returning user segment. Strong signal. Needs one confirmation before calling root cause.",
              "This is probably coincidence. Correlation doesn't mean causation. Keep investigating all hypotheses.",
              "The notification system is broken. Get engineering on the phone now.",
            ]}
            correct={1} hintId="1.6"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{fs:["F4.6 · Output Interpretation Under Pressure"]},
              0:"You send the finding to Priya. She shares with VP. VP asks: 'How do we know notifications caused the drop vs both being caused by something else?' You called root cause on a correlation.",
              2:"'Keep investigating all hypotheses' wastes the 5 hours you have. You have a strong signal that deserves one targeted confirmation — not broad reinvestigation.",
              flash:"Correlation is evidence. It is not proof. Never call root cause until you can answer 'what would disprove this?' — then check that thing.",
            }}
            onAny={(_,isCorrect)=>{ if(isCorrect) dispatch({type:"SHAPE",bs:["B7"]}); go(dispatch,S.ACT4_CONFIRM); }}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT4_INTERP} label="Phase 1 · Learn"/>
    </div>
  );
}

// FIX #3: confirmation table gated on local revealed state
function ScreenAct4Confirm({state, dispatch}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="aq">
      <Hdr mid="Act 4 · Confirmation" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="scene-lbl">Decision 1.8 · Confirmation</div>
          <MCQ key="act4_confirm"
            question="What single data point confirms the notification drop caused the DAU drop — not just correlated with it?"
            opts={["Check if DAU started recovering when notification volume resumed","Survey returning users who didn't open the app on Tuesday","Check competitor app download numbers on Tuesday","Pull the notification open rate — if it's still high, the system works fine"]}
            correct={0} hintId="1.7"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{bs:["B7"],fs:["F4.1 · Correlation vs Causation"]},
              1:"Surveys take days and return noisy self-reported data. You have a deadline in hours.",
              2:"Competitor downloads don't confirm whether your notifications caused your DAU drop.",
              3:"Open rate measures quality of sends that happened — it can't tell you about users who never received a notification.",
              flash:"The confirmation test: what happens when the cause stops? If notifications resuming → DAU recovering with consistent lag, that's causation confirmed.",
            }}
            onAny={(_,isCorrect)=>{
              if(isCorrect){ dispatch({type:"SHAPE",bs:["B7"]}); dispatch({type:"CARD",card:"Correlation verification — the confirmation test"}); }
              setRevealed(true);
            }}
          />
          {/* FIX #3: table only after answer */}
          {revealed && (
            <div className="card-g mt anim">
              <div className="clbl lg">◆ Confirmation output</div>
              <DataTable grid="1fr 1fr 1fr 1fr"
                cols={["Day","Notif Sent","Ret. DAU","Change"]}
                rows={[
                  {cells:[{v:"Monday"},{v:"891K"},{v:"1,940K"},{v:"baseline",cls:"neu"}]},
                  {cells:[{v:"Tuesday"},{v:"412K"},{v:"1,621K"},{v:"-16%",cls:"neg"}]},
                  {cells:[{v:"Wednesday"},{v:"834K"},{v:"1,847K"},{v:"+14%",cls:"pos"}]},
                  {cells:[{v:"Thursday"},{v:"878K"},{v:"1,902K"},{v:"+3%",cls:"pos"}]},
                ]}
              />
              <div className="root-confirm">
                <div className="rc-lbl">◆ Root cause confirmed</div>
                <p className="body-text">Returning user notification volume dropped 54% Tuesday due to a CRM send-limit config error. DAU recovered proportionally. Lag consistent: notifications 8am → DAU impact 11am.</p>
                <p className="body-text mt-sm"><strong>Confidence: High · Owner: CRM / Growth Engineering</strong></p>
              </div>
              <div className="row mt">
                <button className="btn btn-p" onClick={()=>go(dispatch,S.ACT4_GATE)}>Continue →</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Prog pct={PCT.ACT4_CONFIRM} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct4Gate({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 4 · Gate" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 4 · Reconstruction gate</div>
          <Gate
            question="A colleague shows you two metrics moving together and says 'this proves X causes Y.' What's the one question you ask before agreeing?"
            criteria={["Some version of: 'what happens when X stops?' or 'does Y recover when X resumes?'","Or: 'what else could be causing both X and Y simultaneously?'","Not just 'correlation ≠ causation' — requires the operational check, not just the concept"]}
            onPass={()=>go(dispatch,S.ACT5_TRAP)}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT4_GATE} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct5Trap({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 5 · The Trap" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 5 · Domain knowledge trap</div>
          <div className="card-o" style={{marginBottom:13}}>
            <div className="clbl lo">⚡ Designed overconfidence moment</div>
            <p className="body-text">You just solved the case. Domain knowledge is fresh. Now a different PM asks a different question.</p>
          </div>
          <div className="slack">
            <div className="slack-ch">#analytics-escalations</div>
            <div className="slack-row">
              <div className="slack-av av-sup">AM</div>
              <div>
                <div className="slack-name">Arjan Mehta <span>[PM, Supply] · 2:15pm</span></div>
                <div className="slack-txt">Hey — quick one while you're in investigation mode. Our Tuesday Bangalore DAU has been low for 3 weeks in a row now. Different from the company-wide drop. Any quick hypothesis?</div>
              </div>
            </div>
          </div>
          <MCQ key="act5_trap"
            question="Based on what you just learned, what's your first hypothesis for Bangalore's recurring Tuesday DAU pattern?"
            opts={[
              "Notification send volume is probably dropping on Tuesdays in Bangalore specifically",
              "This is likely supply-side — Bangalore restaurants may have higher Monday closure rates",
              "Recurring patterns need baseline investigation first — 3 weeks of data needs checking against historical Bangalore Tuesday patterns before forming any hypothesis",
              "This is probably a different issue — recurring patterns have different root causes than one-off drops",
            ]}
            correct={2} hintId="1.8"
            onLean={()=>dispatch({type:"LEAN"})}
            cons={{
              targets:{bs:["B8"],fs:["F5.2 · Over-relying on Pattern Matching"]},
              0:"You pull Bangalore notification data for 3 Tuesdays. Notification send volume: 97–99% of normal. Notifications are fine. You applied a one-off pattern to a structurally different problem.",
              flash:"Domain knowledge is a prior, not a conclusion. A recurring city-specific pattern is structurally different from a one-off company-wide drop. The moment you treat domain knowledge as a conclusion, it becomes a liability.",
            }}
            onAny={(_,isCorrect)=>{ if(isCorrect) dispatch({type:"SHAPE",bs:["B8"]}); go(dispatch,S.ACT5_GATE); }}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT5_TRAP} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct5Gate({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 5 · Gate" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 5 · Reconstruction gate</div>
          <Gate
            question="A colleague tells you Tuesday drops are usually notification-driven. They then ask you about a different metric dropping every Tuesday for a month. Do you apply the same hypothesis first? Why or why not?"
            criteria={["No — recurring patterns require baseline investigation first","Domain knowledge provides a hypothesis to consider, not confirm","One-off vs recurring patterns require different investigation approaches"]}
            onPass={()=>go(dispatch,S.ACT6_BLIND)}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT5_GATE} label="Phase 1 · Learn"/>
    </div>
  );
}

// FIX #6: timer starts on THIS screen's mount via useEffect
function ScreenAct6Blind({state, dispatch}) {
  useEffect(()=>{
    dispatch({type:"TSTART"});
    return ()=>dispatch({type:"TSTOP"});
  },[]);

  const mins = Math.floor(state.timer/60);
  const secs  = state.timer%60;
  const tCls  = state.timer<45?"timer t-hot":state.timer<120?"timer t-mid":"timer t-ok";
  const ready = state.blindAns.trim().length>=30;

  return (
    <div className="aq">
      <header className="hdr">
        <div className="hdr-logo">Analytiq</div>
        <div className="hdr-mid">Act 6 · Blind Test</div>
        <div className={tCls}>{mins}:{String(secs).padStart(2,"0")}</div>
      </header>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 6 · The blind application test</div>
          <div className="blind-hdr">
            <div>
              <div className="blind-lbl">No scaffolding · No options · No mentor rail</div>
              <div style={{fontSize:10,color:"rgba(255,107,107,.38)",marginTop:3,fontFamily:"DM Mono,monospace"}}>This is the real test of Phase 1</div>
            </div>
            <div className={tCls}>{mins}:{String(secs).padStart(2,"0")}</div>
          </div>
          <div className="slack">
            <div className="slack-ch">#analytics-escalations</div>
            <div className="slack-row">
              <div className="slack-av av-mon">VS</div>
              <div>
                <div className="slack-name">Vikram Singh <span>[PM, Monetisation] · 3:45pm</span></div>
                <div className="slack-txt">Hey — our average order value dropped 8% this week. Started Wednesday. No pricing changes that week. Need to understand what happened.</div>
              </div>
            </div>
          </div>
          <div className="gate">
            <div className="gate-lbl">◈ Free-text response — no MCQ, no hints</div>
            <div className="gate-q">Walk through your first four moves in order. What do you do first, second, third, and fourth — and why each in that order?</div>
            <textarea className="gate-ta" rows={8} style={{minHeight:128}}
              value={state.blindAns}
              onChange={e=>dispatch({type:"BLIND",val:e.target.value})}
              placeholder={"First move: ...\nSecond move: ...\nThird move: ...\nFourth move: ..."}
            />
            <div className="row mt">
              <button className="btn btn-p" disabled={!ready}
                onClick={()=>{ dispatch({type:"TSTOP"}); go(dispatch,S.ACT6_EVAL); }}>
                {ready?"Submit →":"Write more..."}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Prog pct={PCT.ACT6_BLIND} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct6Eval({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 6 · Evaluation" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 6 · AI evaluation against 4 core behaviours</div>
          <div className="card" style={{marginBottom:13,fontFamily:"DM Mono,monospace",fontSize:12,color:"rgba(232,227,219,.46)",lineHeight:1.65,fontStyle:"italic"}}>
            {state.blindAns||"(no answer recorded)"}
          </div>
          <AIEval
            question="A PM says: 'Our average order value dropped 8% this week. Started Wednesday. No pricing changes.' What are your first four moves in order?"
            answer={state.blindAns}
            criteria={[
              "B1 · Move 1 clarifies metric definition (What is AOV exactly — GMV/orders or net revenue/orders?)",
              "B2 · Establishes baseline before calling anomaly (Is 8% unusual? What's normal weekly variance?)",
              "B3 · Decomposes before hypothesising (AOV = total value / order count — mix, value, user mix)",
              "B4 · Identifies AOV as rate metric affected by both numerator and denominator",
            ]}
            onPass={()=>{ dispatch({type:"SHAPE",bs:["B1","B2","B3","B4"]}); go(dispatch,S.ACT7_RECOM); }}
            onFail={()=>go(dispatch,S.ACT6_BLIND)}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT6_EVAL} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenAct7Recom({state, dispatch}) {
  return (
    <div className="aq">
      <Hdr mid="Act 7 · Communication" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Act 7 · The recommendation</div>
          <div className="scene-lbl">Decision 1.9 · Communication Structure</div>
          <MCQ key="act7"
            question="Structure your recommendation to Priya. Which version would a senior analyst send?"
            opts={[
              "The DAU drop was caused by a notification issue. We should fix the notification system and monitor DAU recovery.",
              "Situation: DAU dropped 12% Tuesday, entirely in returning user segment. Complication: Notification send volume to returning users dropped 54% due to CRM config error — confirmed by proportional DAU recovery Wed–Thu. Resolution: CRM team to audit send-limit config by EOD. Growth eng to add send-volume monitoring. Expected full recovery within 24 hours.",
              "I investigated DAU, looked at segments, found notifications were down, checked the recovery data, and confirmed it was the notification system. The CRM team should fix it.",
              "Root cause: 54% drop in notification volume. CRM configuration issue. Fix: audit CRM send limits. Timeline: EOD today. Owner: CRM team. Expected impact: full DAU recovery within 24 hours.",
            ]}
            correct={1}
            cons={{
              targets:{fs:["F6.1","F6.2","F6.4"]},
              0:"Too vague. 'Fix the notification system' — which part? Who owns it? By when? Doesn't drive a specific decision.",
              2:"Data journalism. Describes what you did, not what they need to do. PMs don't need your investigation narrative.",
              3:"Acceptable and specific. But missing situation/complication framing that helps Priya communicate upward to the VP.",
              flash:"SCR structure: Situation (what happened), Complication (root cause + evidence), Resolution (who, what, when, expected outcome). Option B is VP-ready. Option D is analyst-ready. Know the difference.",
            }}
            onAny={()=>go(dispatch,S.EXIT_GATE)}
          />
        </div>
      </div>
      <Prog pct={PCT.ACT7_RECOM} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenExitGate({state, dispatch}) {
  const [submitted, setSubmitted] = useState(false);
  const ready = state.exitAns.trim().length>=20;
  return (
    <div className="aq">
      <Hdr mid="Exit Gate" leans={state.leans}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Exit gate · Cold start · Novel context</div>
          <div className="card-o" style={{marginBottom:14}}>
            <div className="clbl lo">Different industry · Different metric · No scaffolding</div>
            <p className="body-text">Apply what you built — without a safety net.</p>
          </div>
          <div className="slack" style={{marginBottom:14}}>
            <div className="slack-ch">#analytics</div>
            <div className="slack-row">
              <div className="slack-av av-mon">PM</div>
              <div>
                <div className="slack-name">PM Message <span>B2B SaaS product</span></div>
                <div className="slack-txt">"Our weekly active users metric dropped 9% this week for our B2B SaaS product. Can you investigate?"</div>
              </div>
            </div>
          </div>
          <div className="gate">
            <div className="gate-lbl">◈ Exit gate — your first 3 questions before touching any data</div>
            <div className="gate-q">What are your first three questions? Different industry. Different metric. No hints.</div>
            {!submitted
              ? (<>
                  <textarea className="gate-ta" rows={5} value={state.exitAns}
                    onChange={e=>dispatch({type:"EXIT",val:e.target.value})}
                    placeholder={"Question 1: ...\nQuestion 2: ...\nQuestion 3: ..."}
                  />
                  <div className="row mt">
                    <button className="btn btn-p" disabled={!ready} onClick={()=>setSubmitted(true)}>Submit →</button>
                  </div>
                </>)
              : (<>
                  <div className="answered-txt">{state.exitAns}</div>
                  <AIEval
                    question="A PM at a B2B SaaS company says weekly active users dropped 9%. What are your first 3 questions before touching any data?"
                    answer={state.exitAns}
                    criteria={[
                      "Question 1 targets metric definition (B1) — e.g. 'How exactly is WAU defined?'",
                      "Question 2 targets baseline / comparison period (B2) — e.g. 'Is 9% unusual for this product?'",
                      "Question 3 targets decomposition or metric type (B3 or B4)",
                    ]}
                    onPass={()=>go(dispatch,S.DEBRIEF)}
                    onFail={()=>{ setSubmitted(false); dispatch({type:"EXIT",val:""}); }}
                  />
                </>)}
          </div>
        </div>
      </div>
      <Prog pct={PCT.EXIT_GATE} label="Phase 1 · Learn"/>
    </div>
  );
}

function ScreenDebrief({state}) {
  // FIX #12: dynamic before-panel from dc2Answer
  const beforeText = ()=>{
    if(state.dc2Answer===null) return "your instinct was to jump to data before defining what you were measuring.";
    if(state.dc2Answer===DC[1].correct) return "you already knew notifications were the likely driver — but hadn't defined what DAU meant. Pattern-matched before metric was defined.";
    return `you thought the cause was "${DC[1].opts[state.dc2Answer].toLowerCase()}" — before defining what DAU even measured.`;
  };
  // FIX #13: dynamic shaped count
  const shapedCount = Object.values(state.shaped).filter(Boolean).length;

  return (
    <div className="aq">
      <Hdr mid="Debrief · Phase 1 Complete" showLeans={false}/>
      <div className="main">
        <div className="wrap">
          <div className="act-lbl">Debrief · Your analytical fingerprint</div>
          <h2 className="sec-head">Phase 1 Complete.</h2>
          <p style={{fontSize:12,color:"rgba(232,227,219,.33)",marginBottom:22,lineHeight:1.65,fontFamily:"DM Mono,monospace"}}>
            Not a score. A mirror. Shows you your own growth.
          </p>

          {/* FIX #12 */}
          <div className="card" style={{marginBottom:11}}>
            <div className="clbl ld" style={{marginBottom:10}}>Analytical fingerprint · Before & after</div>
            <div className="ba-grid">
              <div className="ba-bef">
                <div className="ba-lbl">Before Phase 1</div>
                <div className="ba-txt">When you heard "DAU dropped 12%" {beforeText()}</div>
              </div>
              <div className="ba-aft">
                <div className="ba-lbl">After Phase 1</div>
                <div className="ba-txt">When you heard "AOV dropped 8%" your first instinct was to clarify the metric definition — before touching any data.</div>
              </div>
            </div>
            <div className="card-o" style={{marginTop:0}}>
              <p className="body-text">That shift — from data-first to definition-first — is the single most visible difference between junior and senior analytical thinking. You built it in one session.</p>
            </div>
          </div>

          {/* FIX #13 */}
          <div className="card" style={{marginBottom:11}}>
            <div className="clbl ld" style={{marginBottom:10}}>Behaviours shaped · {shapedCount} / 8</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
              {BEHAVIOURS.map(b=>(
                <div key={b.key} className={`beh-row ${state.shaped[b.key]?"by":"bn"}`}>
                  <span className="beh-chk">{state.shaped[b.key]?"✓":"○"}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
            {shapedCount<8 && (
              <p style={{fontSize:11,color:"rgba(232,227,219,.26)",marginTop:10,fontFamily:"DM Mono,monospace"}}>
                {8-shapedCount} behaviour{8-shapedCount>1?"s":""} not demonstrated. Phase 2 will surface these.
              </p>
            )}
          </div>

          {/* FIX #14 */}
          <div className="card" style={{marginBottom:11}}>
            <div className="clbl ld" style={{marginBottom:10}}>Domain cards · {state.cardsEarned.length} / {ALL_CARDS.length} unlocked</div>
            {ALL_CARDS.map(card=>(
              <div key={card} className="dc-item" style={{opacity:state.cardsEarned.includes(card)?1:.26}}>
                <span className="dc-ico">{state.cardsEarned.includes(card)?"◈":"◇"}</span>
                <span>{card}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{marginBottom:20}}>
            <div className="clbl ld" style={{marginBottom:6}}>Lean count · {state.leans} lean{state.leans!==1?"s":""} used</div>
            <p className="body-text">
              {state.leans===0?"You drove this yourself. Senior analyst standard.":
               state.leans<=2?`You used guidance ${state.leans} time${state.leans>1?"s":""}. Senior analysts typically need 0–1 on this case.`:
               `You leaned on guidance ${state.leans} times. Phase 2 will show you what independent thinking feels like under no safety net.`}
            </p>
          </div>

          <div className="divider"/>
          <div style={{textAlign:"center",padding:"16px 0 8px"}}>
            <p style={{fontFamily:"DM Mono,monospace",fontSize:9,color:"rgba(255,255,255,.16)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:5}}>Phase 2 unlocked</p>
            <p style={{fontSize:12,color:"rgba(232,227,219,.36)",marginBottom:16,lineHeight:1.65}}>
              Meesho GMV stagnation · No MCQs · Student drives · AI corrects
            </p>
            <button className="btn btn-p" style={{opacity:.32,cursor:"not-allowed"}}>Begin Phase 2 → (coming soon)</button>
          </div>
        </div>
      </div>
      <Prog pct={100} label="Phase 1 complete"/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — ROOT
// Single useReducer. Timer tick here. Router is a pure lookup table.
// ─────────────────────────────────────────────────────────────────────────────
const SCREEN_MAP = {
  [S.INTRO]:ScreenIntro, [S.DOMAIN_CAL]:ScreenDomainCal, [S.DOMAIN_SCORE]:ScreenDomainScore,
  [S.ACT1]:ScreenAct1, [S.ACT1_GATE]:ScreenAct1Gate,
  [S.ACT2_WIN]:ScreenAct2Win, [S.ACT2_DECOMP]:ScreenAct2Decomp, [S.ACT2_GATE]:ScreenAct2Gate,
  [S.ACT3_HYP]:ScreenAct3Hyp, [S.ACT3_RANK]:ScreenAct3Rank, [S.ACT3_GATE]:ScreenAct3Gate,
  [S.ACT4_SEG]:ScreenAct4Seg, [S.ACT4_INTERP]:ScreenAct4Interp, [S.ACT4_CONFIRM]:ScreenAct4Confirm, [S.ACT4_GATE]:ScreenAct4Gate,
  [S.ACT5_TRAP]:ScreenAct5Trap, [S.ACT5_GATE]:ScreenAct5Gate,
  [S.ACT6_BLIND]:ScreenAct6Blind, [S.ACT6_EVAL]:ScreenAct6Eval,
  [S.ACT7_RECOM]:ScreenAct7Recom, [S.EXIT_GATE]:ScreenExitGate, [S.DEBRIEF]:ScreenDebrief,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, INIT);

  // Director note: timer tick lives here — single interval, never duplicated
  useEffect(()=>{
    if(!state.timerRunning) return;
    const id = setInterval(()=>dispatch({type:"TICK"}), 1000);
    return ()=>clearInterval(id);
  },[state.timerRunning]);

  // Scroll to top on screen change
  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[state.screen]);

  const Screen = SCREEN_MAP[state.screen] || ScreenIntro;
  return <Screen state={state} dispatch={dispatch}/>;
}
