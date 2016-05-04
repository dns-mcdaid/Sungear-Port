/**
 * @author crispy & Rajah_Bimmy
 * Copyright Chris Poultney 2004.
 */
define(function(){
  /** @param name - String */
  function Anchor(name){
    this.name = name; // Type: String
  }

  Anchor.prototype = {
    constructor: Anchor,
    cleanup:function(){
      console.log("Cleaning up Anchor");
      return;
    },

    compare:function(a){
      var str1 = this.name.toLowerCase();
      var str2 = a.name.toLowerCase();
      // TODO: Make sure this works.
      return str1.localeCompare(str2);
    }
  };
  return Anchor;
});
