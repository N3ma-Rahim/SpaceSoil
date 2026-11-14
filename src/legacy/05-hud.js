// Farm advisor, game HUD, inventory, modals, mission start
function advice(){
 const p=S.plots[S.sel],st=stage(p),w=WX[S.wx];
 if(S.done)return 'Mission complete! Nicely done.';
 if(p.c){const c=CROPS[p.c];
  if(st==4)return 'Your '+c.n+' is ready to harvest! Pick the Harvest tool.';
  if(p.m<c.w)return 'This plot needs water: '+c.n+' needs ≥'+c.w+' moisture, but it has '+Math.round(p.m)+'.';
  if(w.T>c.t)return 'It is '+w.T+'°C, above what '+c.n+' tolerates ('+c.t+'°C). Try sorghum, the most heat-tolerant here.'}
 if(S.tank<20)return 'Water is running low ('+S.tank+'). Consider water-efficient sorghum or cover crops.';
 if(avg(S,'s')<50)return 'Soil health is low. Consider adding soybean or a cover crop to restore it.';
 if(w.T>=33&&!p.c)return 'Hot, dry conditions: sorghum may be a more water-efficient option here.';
 return p.c?'Your '+CROPS[p.c].n+' is growing well. Advance time to watch it develop.':'Select Plant, pick a seed, then tap an empty plot.'}

function ui(){
 const w=WX[S.wx],T=document.getElementById.bind(document);
 T('top').innerHTML=`<b>🌱 SpaceSoil</b> <span>${SEASONS[season()]}, Year ${S.year} · day ${S.day%10+1}/10</span> <span>💧 Tank ${S.tank}</span> <span>🪙 ${S.coins}</span> <span>🌡 ${w.T}°C ${w.n}</span> <span>Soil ${Math.round(avg(S,'s'))}%</span>`;
 const tl=[['select','👆 Select'],['plant','🌱 Plant'],['water','💧 Water'],['harvest','🧺 Harvest'],['inspect','🔍 Inspect']];
 T('tools').innerHTML=tl.map(([k,l])=>`<button class="${S.tool==k?'on':''}" onclick="S.tool='${k}';ui()">${l}</button>`).join('')+
  ` | `+Object.keys(WX).map(k=>`<button class="${S.wx==k?'on':''}" onclick="S.wx='${k}';S.msg='Weather: ${WX[k].n}';ui()">${WX[k].n}</button>`).join('');
 T('seeds').innerHTML=Object.keys(CROPS).map(k=>`<button class="seed ${S.crop==k?'on':''}" onclick="S.crop='${k}';S.tool='plant';ui()"><i style="background:${CROPS[k].col}"></i>${CROPS[k].n.split(' ')[0]} 🌰${S.seeds[k]} 🧺${S.harvest[k]}</button>`).join('')+
  `<button onclick="buy()">Buy seed (${CROPS[S.crop].p}🪙)</button><button onclick="sell()">Sell harvest</button>`;
 T('time').innerHTML=`<button onclick="advance(1)">Next day</button><button onclick="advance(10)">Advance season</button><button onclick="advance(40);S.year++;ui()">Next year</button><button onclick="go('dash')">⬅ App</button><button data-go='story' data-j='4'>Choose your ending</button><select onchange="setStrat(this.value)">${[['cur','Current practice'],['water','Water-conscious'],['soil','Soil-health'],['rot','Crop rotation']].map(([k,l])=>`<option value="${k}" ${S.st==k?'selected':''}>${l}</option>`).join('')}</select><button onclick="modal('mis')">Missions</button><button onclick="modal('sci')">Science</button><button onclick="if(confirm('Reset the farm?')){S=baseState();ui()}">Reset</button>`;
 T('adv').innerHTML='🧑‍🌾 <b>Advisor</b><br>'+advice()+(S.msg?'<br><small>'+S.msg+'</small>':'');
 const p=S.plots[S.sel],c=p.c&&CROPS[p.c];
 T('info').innerHTML=`<b>Plot ${S.sel+1}</b><br>${c?c.n+' · stage '+(stage(p)+1)+'/5':'Empty'}<br>Moisture ${Math.round(p.m)} · Health ${Math.round(p.h)}<br>Soil ${Math.round(p.s)}`+(c?`<br><small>needs ≥${c.w} water, ≤${c.t}°C</small>`:'')+(MIS[S.mis].goal?`<hr><small>🎯 ${MIS[S.mis].goal}</small>`:'');
 save()}
function buy(){const p=CROPS[S.crop].p;if(S.coins>=p){S.coins-=p;S.seeds[S.crop]++}else S.msg='Not enough coins.';ui()}
function sell(){let t=0;for(const k in S.harvest){t+=S.harvest[k]*CROPS[k].p;S.harvest[k]=0}S.coins+=t;S.msg=t?'Sold for '+t+' coins.':'Nothing to sell.';ui()}
function modal(k){const m=document.getElementById('modal');m.style.display='flex';
 document.getElementById('mbody').innerHTML=k=='mis'?
  '<h3>Missions</h3>'+Object.keys(MIS).map(id=>`<p><button onclick="startMis('${id}')">${MIS[id].n}</button><br><small>${MIS[id].goal||'Sandbox, no goal.'}</small></p>`).join('')+'<button data-x onclick="modal0()">Close</button>':
  `<h3>Science &amp; Data</h3><small>Badges: <b>NASA</b> = real mission, <b>SAMPLE</b> = demo values, <b>SIM</b> = game simulation. No live NASA data is used here; every number in the game is simulated for education, not an agricultural prediction.</small>
  <p><b>SMAP</b> (NASA) measures soil moisture. In game: plot Moisture (SIM).</p>
  <p><b>ECOSTRESS</b> (NASA) measures land surface temperature and plant water stress. In game: heat and water stress (SIM).</p>
  <p><b>GPM</b> (NASA) measures precipitation. In game: the Rainy weather and tank refill (SIM).</p>
  <p><b>Landsat / MODIS</b> (NASA) provide vegetation indices such as NDVI. In game: crop Health (SIM).</p>
  <p><b>NASA POWER</b> provides weather and climate data. In game: season temperatures (SAMPLE).</p>
  <button data-x onclick="modal0()">Close</button>`}
function modal0(){document.getElementById('modal').style.display='none'}
function startMis(id){const m=MIS[id];S=baseState();S.mis=id;if(m.wx){S.wx=m.wx;S.tank=m.tank;S.plots.forEach(p=>{p.s=m.soil;p.m=15})}S.msg='Mission started: '+m.n;modal0();ui()}

