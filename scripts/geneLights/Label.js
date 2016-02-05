/*
 *  Based on Label.java
 *
 *  Updated on February 04, 2016
 *
 *  Modified by Dennis McDaid
 */

function Label(name, cool){
  this.name = name;
  this.cool = cool;
}

Label.prototype = {
  constructor: Label,

  getName:function(){
    return this.name;
  },
  equals:function(otherName){
    return this.name == otherName;
  },
  isCool:function(){
    return this.cool;
  },
  toString:function(){
    return this.name;
  },
  compare:function(otherLabel){
    if(this.name < otherLabel.getName){
      return -1;
    } else if (this.name > otherLabel.getName){
      return 1;
    } else {
      return 0;
    }
  }
}
