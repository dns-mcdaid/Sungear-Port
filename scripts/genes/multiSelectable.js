/**
 * Interface to be implemented by all components that can participate
 * in a multiple select operation.
 *
 * @author crispy
 */

MultiSelectable.prototype = {
  /** Indicates a union multi-select operation */
  UNION : 0,
  /** Indicates an intersect multi-select operations */
  INTERSECT : 1,
  /**
   * Called at the end of a multi-select operation to get the component's selected genes.
   * @param operation describes the type of multi-select operation
   * @return the list of selected genes in this component that are part of the multi-select
   */

  // TODO: Something for the love of God.
  getMultiSelection : function(operation) {

  }
}
