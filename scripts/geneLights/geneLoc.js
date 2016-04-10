/*
 *  Based on GeneLoc.java
 *
 *  Created on May 27, 2005
 *  Updated on February 04, 2016
 *
 *  Copyright  Delin Yang.
 *  Updated by Dennis McDaid.
 */
define(function(){

function GeneLoc(listID, offset){
  this.listID = listID;
  this.offset = offset;
}

GeneLoc.prototype = {
  constructor: GeneLoc,

  /* get gene location's anchor id */
  getListID:function(){
    return this.listID;
  },
  /* get the gene location's offset in an anchor */
  getOffset:function(){
    return this.offset;
  }
};

// module.exports = GeneLoc;
return GeneLoc; 
});
