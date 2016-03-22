/**
 * Caveat emptor.
 * @author crispy
 * TODO document this type
 * TODO handle missing genes, terms, etc.
 */

function DataReader(attrib) {
  this.attrib = attrib;
  this.clear();
}

DataReader.prototype = {
  constructor:DataReader,

  clear:function() {
    this.allGenes = null;
    this.terms = null;
    this.roots = null;
    this.geneToGo = null;
    this.anchors = null;
    this.expGenes = null;
  },

  setAttrib:function(attrib) { this.attrib = attrib; },

  readAll:function(geneU, listU, hierU, assocU, sungearU) {
    this.readGenes(geneU);
    this.readTerms(listU);
    this.readHierarchy(hierU);
    this.readGeneToGo(assocU);
    this.readSungear(sungearU);
  },

  /*
   * TODO: URL shit.
   */
  readGenes:function(geneU) {
    this.allGenes = [];
    var inn =
  }
}
