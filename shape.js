class shape {
  constructor(locate=undefined) {
    this.line = [];
    this.fill = [];
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;


    this.bound(true);
    this.anchor = [0,0];
    this.locate = locate?locate:this.anchor;
    this.sv=0;
  }

  add(points,filll = false,fc=false,thick=0.5 , clr = [0,0,0]){
    if (!filll) {
      for(var p of points){
        this.line.push(p);
      }
      this.bound(true);
      this.anchor = this.midPoint();
    }
    else {
      for(var p of points){
        var found = false;
        for (var i = 0; i < this.fill.length; i++) {
          if (abs(p[0]-this.fill[i][0])<=thick && abs(p[1]-this.fill[i][1])<=thick) {
            this.fill[i][2] = fc?p[2]:clr;
            found = true;
            break;
          }
        }
        if (!found) {
          this.fill.push([p[0],p[1],fc?p[2]:clr]);
        }
      }
    }
  }

  draw(draw = true,F=true){
    if (draw) {
      if (F) {
        for(var p of this.fill){
          cg.setPixel(p[0],p[1],p[2]);
        }
      }
    }
  }

  fillit(at,spacing = 1,color = [200,0,0],s=true){
    const origin = [round(at[0]),round(at[1])];
    const pixels = [];
    const seeked = [origin];
    const points=[];

    this.seek(pixels,seeked,origin[0],origin[1],spacing);
    this.fill.push([origin[0],origin[1],color]);
    while (pixels.length!=0) {
      const pixel = pixels.shift();
      this.seek(pixels,seeked,pixel[0],pixel[1],spacing);

      var found = false;
      for(var v of this.fill){
        if (abs(pixel[0]-v[0])<0.5 && abs(pixel[1]-v[1])<0.5) {
          if(s){
            this.fill[this.fill.indexOf(v)] = [pixel[0],pixel[1],color];
          }
          points.push([pixel[0],pixel[1],color]);
          found = true;
        }
      }
      if (!found) {
        if (s) {
          this.fill.push([pixel[0],pixel[1],color]);
        }
        points.push([pixel[0],pixel[1],color]);
      }
    }
    return points;
  }


  seek(pixels,seeked,x,y,spacing){
    if (x<=this.left || x>=this.right || y<=this.top || y>=this.bottom) {
      return ;
    }
    for(var p of this.line){
      if(abs(x-p[0])<spacing && abs(y-p[1])<spacing){
        return;
      }
    }
    const next = [[x,y+spacing],[x,y-spacing],[x+spacing,y],[x-spacing,y]];
    for(var p of next){
      var found = false;
      for(var s of seeked){
        if (p[0] == s[0] && p[1] == s[1]) {
          found = true;
          break;
        }
      }
      if(!(found)){
        seeked.push(p);
        pixels.push(p);
      }
    }
  }

  bound(s=false){
    var mi1= Infinity,
        mi2= Infinity,
        ma1= -Infinity,
        ma2= -Infinity;
    for (var v of this.line) {
      if (v[0]<= mi1) {
        mi1 = v[0];
      }
      if (v[0] >= ma1) {
        ma1 = v[0];
      }

      if (v[1]<= mi2) {
        mi2 = v[1];
      }
      if (v[1] >= ma2) {
        ma2 = v[1];
      }
    }
    for (var v of this.fill) {
      if (v[0]<= mi1) {
        mi1 = v[0];
      }
      if (v[0] >= ma1) {
        ma1 = v[0];
      }

      if (v[1]<= mi2) {
        mi2 = v[1];
      }
      if (v[1] >= ma2) {
        ma2 = v[1];
      }
    }
    if (s) {
      this.top = mi2;
      this.bottom = ma2;
      this.left = mi1;
      this.right = ma1;s
    }
    return [mi1,ma1,mi2,ma2];
  }

  midPoint(){
    const bound = this.bound(true);
    return [(bound[0]+bound[1])/2,(bound[2]+bound[3])/2];
  }

  move(tm){
    for (var i = 0; i < this.line.length; i++) {
      this.line[i] = [this.line[i][0]+tm[0],this.line[i][1]+tm[1]];
    }
    for (var i = 0; i < this.fill.length; i++) {
      this.fill[i] = [this.fill[i][0]+tm[0],this.fill[i][1]+tm[1],this.fill[i][2]];
    }
    // this.bound(true);

    this.anchor = this.midPoint();
    this.locate = [this.locate[0]+tm[0],this.locate[1]+tm[1]];
  }

  rotate(deg,anchor=null){
    if (!deg) {
      return;
    }
    if (!anchor) {
      anchor = this.anchor;
    }
    this.move([-anchor[0],-anchor[1]]);
    for(var v of this.line){
      this.line[this.line.indexOf(v)] = [(v[0]*cos(deg)+v[1]*sin(deg)),(-v[0]*sin(deg)+v[1]*cos(deg))];
    }
    for(var p of this.fill){
      this.fill[this.fill.indexOf(p)] = [(p[0]*cos(deg)+p[1]*sin(deg)),(-p[0]*sin(deg)+p[1]*cos(deg)),this.fill[this.fill.indexOf(p)][2]];
    }
    this.move(anchor);
    this.bound(true);
  }

  scale(factor){
    for(var v of this.fill){
      this.fill[this.fill.indexOf(v)] = [v[0]*factor[0],v[1]*factor[1],v[2]];
    }
    for(var v of this.line){
      this.line[this.line.indexOf(v)] = [v[0]*factor[0],v[1]*factor[1]];
    }
    this.bound(true);
    this.anchor = this.midPoint();
  }

  reduce(points){
    var smaller = [];
    for(var p of points){
      var found = false;
      var last = p;
      for(var v of smaller){
        // if(p[0]==v[0] && p[1]==v[1]){
        if(abs(p[0]-v[0])<0.5 && abs(p[1]-v[1])<0.5){
          last = v;
          found = true;
        }
      }
      // smaller.push(last);

      if (!found) {
        smaller.push(last);
      }
    }
    return smaller;
  }
}
