/**
 * @author crispy & Rajah_Bimmy
 * Copyright Chris Poultney 2004.
 */
define(function(){

 function Anchor(name){
   this.name = name;
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
    //this returns different neg/pos values based on browser,
    //so when using this function test for < 0 or < 0
    return str1.localeCompare(str2);
  }
};
return Anchor;
});
