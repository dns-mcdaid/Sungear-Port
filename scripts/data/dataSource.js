/*
Radhika Mattoo, October 2015 N.Y.
Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code
*/

//uses functions from java.io and java.net imports
define(['attributes'], function(Attribute){
  	/** Default name of gene description file if none is given */
    var GENE_DEFAULT = "annotation.txt.gz";
    /** Default name of GO annotation file if none is given */
    var LIST_DEFAULT = "go-annot.txt.gz";
    /** Default name of GO hierarchy file if none is given */
    var HIER_DEFAULT = "go-hier.txt.gz";
    /** Default name of GO-to-gene association file if none is given */
    var ASSOC_DEFAULT = "go2gene.txt.gz";
    /** Location of gene list file */
    var geneSrc;
    /** Location of GO term list file */
    var glSrc;
    /** Location of GO term hierarchy file */
    var ghSrc;
    /** Location of GO-to-gene association file */
    var ggSrc;
    /** Location of Sungear experimentfile */
    var sunSrc;
    /** Data directory for relative file loc
    ations */
    var dataDir;
    /** Reader object that performs actual file parsing */
    //JAVASCRIPT FILE INPUT?
    // var reader = new FileReader();
    // * Holds arbitrary information about the current experiment
    // /* ilyas */
    //Attributes is basically a map for making sure basic attributes are set (file name, species)

    function DataSource(dataDir){
    	this.dataDir = dataDir;
    	geneSrc = glSrc = ghSrc = ggSrc = sunSrc = null;
    	attrib = new Attribute();
    }

    function cleanup(){
    	reader = null;
    	attrib = null;
    }

    function checkAttributes(attrib, base){ //throws IO, Parse exceptions
    	// if(attrib.get("sungearU") === null){
    	// 	console.log("Sungear file not specified.");
    	// }

      //TODO: Loop through some HTML elements for "sungearU", species, and attribute data
      //Below are the attributes and gene data within the species file (assuming we're using gene data/a species file exists) to put into attrib HashMap
      //atrrib.put("sungearU", sungearUFileData)
      //attrib.put("species", speciesFileData)
      //attrib.put("speciesU", speciesUFileData)
      //attrib.put("itemsLabel", "genes");
      //attrib.put("categoriesLabel", "GO Terms");
      //attrib.put("geneU", (sp != null) ? sp.geneU : new URL(base, GENE_DEFAULT));
      //attrib.put("listU", (sp != null) ? sp.listU : new URL(base, LIST_DEFAULT));
      //attrib.put("hierU", (sp != null) ? sp.hierU : new URL(base, HIER_DEFAULT));
      //attrib.put("assocU", (sp != null) ? sp.assocU : new URL(base, ASSOC_DEFAULT));
    }

    function setAttributes (attrib, base){
    	checkAttributes(attrib, base);
    	this.attrib = attrib;
    }

    //TODO: Implement some sort of GET method for attrib, since we're not using DataReader

//I'm assuming you have to refresh the page/restart the program to change genes/files
//Otherwise, just implement the set function from DataSource.java
  return DataSource;
});
