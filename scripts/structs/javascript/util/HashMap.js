define(['ArrayList'], function(ArrayList){
  function HashMap() {
    this.object_ = {};
  }

  HashMap.prototype.get = function(key) {
    return this.object_[key] || null;
  };

  HashMap.prototype.put = function(key, value) {
    this.object_[key] = value;
    return value;
  };

  HashMap.prototype.values = function() {
    var arrayList = new ArrayList();
    for (var key in this.object_) {
      if (this.object_.hasOwnProperty(key)) {
        arrayList.add(this.object_[key]);
      }
    }
    return arrayList;
  };

  HashMap.prototype.size = function() {
    return this.values().size();
  };

  HashMap.prototype.keySet = function(){
    return Object.keys(this.object_);
  };

  HashMap.prototype.toString = function(){
    return this.object_.toString();
  };
  return HashMap;
});
