/**
 * Represents a term in the GO hierarchy.  This class is a little more complicated
 * than one might expect because of the set operations required to support the
 * effecient calculation of z-scores and selection.  Support functions provide
 * recursive set union and intersection size operations.
 *
 * Essentially, {@link #initUnion()} and {@link #findUnion(SortedSet)} are called
 * whenever a new experiment is loaded to update {@link #allGenes}.  From this point
 * on, the number of genes at this node and its descendents can be found by the
 * intersection of {@link #allGenes} with the current selected or active set as
 * appropriate.
 *
 * {@link #storedCount}, which is returned by {@link #getStoredCount()},
 * is an optimization for the calculation of Hypergeometric-Distribution.  Although
 * it's called the stored count, it's only used to represent the size of the intersection
 * of {@link #allGenes} with the active set.  This count is used for the Instantiation of
 * HypergeometricDistribution class after Narrow operations, and determining the fraction
 * of genes selected for this term.
 * This value is recalculated every time a narrow is performed, using the
 * functions {@link #resetStoredCount()} and {@link #updateStoredCount(SortedSet)}.  This
 * much more efficient than determining the intersection size dynamically each time it is
 * needed, primarily because the option to sort by Hyper-Geo Distribution is provided in the interface,
 * which requires that all the probabilities be available after a narrow for the sorting
 * procedure.
 *
 * {@link #getIntersectCount(SortedSet)} is the dynamic version of {@link #getStoredCount()}
 * in that it dynamically determines the size of the intersection set.  It is intended for
 * use on very small sets of terms, such as will fit on one screen in a list component.
 *
 * {@link #selectedState}, which is returned by {@link #getSelectedState()}, is
 * a more effecient way to see if a term (or any of its children) has genes in the
 * selected set.  It is recalculated by calling {@link #initSelectedState()} and
 * {@link #updateSelectedState(SortedSet)}, which is usually done by {@link gui.GoTerm}
 * when the selected set changes while the collapse GO term list option is selected.
 *
 * @author crispy
 * @modifier Rajah_Bimmy
 * Copyright Chris Poultney 2004.
 */

/**
* Constructs a new GO term.
* @param id the GO term ID
* @param name the GO term name
*/

// var HypergeometricDistribution = require('../../hyperGeo/distribution/HypergeometricDistribution');

function Term(id, name){
 /** GO term ID */
 this.id = id;
 /** GO term name */
 this.name = name;
 /** z-score calculation term */
 this.p_t = 0;
 /** This term's parent nodes */
 this.parents = [];
 /** This term's child nodes */
 this.children = [];
 /** The genes associated strictly with this node */
 this.localGenes = [];
 /** All genes associated with this node and its descendents */
 this.allGenes = [];
 /** Denotes whether any genes are associated with this term in the current experiment set */
 this.active = false;
 this.selectedState = Term.STATE_UNKNOWN;
 /** The number of genes in {@link #allGenes} represented in some set, usually the active set */
 this.storedCount = -1;
/** Total Number of genes in the Genome */
 this.Total = -1;
}

/** HyperGeo Distribution H */
var H;
/** the value of the probability */
var Hyp;

/** Selected state flag: state undetermined */
Term.STATE_UNKNOWN = 0;
/** Selected state flag: term selected (term or descendent has intersection with current selected set) */
Term.STATE_SELECTED = 1;
/** Selected state flag: term not selected */
Term.STATE_UNSELECTED = 2;

