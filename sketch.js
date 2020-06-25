var sparks = [];
var dot=[];

var headani = [[2,0],[-8,10],[-10,2]];
var head_ = 0;
var head__ = 10;

var bdani = [[0,0],[5,3],[0,0]];
var bd_ = 1;
var bd__ = 5;

var legsani = [[0,0],[-10,-5],[20,-10]];
var legs_ = 0;
var legs__ = 10;

var legs2_ = 0;
var legs2__ = 20;

var rott = 0;
function setup() {
  cg = new CG(500,300);
  t1 = new Trochoids();
  po1 = new polygon([[10,20],[50,40],[50,60],[40,100]],sp=1,cen=[250,300]);
  po2 = new polygon([[10,20],[50,40],[50,60],[40,100]],sp = 2);

  var bow = [
    [255,0,0],
    [255,152,0],
    [253,253,0],
    [51,255,0],
    [0,152,253],
    [101,51,253],
  ]
  for (var i = 0; i < 3; i++) {
    sparks.push(new spark(mouseX,mouseY,Math.random()*5+1,200));
    dot.push([-1,mouseY+(Math.random()*100)+10,Math.random()*10+1,new rainbow()]);
    dot.push([-1,mouseY+(Math.random()*100)+10,Math.random()*10+1,new rainbow()]);
    dot.push([-1,mouseY+(Math.random()*100)+10,Math.random()*10+1,new rainbow()]);
    dot.push([-1,mouseY+(Math.random()*100)+10,Math.random()*10+1,new rainbow()]);
    dot.push([-1,mouseY+(Math.random()*100)+10,Math.random()*10+1,new rainbow()]);
    dot.push([-1,mouseY+(Math.random()*100)+10,Math.random()*10+1,new rainbow()]);
    dot.push([-1,mouseY+(Math.random()*100)+10,Math.random()*10+1,new rainbow()]);
  }

  nyan2 = new shape();
  nyan2.add(cg.getLine(10,10,60,10));
  nyan2.add(cg.getLine(10,60,60,60));
  nyan2.add(cg.getLine(0,20,0,50));
  nyan2.add(cg.getLine(70,20,70,50));
  nyan2.add(new spline([[0,20],[0,10],[10,10]]).draw());
  nyan2.add(new spline([[60,10],[70,10],[70,20]]).draw());
  nyan2.add(new spline([[0,50],[0,60],[10,60]]).draw());
  nyan2.add(new spline([[70,50],[70,60],[60,60]]).draw());
  nyan2.fillit([15,20],1,[253,205,150]);
  nyan2.add(new spline([[55,55],[0,60],[5,35],/**/[6,30],[0,10]/**/,[30,16],[35,15],/**/[70,10]/**/,[65,35],/**/[70,60]/**/,[55,55]]).draw());
  nyan2.fillit([35,35],1,[254,152,254]);

  nyan2.add(new spline([[0,20],[0,10],[10,10]]).draw(),filll = true);
  nyan2.add(new spline([[60,10],[70,10],[70,20]]).draw(),filll = true);
  nyan2.add(new spline([[0,50],[0,60],[10,60]]).draw(),filll = true);
  nyan2.add(new spline([[70,50],[70,60],[60,60]]).draw(),filll = true);
  nyan2.add(cg.getLine(10,10,60,10),filll = true);
  nyan2.add(cg.getLine(10,60,60,60),filll = true);
  nyan2.add(cg.getLine(0,20,0,50),filll = true);
  nyan2.add(cg.getLine(70,20,70,50),filll = true);

  dcolor = [253,39,140];
  bdot = [[15,50],[15,40],[17,20],[20,35],[25,50],[32,25],[45,20],[55,20],[55,45],[61,28]];
  ddot2 =[];
  for(var d of bdot){
    ddot2.push([d[0],d[1],dcolor]);
    ddot2.push([d[0]+1,d[1],dcolor]);
    ddot2.push([d[0]-1,d[1],dcolor]);
    ddot2.push([d[0],d[1]+1,dcolor]);
    ddot2.push([d[0],d[1]-1,dcolor]);
    ddot2.push([d[0]-1,d[1]-1,dcolor]);
    ddot2.push([d[0]+1,d[1]-1,dcolor]);
    ddot2.push([d[0]-1,d[1]+1,dcolor]);
    ddot2.push([d[0]+1,d[1]+1,dcolor]);
  }
  nyan2.add(ddot2,filll=true,fc=true);

  nyanhead = new shape();
  nyanhead.add(cg.drawEllipse(70,35,16,22,got=true));

  nyanhead.add(new spline([[55,25],[54,10],[60,12],[70,20]]).draw());
  nyanhead.add(new spline([[70,20],[80,12],[86,10],[87,25]]).draw());
  nyanhead.fillit([70,30],1,[152,152,152]);

  nyanhead.add(new spline([[55,25],[54,10],[60,12],[70,20]]).draw(),filll=true);
  nyanhead.add(new spline([[70,20],[80,12],[86,10],[87,25]]).draw(),filll=true);


  re = nyanhead.fillit([80,15],1,[152,152,152],s=false);
  re = nyanhead.reduce(re);
  le = nyanhead.fillit([56,15],1,[152,152,152],s=false);
  le = nyanhead.reduce(le);

  nyanhead.add(cg.drawEllipse(70,35,16,22,got=true),filll=true);//head line
  nyanhead.add(cg.drawEllipse(56,40,2,3,got=true));//right cheek
  nyanhead.fillit([56,40],1,[251,151,151]);
  nyanhead.add(cg.drawEllipse(85,40,2,3,got=true));//left cheek
  nyanhead.fillit([85,40],1,[251,151,151]);

  nyanhead.add(re,filll=true,fc=true);
  nyanhead.add(le,filll=true,fc=true);

  nyanhead.add(cg.drawEllipse(73,36,1,1.5,got=true));//nose
  nyanhead.add(cg.drawEllipse(73,36,1,1.5,got=true),filll=true);
  nyanhead.fillit([73,36],1,0);

  nyanhead.add(cg.drawEllipse(63,35,3,3.2,got=true));//left eye
  nyanhead.fillit([63,35],1,0);

  eye_ = new shape();
  eye_.add(cg.drawEllipse(30,30,5,5,got = true));
  eye_.fillit([30,30],1,[255,255,255]);
  eye_.scale([.3,.3]);
  eye_.move([52,25]);

  nyanhead.add(eye_.fill,filll=true,fc=true);
  eye_.move([18,0]);

  nyanhead.add(cg.drawEllipse(80,35,3,3.2,got=true));//right eye
  nyanhead.fillit([80,35],1,0);
  nyanhead.add(eye_.fill,filll=true,fc=true);

  nyanhead.add(new spline([[62,42],[62,45],[68,45],[70,42],[72,45],[78,45],[78,42]]).draw(),filll=true);//mouth
  nyanhead.move([0,7]);

  tail = new shape();
  tail.add(new spline([[0,35],[0,45],[-15,45],[-20,20],[-15,20],[-10,40],[0,35]]).draw());
  tail.fillit([-5,42],1,[152,152,152]);
  tail.add(new spline([[0,35],[0,45],[-15,45],[-20,20],[-15,20],[-10,40],[0,35]]).draw(),filll=true);
  tail.fill = tail.reduce(tail.fill);
  // tail.fillit([10,40],.5);

  legs = new shape();
  legs.add(cg.drawEllipse(65,62,5,6,get=true));
  legs.fillit([65,62],1,[152,152,152]);
  legs.add(cg.drawEllipse(65,62,5,6,get=true),filll=true);
  legs.add(cg.drawEllipse(50,62,5,6,get=true));
  legs.fillit([50,62],1,[152,152,152]);
  legs.add(cg.drawEllipse(50,62,5,6,get=true),filll=true);

  legs2 = new shape();
  legs2.add(cg.drawEllipse(25,62,5,6,get=true));
  legs2.fillit([25,62],1,[152,152,152]);
  legs2.add(cg.drawEllipse(25,62,5,6,get=true),filll=true);
  legs2.add(cg.drawEllipse(10,62,5,6,get=true));
  legs2.fillit([10,62],1,[152,152,152]);
  legs2.add(cg.drawEllipse(10,62,5,6,get=true),filll=true);


  rb = new shape([mouseX+200,mouseY+50]);
  rb.add(cg.getLine(0,10,0,70));
  rb.add(cg.getLine(160,10,160,70));
  rb.add(new spline([[0,10+7*10],[20,7*10],[40,10+7*10],[60,7*10],[80,10+7*10],[100,7*10],[120,10+7*10],[140,7*10],[160,10+7*10]]).draw());
  for (var i = 0; i < 6; i++) {
    rb.add(new spline([[0,10+i*10],[20,i*10],[40,10+i*10],[60,i*10],[80,10+i*10],[100,i*10],[120,10+i*10],[140,i*10],[160,10+i*10]]).draw());
    rb.fillit([10,10+i*10],2,bow[i]);
  }
  rb.fill = rb.reduce(rb.fill);
  rb2 = new shape();
  rb2.add(rb.fill,filll=true,fc=true);
  rb.move([160,0]);
  rb2.add(rb.fill,filll=true,fc=true);
  rb.move([160,0]);
  rb2.add(rb.fill,filll=true,fc=true);
  // rb.move([160,0]);
  // rb2.add(rb.fill,filll=true,fc=true);

  rb.fill = rb2.fill;
  rb.line = [];
  rb.scale([.5,.5]);
  rb.fill = rb.reduce(rb.fill);
  rb.locate = [rb.locate[0]-250,rb.locate[1]-25];


  text1 = new shape();
  text1.add(cg.drawString([10,25],'5933663823 SUPOT CHANAPUN',got=true),filll = true,fc = true);
  text1.add(cg.drawString([10,10],'5933637523 NIRAWIT SIRISAWAT',got=true),filll = true,fc=true);

  // nyan2.add(nyan2.fill,filll=true,fc=true);
  // nyan2.fill = nyan2.reduce(nyan2.fill);


  r1 = new rainbow();
  r2 = new rainbow();
  dbow = new rainbow();
  rbwidth = rb.right-rb.left;
}


