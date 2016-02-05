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
  var oriGenes = [];
  var effectiveGenes = [];
  var sortedGenes = null;

  // UNSURE ABOUT THIS NEXT LINE:
  var selectedGenes = null;
}

AnchorList.prototype = {
  constructor: AnchorList,

  getName:function(){
    return name;
  },
  getOriGeneList:function(){
    return oriGenes;
  },

  /**
   *  test whether a gene is in the original list by its name
   */
  contains:function(geneID){
    // here -99.0 is a random number, we don't care the gene's value
    return oriGenes.indexOf(new Gene(geneID, "-99.0F")) > -1;
  },

  /**
   * ensure same gene will not be added twice
   */
  addGene:function(g){
    if(!(oriGenes.indexOf(g) > -1)){
      oriGenes.push(g);
    }
  },
  /**

   *  add a gene to the effective genes list
   */
  addEffectiveGene:function(g){
    effectiveGenes.push(g);
  },

  /**
   * Establish effective genes list with new values.
   */
  setEffectiveGenes:function(al){
    effectiveGenes = al;
  },
  getEffectiveGenes:function(){
    return effectiveGenes;
  },

  /**
   *  get the number genes in the intersection of SunGear genes
   *  and the ones from geneLights input
   */
  sizeOfEffectiveGenes:function(){
    return effectiveGenes.length;
  },

  /**
   * Sort the effective genes by their expression value ascendingly
   *
   * @return sorted effective genes.  null if there is no effectiveGenes
   */
  sortEffectiveGenes:function(){
    if(effectiveGenes.length != 0){
      sortedGenes = this.effectiveGenes.sort();
      return sortedGenes;
    } else {
      return null;
    }
  },

  /* should only be called after sortEffectiveGenes() is invoked */
  getSortedGenes:function(){
    return sortedGenes;
  },

  /**
   *  get the minimal expression value of the effective genes
   */
  getMinValue:function(){
    if(sortedGenes != null){
      var minGene = this.sortedGenes[0];
      return minGene.getValue;
    } else {
      return "-100.0f";
    }
  },

  /**
   *  get the maximal expression value of the effective genes
   */
  getMaxValue:function(){
    if(sortedGenes != null){
      var maxGene = sortedGenes[this.sortedGenes.length - 1];
      return maxGene.getValue;
    } else {
      return "100.0F";
    }
  },

  /**
   *  get the number of genes in this anchor
   */
  size:function(){
    return oriGenes.length;
  },
  getSelectedGenes:function(){
    return selectedGenes;
  }
}
