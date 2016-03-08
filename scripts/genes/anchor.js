/**
 * @author crispy & Rajah_Bimmy
 * Copyright Chris Poultney 2004.
 */

 function Anchor(name){
   this.name = name;
 }

Anchor.prototype = {
  constructor: Anchor,

  cleanup:function(){
    return;
  },

  compare:function(a){
    var str1 = this.name.toLowerCase();
    var str2 = a.name.toLowerCase();
    return str1.localeCompare(str2);
  }
}
