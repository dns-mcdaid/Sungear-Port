/*
Radhika Mattoo, October 2015 N.Y.

Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code 

*/

//Exception to be thrown when an argument is negative

//extends NumberIsTooSmallException


var serialVersionUID = -2250556892093726375L;

//constructor

function NotPositiveException(value){
	
}

//create inheritance via .prototype 
NotPositiveException.prototype = new NumberIsTooSmallException();

//corect the constructor pointer, because it points to NumberIsTooSmallException right now
NotPositiveException.prototype.constructor = NotPositiveException;