class spline {
  constructor(controls,deg=2) {
    this.controls=controls;
    this.deg = deg;
    this.points = [];
  }

  d2(x){
    if(-0.5 <= x && x < 0.5){
        return 0.75 - x*x;
    }else if(0.5 <= x && x <= 1.5){
        return 1.125 + (-1.5 + x/2.0)*x;
    }else if(-1.5 <= x && x < -0.5){
        return 1.125 + (1.5 + x/2.0)*x;
    }else{
        return 0;
    }
  }

  draw(){
    this.points = [];
    for (var i = 0; i <=1 ; i+=0.001) {
      var p = this.calcAt(i);
      cg.setPixel(p[0],p[1]);
      this.points.push(p);
    }
    return this.points;
  }

  seqAt(dim){
    var points = this.controls;
    var margin = this.deg + 1;
    return function(n){
        if(n < margin){
            return points[0][dim];
        }else if(points.length + margin <= n){
            return points[points.length-1][dim];
        }else{
            return points[n-margin][dim];
        }
    };
  }

  getInterpol(seq,t){
    var rangeInt = 2;
    var tInt = Math.floor(t);
    var result = 0;
    for(var i = tInt - rangeInt;i <= tInt + rangeInt;i++){
        result += seq(i)*this.d2(t-i);
    }
    return result;
  }

  calcAt(t){
    t = t*((this.deg+1)*2+this.controls.length);
    return [this.getInterpol(this.seqAt(0),t),this.getInterpol(this.seqAt(1),t)];
  }
}
