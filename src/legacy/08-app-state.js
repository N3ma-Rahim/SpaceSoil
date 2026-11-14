// Application state: farm profile, community data store, helpers
const $=i=>document.getElementById(i),LS=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},SV=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const tag=(t,k)=>`<span class="tag ${k}">${t}</span>`,u=x=>x||tag('Unknown','na');
let P=LS('ss_profile',null),CM=LS('ss_comm',{likes:{},cm:{},mine:[]}),GW={a:3,b:3,c:3,d:3},CMP=null;
