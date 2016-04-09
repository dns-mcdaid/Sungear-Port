define(['SortedSet', 'Iterator_', 'Collection', 'NoSuchElementException', 'OperationNotSupported'],
function(SortedSet, Iterator_, Collection, NoSuchElementException, OperationNotSupported){

   TreeSet = function() {
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


return TreeSet;

});
