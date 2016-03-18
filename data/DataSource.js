/*
Radhika Mattoo, October 2015 N.Y.
Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code
*/

//uses functions from java.io and java.net imports

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
    /** Data directory for relative file locations */
    var dataDir;
    /** Reader object that performs actual file parsing */
    //JAVASCRIPT FILE INPUT?
    var reader = new FileReader();
    // * Holds arbitrary information about the current experiment
    // /* ilyas */
    //Attributes is basically a map for making sure basic attributes are set (file name, species)
    var attrib = {};

    function DataSource(dataDir){
    	this.dataDir = dataDir;
    	geneSrc = glSrc = ghSrc = ggSrc = sunSrc = null;
    	reader = null;
    	attrib = null;
    }

    function cleanup(){
    	reader = null;
    	attrib = null;
    }

    function checkAttributes(attrib, base){ //throws IO, Parse exceptions
    	if(attrib["sungearU"] === null){
    		console.log("Sungear file not specified.");
    	}


    }

    function setAttributes (attrib, base){
    	checkAttributes(attrib, base);
    	this.attrib = attrib;
    }
