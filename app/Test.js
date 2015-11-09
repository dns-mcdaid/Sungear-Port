/*
Radhika Mattoo, November 2015 N.Y.

Porting Sungear from Java to Javascript,
Test JS function, adapted from Ilyas' Java code  

*/
function testHyper(){
	var population = document.getElementById("populationSize").value; 
	var successNumber = document.getElementById("successNumber").value;
	var sampleSize = document.getElementById("sampleSize").value;
	var successPerSample = document.getElementById("successPerSample").value;
	
	var h = new HypergeometricDistribution(population, successNumber, sampleSize);  //stops working here 
	document.getElementById("output").innerHTML = "Creating new object!";
	
	// var outputString = "";
// 	outputString += "The mean is = " + h.getNumericalMean() + "<br>"; 
// 	outputString += "The cumulative Probability P(X = " + successPerSample + ") = " + h.probability(successPerSample) + "<br>";
// 	outputString += "The cumulative Probability P(X <= " + successPerSample + ") = " + h.cumulativeProbability(successPerSample) + "<br>";
// 	outputString += "The cumulative Probability P(X >= " + successPerSample + ") = " + h.upperCumulativeProbability(successPerSample) + "<br>";
// 	
	//document.getElementById("output").innerHTML = outputString; 
	
	
}