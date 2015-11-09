/*
Radhika Mattoo, October 2015 N.Y.

Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code 

*/

//extends MathIllegalNumberException 

var serialVersionUID = -6100997100383932834L;

var min;

var boundIsAllowed; 

//INHERITANCE 
NumberIsTooSmallException.prototype = new MathIllegalNumberException();

//corect the constructor pointer, because it points to MathIllegalNumberException right now
NumberIsTooSmallException.prototype.constructor = NumberIsTooSmallException;

//create a parent property for NumberIsTooSmallException to call superClass methods,
//rather than having to use MathIllegalNumberException.prototype.functionName.call() everytime
NumberIsTooSmallException.prototype.parent = MathIllegalNumberException.prototype;

// function NumberIsTooSmallException(wrong, min, boundIsAllowed){
// 	   // this(boundIsAllowed ?
//     //          LocalizedFormats.NUMBER_TOO_SMALL :
//     //          LocalizedFormats.NUMBER_TOO_SMALL_BOUND_EXCLUDED,
//     //          wrong, min, boundIsAllowed);
// 
// 	//don't recorgnize this code style/format^^ ?
// }

function NumberIsTooSmallException(specific, wrong, min, boundIsAllowed){
	this.parent.MathIllegalNumberException.call(this, specific, wrong, min);
	this.min = min;
	this.boundIsAllowed = boundIsAllowed;
}

function getBoundIsAllowed(){
	return boundIsAllowed;
}

function getMin(){
	return min; 
}