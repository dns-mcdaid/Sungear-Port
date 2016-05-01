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
      if (e === o) {
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
      if (e === o) {
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
    if(c.constructor === Array){
      for(var i = 0; i < c.length; i++){
        this.add(c[i]);
      }
    }else{
      for (var i = c.iterator(); i.hasNext();) {
        this.add(i.next());
      }
    }
    return true;
  };

  TreeSet.prototype.retainAll = function(c){
    if(c.constructor === Array){
      for(var i = 0; i < c.length; i++){
        if(this.contains(c[i])){
          this.remove(c[i]);
        }
      }
    }else{
      for (var i = c.iterator(); i.hasNext();) {
        if(this.contains(i.next())){
          this.remove(i.next());
        }
      }
    }
  };

  TreeSet.prototype.clear = function(){
    this.array_ =  [];
  };


  /**
   * @override
   * @export
   */
  TreeSet.prototype.remove = function(o) {
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
