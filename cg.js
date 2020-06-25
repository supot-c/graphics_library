class CG {
  constructor(width,height) {
    createCanvas(width,height);
    this.width = width;
    this.height = height;
    this.objs = [];
    console.log('created');
    this.characters = getCharacter();
  }

  setPixel(x,y,clr = 255){
    stroke(clr);
    point(x,y);
  }


  drawLine(x1,y1,x2,y2,clr = 255){
    const dx = (x2-x1);
    const dy = (y2-y1);
    var points = [];
    var m = undefined;
    if (dx!=0) {
       m = dy/dx;
    }

    if (m!=undefined) { //if not vertical
      if (abs(m)>0 && abs(m)<1) {
        points = this.DDA(x1,y1,x2,y2,dx,dy);
      }else {
        points =  this.DDA(x1,y1,x2,y2,dx,dy);
      }
    }else { //vertical line
      const origin = y1<=y2? y1:y2;
      const end = y1<=y2? y2:y1;

      for (var i = origin; i <= end; i++) {
        points.push([x1,i]);
      }

    }
    // console.log(points);
    for (var point of points) {
      this.setPixel(point[0],point[1],clr);
    }
  }

  getLine(x1,y1,x2,y2){
    const dx = (x2-x1);
    const dy = (y2-y1);
    var points = [];
    var m = undefined;
    if (dx!=0) {
       m = dy/dx;
    }

    if (m!=undefined) { //if not vertical
      if (abs(m)>0 && abs(m)<1) {
        points = this.DDA(x1,y1,x2,y2,dx,dy);
      }else {
        points =  this.DDA(x1,y1,x2,y2,dx,dy);
      }
    }else { //vertical line
      const origin = y1<=y2? y1:y2;
      const end = y1<=y2? y2:y1;

      for (var i = origin; i <= end; i++) {
        points.push([x1,i]);
      }
    }
    return points;
  }

  DDA(x1,y1,x2,y2,_dx,_dy){
    const points = [];
    var x = x1;
    var y = y1;
    const step = abs(_dx)>abs(_dy)? abs(_dx): abs(_dy);
    const dx = _dx/step;
    const dy = _dy/step;

    points.push([round(x),round(y)])
    for (var i = 0; i < step; i++) {
      x+=dx;
      y+=dy;
      points.push([round(x),round(y)])
    }
    return points;
  }

  Bresenham(x1,y1,x2,y2,dx,dy){
    const points = [];
    var p = dy*2-dx;
    const dy2 = dy*2;
    const dxdy = (dy-dx)*2;

    if (x1 > x2){
      var x = x2;
      var y = y2;
    }else{
      var x = x1;
      var y = y1;
    }
    const lx = x1>x2?x1:x2;
    points.push([x,y]);

    while (x<lx) {
      x+=1;
      if (p<0) {
        p+=dy2;
      }else {
        y+=1;
        p+=dxdy;
      }
      points.push([x,y])
    }
    return points;
  }

  drawTrochoids(a,b,k,trocoid,center = [0,0],E=true,H=true,T=10,step=0.001,colore=(255,120,0),colorh=(0,120,255)){
    if (E) {
      if (!trocoid.isupdated(a,b,k,T,step,'E')) {
        trocoid.update(a,b,k,T,step,this.drawEpitrochoid(a,b,k,T,step),'E');
      }
      for (var point of trocoid.points['E']) {
        this.setPixel(point[0]+center[0],point[1]+center[1],colore);
      }
    }

    if (H) {
      if (!trocoid.isupdated(a,b,k,T,step,'H')) {
        trocoid.update(a,b,k,T,step,this.drawHypotrochoid(a,b,k,T,step),'H');
      }
      for (var point of trocoid.points['H']) {
        this.setPixel(point[0]+center[0],point[1]+center[1],colorh);
      }
    }
  }

  drawEpitrochoid(a,b,k,T,S){
    const points = [];
    var t=0;
    while (t<T) {
      var x = (a+b)*cos(2*PI*t)-k*cos(2*PI*((a+b)*t)/b)*2;
      var y = (a+b)*sin(2*PI*t)-k*sin(2*PI*((a+b)*t)/b)*2;
      points.push([x,y]);
      t+=S;
    }
    return points;
  }

  drawHypotrochoid(a,b,k,T,S){
    const points = [];
    var t=0;
    while (t<T) {
      var x = (a-b)*cos(2*PI*t)-k*cos(2*PI*((a+b)*t)/b)*2;
      var y = (a-b)*sin(2*PI*t)-k*sin(2*PI*((a+b)*t)/b)*2;
      points.push([x,y]);
      t+=S;
    }
    return points;
  }

  drawPoly(polygon,clr = 255,lcr=undefined,native = true){
    if (clr) {
      if (native) {
        for(var p of polygon.fill){
          this.setPixel(p[0],p[1],clr)
        }
      }else {
        this.fillPoly(polygon,clr);
      }
    }
    const vts = [];
    for(var v of polygon.vertices){
      this.setPixel(v[0],v[1],clr);
      vts.push(v);
    }
    vts.push(polygon.vertices[0]);


    if(lcr){
      for(var v=0; v<vts.length-1 ; v++){
        this.drawLine(vts[v][0],vts[v][1],vts[v+1][0],vts[v+1][1],lcr)
      }
    }
  }

  fillPoly(polygon,clr = 255){
    const origin = [round(polygon.anchor[0]),polygon.anchor[1]]
    const pixels = [];
    const seeked = [origin];

    this.setPixel(origin[0],origin[1],clr)
    this.seek(pixels,seeked,polygon,origin[0],origin[1]);

    while (pixels.length!=0) {
      const pixel = pixels.shift();
      this.setPixel(pixel[0],pixel[1],clr);
      this.seek(pixels,seeked,polygon,pixel[0],pixel[1]);
    }
  }

  seek(pixels,seeked,polygon,x,y,direction=undefined){
    if (x<=polygon.left || x>=polygon.right || y<=polygon.top || y>=polygon.bottom) {
      return ;
    }
    // var left=Infinity,right = -Infinity;
    for(var e of polygon.edges){
      if (!e) {
        continue;
      }
      for(var p of e['points']){
        if (abs(round(p[0])-round(x))<=1 && abs(round(p[1])-round(y))<=1) {
          return;
        }
      }

    }
    if (!direction) {
      const spacing =3;
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

  drawEllipse(xc,yc,a,b,g=false,color = 255,span = 0){
    var a2 = a * a;
    var b2 = b * b;
    var twoa2 = 2 * a2;
    var twob2 = 2 * b2;
    var p;
    var x = 0;
    var y = b;
    var px = 0;
    var py = twoa2 * y;

    var points = [];
    span = [span,span];

    this.plotEllipse (xc,yc, x, y,g,points,color,span);

    p = Math.round (b2 - (a2 * b) + (0.25 * a2));
    while (px < py) {
        x++;
        px += twob2;
        if (p < 0)
        p += b2 + px;
        else {
        y--;
        py -= twoa2;
        p += b2 + px - py;
        }
        this.plotEllipse (xc,yc, x, y,g,points,color,span);
    }

    p = Math.round (b2 * (x+0.5) * (x+0.5) + a2 * (y-1) * (y-1) - a2 * b2);
    while (y > 0) {
        y--;
        py -= twoa2;
        if (p > 0)
        p += a2 - py;
        else {
        x++;
        px += twob2;
        p += a2 - py + px;
        }
        this.plotEllipse (xc,yc, x, y,g,points,color,span);
    }
    return points;
  }

  plotEllipse(xc,yc,y,x,g,points,color,span){
    if(span[0] == span[1]){
      if (span[0]!=0) {
        span[0]--;
      }
      if (g) {
        points.push([xc+x,yc+y]);
        points.push([xc-x,yc+y]);
        points.push([xc+x,yc-y]);
        points.push([xc-x,yc-y]);
      }
      else {
        this.setPixel(xc+x,yc+y,color);
        this.setPixel(xc-x,yc+y,color);
        this.setPixel(xc+x,yc-y,color);
        this.setPixel(xc-x,yc-y,color);
      }
    }else{
      if (span[0]>0) {
        span[0]--;
      }else {
        span[0] = span[1];
      }
    }
  }

  drawString(position,string,spacing=1,got=false,clr=255){
    var x = 0;
    var y = 0;
    var points = [];
    for(var line of string.split('\n')){
      for(var char of line){
        var bitmap = this.characters[char];
        for(var row=0 ;row<bitmap.length;row++){
          for(var column=0 ; column<bitmap[row].length ; column++){
            if (bitmap[row][column] == 1) {
              if (!got) {
                this.setPixel(position[0]+x,position[1]+y,clr)
              }
              points.push([position[0]+x,position[1]+y,clr]);
            }
            x++;
          }
          x-=bitmap[row].length;
          y++;
        }
        y-=bitmap.length;
        x+=bitmap.length + spacing;
      }
      x = 0;
      y += bitmap.length + 2;
    }
    return points;
  }
}
