define(function(){
IndexOutOfBoundsException = function(message) {
  this.message = message || '';
};

IndexOutOfBoundsException.prototype.name = 'IndexOutOfBoundsException';
return IndexOutOfBoundsException;
});
