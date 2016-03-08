/**
 * @author crispy
 * @author Rajah_Bimmy
 * Copyright Chris Poultney 2004.
 */
define(['anchor', 'sunGear'], function(anchor, sunGear){
  var methods = {
    AnchorDisplay: AnchorDisplay
  }

  var NAME_SEPARATOR = ";";
  function AnchorDisplay(anchor) {
    console.log(sunGear.R_CIRCLE);
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
    //this.vessels = new VesselDisplay();
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
      this.position.x = sunGear.R_CIRCLE * Math.cos(theta);
      this.position.y = sunGear.R_CIRCLE * Math.sin(theta);
    }
  }
  return methods;
});
