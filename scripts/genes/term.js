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
 * is an optimization for the calculation of z-scores.  Although
 * it's called the stored count, it's only used to represent the size of the intersection
 * of {@link #allGenes} with the active set.  This count is used for calculating z-scores
 * after Narrow operations, and determining the fraction of genes selected for this term.
 * This value is recalculated every time a narrow is performed, using the
 * functions {@link #resetStoredCount()} and {@link #updateStoredCount(SortedSet)}.  This
 * much more efficient than determining the intersection size dynamically each time it is
 * needed, primarily because the option to sort by z-score is provided in the interface,
 * which requires that all z-scores be available after a narrow for the sorting
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
function Term(id, name){
 /** GO term ID */
 this.id = id;
 /** GO term name */
 this.name = name;
 /** z-score calculation term */
 var p_t = 0;
 /** This term's parent nodes */
 var parents = [];
 /** This term's child nodes */
 var child = [];
 /** The genes associated strictly with this node */
 var localGenes = [];
 /** All genes associated with this node and its descendents */
 var allGenes = null;
 /** Denotes whether any genes are associated with this term in the current experiment set */
 var active = false;
 /** The number of genes in {@link #allGenes} represented in some set, usually the active set */
 var storedCount = -1;
 var selectedState = STATE_UNKNOWN;
 /** z-score calculation term */
 var stdev = 0;
 /** z-score calculation term */
 var zScore = 0;
}

/** Selected state flag: state undetermined */
Term.STATE_UNKNOWN = 0;
/** Selected state flag: term selected (term or descendent has intersection with current selected set) */
Term.STATE_SELECTED = 1;
/** Selected state flag: term not selected */
Term.STATE_UNSELECTED = 2;

Term.prototype = {
  constructor: Term,
  cleanup:function(){
    children = [];
    parents = [];
    allGenes = [];
    localGenes = [];
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
    children.push(c);
  },
  getChildren:function(){
    return children;
  },
  addParent:function(p){
    parents.push(p);
  },
  getParents:function(){
    return parents;
  },
  addGene:function(g){
    localGenes.push(g);
  },
  isRoot:function(){
    return parents.length < 1;
  },
  setActive:function(b){
    active = b;
  },
  isActive:function(){
    return active;
  },
  getAllGenes:function(){
    return allGenes;
  },
  getId:function(){
    return id;
  },
  getName:function(){
    return name;
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
    if(allGenes == null){
      return 0;
    } else {
      var size = 0;
      // Looking for intersection of two arrays.
      for(var i = 0; i < iSet.length; i++){
        if (allGenes.indexOf(iSet[i]) >= 0){
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
    var str1 = name.toLowerCase();
    var str2 = t.name.toLowerCase();
    return str1.localeCompare(str2);
  },
  toString:function(){
    //var v = (isFinite(zScore) || isNaN(zScore)) ? zScore.toString() :
    var v = zScore.toString();
    return "(" + v + ";" + getStoredCount() + ")" + name;
  },
  /**
   * Gives this term's z-score.
   * @return the current z-score value
   */
  getScore:function(){
    return zScore;
  },
  /**
   * Returns the stored count of genes at this node
   * and its descendents as calculated by
   * {@link #updateStoredCount(SortedSet)}.  Usually the number
   * of active genes.
   * @return the stored gene count
   */
  getStoredCount:function(){
    return storedCount;
  },
  /**
   * Must be called for every term before {@link #updateStoredCount(SortedSet)}
   * is called for any term.
   */
  resetStoredCount:function(){
    storedCount = -1;
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
    // TODO: Implement this function.
  },
  /**
   * Must be called for every term before calling
   * {@link #findUnion(SortedSet)} on any term
   * to reset set unions before updating.
   */
  initUnion:function(){
    allGenes = null;
  },
  /**
   * Recursively finds the union of the genes represented
   * by this GO term and those represented by all of its descendents,
   * intersected with the given set (usually the current experiment gene set).
   * Called when the active set is changed.
   * Call {@link #initUnion} on all nodes before updating any nodes.
   */
  findUnion:function(global){
    if(allGenes == null){
      allGenes = [];
      for(var i = 0; i < localGenes.length; i++){
        allGenes.push(localGenes[i]);
      }
      // TODO: Implement recursive part of this function.
    }
  },
  /**
   * Updates this term's z-score.
   * @param total number of represented genes
   */
  updateScore:function(total){
    zScore = calcScore(getStoredCount(), total);
  },
  /**
   * Calculates the z-score of this term.
   * @param count number of represented genes
   * @param total total number of genes
   * @return the z-score
   */
  clacScore:function(count, total){
    var f_t = count / total;
    // 100% of genes selected for term w/ 100% of genes associated ==> z-score = 0
    return(f_t - p_t == 0 && stdev == 0) ? 0 : (f_t - p_t) * Math.sqrt(total) / stdev;
  },
  /**
   * Must be called for every term before {@link #updateSelectedState(SortedSet)}
   * is called for any term.
   */
  initSelectedState:function(){
    selectedState = STATE_UNKNOWN;
  },
  /**
   * Recursively determines if any of the genes associated with
   * this term or its children intersect with the passed set
   * (usually the current selected set).  Call {@link #initSelectedState()}
   * on all terms before calling this on any term.
   * @param s the set to intersect with
   */
  updateSelectedState:function(s){

  },
  /**
   * Returns the selected state of this node as determined by
   * {@link #updateSelectedState(SortedSet)}.
   * @return the current selected state
   */
  getSelectedState:function(){
    return selectedState;
  }
}