Term.prototype = {
  constructor: Term,
  cleanup:function(){
    this.children = [];
    this.parents = [];
    this.allGenes = [];
    this.localGenes = [];
  },
  /**
   * Sets the ratio of the number of genes associated with this term to
   * the total number of genes in an experiment set.
   * @param p_t the fraction of terms represented by this term
   */
  setRatio:function(p_t){
    this.p_t = p_t;
    stdev = Math.sqrt(p_t * (1 - p_t));
  },
  addChild:function(c){
    this.children.push(c);
  },
  getChildren:function(){
    return this.children;
  },
  addParent:function(p){
    this.parents.push(p);
  },
  getParents:function(){
    return this.parents;
  },
  addGene:function(g){
    this.localGenes.push(g);
    this.allGenes.push(g);
  },
  isRoot:function(){
    return this.parents.length < 1;
  },
  setActive:function(b){
    this.active = b;
  },
  isActive:function(){
    return this.active;
  },
  getAllGenes:function(){
    return this.allGenes;
  },
  getId:function(){
    return this.id;
  },
  getName:function(){
    return this.name;
  },
  /**
   * Calculates the number of genes at this node and its descendents
   * that are in the intersection with the given set (usually the current
   * selected set). Unlike {@link #getStoredCount()}, this number
   * is calculated every time the function is called and not stored.
   * It is intended for use in a GUI where a small number of terms
   * are displayed.  Beware of calling it for every term!!
   * @return the number of selected genes
   */
  getIntersectCount:function(iSet){
    if(this.allGenes === null){
      return 0;
    } else {
      var size = 0;
      // Looking for intersection of two arrays.
      for(var i = 0; i < iSet.length; i++){
        if (this.allGenes.indexOf(iSet[i]) >= 0){
          size++;
        }
      }
      return size;
    }
  },
  /**
   * Yields the default sort order, case-insensitive by term name.
   */
  compare:function(t){
    var str1 = this.name.toLowerCase();
    var str2 = t.name.toLowerCase();
    return str1.localeCompare(str2);
  },
  toString:function(){
    //var v = (isFinite(zScore) || isNaN(zScore)) ? zScore.toString() :
    var Dig = 100000;
    Hyp = (Hyp * Dig)/Dig;
    return "(" + Hyp + " ; " + this.getStoredCount() + " ) " + this.getName();
  },
  /**
   * Gives this term's HyperGeometric Distribution.
   * @return the current the upperCumulativeProbability value
   */
   getHyp:function(){
     return Hyp;
   },
  /**
   * Returns the stored count of genes at this node
   * and its descendents as calculated by
   * {@link #updateStoredCount(SortedSet)}.  Usually the number
   * of active genes.
   * @return the stored gene count
   */
  getStoredCount:function(){
    return this.storedCount;
  },
  /**
   * Must be called for every term before {@link #updateStoredCount(SortedSet)}
   * is called for any term.
   */
  resetStoredCount:function(){
    this.storedCount = -1;
  },
  /**
   * Recursively updates the size of the intersection
   * between the given set (usually the active set)
   * set and the set of all genes at this node (including
   * descendents).  Called by {@link gui.GoTerm} when the
   * active set is updated.
   * Call {@link #resetStoredCount()} on all nodes before
   * updating any nodes.
   * @param aSet the set to intersect with
   */
  updateStoredCount:function(aSet){
    if(this.storedCount === -1){
      var counter = 0;
      while(counter < this.children.length -1){
        this.children[counter].updateStoredCount(aSet);
        counter++;
      }
      var s = [];
      for(var i = 0; i < aSet.length; i++){
        if(aSet.indexOf(s[i]) === -1){
          s.splice(i, 1);
        }
      }

      this.storedCount = s.length;
      this.updateHyp(aSet.length);

    }
  },
  /**
   * Must be called for every term before calling
   * {@link #findUnion(SortedSet)} on any term
   * to reset set unions before updating.
   */
  initUnion:function(){
    this.allGenes = null;
  },
  /**
   * Recursively finds the union of the genes represented
   * by this GO term and those represented by all of its descendents,
   * intersected with the given set (usually the current experiment gene set).
   * Called when the active set is changed.
   * Call {@link #initUnion} on all nodes before updating any nodes.
   */
  findUnion:function(global){
    if(this.allGenes === null){
      this.allGenes = [];
      for(var i = 0; i < this.localGenes.length; i++){
        this.allGenes.push(this.localGenes[i]);
      }
      //mimicking an iterator
      var counter = 0;
      while(counter < this.children.length-1){
        var ch = this.children[counter];
        ch.findUnion(global);
        for(i = 0; i < ch.allGenes.length; i++){
          this.allGenes.push(ch.allGenes[i]);
        }
        counter++;
      }

      //remove all genes not in global collection from allGenes
      for(i = 0; i < global.length; i++){
        if(global.indexOf(this.allGenes[i]) === -1){
          this.allGenes.splice(i, 1);
        }
      }

    }
  },
  /**
   * Updates this term's Probability.
   * @param total number of represented genes
   */
   updateHyp:function(Q){
     Hyp = this.calcHyp(this.getStoredCount(), Q);
   },
   /**
    * set the Total Number of all Genes in the Genome.
    * @param all genes in the genome
    */
   setTotal:function(t){
     this.Total = t;
   },
   /**
    * return the Total Number of Genes in the Genome
    * @param all genes in the Genome
    */
   getTotal:function(){
     return this.Total;
   },

   calcHyp:function(Q_t, Q){
     var A = this.getTotal();
     var A_t = this.p_t * A;
     H = new HypergeometricDistribution(A, A_t, Q);
     return H.upperCumulativeProbability(Q_t);
   },

  /**
   * Must be called for every term before {@link #updateSelectedState(SortedSet)}
   * is called for any term.
   */
  initSelectedState:function(){
    this.selectedState = Term.STATE_UNKNOWN;
  },
  /**
   * Recursively determines if any of the genes associated with
   * this term or its children intersect with the passed set
   * (usually the current selected set).  Call {@link #initSelectedState()}
   * on all terms before calling this on any term.
   * @param s the set to intersect with
   */
  updateSelectedState:function(s){
    if(!this.active){
      this.selectedState = Term.STATE_UNSELECTED;
    } else{
      for(var i = 0; i < this.children.length; i++){
        var item = this.children[i];
        if(item.selectedState === Term.STATE_UNKNOWN && item.active){
          item.updateSelectedState(s);
        }
        if(item.selectedState === Term.STATE_SELECTED){
          this.selectedState = Term.STATE_SELECTED;
        }
      }

      if(this.selectedState === Term.STATE_UNKNOWN){
        var x = [];
        for(i = 0; i < this.allGenes.length; i++){
          x.push(this.allGenes[i]);
        }

        for(i = 0; i < s.length; i++){
          if(s.indexOf(x[i]) === -1){
            x.splice(i, 1);
          }
        }
        this.selectedState = x.length === 0 ? Term.STATE_UNSELECTED : Term.STATE_SELECTED;

      }
    }
  },
  /**
   * Returns the selected state of this node as determined by
   * {@link #updateSelectedState(SortedSet)}.
   * @return the current selected state
   */
  getSelectedState:function(){
    return this.selectedState;
  }
};
//module.exports = Term;
