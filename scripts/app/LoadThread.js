define(['visGene'], function(visGene){
  /**
   * Experiment and master data load thread to separate the load
   * operation from the main GUI thread.
   * @author crispy
   */
  LoadThread  = function(attrib, status) {
        this.attrib = attrib;
        this.status = status;
        this.ex = null;
        this.visGene = visGene.getInstance();
    };
  //inheritance with visGene
  LoadThread.prototype = Object.create(visGene.prototype);
  LoadThread.prototype.constructor = LoadThread;

  LoadThread.prototype.run = function() {
    try {
      this.visGene.src.set(this.attrib, this.status);
      document.getElementById(/*TODO: Something Here. */).innerHTML = "Preparing Sungear Display";
      this.visGene.geneList.setSource(this.visGene.src);
      this.visGene.geneList.update();
      document.getElementById(/*TODO: Something Here. */).innerHTML = "Done";

    } catch (e) {
      this.ex = e;
      console.log(e);
    }
  };
  LoadThread.prototype.getException = function() {
    return ex;
  };
  return LoadThread;
});
