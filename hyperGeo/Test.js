/*
Radhika Mattoo, November 2015 N.Y.

Porting Sungear from Java to Javascript,
Test JS function, adapted from Ilyas' Java code

*/

function testHyper(){
	// var population = Number(document.getElementById("populationSize").value);
	// var successNumber = Number(document.getElementById("successNumber").value);
	// var sampleSize = Number(document.getElementById("sampleSize").value);
	// var successPerSample = Number(document.getElementById("successPerSample").value);
	var population = 52;
	var sucessNumber = 4;
	var sampleSize = 3;
	var successPerSample = 2;

	var h = new HypergeometricDistribution(population, successNumber, sampleSize);

	 var outputString = "";
 	outputString += "The mean is = " + h.getNumericalMean() + "\n";
 	outputString += "The cumulative Probability P(X = " + successPerSample + ") = " + h.probability(successPerSample) + "\n";
  	outputString += "The cumulative Probability P(X <= " + successPerSample + ") = " + h.cumulativeProbability(successPerSample) + "\n";
 	outputString += "The cumulative Probability P(X >= " + successPerSample + ") = " + h.upperCumulativeProbability(successPerSample) + "\n";

	//document.getElementById("output").innerHTML = outputString;
	console.log(outputString);

}
testHyper();
