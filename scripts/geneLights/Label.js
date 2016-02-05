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
    return name;
  },
  equals:function(otherName){
    return name == otherName;
  },
  isCool:function(){
    return cool;
  },
  toString:function(){
    return name;
  },
  compare:function(otherLabel){
    if(name < otherLabel.getName){
      return -1;
    } else if (name > otherLabel.getName){
      return 1;
    } else {
      return 0;
    }
  }
}
