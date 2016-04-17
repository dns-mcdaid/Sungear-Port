define(function(){
  function VesselActSize(){}
  VesselActSize.prototype = {
    compare: function(v1, v2){
      return v2.getActiveCount() - v1.getActiveCount();
    }
  };
  return VesselActSize;
});
