/*
Radhika Mattoo, February 2016  N.Y.

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
HypergeometricDistribution.prototype.constructor = HypergeometricDistribution;

function HypergeometricDistribution(populationSize, numberOfSuccesses, sampleSize, rng){
	if(arguments.length < 4){
		rng = new Well19937c();
		// rng = null;
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

//GETTERS AND HELPERS
HypergeometricDistribution.prototype.getNumberOfSuccesses = function(){
	return this.numberOfSuccesses;
}
HypergeometricDistribution.prototype.getPopulationSize= function(){
	return this.populationSize;
}
HypergeometricDistribution.prototype.getSampleSize= function(){
	return this.sampleSize;
}

HypergeometricDistribution.prototype.getLowerDomain = function(n,m,k){
	return FastMathMax(0,m-(n-k));
}
HypergeometricDistribution.prototype.getUpperDomain= function(m,k){
	return FastMathMin(k,m);
}


HypergeometricDistribution.prototype.getDomain = function(n, m, k){
	var ret1 = this.getLowerDomain(n,m,k);
	var ret2 = this.getUpperDomain(m,k);
	return [ret1, ret2];
}

HypergeometricDistribution.prototype.probability = function(x){
	console.log("In probability");
	var ret;

	var domain = this.getDomain(this.getPopulationSize(), this.getNumberOfSuccesses(), this.getSampleSize());

	if(x < domain[0] || x > domain[1]){
		ret = 0.0;
	}else{
		var p = this.getSampleSize()/this.getPopulationSize();
		var q = (this.getPopulationSize() - this.getSampleSize())/this.getPopulationSize();
		//method from saddlepointexpansion
		var p1 = SaddlePointExpansionlogBinomialProbability(x, this.getNumberOfSuccesses(), p, q);
		var p2 = SaddlePointExpansionlogBinomialProbability(this.getSampleSize() - x, this.getPopulationSize() - this.getNumberOfSuccesses(), p, q);
		var p3 = SaddlePointExpansionlogBinomialProbability(this.getSampleSize(), this.getPopulationSize(), p, q);
		ret = FastMathExp((p1 + p2 - p3), 0.0, null);
	}
	return ret;
}

HypergeometricDistribution.prototype.innerCumulativeProbability = function(x0,x1,dx){
	var ret = this.probability(x0);
	while(x0 != x1){
		x0 += dx;
		ret += this.probability(x0);
	}
	return ret;
}

HypergeometricDistribution.prototype.cumulativeProbability = function(x){
	var ret;

	var domain = this.getDomain(this.getPopulationSize(), this.getNumberOfSuccesses(), this.getSampleSize());

	if(x < domain[0]){
		ret = 0.0;
	}else if(x >= domain[1]){
		ret = 1.0;
	}else{
		ret = this.innerCumulativeProbability(domain[0], x, 1);
	}

	return ret;

}
HypergeometricDistribution.prototype.upperCumulativeProbability = function(x){
	    var ret;

      var domain = this.getDomain(this.getPopulationSize(), this.getNumberOfSuccesses(), this.getSampleSize());
      if (x <= domain[0]) {
          ret = 1.0;
      } else if (x > domain[1]) {
          ret = 0.0;
      } else {
          ret = this.innerCumulativeProbability(domain[1], x, -1);
      }
      return ret;
}

HypergeometricDistribution.prototype.getNumericalMean = function(){
	return (this.getSampleSize() * this.getNumberOfSuccesses())/this.getPopulationSize();
}

function calculateNumericalVariance(){
	var N = this.getPopulationSize();
	var m =  this.getNumberOfSuccesses();
	var n = this.getSampleSize();
	return (n * m * (N-n) * (N-m))/(N * N * (N - 1));
}


HypergeometricDistribution.prototype.getNumericalVariance = function(){
	if(!numericalVarianceIsCalculated){
		numericalVariance = this.calculateNumericalVariance();
		numericalVarianceIsCalculated = true;
	}
	return numericalVariance;
}


HypergeometricDistribution.prototype.getSupportLowerBound = function(){
	return FastMathMax(0, this.getSampleSize() + this.getNumberOfSuccesses() - this.getPopulationSize());
}


HypergeometricDistribution.prototype.getSupportUpperBound = function(){
	return FastMathMin(this.getNumberOfSuccesses(), this.getSampleSize());
}


HypergeometricDistribution.prototype.isSupportConnected = function(){
	return true;
}
