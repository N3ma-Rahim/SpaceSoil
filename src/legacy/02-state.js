// Game state, persistence and stage helpers
const avg=(s,k)=>s.plots.reduce((a,p)=>a+p[k],0)/s.plots.length;
const fresh=()=>({day:0,year:1,tank:80,coins:20,wx:'normal',tool:'select',sel:0,crop:'maize',mis:'none',hv:0,done:false,msg:'',
 seeds:{maize:4,sorghum:3,wheat:3,soybean:3,clover:3},harvest:{maize:0,sorghum:0,wheat:0,soybean:0,clover:0},
 plots:Array.from({length:COLS*ROWS},()=>({c:null,g:0,m:30,h:100,s:65}))});
let S;try{S=JSON.parse(localStorage.getItem('spacesoil'))}catch(e){}
if(!S||!S.plots)S=fresh();
const save=()=>{try{localStorage.setItem('spacesoil',JSON.stringify(S))}catch(e){}};
const season=()=>Math.floor(S.day/10)%4;
const stage=p=>{if(!p.c)return -1;const r=p.g/CROPS[p.c].d;return r<.15?0:r<.4?1:r<.75?2:r<1?3:4};
let scene,drops=[];

