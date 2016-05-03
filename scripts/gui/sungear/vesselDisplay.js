/**
  * Updated 2016.05.03
  * @param indicates the original parameter which was received in SunGear (Java Edition)
  * @author Rajah_Bimmy
  */

define(['anchor', 'genesGene', 'vessel', 'sungear', 'anchorDisplay', 'TreeSet', 'require', 'p5'],
function(anchor, gene, vessel, sungear ,anchorDisplay, TreeSet, require, p5){
  var ARROW_LINE = 0.7;
  var ARROW_END = 0.2;

  function vesselDisplay(vessel){
    this.vessel = vessel;               // 1-to-1 mapping. Vessel display is the visualized vessel.
    this.highlight = false;             // Highlighted depending on user interaction.
    this.select = false;                // Also dependant on user interaction.
    this.start = null;                  // TODO: Find out what this is.

    this.center = {
      x: null, y: null
    };                                  // The centerpoint from which an ellipse is drawn.

    this.activeGenes = new TreeSet();   // Corresponds to highlight. A TreeSet of Genes.
    this.selectedGenes = new TreeSet(); // Corresponds to select. A TreeSet of Genes.
    this.radMax = 0.1;                  // TODO: Find out what this is.
    this.radMin = 0;                    // TODO: Find out what this is.
    this.showArrows = true;             // Determines whether anchors are displayed.
    this.anchor = [];                   // An array of AnchorDisplays

    this.vMax = 0;                      // TODO: Find out what this is.
    this.radOuter = 0;                  // TODO: Find out what this is.
    this.radInner = 0;                  // TODO: Find out what this is.

    this.shape = {
      x: null, y: null,
      w: null, h: null
    };                                  // The main shape which we know and love as the VessleDisplay.
    this.selectedShape = {
      x: null, y: null,
      w: null, h: null
    };                                  // TODO: Find out what this is.
  }

  vesselDisplay.prototype = {
    constructor: vesselDisplay,
    /** Remove all genes. */
    cleanup:function(){
      this.activeGenes.clear();
      this.selectedGenes.clear();
    },
    /**
      * TODO: Find out what this does.
      * @param conv - Hashtable<Anchor,AnchorDisplay>
      */
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
    /**
      * TODO: Find out what this does and who calls it.
      * @return type: double
      */
    getFullRad:function(){
      return this.radOuter * (1.0 + (this.showArrows ? ARROW_LINE: 0.0));
    },
    /** Remove selected Genes, then update the size of the VesselDisplay. */
    clearSelectedGenes:function(){
      this.selectedGenes.clear();
      return this.updateSize();
    },
    /** Promote all active Genes to being selected, then update size. */
    selectAllGenes:function(){
      this.selectedGenes.clear();
      this.selectedGenes.addAll(this.activeGenes);
      return this.updateSize();
    },
    /**
      * Add all Active Genes to the set, then only keep the ones which came from sel and update size.
      * @param sel - a Collection<Gene>
      */
    setSelectedGenes:function(sel){
      this.selectedGenes.clear();
      this.selectedGenes.addAll(this.activeGenes);
      this.selectedGenes.retainAll(sel);
      return this.updateSize();
    },
    /** @return type: int */
    getSelectedCount:function(){ return this.selectedGenes.length; },
    /** TODO: Find out what this does and who calls it. */
    initActive:function(){ this.activeGenes.addAll(this.vessel.genes); },
    /**
      * @param sel - Collection<Gene>
      */
    setActiveGenes:function(sel){
      this.activeGenes.clear();
      this.activeGenes.addAll(this.vessel.genes);
      this.activeGenes.retainAll(sel);
    },
    /** @return type: int */
    getActiveCount:function(){ return this.activeGenes.length; },
    /**
      * @param rad_inner - double
      * Builds a new shape object based on the Sungear coordinates.
      */
    makeShape:function(rad_inner){
      if(this.start === null){
        var p = {
          x: null,
          y: null
        };
        if(this.anchor.length === 0) {
          p.x = (function(){
            return -(require('sungear').R_CIRCLE);
          }());
          p.y = (function(){
            return -(require('sungear').R_CIRCLE) + 0.15;
          }());
        } else {
          for(var i = 0; i < this.anchor.length; i++) {
            var theta = this.anchor[i].angle;   // TODO: Find out where this comes from.
            p.x += rad_inner * Math.cos(theta) / anchor.length;
            p.y += rad_inner * Math.sin(theta) / anchor.length;
          }
        }
        this.start = p;
        this.setCenter(p, this.rad_inner);
        this.selectAllGenes();
        // this.shape.x = p.x;
        // this.shape.y = p.y;
      }
      // area 0 - vMax ==> 0 - 0.1
      this.radOuter = this.getShapeRad(this.getActiveCount, this.vMax);
      this.shape.x = this.center.x - this.radOuter;
      this.shape.y = this.center.y - this.radOuter;
      this.shape.h = (this.radOuter)*2;
      this.shape.w = (this.radOuter)*2;
    },
    updateSize:function(){
      this.radInner = this.getShapeRad(this.getSelectedCount(), this.vMax);
      this.selectedShape.x = this.center.x - this.radInner;
      this.selectedShape.y = this.center.y - this. radInner;
      this.selectedShape.h = this.radInner*2;
      this.selectedShape.w = this.radInner*2;
    },
    updateCenter:function(){
      this.setCenter(this.center, this.radInner);
    },
    /**
      * Set the center of the VesselDisplay.
      * @param p - Point2D.Double(x,y)
      * @param rad_inner - double
      */
    setCenter:function(p, rad_inner){
      this.center.x = p.x;
      this.center.y = p.y;
      this.angle = [this.anchor.length];
      for(var i = 0; i < this.angle.length; i++){
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
    /** @return Point2D.Double */
    getCenter:function(){ return center; },
    /** @return Point2D.Double */
    getStart:function(){ return start; },s
    /** @return double */
    getShapeRad:function(count, vMax){
      return this.radMin + Math.sqrt(count/vMax)*(this.radMax-this.radMin);
    },
    /** Check if point falls within the bounds of this VesselDisplay. */
    contains:function(p){
      // TODO: Make Sure this works.
      return p5.dist(p.x,p.y,this.shape.x,this.shape.y) < (this.shape.width / 2);
    },
    /** @param b - boolean */
    setHighlight:function(b){ this.highlight = b; },
    /** @return boolean */
    getHighlight:function(){ return this.highlight; },
    /** @param b - boolean */
    setSelect:function(b){ this.select = b; },
    /** @return boolean */
    getSelect:function(b){ return this.select; },
    /** @param b - boolean */
    highlightAnchors:function(b){
      for(var i = 0; i < this.anchor.length; i++){
        this.anchor[i].setHighlight(b);
      }
    },

    draw:function(){
      if(this.getActiveCount() === 0){ return; }
      p5.push();
      p5.strokeWeight(1); // FIXME: This should be .005f
      var color = this.select ? sungear.C_SELECT : (this.highlight ? sungear.C_HIGHLIGHT : sungear.C_PLAIN);
      p5.fill(color);
      if (this.getSelectedCount() == 0 && color == sungear.C_PLAIN) {
        p5.fill('#D1CDB8');
      }
      p5.ellipse(this.shape.x,this.shape.y,this.shape.h,this.shape.w);
      if (this.getSelectedCount() > 0) {
        // FIXME: g2.fill(selectedShape)
      }
      if (this.showArrows) {
        for (var i = 0; i < this.angle.length; i++) {
          this.drawArrow(this.angle[i]);
        }
      }
      p5.pop();
    },
    drawArrow:function(theta){
      p5.push();
      p5.translate(this.center.x, this.center.y);
      p5.scale(this.radOuter,this.radOuter);
      p5.rotate(theta);
      var w = 0.05 * this.radMax/this.radOuter;
      p5.strokeWeight(w);
      p5.line(1.0,0,1.0+ARROW_LINE,0);
      p5.line(1.0+ARROW_LINE,0,1.0 + ARROW_LINE - ARROW_END,ARROW_END);
      p5.line(1.0+ARROW_LINE,0,,1.0 + ARROW_LINE - ARROW_END, -ARROW_END);
      p5.pop();
    }
  };
  return vesselDisplay;
});
