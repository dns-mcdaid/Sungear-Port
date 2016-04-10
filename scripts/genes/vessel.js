 /**
 * @author crispy
 * Copyright Chris Poultney 2004.
 * Updated by Dennis McDaid.
 */
define(function(){

function Vessel(anchor){
  this.anchor = anchor.sort();
  // Look into this guy's implementation of a Javascript TreeSet
  // http://bjornharrtell.github.io/javascript.util/doc/javascript.util.TreeSet.html
  this.genes = [];
}

Vessel.prototype = {
  constructor: Vessel,

  toString:function(){
    var s = "";
    for(var i = 0; i < this.anchor.length; i++) {
      s += (i > 0 ? " | " : "") + this.anchor[i].name;
    }
    return s;
  },
  cleanup:function(){
    this.genes = [];
  },
  addGene:function(g){
    console.log("Adding gene " + g.name);
    this.genes.push(g);
  },
  getFullCount:function(){
    return this.genes.length;
  }
};
// module.exports = Vessel;
return Vessel;

});
