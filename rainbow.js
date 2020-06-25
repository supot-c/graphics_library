class rainbow{
  constructor(){
    this.colorindex = {
      'r':255,
      'g':0,
      'b':0,
      'float':0.0
    }
  }
  use(){
    return [this.colorindex['r'],this.colorindex['g'],this.colorindex['b']];
  }
  get(step=1){
    const r = this.colorindex['r'];
    const g = this.colorindex['g'];
    const b = this.colorindex['b'];
    if (step < 1 && this.colorindex['float'] <1.0 ) {
      this.colorindex['float']+=step;
      return([r,g,b]);
    }else if (step<1 && this.colorindex['float'] >=1.0) {
      this.colorindex['float']=0;
      return this.get();
    }

    if (r >=255 && g==0 && b==0) {
      this.colorindex['r']=255;
      this.colorindex['g']+=step;
    }else if (r>=255 && (g>0 && g<255) && b==0) {
      this.colorindex['g']+=step;
    }else if (r>= 255 && g>=255 && b==0) {
      this.colorindex['g']=255;
      this.colorindex['r']-=step;
    }else if ((r>0 && r<255) && g>=255 && b==0) {
      this.colorindex['r']-=step;
      if (this.colorindex['r']<0) {
        this.colorindex['r']=0;
      }
    }else if (r==0 && g>=255 && b==0) {
      this.colorindex['b']+=step;
    }else if (r==0 && g>=255 && (b>0 && b<255)) {
      this.colorindex['b']+=step;
    }else if (r==0 && g>=255 && b>=255) {
      this.colorindex['b']=255;
      this.colorindex['g']-=step;
    }else if (r==0 && (g>0 && g<255) && b>=255) {
      this.colorindex['g']-=step;
      if (this.colorindex['g']<0) {
        this.colorindex['g']=0;
      }
    }else if (r==0 && g==0 && b>=255) {
      this.colorindex['r']+=step;
    }else if ((r>0 && r<255) && g==0 && b>=255) {
      this.colorindex['r']+=step;
    }else if (r>=255 && g==0 && b>=255) {
      this.colorindex['b']-=step;
      this.colorindex['r']=255;
    }else if (r>=255 && g==0 && (b>0 && b<255)) {
      this.colorindex['b']-=step;
      if (this.colorindex['b']<0) {
        this.colorindex['b']=0;
      }
    }

    return ([this.colorindex['r'],this.colorindex['g'],this.colorindex['b']]);
  }
}
