/**
 * @author crispy
 * @author Rajah_Bimmy
 * Copyright Chris Poultney 2004.
 */
define(['anchor', 'vesselDisplay', 'p5'],
function(anchor, values, vesselDisplay, p5){
  var methods = {
    AnchorDisplay: AnchorDisplay
  }

  var NAME_SEPARATOR = ";";
  function AnchorDisplay(anchor) {
    this.anchor = anchor;
    this.highlight = false;
    this.select = false;
    /** True to show long anchor description, false for short */
    this.showLongDesc = false;
    /** Scale for ellipse size and text placement */
    this.scale = 1;
    /** Scale for text size */
    this.textScale = 1;
    this.angle = "@";
    var s = anchor.name.split(NAME_SEPARATOR);
    /** Short anchor text for default display */
    this.shortDesc = s[0];
    /** Long anchor text to display on rollover */
    this.longDesc = (s.length > 1) ? s[1] : this.shortDesc;
    this.position = {
      x: null,
      y: null
    }
    this.vessels = [];
  }

  AnchorDisplay.prototype = {
    constructor: AnchorDisplay,

    cleanup:function(){
      this.anchor.cleanup();
    },

    setScale:function(s) {
      this.scale = s;
      if(!isNaN(this.angle)) {
        setAngle(this.angle);
      }
    },

    setTextScale:function(s){ this.textScale = s; },

    setAngle:function(theta){
      this.angle = theta;
      this.position.x = values.R_CIRCLE * Math.cos(theta);
      this.position.y = values.R_CIRCLE * Math.sin(theta);
    },

    getAngle:function(){ return this.angle; },

    setHighlight:function(b){ this.highlight = b; },
    getHighlight:function(){ return this.highlight; },

    highlightVessels:function(b){
      for(var i = 0; i < this.vessels.length; i++){
        this.vessels[i].setHighlight(b);
      }
    },

    setSelect:function(b){ this.select = b; },
    getSelect:function(){ return this.select; },

    setShowLongDesc:function(b){ this.showLongDesc = b; },
    isShowLongDesc:function(){ return this.showLongDesc; },
    // MAY NOT BE NECESSARY
    draw:function(){

    },
    contains:function(p){
      return this.shape == null ? false : shape.contains(p); // TODO: Implement.
    },
    compare:function(a){
      return this.anchor.compare(a.anchor);
    }
  }

  return methods;
});
