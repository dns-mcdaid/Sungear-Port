
/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @export
 */
 define(function(){

var NoSuchElementException = function(message) {
  this.message = message || '';
};

/**
 * @type {string}
 */
NoSuchElementException.prototype.name = 'NoSuchElementException';

return NoSuchElementException;
 });
