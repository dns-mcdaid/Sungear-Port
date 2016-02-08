/*
Radhika Mattoo, February 2016 N.Y.

Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code

*/
//ABSTRACT CLASS

//IMPLEMENT INHERITANCE
BitsStreamGenerator.prototype = Object.create(RandomGenerator.prototype);
BitsStreamGenerator.prototype.constructor = BitsStreamGenerator;

function BitsStreamGenerator(){
  this.nextGaussian = Number.Nan;
}
//Overridden methods from RandomGenerator
//abstract
BitsStreamGenerator.prototype.setSeed = function (seed) {};
BitsStreamGenerator.prototype.next = function(){};

BitsStreamGenerator.prototype.nextBytes = function (bytes) {
  var i = 0;
  var iEnd = bytes.length - 3;
  while(i < iEnd){
    var i = next(32);
    bytes[i] = random & 0xff; //FIXME
    bytes[i+1] = (random >> 8) & 0xff;//FIXME
    bytes[i+2] = (random >> 16) & 0xff;//FIXME
    bytes[i+3] = (random >> 24) & 0xff;//FIXME
    i+=4;
  }
  var random = next(32);
  while(i < bytes.length){
    bytes[i++] = random & 0xff;//FIXME
    random = random >> 8;//FIXME
  }
};
BitsStreamGenerator.prototype.nextDouble = function(){
  var high = next(26) << 26; //FIXME
  var low = next(26);
  var returnVal = (high | low) * (2.220446049250313E-16); //FIXME
  return returnVal;
}

BitsStreamGenerator.prototype.nextFloat = function () {
  return next(23) * 1.1920929E-7;
};

BitsStreamGenerator.prototype.nextGaussian = function () {
  var random;
  if(isNaN(this.nextGaussian)){
    var x = this.nextDouble();
    var y = this.nextDouble();
    var alpha = 2 * FastMath.FastMathPI * x;
    var r = FastMath.Sqrt(-2 * FastMath.FastMathLog(y)); //FIXME
    random = r * FastMath.cos(alpha); //FIXME
    this.nextGaussian = r * FastMath.sin(alpha);  //FIXME
  }else{
    random = this.nextGaussian;
    this.nextGaussian = Number.Nan;
  }
  return random;
};

BitsStreamGenerator.prototype.nextInt = function () {
  if(arguments.length === 0){
    return next(32);
  }
  else{
    var n = arguments[0];
    if(n > 0){
      if((n & n) == n){ //FIXME
        return (n * next(31)) >> 31; //FIXME
      }
      var bits;
      var val;
      do{
        bits = next(31);
        val = bits % n;
      }while(bits - val + (n-1) < 0)
      return val;
    }
    throw new NotStrictlyPositiveException(n); //FIXME
  }
};

BitsStreamGenerator.prototype.nextLong = function () {
  var high = (next(32)) << 32; //FIXME
  var low = (next(32)) & 4294967295; //FIXME
  return high | low; //FIXME
};

BitsStreamGenerator.prototype.clear = function(){
  this.nextGaussian = Number.Nan;
}
