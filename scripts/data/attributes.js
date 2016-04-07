/**
 * Created on Jun 16, 2005
 * Copyright Chris Poultney 2004.
 * Updated by Rajah_Bimmy 2016.
 *
 * A simple Hashtable<String, Object> wrapper for named attributes associated with
 * an experiment.  The locations of required Sungear files are stored here, as well
 * as the current species.  Other attributes are stored here as well; these attributes
 * are stored, for example, by parsing the URL query string in {@link app.VisGene}.
 * They can also be included in the header portion of data files; each attribute is
 * specified on one line enclosed in braces, as below:<br>
 * <code>{ name = value }</code><br>
 * See <a href="http://virtualplant.bio.nyu.edu/public/docs/players.txt">the public documentation</a>
 * for an example.
 * A non-exhaustive list of known attributes follows:
 * <ul>
 * <li>itemsLabel: the item type of the current data (e.g., gene, player); replaces the generic &quot;Items&quot;
 * label of the item list window</li>
 * <li>categoriesLabel: the category type of the current hierarchy (e.g., GO Term, Team); replaces the generic
 * &quot;Category&quot; label of the hierarchy window</li>
 * <li>data_url: the URL from which an initial data file should be loaded (null by default)</li>
 * <li>export_url: the URL to which gene lists are exported using the Export button;
 * is null by default, and the export button will be inactive if this is null</li>
 * </ul>
 * @author crispy
 */
define(['dataReader'],function(DataReader){
  var methods = {
     Attributes: Attributes
   };
  /**
   * Constructs a new object with attributes derived from parsing the query string.
   * @param queryString the query string, usually the one used to open Sungear
   */
  function Attributes(queryString) {
    this.attrib = [];
    var nvp = DataReader.trimAll(queryString.split("\\&"));
    for (var i = 0; i < nvp.length; i++) {
      // DataReader??
      var s = nvp[i].split("=");
      var v = (s.length > 1) ? s[1] : "";
      try {
          attrib.put(s[0], v);
          // Be aware of UTF-8 Encoding
      } catch(e) {
          console.log("warning: unable to parse query string NVP, ignoring (error follows): " + s[0] + "=" + v);
      }
    }
  }

  Attributes.prototype = {
    constructor : Attributes,

    /**
     * Parses the header of a file and adds any attributes specified there.
     * @param file the file to parse
     */
    parseAttributes : function(file) {
      // read javascript file i/o
    },
    /**
     * Adds a new key/attribute pair.
     * @param key the new key
     * @param value the associated attribute
     * @return the old attribute associated with that key, or null if none
     */
    put : function(key, value) { return this.attrib[key] = value; },
    /**
     * Removes a key/attribute pair.
     * @param key the key for the key/attribute pair to remove.
     * @return the attribute associated with the key, or null if none
     * TODO: REMOVE KEY
     */
    remove : function(key) { return this.attrib[key] = null; },
    /**
     * Convenience method to get a attribute or, if the attribute is null,
     * a default value (saves lots of code repetition).
     * @param key the key whose associated attribute is desired
     * @param defaultValue the default value to return if the key is not mapped
     * @return the mapped attribute, or the default value if no mapped attribute
     */
    get : function(key, defaultValue) {
      if (get.length < 2) {
        return this.attrib[key];
      } else {
        var o = this.attrib[key];
        return (o == null ? defaultValue : o);
      }
    },
    /**
     * Returns all the attribute keys.
     * @return the set of keys
     * TODO: How the fuck do I return keys.
     */
    getKeys : function() { return this.attrib.keys; },
    /** Wrapper for {@link Hashtable#toString()} */
    toString : function() { return this.attrib.toString(); }
  }
});
