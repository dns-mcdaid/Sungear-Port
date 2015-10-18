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
var serialVersionUID = -436928820673516179L;

//num of successes in the population
var numberOfSuccesses;

var populationSize;

var sampleSize;

//cached numerical variance
var numericalVariance = Number.NaN;

//has numerical variance been calculated?
var numericalVarianceIsCalculated = false; 

//IMPLEMENT INHERITANCE
HypergeometricDistribution.prototype = new AbstractIntegerDistribution();

//corect the constructor pointer, because it points to AbstractIntegerDistribution right now
HypergeometricDistribution.prototype.constructor = HypergeometricDistribution;

//create a parent property for HypergeometridDistribution to call superClass methods,
//rather than having to use AbstractIntegerDistribution.prototype.functionName.call() everytime
HypergeometricDistribution.prototype.parent = AbstractIntegerDistribution.prototype;

//constructor with specified population size, num of successes in population, and sample size
//what does declaring a new Well19937 do?
function HypergeometricDistribution(populationSize, numberOfSuccesses, sampleSize){
	//TODO: can through all 3 exceptions listed above (if statements?)
	
	//TODO: creates new Well19937 object?
	this.populationSize = populationSize;
	this.numberOfSuccesses = numberOfSuccesses;
	this.sampleSize = sampleSize;
}
//simple constructor 
function HypergeometricDistribution(rng, populationSize, numberOfSuccesses, sampleSize){
	//TODO: throws all 3 exceptions listed above
	if (populationSize <= 0) {
		//throw NotStrictlyPositiveException(LocalizedFormats.POPULATION_SIZE,populationSize);                                            
	}
	if (numberOfSuccesses < 0) {
	 	//throw NoPositiveException(LocalizedFormats.NUMBER_OF_SUCCESSES, numberOfSuccesses);
	}
	if(sampleSize < 0){
	 	//throw NotPositiveException(LocalizedFormats.NUMBER_OF_SAMPLES, sampleSize);
	}
	if(numberOfSuccesses > populationSize){
		//throw NumberIsTooLargeException(LocalizedFormats.NUMBER_OF_SUCCESS_LARGER_THAN_POPULATION_SIZE,sampleSize, populationSize, true);

	}
	if(sampleSize > populationSize){
		//throw  NumberIsTooLargeException(LocalizedFormats.SAMPLE_SIZE_LARGER_THAN_POPULATION_SIZE, sampleSize, populationSize, true);                                          
	}
	this.numberOfSuccesses = numberOfSuccesses;
	this.populationSize = populationSize;
	this.sampleSize = sampleSize;

}

function getLowerDomain(n,m,k){
	//return FastMath's .max(0,m-(n-k)) function
}
function getUpperDomain(m,k){
	//return FastMath's .min(k,m) function
}


function getDomain(n, m, k){
	var ret1 = getLowerDomain(n,m,k);
	var ret2 = getUpperDomain(m,k);
	return new Array(ret1, ret2);
}

function probability(x){
	var ret;

	var domain = getDomain(populationSize, numberOfSuccesses,sampleSize);

	if(x < domain[0] || x > domain[1]){
		ret = 0.0;
	}
	else{
		var p = sampleSize/populationSize;
		var q = (populationSize - sampleSize)/populationSize;
		//var p1 = SaddlePointExpansion.logBinomialProbability(x, numberOfSuccesses, p, q);
		//var p2 = SaddlePointExpansion.logBinomialProbability(sampleSize - x, populationSize - numberOfSuccesses, p, q);
		//var p3 = SaddlePointExpansion.logBinomialProbability(sampleSize, populationSize, p, q);
		//TODO: SaddlePointExpansion??

		//ret = FastMath.exp(p1 + p2 - p3) 
	}
	return ret; 
}
//GETTERS
function getNumberOfSuccesses(){
	return numberOfSuccesses;
}
function getPopulationSize(){
	return populationSize;
}
function getSampleSize(){
	return sampleSize;
}


function innerCumulativeProbability(x0,x1,dx){
	var ret = probability(x0);
	while(x0 != x1){
		x0 += dx;
		ret += probability(x0);
	}
	return ret; 
}
function cumulativeProbability(x){
	var ret;

	var domain = getDomain(populationSize, numberOfSuccesses, sampleSize);

	if(x < domain[0]){
		ret = 0.0;
	}
	else if(x >= domain[1]){
		ret = 1.0;
	}
	else{
		ret = innerCumulativeProbability(domain[0], x, 1);
	}

	return ret;

}
function upperCumulativeProbability(x){
	    var ret;

        var domain = getDomain(populationSize, numberOfSuccesses, sampleSize);
        if (x <= domain[0]) {
            ret = 1.0;
        } else if (x > domain[1]) {
            ret = 0.0;
        } else {
            ret = innerCumulativeProbability(domain[1], x, -1);
        }

        return ret;
    }
}

function getNumericalMean(){
	return (getSampleSize() * getNumberOfSuccesses())/getPopulationSize();
}

function calculateNumericalVariance(){
	var N = getPopulationSize();
	var m getNumberOfSuccesses();
	var n = getSampleSize();
	return (n * m * (N-n) * (N-m))/(N * N * (N - 1));
}


function getNumericalVariance(){
	if(!numericalVarianceIsCalculated){
		numericalVariance = calculateNumericalVariance();
		numericalVarianceIsCalculated = true;
	}
	return numericalVariance;
}


function getSupportLowerBound(){
	//return FastMathMax(0, getSampleSize() + getNumberOfSuccesses() - getPopulationSize());
}


function getSupportUpperBound(){
	//return FastMathMin(getNumberOfSuccesses(), getSampleSize());
}


function isSupportConnected(){
	return true; 
}







