/**
 * @author crispy
 * @author RajahBimmy
 * Copyright Chris Poultney 2004.
 */
define("anchorDisplay", ['anchor', 'sungear', 'vesselDisplay'],
function(anchor, values, vesselDisplay){

  function AnchorDisplay(anchor) {
    this.anchor = anchor;                                   // Anchor
    this.highlight = false;                                 // boolean
    this.select = false;                                    // boolean
    /** True to show long anchor description, false for short */
    this.showLongDesc = false;                              // boolean
    /** Scale for ellipse size and text placement */
    this.scale = 1;                                         // double
    /** Scale for text size */
    this.textScale = 1;                                     // double
    this.angle = "@";                                       // double
    var s = anchor.name.split(NAME_SEPARATOR);
    /** Short anchor text for default display */
    this.shortDesc = s[0];                                  // String
    /** Long anchor text to display on rollover */
    this.longDesc = (s.length > 1) ? s[1] : this.shortDesc; // String
    this.position = {
      x: null,y: null
    };                                                      // Point2D.Double
    this.vessels = [];                                      // Vector<VesselDisplay>
    this.shape = null;                                      // Shape
  }
  AnchorDisplay.NAME_SEPARATOR = ";";

  AnchorDisplay.prototype = {
    constructor: AnchorDisplay,

    cleanup:function(){
      this.anchor.cleanup();
    },
    /** @param s - double */
    setScale:function(s) {
      this.scale = s;
      if(!isNaN(this.angle)) {
        setAngle(this.angle);
      }
    },
    /** @param s - double */
    setTextScale:function(s){ this.textScale = s; },
    /** @param s - double */
    setAngle:function(theta){
      this.angle = theta;
      this.position.x = values.values.R_CIRCLE * Math.cos(theta);
      this.position.y = values.values.R_CIRCLE * Math.sin(theta);
    },

    getAngle:function(){ return this.angle; },
    /** @param b - boolean */
    setHighlight:function(b){ this.highlight = b; },
    getHighlight:function(){ return this.highlight; },
    /** @param b - boolean */
    highlightVessels:function(b){
      for(var i = 0; i < this.vessels.length; i++){
        this.vessels[i].setHighlight(b);
      }
    },
    /** @param b - boolean */
    setSelect:function(b){ this.select = b; },
    getSelect:function(){ return this.select; },
    /** @param b - boolean */
    setShowLongDesc:function(b){ this.showLongDesc = b; },
    isShowLongDesc:function(){ return this.showLongDesc; },

    draw:function(p5){
      // TODO: Implement this.
    },
    contains:function(p){
      return this.shape === null ? false : (p5.dist(p.x,p.y,this.shape.x,this.shape.y) < (this.shape.width / 2));
    },
    /** @param a - AnchorDisplay */
    compare:function(a){
      return this.anchor.compare(a.anchor);
    }
  };

  return AnchorDisplay;
});
