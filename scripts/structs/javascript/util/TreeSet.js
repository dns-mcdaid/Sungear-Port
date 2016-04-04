
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html
 *
 * @extends { SortedSet}
 * @constructor
 * @export
 */
define(['SortedSet', 'Iterator'], function(SortedSet, Iterator){

var TreeSet = function() {
  /**
   * @type {Array}
   * @private
  */
  this.array_ = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
};

TreeSet.prototype = Object.create(SortedSet.prototype);
TreeSet.prototype.constructor = TreeSet;

/**
 * @override
 * @export
 */
TreeSet.prototype.contains = function(o) {
  for (var i = 0, len = this.array_.length; i < len; i++) {
    var e = this.array_[i];
    if (e['compareTo'](o) === 0) {
      return true;
    }
  }
  return false;
};


/**
 * @override
 * @export
 */
TreeSet.prototype.add = function(o) {
  if (this.contains(o)) {
    return false;
  }

  for (var i = 0, len = this.array_.length; i < len; i++) {
    var e = this.array_[i];
    if (e['compareTo'](o) === 1) {
      this.array_.splice(i, 0, o);
      return true;
    }
  }

  this.array_.push(o);

  return true;
};


/**
 * @override
 * @export
 */
TreeSet.prototype.addAll = function(c) {
  for (var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};


/**
 * @override
 * @export
 */
TreeSet.prototype.remove = function(e) {
  throw new OperationNotSupported();
};


/**
 * @override
 * @export
 */
TreeSet.prototype.size = function() {
  return this.array_.length;
};


/**
 * @override
 * @export
 */
 TreeSet.prototype.isEmpty = function() {
  return this.array_.length === 0;
};


/**
 * @override
 * @export
 */
 TreeSet.prototype.toArray = function() {
  var array = [];

  for (var i = 0, len = this.array_.length; i < len; i++) {
    array.push(this.array_[i]);
  }

  return array;
};


/**
 * @override
 * @export
 */
 TreeSet.prototype.iterator = function() {
  return new Iterator_(this);
};



/**
 * @extends {javascript.util.Iterator}
 * @param {javascript.util.TreeSet} treeSet
 * @constructor
 * @private
 * @export
 */
var Iterator_ = function(treeSet) {
  /**
   * @type {javascript.util.TreeSet}
   * @private
   */
  this.treeSet_ = treeSet;
  /**
   * @type {number}
   * @private
   */
  this.position_ = 0;
};


/**
 * @override
 * @export
 */
Iterator_.prototype.next = function() {
  if (this.position_ === this.treeSet_.size()) {
    throw new NoSuchElementException();
  }
  return this.treeSet_.array_[this.position_++];
};


/**
 * @override
 * @export
 */
Iterator_.prototype.hasNext = function() {
  if (this.position_ < this.treeSet_.size()) {
    return true;
  } else {
    return false;
  }
};


/**
 * @override
 * @export
 */
Iterator_.prototype.remove = function() {
  throw new OperationNotSupported();
};

return TreeSet;
});
