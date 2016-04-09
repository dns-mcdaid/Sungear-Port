/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedSet.html
 *
 * @extends {javascript.util.Set}
 * @constructor
 * @export
 */
define(['Set'], function(Set){

SortedSet = function() {};

SortedSet.prototype = Object.create(Set.prototype);
SortedSet.prototype.constructor = SortedSet;

return SortedSet;
});
