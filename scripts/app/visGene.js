define([
  "attributes","dataReader","dataSource","externalConnection","parseException",
  "vpConnection","genesGene","geneList","collapsibleList","controls",
  "experimentList","exportList","goTerm","sungear","waitcursor"
],function(
  attributes,dataReader,dataSource,externalConnection,parseException,
  vpConnection,genesGene,geneList,collapsibleList,controls,
  experimentList,exportList,goTerm,sungear,waitcursor){
    /**
     * Top-level GUI component for Sungear.  Can be instantiated
     * as an applet or an application.
     *
     * @author crispy
     */
    var VERSION = "0.0.2";
    var notice = "Copyright Chris Poultney 2004";
    /**
     * This constructor is automatically called when this class is
     * instantiated as an applet.
     */
    function VisGene() {
      console.log(notice);
      this.base = null;
      this.showWarning = false;
      this.dataDir = null;
    }

    VisGene.prototype = {
      
    }
});
