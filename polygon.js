class polygon {
  constructor(vertices,sp=1,cen=undefined,fillcenter = undefined) {
    this.vertices = vertices;
    this.edges = [];
    this.defindEdges();
    this.anchor = this.midPoint();

    if (!fillcenter) {
      this.fillcenter = this.anchor;
    }else {
      this.fillcenter = fillcenter;
    }
    this.top = Infinity;
    this.bottom = -Infinity;
    this.left = Infinity;
    this.right = -Infinity;

    this.bound(true);
    this.fill = this.fillit(sp);

    if (cen) {
      this.move(cen);
    }
  }
  bound(s=false){
    var mi1= Infinity,
        mi2= Infinity,
        ma1= -Infinity,
        ma2= -Infinity;
    for (var v of this.vertices) {
      // console.log(v);
      if (v[0]< mi1) {
        mi1 = v[0];
      }
      if (v[0] > ma1) {
        ma1 = v[0];
      }

      if (v[1]< mi2) {
        mi2 = v[1];
      }
      if (v[1] > ma2) {
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

  defindEdges(){
    this.edges = [];
    for(var v=0 ;v<this.vertices.length-1;v++){
      this.edges.push(this.edge(this.vertices[v],this.vertices[v+1]));
    }
    this.edges.push(this.edge(this.vertices[this.vertices.length-1],this.vertices[0]));
  }

  edge(A,B){
    const x1 = A[0], x2 = B[0], y1 = A[1], y2 = B[1];
    if (x2-x1 == 0) {
      const m = undefined;
    }else if (y2==y1) {
      const edge = {
        'm':0,
        'c':0,
        'xbound':sort([x1,x2]),
        'ybound':sort([y1,y2]),
        'points':cg.getLine(x1,y1,x2,y2),
        'A':A,
        'B':B
      };
      edge['te'] = this.thinY(edge['points']);
      return edge;
    }else {
      const m = (y2-y1)/(x2-x1);
      const edge = {
        'm':m,
        'c':y1-(x1*m),
        'xbound':sort([x1,x2]),
        'ybound':sort([y1,y2]),
        'points':cg.getLine(x1,y1,x2,y2),
        'A':A,
        'B':B
      };
      edge['te'] = this.thinY(edge['points']);
      return edge;
    }
  }

  thinY(points){
    const y=[];
    const thinedge=[];
    for(var point of points){
      if (!y.includes(point[1])) {
        y.push(point[1]);
        thinedge.push(point);
      }
    }
    return thinedge;
  }

  move(tm){
    for (var v=0 ; v<this.vertices.length ; v++){
      const ox = this.vertices[v][0],oy = this.vertices[v][1];
      this.vertices[v] = [ox+tm[0],oy+tm[1]];
    }
    for(var p of this.fill){
      this.fill[this.fill.indexOf(p)] = [p[0]+tm[0],p[1]+tm[1]];
    }
    this.defindEdges();
    // this.anchor = [this.anchor[0]+tm[0],this.anchor[1]+tm[1]];
    this.anchor = this.midPoint();
  }

  midPoint(){
    const bound = this.bound(true);
    return [(bound[0]+bound[1])/2,(bound[2]+bound[3])/2]
  }

  rotate(deg,anchor=null){
    if (!deg) {
      return;
    }
    if (!anchor) {
      anchor = this.anchor;
    }
    this.move([-anchor[0],-anchor[1]]);
    for(var v of this.vertices){
      this.vertices[this.vertices.indexOf(v)] = [(v[0]*cos(deg)+v[1]*sin(deg)),(-v[0]*sin(deg)+v[1]*cos(deg))];
    }
    for(var p of this.fill){
      this.fill[this.fill.indexOf(p)] = [(p[0]*cos(deg)+p[1]*sin(deg)),(-p[0]*sin(deg)+p[1]*cos(deg))];
    }
    this.move(anchor);
    this.defindEdges();
    // this.anchor = this.midPoint();
    // this.fill = this.fillit(1,this.anchor);
    // this.anchor = [(this.anchor[0]*cos(deg)+this.anchor[1]*sin(deg)),(-this.anchor[0]*sin(deg)+this.anchor[1]*cos(deg))];
  }

  scale(factor){
    for(var v of this.vertices){
      this.vertices[this.vertices.indexOf(v)] = [v[0]*factor[0],v[1]*factor[1]];
    }
    // for(var v of this.fill){
    //   this.fill[this.fill.indexOf(v)] = [v[0]*factor[0],v[1]*factor[1]];
    // }
    this.bound(true);
    this.defindEdges();
    this.anchor = this.midPoint();
    this.fill = this.fillit(abs(factor[1]));
  }

  fillit(spacing = 1,center = this.fillcenter){
    const origin = [round(center[0]),center[1]];
    const pixels = [];
    const seeked = [origin];
    const points = [origin];

    this.seek(pixels,seeked,origin[0],origin[1],spacing);

    while (pixels.length!=0) {
      const pixel = pixels.shift();
      points.push(pixel);
      this.seek(pixels,seeked,pixel[0],pixel[1],spacing);
    }
    return points;
  }

  seek(pixels,seeked,x,y,spacing){
    if (x<=this.left || x>=this.right || y<=this.top || y>=this.bottom) {
      return ;
    }
    var left=Infinity,right = -Infinity;
    for(var e of this.edges){
      if (!e) {
        continue;
      }
      for(var p of e['points']){
        if (abs(round(p[0])-round(x))<=1 && abs(round(p[1])-round(y))<=1) {
          return;
        }
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
}
