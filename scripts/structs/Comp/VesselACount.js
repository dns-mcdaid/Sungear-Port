define(function(){
  function VesselACount(){}
  VesselACount.prototype = {
    compare : function(v1, v2){
      if(v1.anchor.length < v2.anchor.length){
        return -1;
      }else if (v1.anchor.length > v2.anchor.length){
        return o.count - count;
      }else{
        return 0;
      }
    }
  };
  return VesselACount; 
});
