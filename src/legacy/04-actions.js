// Player actions on plots and visual effects
function act(i){
 const p=S.plots[i];if(p.off)return;S.sel=i;const x=OX+(i%COLS)*CW+CW/2,y=OY+Math.floor(i/COLS)*CH+CH/2;
 if(S.tool=='plant'){
  if(p.c)S.msg='This plot is already planted.';
  else if(!S.seeds[S.crop])S.msg='No '+CROPS[S.crop].n+' seeds left. Buy more with coins.';
  else{S.seeds[S.crop]--;if(p.last&&p.last!=S.crop)S.rot=true;p.c=S.crop;p.g=0;p.h=100;burst(x,y,0x8b5a2b,10);S.msg='Planted '+CROPS[S.crop].n+'.'}
 }else if(S.tool=='water'){
  if(S.tank<(S.wc||8))S.msg='The water tank is empty! Wait for the season refill.';
  else{S.tank-=(S.wc||8);p.m=Math.min(100,p.m+40);rain(x,y);S.msg='Watered plot '+(i+1)+'.'}
 }else if(S.tool=='harvest'){
  if(stage(p)==4){const c=CROPS[p.c],q=Math.max(1,Math.round(c.y*p.h/100));S.harvest[p.c]+=q;S.hv++;p.last=p.c;if(WX[S.wx].T>=33)S.hot=(S.hot||0)+1;
   burst(x,y,0xf2c14e,16);float(x,y-30,'+'+q+' '+c.n);p.c=null;p.g=0;S.msg='Harvested '+q+' '+c.n+'.';checkMis()}
  else S.msg=p.c?'Not ready yet.':'Nothing to harvest here.';
 }
 ui()}
function burst(x,y,col,n){for(let k=0;k<n;k++){const c=scene.add.circle(x,y,3,col).setDepth(9);scene.tweens.add({targets:c,x:x+Phaser.Math.Between(-35,35),y:y+Phaser.Math.Between(-45,10),alpha:0,duration:600,onComplete:()=>c.destroy()})}}
function rain(x,y){for(let k=0;k<12;k++){const c=scene.add.circle(x+Phaser.Math.Between(-30,30),y-60,2.5,0x4aa8ff).setDepth(9);scene.tweens.add({targets:c,y:y+Phaser.Math.Between(-10,25),alpha:.2,duration:450,delay:k*30,onComplete:()=>c.destroy()})}}
function float(x,y,t){const o=scene.add.text(x,y,t,{font:'bold 15px sans-serif',color:'#fff',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(10);scene.tweens.add({targets:o,y:y-40,alpha:0,duration:1200,onComplete:()=>o.destroy()})}

