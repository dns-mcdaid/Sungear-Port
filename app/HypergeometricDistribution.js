/*
Radhika Mattoo, October 2015 N.Y.

Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code 

*/

//uses functions from: 
// all other distribution package files (from package declaration)
//aka must load these scripts before this file
// exception.NotPositiveException
// exception.NotStrictlyPositiveException
// exception.NumberIsTooLargeException
// util.FastMath
// random.RandomGenerator
// random.Well19937c

//extends AbstractIntegerDistribution

//Serializable version identifier
var serialVersionUID = -436928820673516179;

//num of successes in the population
var numberOfSuccesses;

var populationSize;

var sampleSize;

//cached numerical variance
var numericalVariance = Number.Nan;

//has numerical variance been calculated?
var numericalVarianceIsCalculated = false; 

// //IMPLEMENT INHERITANCE
// HypergeometricDistribution.prototype = new AbstractIntegerDistribution();
// 
// //corect the constructor pointer, because it points to AbstractIntegerDistribution right now
// HypergeometricDistribution.prototype.constructor = HypergeometricDistribution;
// 
// //create a parent property for HypergeometridDistribution to call superClass methods,
// //rather than having to use AbstractIntegerDistribution.prototype.functionName.call() everytime
// HypergeometricDistribution.prototype.parent = AbstractIntegerDistribution.prototype;
// 
// //constructor with specified population size, num of successes in population, and sample size
// //what does declaring a new Well19937 do?
function HypergeometricDistribution(populationSize, numberOfSuccesses, sampleSize){
	 
	//TODO: creates new Well19937 object?	
	this.populationSize = populationSize;
	this.numberOfSuccesses = numberOfSuccesses;
	this.sampleSize = sampleSize;
	
	//now associate below functions with object
	this.getNumericalMean = getNumericalMean;
	this.getLowerDomain = getLowerDomain;
	this.getUpperDomain = getUpperDomain;
	this.getSampleSize = getSampleSize;
	this.getNumberOfSuccesses = getNumberOfSuccesses;
	this.getPopulationSize = getPopulationSize;
	this.getSampleSize = getSampleSize;
	this.probability = probability;
	this.getDomain = getDomain;
	this.innerCumulativeProbability = innerCumulativeProbability;
	this.cumulativeProbability = cumulativeProbability;
	this.upperCumulativeProbability = upperCumulativeProbability;
	this.getNumericalMean = getNumericalMean;
	this.calculateNumericalVariance = calculateNumericalVariance;
	this.getNumericalVariance = getNumericalVariance;
	this.getSupportLowerBound = getSupportLowerBound;
	this.getSupportUpperBound = getSupportUpperBound;
	this.isSupportConnected = isSupportConnected; 
	
	
}

// function HypergeometricDistribution(rng, populationSize, numberOfSuccesses, sampleSize){
// 	//TODO: throws all 3 exceptions listed above
// 	if (populationSize <= 0) {
// 		//throw NotStrictlyPositiveException(LocalizedFormats.POPULATION_SIZE,populationSize);   
// 		document.getElementById("output").innerHTML = "Throw Not Strictly Positive Exception.";                                          
// 	}
// 	if (numberOfSuccesses < 0) {
// 	 	//throw NotPositiveException(LocalizedFormats.NUMBER_OF_SUCCESSES, numberOfSuccesses);
// 	 	document.getElementById("output").innerHTML = "Throw Not Positive Exception (numSuccesses < 0)"; 
// 	}
// 	if(sampleSize < 0){
// 	 	//throw NotPositiveException(LocalizedFormats.NUMBER_OF_SAMPLES, sampleSize);
// 	 	document.getElementById("output").innerHTML = "Throw Not Positive Exception (sample size < 0)"; 
// 	}
// 	if(numberOfSuccesses > populationSize){
// 		//throw NumberIsTooLargeException(LocalizedFormats.NUMBER_OF_SUCCESS_LARGER_THAN_POPULATION_SIZE,sampleSize, populationSize, true);
// 		document.getElementById("output").innerHTML = "Throw Number is Too Large Exception (numSuccesses > populationSize)"; 
// 
// 	}
// 	if(sampleSize > populationSize){
// 		//throw  NumberIsTooLargeException(LocalizedFormats.SAMPLE_SIZE_LARGER_THAN_POPULATION_SIZE, sampleSize, populationSize, true);   
// 		document.getElementById("output").innerHTML = "Throw Number is Too Large Exception (sampleSize > populationSize)";                                        
// 	}
// 	else{
// 		this.numberOfSuccesses = numberOfSuccesses;
// 		this.populationSize = populationSize;
// 		this.sampleSize = sampleSize;
// 	}
// 
// }

