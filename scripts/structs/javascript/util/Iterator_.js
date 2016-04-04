
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Iterator.html
 * @constructor
 * @export
 */
define(['NoSuchElementException', 'OperationNotSupported'],
function(NoSuchElementException,OperationNotSupported){

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
});