function draw() {
  if (head__>0) {
    head__--;
  }else {
    head_ = (head_+1)%headani.length;
    head__=5;
  }

  if (bd__>0) {
    bd__--;
  }else {
    bd_ = (bd_+1)%bdani.length;
    bd__=5;
  }

  if (legs__>0) {
    legs__--;
  }else {
    legs_ = (legs_+1)%legsani.length;
    legs__=5;
  }

  if (legs2__>0) {
    legs2__--;
  }else {
    legs2_ = (legs2_+1)%legsani.length;
    legs2__=5;
  }
  var dx  = (nyan2.anchor[0]+20-mouseX+bdani[bd_][0])/10;
  var dy  = (nyan2.anchor[1]+10-mouseY+bdani[bd_][1])/10;

  var headx =(nyanhead.anchor[0]-mouseX+headani[head_][0])/10;
  var heady = (nyanhead.anchor[1]-mouseY+headani[head_][1])/10;

  var legx = (legs.anchor[0]-mouseX+legsani[legs_][0])/10;
  var legy = (legs.anchor[1]-mouseY+legsani[legs_][1]-12)/10;

  var leg2x = (legs2.anchor[0]-mouseX+legsani[legs2_][0]+40)/10;
  var leg2y = (legs2.anchor[1]-mouseY+legsani[legs2_][1]-12)/10;

  rb.bound(true);
  var dx2  = (rb.anchor[0]-mouseX)/12;
  var dy2  = (rb.anchor[1]-mouseY)/12;

  background([0,51,102]);

  for(var i=0 ; i<rb.fill.length ; i++){
    if (abs((rb.fill[i][0])-(rb.left))<=1) {
      rb.fill[i] = [rb.fill[i][0]+160,rb.fill[i][1],rb.fill[i][2]];
    }
  }

  const alive = [];
  for(var s of sparks){
    if (!s.isAlive) {
      sparks.push(new spark(cg.width,Math.random()*cg.height+1,Math.random()*15+5,200));
      continue;
    }
    alive.push(s);
    s.step();
    s.draw();
  }


  sparks = alive;
  nyanhead.move([-headx,-heady]);

  if(abs(dx+dy)>10){
    rott++;
    nyan2.rotate(0.0125);
  }
  else {
    if (rott>0) {
      nyan2.rotate(-0.025);
      rott-=2;
    }
  }
  legs.move([-legx,-legy]);
  legs2.move([-leg2x,-leg2y]);
  nyan2.move([-dx,-dy]);
  tail.move([-dx,-dy]);
  rb.move([-dx2,-dy2]);

  // nyan.display();
  // nyan.update();


  rb.draw();
  tail.draw();
  legs.draw();
  legs2.draw();
  nyan2.draw();
  nyanhead.draw();
  text1.draw();

  for (var i = 0; i < dot.length; i++) {
    if (dot[i][0] <=0) {
      dot[i] = [mouseX,mouseY-50+(Math.random()*100)+10,Math.random()*10+1,dot[i][3]];
    }
    var c = dot[i][3].get(dot[i][2]*5);
    if (Math.random()*3 >0.2) {
      cg.setPixel(dot[i][0]+1,dot[i][1],c);
    }else {
      cg.setPixel(dot[i][0],dot[i][1],c);
      cg.setPixel(dot[i][0]+2,dot[i][1],c);
      cg.setPixel(dot[i][0]+1,dot[i][1]+1,c);
      cg.setPixel(dot[i][0]+1,dot[i][1]-1,c);
    }
    dot[i] = [dot[i][0]-dot[i][2],dot[i][1],dot[i][2],dot[i][3]];
  }

  rb.bound(true);
  rb.anchor = rb.midPoint();
  rb.anchor = [rb.anchor[0]+(160)/2+20,rb.anchor[1]+10];

}
