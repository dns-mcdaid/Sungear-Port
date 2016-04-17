define(function(){
  function VesselSelSize(){}
  VesselSelSize.prototype = {
    compare: function(v1, v2){
      return v2.getSelectedCount() - v1.getSelectedCount();
    }
  };
  return VesselSelSize;
});
