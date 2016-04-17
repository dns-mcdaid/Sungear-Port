define(function(){

function CoolVessel(vessel, score, count){
  this.vessel = vessel;
  this.score = score;
  this.count = count;
}

CoolVessel.prototype = {
  compareTo : function(o){
    if(o.score !== this.score){
      return (o.score > this.score) ? 1 : -1;
    }else if(o.count !== this.count){
      return o.count - this.count;
    }else{
      return this.vessel.toString().compareTo(o.vessel.toString());
    }
  }
};

return CoolVessel;

});
