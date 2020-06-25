class nayn {
  constructor() {
    this.w = 500/2;
    this.h = 300/2;
    this.isAlive = true;
    this.x = 200;
    this.xx = 190
    this.po2 = new polygon([[this.w+25,150],[this.w+25,120],[this.w-25,120],[this.w-25,150]],sp=1)
    this.po3 = new polygon([[this.w+35,160],[this.w+35,110],[this.w-35,110],[this.w-35,160]],sp=1)
    this.e1 = new spline([[this.w+25,150],[this.w+25,180],[this.w+35,180],[this.w+35,150]]);
    this.e2 = new spline([[230,150],[230,180],[240,180],[240,150]]);
    this.e3 = new spline([[200,150],[200,180],[210,180],[210,150]]);
    this.r2 = new rainbow();
    this.i =10;
    this.direction = 1;
  }

  display(){
    this.e1.draw();
    this.e2.draw();
    this.e3.draw();
    this.e4 = new spline([[200,150],[this.x,180],[this.xx,180],[190,150]]);
    this.e4.draw();
    cg.drawPoly(this.po3, [150,70,0]);
    cg.drawPoly(this.po2, [250,150,170]);
    cg.drawEllipse(250,140,20,20);
  }
  update(){
    if (this.i==-10 || this.i == 10) {
      this.direction = -this.direction;
    }
    this.i+= this.direction;
    this.x = this.x + this.i;
    this.xx = this.xx+this.i;

  }
}
