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

//IMPLEMENT INHERITANCE
HypergeometricDistribution.prototype = Object.create(AbstractIntegerDistribution.prototype);

//corect the constructor pointer, because it points to AbstractIntegerDistribution right now
HypergeometricDistribution.prototype.constructor = HypergeometricDistribution;

function HypergeometricDistribution(populationSize, numberOfSuccesses, sampleSize, rng){
	if(arguments.length < 4){
		rng = new Well19937c();
	}

	//TODO: throws all 3 exceptions listed above
	if (populationSize <= 0) {
		//throw NotStrictlyPositiveException(LocalizedFormats.POPULATION_SIZE,populationSize);
		document.getElementById("output").innerHTML = "Throw Not Strictly Positive Exception.";
	}
	if (numberOfSuccesses < 0) {
	 	//throw NotPositiveException(LocalizedFormats.NUMBER_OF_SUCCESSES, numberOfSuccesses);
	 	document.getElementById("output").innerHTML = "Throw Not Positive Exception (numSuccesses < 0)";
	}
	if(sampleSize < 0){
	 	//throw NotPositiveException(LocalizedFormats.NUMBER_OF_SAMPLES, sampleSize);
	 	document.getElementById("output").innerHTML = "Throw Not Positive Exception (sample size < 0)";
	}
	if(numberOfSuccesses > populationSize){
		//throw NumberIsTooLargeException(LocalizedFormats.NUMBER_OF_SUCCESS_LARGER_THAN_POPULATION_SIZE,sampleSize, populationSize, true);
		document.getElementById("output").innerHTML = "Throw Number is Too Large Exception (numSuccesses > populationSize)";

	}
	if(sampleSize > populationSize){
		//throw  NumberIsTooLargeException(LocalizedFormats.SAMPLE_SIZE_LARGER_THAN_POPULATION_SIZE, sampleSize, populationSize, true);
		document.getElementById("output").innerHTML = "Throw Number is Too Large Exception (sampleSize > populationSize)";
	}
	else{
		this.numberOfSuccesses = numberOfSuccesses;
		this.populationSize = populationSize;
		this.sampleSize = sampleSize;
	}

}

//GETTERS
HypergeometricDistribution.prototype.getNumberOfSuccesses = function(){
	return this.numberOfSuccesses;
}
HypergeometricDistribution.prototype.getPopulationSize = function(){
	return this.populationSize;
}
HypergeometricDistribution.prototype.getSampleSize = function(){
	return this.sampleSize;
}

HypergeometricDistribution.prototype.getLowerDomain = function(n,m,k){
	return FastMath.Max(0,m-(n-k));
}
HypergeometricDistribution.prototype.getUpperDomain = function(m,k){
	return FastMath.Min(k,m);
}


HypergeometricDistribution.prototype.getDomain = function(n, m, k){
	var ret1 = getLowerDomain(n,m,k);
	var ret2 = getUpperDomain(m,k);
	return [ret1, ret2];
}

HypergeometricDistribution.prototype.probability = function(x){
	var ret;

	var domain = getDomain(getPopulationSize(), getNumberOfSuccesses(), getSampleSize());

	if(x < domain[0] || x > domain[1]){
		ret = 0.0;
	}else{
		var p = getSampleSize()/getPopulationSize();
		var q = (getPopulationSize() - getSampleSize())/getPopulationSize();
		//method from saddlepointexpansion
		var p1 = SaddlePointExpansion.logBinomialProbability(x, getNumberOfSuccesses(), p, q);
		var p2 = SaddlePointExpansion.logBinomialProbability(getSampleSize() - x, getPopulationSize() - getNumberOfSuccesses(), p, q);
		var p3 = SaddlePointExpansion.logBinomialProbability(getSampleSize(), getPopulationSize(), p, q);
		ret = FastMath.Exp((p1 + p2 - p3), 0.0, null);
	}
	return ret;
}

HypergeometricDistribution.prototype.innerCumulativeProbability = function(x0,x1,dx){
	var ret = probability(x0);
	while(x0 != x1){
		x0 += dx;
		ret += probability(x0);
	}
	return ret;
}

HypergeometricDistribution.prototype.cumulativeProbability = function(x){
	var ret;

	var domain = getDomain(getPopulationSize(), getNumberOfSuccesses(), getSampleSize());

	if(x < domain[0]){
		ret = 0.0;
	}else if(x >= domain[1]){
		ret = 1.0;
	}else{
		ret = innerCumulativeProbability(domain[0], x, 1);
	}

	return ret;

}
HypergeometricDistribution.prototype.upperCumulativeProbability = function(x){
	    var ret;

      var domain = getDomain(getPopulationSize(), getNumberOfSuccesses(), getSampleSize());
      if (x <= domain[0]) {
          ret = 1.0;
      } else if (x > domain[1]) {
          ret = 0.0;
      } else {
          ret = innerCumulativeProbability(domain[1], x, -1);
      }
      return ret;
}

HypergeometricDistribution.prototype.getNumericalMean = function(){
	return (getSampleSize() * getNumberOfSuccesses())/getPopulationSize();
}

function calculateNumericalVariance(){
	var N = getPopulationSize();
	var m =  getNumberOfSuccesses();
	var n = getSampleSize();
	return (n * m * (N-n) * (N-m))/(N * N * (N - 1));
}


HypergeometricDistribution.prototype.getNumericalVariance = function(){
	if(!numericalVarianceIsCalculated){
		numericalVariance = calculateNumericalVariance();
		numericalVarianceIsCalculated = true;
	}
	return numericalVariance;
}


HypergeometricDistribution.prototype.getSupportLowerBound = function(){
	return FastMath.Max(0, getSampleSize() + getNumberOfSuccesses() - getPopulationSize());
}


HypergeometricDistribution.prototype.getSupportUpperBound = function(){
	return FastMath.Min(getNumberOfSuccesses(), getSampleSize());
}


HypergeometricDistribution.prototype.isSupportConnected = function(){
	return true;
}
