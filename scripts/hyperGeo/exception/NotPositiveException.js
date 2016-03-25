/*
Radhika Mattoo, October 2015 N.Y.

Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code

*/

//Exception to be thrown when an argument is negative

//extends NumberIsTooSmallException


var serialVersionUID = -2250556892093726375L;

//create inheritance via .prototype
NotPositiveException.prototype = new NumberIsTooSmallException();

//corect the constructor pointer, because it points to NumberIsTooSmallException right now
NotPositiveException.prototype.constructor = NotPositiveException;

//create a parent property for NotPositiveException to call superClass methods,
//rather than having to use NumberIsTooSmalLException.prototype.functionName.call() everytime
NotPositiveException.prototype.parent = NumberIsTooSmallException.prototype;

//constructor
function NotPositiveException(value){
	this.parent.NumberIsTooSmallException.call(this, value, 0, true);
	
}

// function NotPositiveException(specific, value){
// 	this.parent.NumberIsTooSmallException.call(this, specific, value, 0, true);
// }
