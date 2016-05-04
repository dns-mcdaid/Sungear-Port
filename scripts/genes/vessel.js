/**
 * @author crispy
 * @author Rajah_Bimmy
 * Copyright Chris Poultney 2004.
 * Updated by Dennis McDaid.
 */
define(['TreeSet'],function(TreeSet){
  /** @param anchor - Anchor[] */
  function Vessel(anchor){
    // TODO: Check that this sorts properly.
    this.anchor = anchor.sort();  // Type: Anchor[]
    this.genes = new TreeSet();   // Type: TreeSet<Gene>
  }

  Vessel.prototype = {
    constructor: Vessel,
    /** @return string */
    toString:function(){
      var s = "";
      for(var i = 0; i < this.anchor.length; i++) {
        s += (i > 0 ? " | " : "") + this.anchor[i].name;
      }
      return s;
    },
    cleanup:function(){
      this.genes = [];
      this.anchor = null;
    },
    /** @param g - Gene */
    addGene:function(g){
      console.log("Adding gene " + g.name);
      this.genes.push(g);
    },
    getFullCount:function(){
      return this.genes.length;
    }
  };
  return Vessel;
});
