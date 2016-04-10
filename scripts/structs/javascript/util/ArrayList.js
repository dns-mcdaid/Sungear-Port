define(['Collection', 'IndexOutOfBoundsException', 'Iterator_', 'NoSuchElementException', 'OperationNotSupported'],
function(Collection, IndexOutOfBoundsException, Iterator_, NoSuchElementException, OperationNotSupported){
  function ArrayList(){
      this.array_ = [];
      if (arguments[0] instanceof Collection) {
        this.addAll(arguments[0]);
      }
    }

  ArrayList.prototype.add = function(e) {
      this.array_.push(e);
      return true;
    };


  ArrayList.prototype.addAll = function(c) {
    for (var i = c.iterator(); i.hasNext();) {
      this.add(i.next());
    }
    return true;
  };


  /**
   * @override
   * @export
   */
  ArrayList.prototype.set = function(index, element) {
    var oldElement = this.array_[index];
    this.array_[index] = element;
    return oldElement;
  };



  /**
   * @override
   * @export
   */
  ArrayList.prototype.get = function(index) {
    if (index < 0 || index >= this.size()) {
      throw new IndexOutOfBoundsException();
    }

    return this.array_[index];
  };


  /**
   * @override
   * @export
   */
  ArrayList.prototype.isEmpty = function() {
    return this.array_.length === 0;
  };


  /**
   * @override
   * @export
   */
  ArrayList.prototype.size = function() {
    return this.array_.length;
  };


  /**
   * @override
   * @export
   */
  ArrayList.prototype.toArray = function() {
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
  ArrayList.prototype.remove = function(o) {
    var found = false;

    for (var i = 0, len = this.array_.length; i < len; i++) {
      if (this.array_[i] === o) {
        this.array_.splice(i, 1);
        found = true;
        break;
      }
    }

    return found;
  };

  return ArrayList;
});
