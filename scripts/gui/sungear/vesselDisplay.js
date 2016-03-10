define(['anchor', 'genesGene', 'vessel', 'values', 'anchorDisplay', 'p5'],
function(anchor, gene, vessel, values, p5){
  var methods = {
    VesselDisplay: VesselDisplay
  }
  var ARROW_LINE = 0.7;
  var ARROW_END = 0.2;

  function VesselDisplay(vessel){
    this.vessel = vessel;
    this.highlight = false;
    this.select = false;
    this.start = null;
    this.center = {
      x: null,
      y: null
    };
    this.activeGenes = []; // new TreeSet<Gene>();
    this.selectedGenes = []; // see above
    this.radMax = 0.1;
    this.radMin = 0;
    this.showArrows = true;
    this.anchor = [];

    this.vMax = 0;
    this.radOuter = 0;
    this.radInner = 12; // SHOULD BE 0

    this.shape = {
      height: null,
      width: null,
      x: null,
      y: null
    };
    this.selectedShape = {
      height: null,
      width: null,
      x: null,
      y: null
    };
  }

  VesselDisplay.prototype = {
    constructor: VesselDisplay,
    cleanup:function(){
      this.activeGenes.clear();
      this.selectedGenes.clear();
    },
    setAnchors:function(conv){
      var len = this.vessel.anchor.length;
      for(var i = 0; i < len; i++){
        this.anchor[i] = conv[this.vessel.anchor[i]];
        this.anchor[i].vessels.add(this); // this? Vessel diplay object?
      }
    },
    setMax:function(vMax){ this.vMax = vMax; },

    setRadMax:function(rMax){ this.radMax = rMax; },

    setRadMin:function(rMin){ this.rMin = rMin; },

    getRadOuter:function(){ return this.radOuter; },

    setShowArrows:function(b){ this.showArrows = b; },

    getFullRad:function(){
      return this.radOuter * (1.0 + (this.showArrows ? ARROW_LINE: 0.0));
    },
    clearSelectedGenes:function(){
      this.selectedGenes.clear();
      return this.updateSize();
    },
    selectAllGenes:function(){
      this.selectedGenes.clear();
      this.selectedGenes.addAll(activeGenes);
      return this.updateSize();
    },
    setSelectedGenes:function(sel){
      this.selectedGenes.clear();
      this.selectedGenes.addAll(activeGenes);
      this.selectedGenes.retainAll(sel);
      return this.updateSize();
    },
    getSelectedCount:function(){ return this.selectedGenes.length; },
    initActive:function(){ this.activeGenes.addAll(this.vessel.genes); },
    setActiveGenes:function(sel){
      this.activeGenes.clear();
      this.activeGenes.addAll(this.vessel.genes);
      this.activeGenes.retainAll(sel);
    },
    getActiveCount:function(){ return this.activeGenes.length; },
    makeShape:function(rad_inner){
      if(this.start == null){
        var p = {
          x: null,
          y: null
        };
        if(this.anchor.length == 0) {
          console.log("OVER HERE");
          // BOTH VALUES SHOULD BE NEGATIVE
          p.x = -values.R_CIRCLE;
          p.y = -values.R_CIRCLE + 0.15;
        } else {
          console.log("OVER THERE");
          for(var i = 0; i < this.anchor.length; i++) {
            var theta = this.anchor[i].angle;
            p.x += rad_inner * Math.cos(theta) / anchor.length;
            p.y += rad_inner * Math.sin(theta) / anchor.length;
          }
        }
        this.start = p;
        //this.setCenter(p, this.rad_inner);
        //this.selectAllGenes();
      }
      // area 0 - vMax ==> 0 - 0.1
      //this.radOuter = this.getShapeRad(this.getActiveCount, this.vMax);
      //this.shape.x = this.center.x-this.radOuter;
      this.shape.x = p.x*10; // SHOULD NOT BE MULTIPLIED BY 10
      this.shape.y = p.y*10;
      this.shape.height = (this.radOuter+10)*2; // SHOULD NOT ADD 10
      this.shape.width = (this.radOuter+10)*2;
      return this.shape;
    },
    updateSize:function(){
      this.radInner = this.getShapeRad(this.getSelectedCount(), vMax);
      this.selectedShape.x = this.center.x - this.radInner;
      this.selectedShape.y = this.center.y - this. radInner;
      this.selectedShape.height = this.radInner*2;
      this.selectedShape.width = this.radInner*2;
    },
    updateCenter:function(){
      this.setCenter(this.center, this.radInner);
    },
    setCenter:function(p, rad_inner){
      var x = p.x;
      var y = p.y;
      this.center.x = x;
      this.center.y = y;
      this.angle = [];
      for(var i = 0; i < this.anchor.length; i++){
        var a = this.anchor[i];
        var dx = a.position.x - this.center.x;
        var dy = a.position.y - this.center.y;
        var r = Math.sqrt(dx*dx + dy*dy);
        var theta = Math.acos(dx/r);
        this.angle[i] = (dy > 0) ? theta : -theta;
      }
      this.makeShape(rad_inner);
      this.updateSize();
    },

    getCenter:function(){ return center; },

    getStart:function(){ return start; },

    getShapeRad:function(count, vMax){
      return this.radMin + Math.sqrt(count/vMax)*(this.radMax-this.radMin);
    },
    contains:function(p){
      return this.shape.contains(p); // TODO: IMPLEMENT THIS.
    },

    setHighlight:function(b){ this.highlight = b; },

    getHighlight:function(){ return this.highlight; },

    setSelect:function(b){ this.select = b; },

    getSelect:function(b){ return this.select; },

    highlightAnchors:function(b){
      for(var i = 0; i < this.anchor.length; i++){
        this.anchor[i].setHighlight(b);
      }
    },

    // THESE LAST TWO FUNCTIONS MAY NOT NEED TO BE IMPLEMENTED THANKS TO p5.
    draw:function(g2){
      if(this.getActiveCount() == 0){ return; }

    },
    drawArrow:function(g2, theta){

    }
  }
  return methods;
});
