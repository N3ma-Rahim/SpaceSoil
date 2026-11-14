// Climate profile, baseline farm state, strategy comparison engine
function climate(){if(!P)return{};const L=LOCS[P.loc];if(L)return{g:L.g,T:L.T,basis:'Approximate regional classification (demo preset)'};const a=Math.abs(+P.lat);if(P.lat!==''&&P.lat!=null&&!isNaN(a))return{g:a<23?'trop':a<35?'semi':a<45?'med':null,basis:'Rough latitude rule from your coordinates, not observations'};return{g:null,basis:'Location unknown'}}
function baseState(){const s=fresh();s.wc0=8;if(!P)return s;const L=LOCS[P.loc];
 const so={sandy:45,loam:70,clay:60,silt:65}[P.soil]||60;s.plots.forEach(p=>p.s=so);
 const n=!P.area||P.area<1?6:P.area<5?9:P.area<20?12:18;s.plots.forEach((p,i)=>{if(i>=n)p.off=true});
 const cl=(P.crops||[]).map(x=>x=='cover'?'clover':x).filter(x=>CROPS[x]);cl.forEach((c,k)=>{for(let j=0;j<2;j++){const p=s.plots[k*2+j];if(p&&!p.off){p.c=c;p.g=Math.floor(CROPS[c].d*.4);p.m=45}}});
 s.wc0={drip:5,sprinkler:8,flood:12,rainfed:14}[P.irr]||8;s.wc=s.wc0;s.tank={Low:40,Medium:70,High:100}[P.water]||70;if(P.irr=='rainfed')s.tank=Math.min(s.tank,25);
 if(L)s.wx=L.wx;s.msg='Virtual farm built from your profile (illustrative layout, not an exact map).';return s}
function setStrat(k){S.st=k;S.wc=Math.round((S.wc0||8)*(k=='water'?.6:1));S.msg='Strategy set: '+k;ui()}
function sim(st,wx){const keep=S;S=baseState();S.st=st;S.wx=wx;S.wc=Math.round((S.wc0||8)*(st=='water'?.6:1));S.used=0;S.hv=0;let val=0;const home=(P&&(P.crops||[]).map(x=>x=='cover'?'clover':x).filter(x=>CROPS[x])[0])||'maize';
 for(let d=0;d<40;d++){S.plots.forEach((p,i)=>{if(p.off)return;if(p.c&&stage(p)==4){const c=CROPS[p.c];val+=Math.max(1,Math.round(c.y*p.h/100))*c.p;p.last=p.c;p.c=null;p.g=0;S.hv++}
  if(!p.c){p.c=st=='rot'?(p.last=='soybean'?'wheat':p.last=='wheat'?'maize':'soybean'):st=='soil'?(i%2?'soybean':'clover'):st=='water'?(i%2?'sorghum':'wheat'):home;p.g=0;p.h=100}
  if(p.m<CROPS[p.c].w+8&&S.tank>=S.wc){S.tank-=S.wc;S.used+=S.wc;p.m=Math.min(100,p.m+40)}});stepDay()}
 const A=S.plots.filter(p=>!p.off),B=A.filter(p=>p.c),m=(l,k)=>l.length?l.reduce((a,p)=>a+p[k],0)/l.length:0;const r={used:S.used,soil:m(A,'s'),health:m(B,'h'),val};S=keep;return r}
function runCmp(){CMP={wx:$('sc').value,r:['cur','water','soil','rot'].map(k=>[k,sim(k,$('sc').value)])};go('strat')}
