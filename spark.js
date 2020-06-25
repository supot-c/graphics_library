class spark {
  constructor(x,y,speed,length) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.max = length;
    this.life = length;
    this.points = cg.drawEllipse(x,y,10,10,get=true);
    this.isAlive = true;
    this.alpha = (this.life/this.max)*100;
  }

  step(){
    this.life -= this.speed;
    this.x-=5+this.speed*2;
    this.alpha = (this.life/this.max)*100;
    if (this.life<=0) {
      this.isAlive = false;
    }
    this.points = cg.drawEllipse(this.x,this.y,30-(30*this.alpha/100),30-(30*this.alpha/100),get=true,[255,255,255],3);
  }
  draw(){
    for(var p of this.points){
      cg.setPixel(p[0],p[1],255);
    }
  }
}
