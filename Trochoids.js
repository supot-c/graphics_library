class Trochoids {
  constructor() {
    this.points ={'E':null,'H':null};
    this.value = {'a':null,'b':null,'k':null,'t':null,'s':null};
  }

  isupdated(a,b,k,t,s,TYPE){
    if (!this.points[TYPE]) {
      return false;
    }else if (this.value['a'] == a && this.value['b'] == b && this.value['k'] == k && this.value['t'] == t && this.value['s'] == s) {
      return true;
    }else{
      return false;
    }
  }

  update(a,b,k,t,s,points,TYPE){
    this.points[TYPE] = points
    this.value['a'] = a;
    this.value['b'] = b;
    this.value['k'] = k;
    this.value['t'] = t;
    this.value['s'] = s;
  }
}
