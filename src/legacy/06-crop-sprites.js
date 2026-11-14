// Procedural crop sprites for Phaser
function drawCrop(g,k,st,x,y,h,t,i){
 const sw=Math.sin(t/500+i)*2,leaf=h<50?0xb8b04a:0x3fa34d,sc=[.3,.55,.8,1,1][st];
 if(st==0){g.fillStyle(0x3b2a15,1).fillCircle(x-8,y+6,3).fillCircle(x+6,y+10,3).fillCircle(x,y-2,3);return}
 const top=y+22-48*sc;
 if(k=='maize'){g.lineStyle(4,leaf,1).lineBetween(x,y+22,x+sw,top);
  g.fillStyle(leaf,1).fillTriangle(x,y+10,x-22*sc,y-2,x,y+2).fillTriangle(x,y,x+22*sc,y-10,x,y-5);
  if(st>=3)g.fillStyle(0xe8c547,1).fillEllipse(x+8,y-2,7,16)}
 else if(k=='sorghum'){g.lineStyle(3,leaf,1).lineBetween(x,y+22,x+sw,top);
  g.fillStyle(leaf,1).fillTriangle(x,y+12,x-18*sc,y+2,x,y+6);
  if(st>=2)g.fillStyle(st>=3?0x9a3b2e:0x7aa84a,1).fillEllipse(x+sw,top,12*sc,16*sc)}
 else if(k=='wheat'){for(let j=-2;j<=2;j++){const bx=x+j*8,tx=bx+sw+j;g.lineStyle(2,leaf,1).lineBetween(bx,y+22,tx,top+8);
  g.fillStyle(st>=3?0xd9b45a:0x8fc05a,1).fillEllipse(tx,top+4,5,13*sc)}}
 else if(k=='soybean'){g.fillStyle(leaf,1).fillCircle(x-9,y+10,10*sc).fillCircle(x+9,y+10,10*sc).fillCircle(x+sw,y,12*sc);
  if(st>=3)g.fillStyle(0xcfe58a,1).fillEllipse(x-6,y+14,5,9).fillEllipse(x+8,y+8,5,9).fillEllipse(x+1,y+2,5,9)}
 else{g.fillStyle(leaf,1).fillCircle(x-10,y+16,8*sc).fillCircle(x+10,y+16,8*sc).fillCircle(x,y+10,10*sc);
  if(st>=3)g.fillStyle(0xa66bbf,1).fillCircle(x-8,y+10,3).fillCircle(x+8,y+12,3).fillCircle(x,y+5,3)}
 if(st==4){g.fillStyle(0xffe066,1).fillCircle(x,y-38+Math.sin(t/200)*3,6);g.lineStyle(2,0xffffff,1).strokeCircle(x,y-38+Math.sin(t/200)*3,6)}
}

