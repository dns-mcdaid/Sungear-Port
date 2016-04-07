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
   /**
    * Use this constructor when instantiating as an application.
    * @param u URL of directory where code is being run
    * @param pn array of names of plugins to load
    */
    function VisGene(u, w, pn, dataDir) {
      console.log(notice);
      this.base = null;
      // this.showWarning = false;
      this.dataDir = null;

      this.isApplet = false;
      this.base = u;
      this.context = null;
      this.showWarning = w;
      this.pluginName = pn;
      this.dataDir = dataDir;
    }

    VisGene.VERSION = "0.0.2";
    VisGene.notice = "Copyright Chris Poultney 2004";
    VisGene.DEFAULT_DATA_DIR = null;

    VisGene.prototype = {
      constructor : VisGene,

      init : function() {
        // TODO: Potentially implement.

        console.log(this.extAttrib);
        if (this.dataDir === null) {
          dataDir = this.DEFAULT_DATA_DIR;
        }
        if (!this.dataDir.endsWith("/")) {
          this.dataDir += "/"
        }
        // TODO: Remove this, pretty much our config file.
        this.dataU = DataReader.makeURL(this.base, this.dataDir);

        // prepare data source.
        var statsF = document.getElementById("stats"); //TODO: See if this works.
        this.src = new DataSource(this.dataU);
        this.geneList = new GeneList();

        // buildGUI
        this.desk = null; // Should be new JDesktopPane
        this.setContentpoane(this.desk);

        this.gear = new SunGear(this.geneList, statsF);
      },

      run : function() {
        // Load the passed data file, if there is one.
        if (this.extAttrib != null && this.exAttrb.get("sungearU") !== null) {
          this.src.setAttributes(this.extAttrib, this.dataU);
        }
      },

      destroyAll : function(p) {
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
      },

      destroy : function() {
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
      },

      toggleFullScreen : function() {
        // TODO: Probably not gonna implement this.
      },
      /**
       * Sets all desktop window sizes and positions to their defaults.
       */
      positionWindows : function() {
        // TODO: Probably don't need to implement this.
      },

      makeFrame : function(title) {
        return new WaitFrame(title, true, false, true, true);
      },
      /**
       * Makes a check box menu item with JInternalFrame iconify control.
       * @param f the internal frame to control
       * @return the check box item
       */
      makeItem : function() {
        // TODO: Probably not gonna implement this either.
      },
      /**
       * Opens an experiment file.
       * @throws IOException
       * @throws ParseException
       */
      openFile : function(attrib) {
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
      },

      capFirst : function(s) {
        if (s.length > 1) {
          return s[0].toUpperCase() + s.substring(1);
        } else if (s.length == 1) {
          return s.toUpperCase();
        } else {
          return s;
        }
      },

      showAbout : function() {
        var f = document.getElementById(/*TODO: Something Here. */);
        try {
          var aboutU; // TODO: Fix this.
          var text = DataReader.readURL(aboutU);
          var vs = "[VERSION]";
          var pl = "[PLUGINLIST]";
          var l = text.indexOf(vs);
          if (l != -1) {
            text.replace(vs, VisGene.VERSION);
          }
          var ps "";
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
      },

      formatComment : function(a, commentName) {
        var comment = a.get(commentName, "(none)\n");
        return comment.substring(0, Math.max(0, comment.length - 1));
      },

      showInfo : function() {
        // TODO: Implement this??
      }
    }
    /**
     * Generic status dialog class that tries to position itself in the
     * center of the parent window and automatically size itself to its
     * message (which can be changed dynamically).
     * @author crispy
     */
    // HEY! LISTEN! I Don't think we need to implement any of this. -DM
    class StatusDialog extends VisGene {
      constructor(f, parent) {
        // HEY! LISTEN! I think this is the loading bar at the start of the app.
        // TODO: Clean up what this does.
        VisGene(f, "Progress", true); // This doesn't make any sense.
        this.parent = parent;
        this.progress = null; // Should be JProgressBar
        this.progress.setStringPainted(true);
        // more shit we don't need on the 780s lines.
      }

      updateStatus(msg, prog) {
        this.progress.setString(msg);
        this.progress.setValue(prog);
      }
    }

    /**
     * Loads an experiment and, if necessary, master data, giving
     * load status updates.
     * @param u URL of the experiment file to load
     * @param status dialog for status updates
     */
    class LoadThread extends VisGene {
      /**
       * Experiment and master data load thread to separate the load
       * operation from the main GUI thread.
       * @author crispy
       */
      constructor(attrib, status) {
        this.attrib = attrib;
        this.status = status;
        this.ex = null;
      }

      run() {
        try {
          super.src.set(this.attrib, this.status);
          this.status.updateStatus("Preparing Sungear Display", 4);
          super.geneList.setSource(super.src);
          super.geneList.update();
          this.status.updateStatus("Done", 5);
        } catch (e) {
          this.ex = e;
          console.log(e);
        }
      }

      getException() {
        return ex;
      }
    }

    class WaitFrame extends VisGene {
      constructor(s, b1, b2, b3, b4) {
        super(s, b1, b2, b3, b4);
      }

      printMem(s) {
        // TODO: Implement?
      }

      usage() {
        // TODO: Implement?
      }

      main(args) {
        var i = 0;
        var warn = true;
        var plugin = [];
        var dataDir = null;
        while(i < args.length && (args[i].startsWith("-") || args[i] === "demo")) {
          if(args[i].toLowerCase() === "--version") {
            console.log(VisGene.VERSION);
          } else if (args[i] === "--usage" || args[i] === "--help") {
            usage();
          } else if (args[i] === "demo" || args[i] == "-nowarn") {
            warn = false;
            i++;
          } else if (args[i] === "-plugin") {
            var f = args[i+1].split(",");
            for (var s in f) {
              super.plugin.add(s);
            }
            i += 2;
          } else if (args[i] === "-data_dir") {
            dataDir = args[i+1];
            i += 2;
          } else {
            console.log("unknown argument, aborting.");
            usage();
          }
        }

        for (var j = i; j < args.length; j++) {
          super.plugin.add(args[j]);
        }

        var f = null // new JFrame("Sungear") TODO: Not this.
        // TODO: More lines of code here.
        var vis = new VisGene(new URL("file:./", warn, super.plugin, dataDir);
        vis.init();
      }
    }
});
