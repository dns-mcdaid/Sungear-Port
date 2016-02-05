/**
 * @author crispy
 * Copyright Chris Poultney 2004.
 * Updated by Dennis McDaid.
 */

function Vessel(anchor){
  this.anchor = anchor.sort();
  // Look into this guy's implementation of a Javascript TreeSet
  // http://bjornharrtell.github.io/javascript.util/doc/javascript.util.TreeSet.html
  genes = [];
}

Vessel.prototype = {
  constructor: Vessel,

  toString:function(){
    var s = "";
    for(var i = 0; i < anchor.length; i++) {
      s += (i > 0 ? " | " : "") + this.anchor[i].name;
    }
    return s;
  },
  cleanup:function(){
    genes = [];
  },
  addGene:function(g){
    genes.push(g);
  },
  getFullCount:function(){
    return genes.length;
  }
}
