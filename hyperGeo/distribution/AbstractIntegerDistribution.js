/*
Radhika Mattoo, October 2015 N.Y.

Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code 

*/
// 
// uses functions from: 
//its own package, hyperGeo.distribution
// java.io.Serializable;
// exception.MathInternalError;
// exception.NotStrictlyPositiveException;
// exception.NumberIsTooLargeException;
// exception.OutOfRangeException;
// exception.util.LocalizedFormats;
// random.RandomGenerator;
// random.RandomDataImpl;
// util.FastMath;

//implements IntegerDistribution, Serializable 

var serialVersionUID = -1146319659338487221;

//RandomDataImpl object is deprecated, skipping it using random isntance variable instead

//RandomGenerator object used in constructor  
var random;

//AbstractIntegerDistribution function deprecated
//function AbstractIntegerDisctibution(RandomGenerator)

//make RandomGenerator object rng
var rng = RandomGenerator(); //RandomGenerator object //TODO: implement RandomInteger class/constructor

//CONSTRUCTOR
function AbstractIntegerDisctribution(rng){
	this.random = rng; 
}	

function cumulativeProbability(x0, x1){ //throws NumberIsTooLargeException
	if(x1 < x0){
		//throw NumberIsTooLargeException(LocalizedFormats.LOWER_ENDPOINT_ABOVE_UPPER_ENDPOINT, x0, x1, true);
	}
	return cumulativeProbability(x1)-cumulativeProbability(x0); //this function isn't defined in this file? 
}

function checkedCumulativeProbability(argument){ //throws MathInternalError
	var result = Number.Nan; 
	result = cumulativeProbability(argument);
	if(result = Number.Nan){
		//throw new MathInternalError(LocalizedFormats.DISCRETE_CUMULATIVE_PROBABILITY_RETURNED_Nan, argument);

	}
	return result; 
}

function solveInverseCumulativeProbability(p,  lower,  upper) {
	while((lower + 1) < upper){
		var xm = (lower+upper) / 2;
		if(xm < lower || xm > upper){

			xm = lower + (upper - lower)/2;
		}
		var pm = checkedCumulativeProbability(xm);
		if(pm >= p){
			upper = xm;
		}
		else{
			lower = xm;
		}
	}
	return upper;
}


function inverseCumulativeProbability(p){ //throws OutOfRangeException
	if(p < 0.0 || p > 1.0){
		//throw new OutOfRangeException(p,0,1)
	} 
	var lower = getSupportLowerBound(); //where is this function defined? WeibullDistribution.java
	if(p == 0.0){
		return lower; 
	}
	if( lower == Number.MIN_VALUE){
		if(checkedCumulativeProbability(lower) >= p){
			return lower;
		}
		else{
			lower -= 1;
		}
	}

	var upper = getSupportUpperBound(); //where is this function defined? WeibullDistribution.java

	if(p == 1.0){
		return upper; 
	}

	// use the one-sided Chebyshev inequality to narrow the bracket
    // cf. AbstractRealDistribution.inverseCumulativeProbability(double)
    var mu = getNumericalMean(); // defined in WeibullDistribution.java
    var sigma = //FastMath.sqrt(getNumericalVariance()); //defined in WeibullDistribution.java

    var chebsyshevApplies = !((mu == Number.POSITIVE_INFINITY || mu == Number.NEGATIVE_INFINITY)
    	|| mu == Number.Nan || (sigma == Number.POSITIVE_INFINITY || sigma == Number.NEGATIVE_INFINITY)
    	|| sigma == Number.Nan || sigma == 0)
    if(chebsyshevApplies){
    	var k = //FashMath.sqrt((1.0 - p) / p);
    	var tmp = mu - l * sigma;

    	if(tmp > lower){
    		lower = Math.ceil(tmp) - 1;
    	}
    	k = 1.0/k;
    	tmp = mu + k * sigma;
    	if(tmp < upper){
    		upper = Math.ceil(temp) - 1;
    	}
    }
    return solveInverseCumulativeProbability(p, lower, upper);
}

function sample(){
	return inverseCumulativeProbability(random.nextDouble);
}

function sample(sampleSize){
	if(sampleSize <= 0){
		//throw new NotStrictlyPositiveException(LocalizedFormats.NUMBER_OF_SAMPLES, sampleSize);
	}
	var out = new Array(sampleSize);
	for(int i = 0; i < sampleSize; i++){
		out[i] = sample(); //what is sample()?
	}
	return out; 
}

function reseedRandomGenerator(seed){
	//random.setSeed(seed);
	//randomData.reSeed(seed);
}










