// Simulation engine: daily step, time advance, mission check
function stepDay(){
 const w=WX[S.wx];
 S.plots.forEach(p=>{
  p.m=Math.max(0,Math.min(100,p.m-(S.st=='water'?4:6)-(w.T>35?6:0)+(w.rain?40:0)));
  if(!p.c)return;const c=CROPS[p.c];
  if(stage(p)<4){ if(p.m>=c.w){p.g++;p.h=Math.min(100,p.h+2)}else p.h-=8 }
  if(w.T>c.t)p.h-=6;
  const sg=c.soil>0?(S.st=='soil'?1:.5):(S.st=='soil'?.25:.5);p.s=Math.max(0,Math.min(100,p.s+c.soil*sg+(S.st=='soil'?.15:0)+(S.st=='rot'&&p.last&&p.last!=p.c?.4:0)));
  if(p.h<=0){S.msg='A '+c.n+' crop withered.';p.c=null;p.g=0;p.h=100}
 });
 S.day++;
 if(S.day%10==0){S.tank=Math.min(100,S.tank+w.refill);S.msg='A new season begins: water tank refilled by '+w.refill+'.'}
}
function advance(n){for(let i=0;i<n;i++)stepDay();checkMis();ui()}
function checkMis(){const m=MIS[S.mis];if(m.chk&&!S.done&&m.chk(S)){S.done=true;S.msg='Mission complete: '+m.n+'!'}}