function getLowerDomain(n,m,k){
	return FastMathMax(0,m-(n-k));
}
function getUpperDomain(m,k){
	return FastMathMin(k,m); 
}


function getDomain(n, m, k){
	var ret1 = getLowerDomain(n,m,k);
	var ret2 = getUpperDomain(m,k);
	return new Array(ret1, ret2);
}

function probability(x){
	var ret;

	var domain = this.getDomain(this.populationSize, this.numberOfSuccesses,this.sampleSize);

	if(x < domain[0] || x > domain[1]){
		ret = 0.0;
	}
	else{
		var p = this.sampleSize/this.populationSize;
		var q = (this.populationSize - this.sampleSize)/this.populationSize;
		//method from saddlepointexpansion
		var p1 = logBinomialProbability(x, this.numberOfSuccesses, p, q); 
		var p2 = logBinomialProbability(this.sampleSize - x, this.populationSize - this.numberOfSuccesses, p, q);
		var p3 = logBinomialProbability(this.sampleSize, this.populationSize, p, q);
		ret = FastMathExp((p1 + p2 - p3), 0.0, null); 
	}
	return ret; 
}

//GETTERS
function getNumberOfSuccesses(){
	return this.numberOfSuccesses;
}
function getPopulationSize(){
	return this.populationSize;
}
function getSampleSize(){
	return this.sampleSize;
}


function innerCumulativeProbability(x0,x1,dx){
	var ret = this.probability(x0);
	while(x0 != x1){
		x0 += dx;
		ret += this.probability(x0);
	}
	return ret; 
}
function cumulativeProbability(x){
	var ret;

	var domain = this.getDomain(this.populationSize, this.numberOfSuccesses, this.sampleSize);

	if(x < domain[0]){
		ret = 0.0;
	}
	else if(x >= domain[1]){
		ret = 1.0;
	}
	else{
		ret = this.innerCumulativeProbability(domain[0], x, 1);
	}

	return ret;

}
function upperCumulativeProbability(x){
	    var ret;

        var domain = this.getDomain(this.populationSize, this.numberOfSuccesses, this.sampleSize);
        if (x <= domain[0]) {
            ret = 1.0;
        } else if (x > domain[1]) {
            ret = 0.0;
        } else {
            ret = this.innerCumulativeProbability(domain[1], x, -1);
        }

        return ret;
}

function getNumericalMean(){
	return (this.getSampleSize() * this.getNumberOfSuccesses())/this.getPopulationSize();
}

function calculateNumericalVariance(){
	var N = this.getPopulationSize();
	var m =  this.getNumberOfSuccesses();
	var n = this.getSampleSize();
	return (n * m * (N-n) * (N-m))/(N * N * (N - 1));
}


function getNumericalVariance(){
	if(!numericalVarianceIsCalculated){
		numericalVariance = this.calculateNumericalVariance();
		numericalVarianceIsCalculated = true;
	}
	return numericalVariance;
}


function getSupportLowerBound(){
	return FastMathMax(0, this.getSampleSize() + this.getNumberOfSuccesses() - this.getPopulationSize());
}


function getSupportUpperBound(){
	return FastMathMin(this.getNumberOfSuccesses(), this.getSampleSize());
}


function isSupportConnected(){
	return true; 
}






