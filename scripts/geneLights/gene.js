/*
 * Based on Gene.java
 *
 * Created on July 11, 2005
 * Updated on February 4, 2016
 *
 * Copyright Delin Yang
 * Modified by Dennis McDaid
 */

function Gene(name, value){
	this.name = name;
	this.value = value;
}

Gene.prototype = {
	constructor: Gene,

	getName:function(){
		return name;
	},
	getValue:function(){
		return value;
	},

	/**
		* compare two genes ascendingly according to their expression values
		*/
	 compare:function(otherGene){
		if(value < otherGene.value){
	 		return -1;
	 	} else if (value > otherGene.value) {
	 		return 1;
	 	} else {
	 		return 0;
	 	}
	 },

	 /**
	 	*  test whether two genes are equal according to their name
		*/
	 equals:function(other){
		 if ( name == other.name ){
			 return true;
		 } else {
			 return false;
		 }
	 }
}
