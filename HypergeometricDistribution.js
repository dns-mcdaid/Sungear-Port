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
var numericalVariance; //equals Double.NaN ?

//has numerical variance been calculated?
var numericalVarianceIsCalculated = false; 

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








