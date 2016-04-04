
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Iterator.html
 * @constructor
 * @export
 */
define(function(){

var Iterator = function() {};


/**
 * Returns true if the iteration has more elements.
 * @return {boolean}
 * @export
 */
Iterator.prototype.hasNext = function(){};


/**
 * Returns the next element in the iteration.
 * @return {Object}
 * @export
 */
Iterator.prototype.next = function(){};


/**
 * Removes from the underlying collection the last element returned by the
 * iterator (optional operation).
 * @export
 */
Iterator.prototype.remove = function(){};

return Iterator; 
});
