/*
Radhika Mattoo, February 2016 N.Y.

Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code

*/

//IMPLEMENT INHERITANCE
AbstractMultivariateRealDistribution.prototype = Object.create(MultivariateRealDistribution.prototype);
AbstractMultivariateRealDistribution.prototype.constructor = AbstractMultivariateRealDistribution;

function AbstractMultivariateRealDistribution(rng, n){
  this.random = rng; //RandomGenerator
  this.dimension = n; //number of dimensions/columns in the multivaraite distribution
}
//overriding
AbstractMultivariateRealDistribution.prototype.reseedRandomGenerator = function(seed){
  this.random.setSeed(seed); //FIXME: find online PRNG file
}

//overriding
AbstractMultivariateRealDistribution.prototype.getDimension(){
  return this.dimension;
}

//overriding
AbstractMultivariateRealDistribution.prototype.sample(sampleSize){
  if(arguments.length == 0){
    return null;
  }
  else{
    if(sampleSize <= 0){
      throw new NotStrictlyPositiveException(LocalizedFormats.NUMBER_OF_SAMPLES,
                                                   sampleSize);
    }
    out = new Array(sampleSize);
    for(var i = 0; i < sampleSize; i++){
      out[i] = new Array(dimension);
    }
    return out;
  }
}
