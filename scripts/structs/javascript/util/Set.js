/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Set.html
 *
 * @extends {javascript.util.Collection}
 * @constructor
 * @export
 */

define(['Collection'], function(Collection){


var Set = function() {};


/**
 * Returns true if this set contains the specified element. More formally,
 * returns true if and only if this set contains an element e such that (o==null ?
 * e==null : o.equals(e)).
 * @param {Object} e
 * @return {boolean}
 */
Set.prototype.contains = function(){};

Set.prototype = Object.create(Collection.prototype);
Set.prototype.constructor = Set;

return Set;
});
