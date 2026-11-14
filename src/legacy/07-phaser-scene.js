// Phaser game, farm world rendering, weather overlays
const GAME=new Phaser.Game({type:Phaser.AUTO,parent:'g',width:960,height:560,backgroundColor:'#7bc65a',
 scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
 scene:{create(){scene=this;this.g=this.add.graphics();this.fx=this.add.graphics().setDepth(5);
  S.plots.forEach((p,i)=>{this.add.zone(OX+(i%COLS)*CW+CW/2,OY+Math.floor(i/COLS)*CH+CH/2,CW,CH).setInteractive().on('pointerdown',()=>act(i))});
  ui()},
 update(t){
  const g=this.g,f=this.fx,w=WX[S.wx];g.clear();f.clear();
  g.fillStyle(0x6fb552,1).fillRect(0,0,960,560);
  g.fillStyle(0xc9a56b,1).fillRect(0,OY+ROWS*CH+10,960,22);
  g.fillStyle(0xb2442f,1).fillRect(790,40,90,70).fillStyle(0x6b3a22,1).fillTriangle(780,40,885,40,832,0).fillStyle(0xf2e3b3,1).fillRect(822,70,22,40);
  g.fillStyle(0x3d9be0,1).fillEllipse(860,300,140,90).fillStyle(0x7cc4f0,1).fillEllipse(850+Math.sin(t/600)*4,295,70,30);
  [[40,150],[60,400],[900,440],[40,500]].forEach(([x,y])=>g.fillStyle(0x6b4a2b,1).fillRect(x-4,y,8,22).fillStyle(0x2f8a3e,1).fillCircle(x,y-6,24));
  g.fillStyle(0xff7aa8,1);for(let k=0;k<8;k++)g.fillCircle(100+k*95,520+(k%2)*10,4);
  g.lineStyle(3,0x8b6a3b,1).strokeRect(OX-10,OY-10,COLS*CW+20,ROWS*CH+20);
  S.plots.forEach((p,i)=>{if(p.off)return;const cx=OX+(i%COLS)*CW,cy=OY+Math.floor(i/COLS)*CH,m=p.m/100;
   const col=Phaser.Display.Color.Interpolate.ColorWithColor(new Phaser.Display.Color(190,145,90),new Phaser.Display.Color(80,50,28),100,Math.round(m*100));
   g.fillStyle(Phaser.Display.Color.GetColor(col.r,col.g,col.b),1).fillRoundedRect(cx+4,cy+4,CW-8,CH-8,8);
   g.lineStyle(2,0x000000,.12);for(let r=1;r<4;r++)g.lineBetween(cx+10,cy+r*CH/4,cx+CW-10,cy+r*CH/4);
   if(p.c)drawCrop(g,p.c,stage(p),cx+CW/2,cy+CH/2,p.h,t,i);
   if(i==S.sel)g.lineStyle(3,0xffffff,1).strokeRoundedRect(cx+3,cy+3,CW-6,CH-6,8);
  });
  for(let k=0;k<3;k++){const x=((t/40+k*350)%1100)-100;g.fillStyle(0xffffff,w.rain?.55:.85).fillEllipse(x,50+k*25,110,36).fillEllipse(x+30,40+k*25,70,30)}
  g.fillStyle(0xffd84a,1).fillCircle(60,60,28);
  if(w.T>35){f.fillStyle(0xff7a00,.16+.04*Math.sin(t/300)).fillRect(0,0,960,560)}
  else if(S.wx=='drought'){f.fillStyle(0xd9c07a,.15).fillRect(0,0,960,560)}
  if(w.rain){f.fillStyle(0x203a5a,.15).fillRect(0,0,960,560);f.lineStyle(1.5,0x9fd0ff,.8);
   for(let k=0;k<70;k++){const x=(k*47+t*.15)%960,y=(k*83+t*.6)%560;f.lineBetween(x,y,x-3,y+10)}}
 }}});
