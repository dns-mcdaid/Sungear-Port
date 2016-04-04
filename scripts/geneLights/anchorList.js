/*
 *  Based on AnchorList.java
 *
 *  Created on July 09, 2005
 *  Updated on February 04, 2016
 *
 *  Copyright  Delin Yang.
 *  Modified by Dennis McDaid.
 */

 /**
  *  An object that contains all genes for an anchor, the name of the
  *  anchor. The genes of the anchor can be sorted by their expression value.
  */
function AnchorList(name){
  this.name = name;
  this.oriGenes = [];
  this.effectiveGenes = [];
  this.sortedGenes = null;

  // UNSURE ABOUT THIS NEXT LINE:
  this.selectedGenes = null;
}

AnchorList.prototype = {
  constructor: AnchorList,

  getName:function(){
    return this.name;
  },
  getOriGeneList:function(){
    return this.oriGenes;
  },

  /**
   *  test whether a gene is in the original list by its name
   */
  contains:function(gene){
    // here -99.0 is a random number, we don't care the gene's value
    return this.oriGenes.indexOf(gene) > -1;
  },

  /**
   * ensure same gene will not be added twice
   */
  addGene:function(g){
    var test = [];
    test = this.oriGenes.filter(function(element){
      return element.equals(g);
    });
    if(test.length === 0){
      this.oriGenes.push(g);
    }
  },
  /**

   *  add a gene to the effective genes list
   */
  addEffectiveGene:function(g){
    this.effectiveGenes.push(g);
  },

  /**
   * Establish effective genes list with new values.
   */
  setEffectiveGenes:function(al){
    this.effectiveGenes = al;
  },
  getEffectiveGenes:function(){
    return this.effectiveGenes;
  },

  /**
   *  get the number genes in the intersection of SunGear genes
   *  and the ones from geneLights input
   */
  sizeOfEffectiveGenes:function(){
    return this.effectiveGenes.length;
  },

  /**
   * Sort the effective genes by their expression value ascendingly
   *
   * @return sorted effective genes.  null if there is no effectiveGenes
   */
  sortEffectiveGenes:function(){
    if(this.effectiveGenes.length !== 0){
      var newSortedGenes = this.effectiveGenes.slice();
      this.sortedGenes = newSortedGenes.sort(function(a, b){
        return a.compare(b);
      });
    }
  },

  /* should only be called after sortEffectiveGenes() is invoked */
  getSortedGenes:function(){
    return this.sortedGenes;
  },

  /**
   *  get the minimal expression value of the effective genes
   */
  getMinValue:function(){
    if(this.sortedGenes !== null){
      var minGene = this.sortedGenes[0];
      return minGene.getValue();
    } else {
      return -100;
    }
  },

  /**
   *  get the maximal expression value of the effective genes
   */
  getMaxValue:function(){
    if(this.sortedGenes !== null){
      var maxGene = this.sortedGenes[this.sortedGenes.length - 1];
      return maxGene.getValue();
    } else {
      return 100.0;
    }
  },

  /**
   *  get the number of genes in this anchor
   */
  size:function(){
    return this.oriGenes.length;
  },
  getSelectedGenes:function(){
    return this.selectedGenes;
  }
};
// module.exports = AnchorList;
