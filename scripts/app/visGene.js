/**
 * Top-level GUI component for Sungear.  Can be instantiated
 * as an applet or an application.
 *
 * @author crispy
 */
//THIS IS A SINGLETON CLASS, I.E. ONLY ONE INSTANCE WILL BE CREATED
//WHEN FIRST LOADED BY REQUIREJS. THIS INSTANCE WILL BE SHARED BY ALL FILES NEEDING VISGENE
//-RM

define(["attributes","dataSource","genesGene","sungear", 'geneList', 'require'],
function(Attribute,DataSource, genesGene,sungear, GeneList, require){
 /**
  * Use this constructor when instantiating as an application.
  * @param u URL of directory where code is being run
  * @param pn array of names of plugins to load
  */
  function VisGene(u, w, pn, dataDir) {
      if(arguments.callee.instance){
        return arguments.callee.instance;
      }
      arguments.callee.instance = this;
      console.log("VisGene Singleton Instantiated!");
        // this.showWarning = false;
      this.isApplet = false;
      this.base = u;
      this.context = null;
      this.showWarning = w;
      this.pluginName = pn;
      this.dataDir = dataDir;

      this.VERSION = "0.0.2";
      this.notice = "Copyright Chris Poultney 2004, ported by Radhika Mattoo and Dennis McDaid 2016";
      this.DEFAULT_DATA_DIR = null;

      this.init = function(){
        // Potentially implement.

        // console.log(this.extAttrib);
        // if (this.dataDir === null) {
        //   dataDir = this.DEFAULT_DATA_DIR;
        // }
        // if (!this.dataDir.endsWith("/")) {
        //   this.dataDir += "/"
        // }

        //TODO: Not sure what form set up will be like, will def have to parseData
        //more than one form element for dataU property
        // this.dataU = document.getElementById(/*TODO: Something Here. */).value;
        this.dataU = "./";

        // prepare data source.
        var statsF = null; //TODO: See if this works.
        this.src = new DataSource(this.dataU);
        this.geneList = new GeneList();

        // buildGUI
        // this.desk = null; // Should be new JDesktopPane
        // this.setContentpoane(this.desk);
        var sungearObj = (function(){
          return require('sungear');
        }());

        this.gear = new sungearObj.Sungear(this.geneList, statsF);

        console.log("Inside visGene singleton, about to begin main for canvas construction and program start ");
        require(['main']);
      };

      this.run = function(){
        // Load the passed data file, if there is one.
        if (this.extAttrib !== null && this.exAttrb.get("sungearU") !== null) {
          this.src.setAttributes(this.extAttrib, this.dataU);
        }
      };
      this.destroyAll = function (){
        var c = p.getComponents();
        for (var i = 0; i < c.length; i++) {
          if (c[i] instanceof Container) {
            destroyAll(c[i]);
          }
        }
        p.removeAll();
        if (p instanceof Window) {
          p.dispose();
        }
        // TODO: JInternalFrame MAYBE
      };

      this.destroy = function(){
        console.log("destory enter");
        // this.super.destroy();
        this.topFrame = null;
        this.destroyAll(this.getContentPane());
        this.desk = null;
        this.l1.cleanup();
        this.l1 = null;
        this.geneF = null;
        this.sungearM = null;
        this.controlM = null;
        this.geneM = null;
        this.gear.cleanup();
        this.gear = null;
        this.sungearF = null;
        this.go.cleanup();
        this.gear = null;
        this.go = null;
        this.goF = null;
        this.goM = null;
        this.control.cleanup();
        this.control = null;
        this.export.cleanup();
        this.export = null;
        this.controlF = null;
        // this.geneLightsF = null;
        this.src.cleanup();
        this.src = null;
        this.geneList.cleanup();
        this.geneList = null;
        console.log("CSPgenes done");
      };

      this.openFile = function(attrib){
        console.log("data file: " + attrib.get("sungearU"));
        var f = null; // should be JOptionPane ???
        var status = new StatusDialog(f, this);
        var t = new LoadThread(attrib, status);
        t.start();
        status.setVisible(true);
        if (t.getException() !== null) {
          console.log(t.getException);
        } else {
          var iL = attrib.get("itemsLabel", "items");
          var cL = attrib.get("categoriesLabel", "categories");
          // TODO: Frame shit.
          var r = this.src.getReader();
          if (this.showWarning && r.missingGenes.length + r.dupGenes.length > 0) {
            var msg = "There are inconsistencies in this data file:";
            if (r.missingGenes.length > 0) {
              msg += "\n" + r.missingGenes.length + " input " + iL + " unknown to Sungear have been ignored.";
            }
            if (r.dupGenes.length > 0) {
              msg += "\n" + r.dupGenes.length + " " + iL + " duplicated in the input file; only the first occurrence of each has been used.";
            }
            msg += "\nThis will not prevent Sungear from running, but you may want to resolve these issues.";
            msg += "\nSee Help | File Info for details about the " + iL + " involved.";
            console.log(msg); // TODO: Display this somewhere relevant.s
          }
        }
      };

      this.capFirst = function(s){
        if (s.length > 1) {
          return s[0].toUpperCase() + s.substring(1);
        } else if (s.length == 1) {
          return s.toUpperCase();
        } else {
          return s;
        }
      };

      this.showAbout = function(){
        var f = "";// document.getElementById(/*TODO: Something Here. */);
        try {
          var aboutU; // TODO: Fix this.
          var text = "";//document.getElementById(/*TODO: Something Here. */).value;
          var vs = "[VERSION]";
          var pl = "[PLUGINLIST]";
          var l = text.indexOf(vs);
          if (l != -1) {
            text.replace(vs, VisGene.VERSION);
          }
          var ps = "";
          for (var it = this.plugin.iterator(); it.hasNext(); ) {
            var p = it.next();
            // TODO: Make sure this works.
            ps = ps + (ps === "" ? "" : ", ") + p.getPluginName() + " (" + p.getClass().getName() + ")";
          }
          if(ps === "") {
            ps = "(none)";
          }
          l = text.indexOf(pl);
          if (l != -1) {
            text.replace(pl, ps);
          }
          // TODO: Implement JEditorPane stuff.
        } catch (e) {
          console.log("Error reading about pane text:");
        }
      };
  }//end Singleton

  return VisGene;
});
