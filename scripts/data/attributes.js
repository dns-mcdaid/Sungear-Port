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
define(['HashMap'],function(HashMap){
  /**
   * Constructs a new object with attributes derived from parsing the query string.
   * @param queryString the query string, usually the one used to open Sungear
   */
  function Attributes(queryString) {
    this.attrib = new HashMap();

    if(arguments.length > 0){ //i.e. if there's a queryString passed
      var nvp = queryString.split("\\&");
      for(var i = 0; i < nvp.length; i++){
        s = trimAll(nvp[i.split("=")]);
        var v = (s.length > 1) ? s[1] : "";
        try {
            this.attrib.put(s[0], v);
            // Be aware of UTF-8 Encoding
        } catch(e) {
            console.log("warning: unable to parse query string NVP, ignoring (error follows): " + s[0] + "=" + v);
        }
      }
    }
  }

  function trimAll(s){
    r = [];
    for(var i = 0; i < s.length; i++){
        r[i] = s[i].trim();
    }
    return r;
  }

  Attributes.prototype = {
    constructor : Attributes,


    parseAttributes : function(file) {
      //TODO: Loop through some HTML elements and populate array with attributes specified in header of a file
      var buf = []; //read in data
      var line = buf.toString().split("\\n");
      for(var i = 0; i < line.length; i++){
        try {
            if(line[i].startsWith("#"))
                continue;
            var idx = line[i].indexOf(':');
            if(idx == -1){
                throw new Error("attribute error: improper format at line " + (i+1) + ": missing \":\"", line[i]);
            }
            var n = line[i].substring(0, idx).trim(), v = line[i].substring(idx+1).trim();
            if(this.attrib.containsKey(n)){
                throw new Error("attribute warning: ignoring duplicate key (" + n + ") at line " + (i+1), line[i]);
            }
            this.attrib.put(n, v); //place in hashmap
        } catch(e) {
            e.printStackTrace();
          }
      }
    },

    put : function(key, value) {  return this.attrib.put(key, value); },

    remove : function(key) { return this.attrib.remove(key); },

    get : function(key, defaultValue) {
      var o = this.attrib.get(key);
      if(arguments.length === 1){
        return o;
      }else{
        return (o === null ? defaultValue : o);
      }
    },

    getKeys : function() { return this.attrib.keySet(); },
    toString : function() { return this.attrib.toString(); }
  };


  return Attributes;
});
