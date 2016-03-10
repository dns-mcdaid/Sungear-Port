/*
require('javascript.util');
var weak = require('weak');
var seedrandom = require('seedrandom');
rng = seedrandom();
console.log(rng());
var TreeSet = javascript.util.TreeSet;
*/

define(['p5','dataSource','anchorDisplay','comp','icons','stats','vesselDisplay',
'anchor','genesGene','geneEvent','geneList','geneListener','multiSelectable','term','vessel'],
function(p5,dataSource,anchorDisplay,comp,icons,stats,vesselDisplay,
  anchor,genesGene,geneEvent,geneList,geneListener,multiSelectable,term,vessel){

  /** Display size of largest vessel */
  var vRadMax = 0.1; /** Display size of largest vessel */
  var vMax; /** Item count of largest vessel */
  var vMin; /** Item count of smallest vessel */
  /** Set true to run relaxation algorithm for vessel position after narrow, false for deterministic positioning */
  var relax;
  var polarPlot = false; //true for polar, false for default Cartesian
  var showArrows; //boolean, self-explanatory
  var minRad = [0.000, 0.005, 0.010, 0.015, 0.020 ];
  var genes; //GeneList object
  var goTerm; //WeakReference to a GOTerm object
  var anchors = []; //hold anchordisplay objs
  var vessels = [];//hold vesseldisplay objs
  /** Total count of selected genes in highlighted items */
  var highCnt;
  var lastAnchor; //anchordisplay obj
  var lastVessel; //vesseldisplay obj
  var orderedVessels = [];//originally a vector, making it a JS array here
  var vSort = [];
  var orderIdx, firstIdx, minRadIdx;
  /** The sungear circle */
  var exterior;
  /** The anchor-less vessel receives special treatment */
  var moon;
  var vsI, saI = []; //2D Icon arrays //TODO: NEEDED?
  /** Threshold for vessel membership for this plot, or NaN for default */
  var thresh, rad_inner, multi;
  /** display component for Sungear stats */
  var statsF;
  var minSizeB;
  var showArrowB;
  var statsB;
  var stats;

  var values = {
    /** Sungear display outer radius */
    R_OUTER : 1.2,
    R_CIRCLE : 1.0,
    /** Default text/graphics color */
    C_PLAIN : '#d0d0d0',
    /** Highlighted text/graphics color */
    C_HIGHLIGHT : '#ffa0a0',
    /** Selected text/graphics */
    C_SELECT : '#ffffa0',
    SunGear : SunGear
  };

  function SunGear(genes,thresh,statsF) {
    this.genes = genes;
    this.thresh = thresh;
    this.statsF = statsF;
    this.moon = null;
    this.orderedVessels = [];
    this.vSort = [];
    this.polarPlot = false;
    this.showArrows = true;
    this.minRadIdx = 0;
    this.canvas = new p5(function(x){
      // TODO: Fill this in.
    });
    var tempStats = new Stats(genes, this);
    // GET THIS.
    var statsPanel = document.getElementById("#stats");
    for(var i = 0; i < tempStats.length; i++){
      // Check out test.js for how to populate rows.
    }
    // Check out lines 138 - 192.
    this.highCnt = 0;
    this.lastAnchor = null;
    this.lastVessel = null;
    this.exterior = {
      x : -values.R_CIRCLE,
      y : -values.R_CIRCLE,
      // unsure.
      width : 2*R_CIRCLE,
      height : 2*R_CIRCLE
    };
    this.setPreferredSize();
    // add event listeners from 200 - 255
    this.setFocusable(true);
    this.genes.addGeneListener(this);
    this.genes.addMultiSelect(this);
    this.anchors = null;
    this.vessels = null;
    this.multi = false;
    this.relax = true;
  }

  Sungear.prototype = {
    constructor:Sungear,

    cleanup:function() {
      for(var i = 0; i < this.anchors.length; i++){
        this.anchors[i].cleanup();
      }
      this.anchors = null;
      for(i = 0;  i < this.vessels.length; i++){
        this.vessels[i].cleanup();
      }
      this.vessels = null;
      this.genes = null;
      this.lastAnchor = null;
      this.lastVessel = null;
    },

    function getVessels() { return vessels; },

    // makeButton is probably unnecessary

    order:function(n) {
      if(n != -1){
        var v = this.orderedVessels[n];
        this.lastVessel = v;
        this.highlightVessel(v);
        this.updateCount();
        // repaint(); //FIXME
      } else {
        console.log("NAH");
        throw new Error("Invalid index n to order function");
      }
    },

    set:function(src) {
      // make the displayable components
      var t = this.thresh;
      console.log("thresh: " + this.thresh);
      if(isNaN(t)) {
        console.log("Check.");
        t = 1.0;
        // Implement try block.
      }
      console.log("t: " + t);
      var v = [];
      data.DataReader.setThreshold(t, geneGenes.getGenesSet(), src.getReader().anchors, v);
      this.makeDisplay(src.getReader().anchors, v);
      console.log("anchors: " + this.anchors.length + " vessels: " + this.vessels.length);
    },

    setGo:function(t) {
      //make weak ref to GoTerm t
      goTerm = weak(t, function(){
        console.log("GoTerm has been garbage collected");
      });
    },

    setRelax:function(b) {
      this.relax = b;
      this.positionVessels();
    },

    getRelax:function() { return relax; },

    setMinVesselSizeIdx:function(n) {
      this.minRadIdx = n;
      var vs = vsI[n];
      //TODO: in the java version there was button interaction here
      if(this.vessels !== null){
        for(var i = 0; i < this.vessels.length; i++){
          this.vessels[i].setRadMin(minRad[n]);
          this.positionVessels();
        }
      }
    },

    setShowArrows:function(b) { //boolean b
      this.showArrows = b;
      this.sa = this.saI[b ? 0 : 1];
      //TODO: in the java version there was button interaction here
      if(this.vessels != null){
        for(var i = 0; i < vessels.length; i++){
          this.vessels[i].setShowArrows(b);
        }
        //repaint(); //TODO
      }
    },

    showStats:function() { this.statsF.setVisible(!this.statsF.isVisible()); },

    getGeneTerms:function(g) { //g is a Gene object
      if(this.goTerm === null || this.goTerm.get() === null) {
        return []; //return a new array
      } else {
        return this.goTerm.get().getCurrentTerms(g);
      }
    },

    getAssocGenes:function(){
      return (this.goTerm === null || this.goTerm.get() === null) ? new TreeSet() : this.goTerm.get().assocGenes;
    },

    getTerms:function(c) { //c is a Collection of Gene objects
      var t = new TreeSet(); //new TreeSet of Term objects
      for(var it = c.iterator(); it.hasNext();) {
        t.addAll(getGeneTerms(it.next()));
      }
      return t;
    },

    getCool:function(maxVessels, minScore, method) {
      console.log("method: " + method);
      // TODO: 375 - 451
    },

    getCoolThresh:function(maxVessels, minScore) {
      // TODO: 453 - 487
    },

    makeDisplay:function(anch, ves) {
      // find vessel min/max vals
      this.vMax = 0;
      this.vMin = MAX_VALUE;
      for(var i = 0; i < ves.length; i++) {
        var v = ves[i];
        this.vMax = Math.max(this.vMax, v.getFullCount());
        this.vMin = Math.min(this.vMin, v.getFullCount());
      }
      // init anchor display components
      this.anchors = [];
      var anchorConv = [];
      // Implement doubles from line 500
      // TODO: rest of code is from 501 - 543 [DENNIS]
    }
  }


  // RESUME HERE:


  function getAnchor(p) { //a 2D 'Sungear' coordinates
      for(var i = 0; i < anchors.length; i++){
          if(anchors[i].contains(p)){
              return anchors[i];
          }
      }
      return null;
  }


  function positionVessels() {
  	if(polarPlot){
  	    positionVesselsPolar();
    }
  	else{
  	    positionVesselsCartesian();
      }
  }

  function positionVesselsPolar(){
    for(var i = 0; i < vessels.length; i++) {
  	    if(vessels[i].anchor.length > 0) {
      		var r = rad_inner * (1.0- (vessels[i].anchor.length-1.0) / (anchors.length-1.0));
      		var x = vessels[i].getStart().x, y = vessels[i].getStart().y;
      		var d = Math.sqrt(x*x + y*y);
      		var t = (d < 0.001) ? vessels[i].anchor[0].getAngle() : Math.S(y, x);
      		vessels[i].getCenter().x = r * Math.cos(t);
      		vessels[i].getCenter().y = r * Math.sin(t);
      		vessels[i].setRadMax(0.05);
      		vessels[i].updateCenter();
  	    }
  	}
  	// repaint();
  }
  function positionVesselsCartesian(){
    for(var i = 0; i < vessels.length; i++) {
      vessels[i].getCenter().x = vessels[i].getStart().x;
      vessels[i].getCenter().y = vessels[i].getStart().y;
      vessels[i].updateCenter();
    }
    if(relax) {
        adjustCenters(0.005);
        relaxCenters();
    } else {
        adjustCenters(1.0);
    }
    // repaint(); //TODO
  }


  function relaxStep(eta){
  // scaling factor to give extra space for vessels (and arrows)
    var sf = 1.5;
  // random factor added to or subtracted from movement
    var rf = 0.3;
    for(var i = 0; i < vessels.length; i++) {
        var v = vessels[i];
        if(v.anchor.length === 0 || v.getActiveCount() === 0){
            continue;
        }
        // weak attraction to center point
        v.dx = 0.02 * (v.getStart().x - v.getCenter().x);
        v.dy = 0.02 * (v.getStart().y - v.getCenter().y);
        // strong repulsion from border
        var md = Math.sqrt(v.getCenter().x*v.getCenter().x + v.getCenter().y*v.getCenter().y) + v.getRadOuter();
        if(md > 1) {
            v.dx -= (md-1) * v.getCenter().x;
            v.dy -= (md-1) * v.getCenter().y;
        }
    }
    // overlapping vessels repel
    for(i = 0; i < vessels.length; i++) {
        var v1 = vessels[i];
        if(v1.getActiveCount() === 0) {continue;}
        for(var j = i+1; j < vessels.length; j++) {
            var v2 = vessels[j];
            if(v2.getActiveCount() === 0){continue;}
            // x & y distance b/t points, and total radius
            var ax = v1.getCenter().x - v2.getCenter().x, ay = v1.getCenter().y - v2.getCenter().y;
            var ar = sf * (v1.getRadOuter() + v2.getRadOuter());
            // do vessels overlap?
            if(ax*ax + ay*ay < ar*ar) {
                // how much the overlap is
                var adist = Math.sqrt(ax*ax + ay*ay);
                var dr = ar - adist;
                var dx, dy;
                if(adist < 1e-12) {   // total overlap = vessel centers are the same
                    var t = rng() * 2 * Math.PI;
                    dx = sf * dr * Math.cos(t);
                    dy = sf * dr * Math.sin(t);
                } else {
                    dx = 0.75 * (dr/adist) * (v2.getCenter().x - v1.getCenter().x);
                    dy = 0.75 * (dr/adist) * (v2.getCenter().y - v1.getCenter().y);
                }
                var iv = vessels[i].anchor.length, jv = vessels[j].anchor.length;
                v1.dx -= (jv/(iv+jv)) * dx * (1 + 2*rf*rng()-rf);
                v1.dy -= (jv/(iv+jv)) * dy * (1 + 2*rf*rng()-rf);
                v2.dx += (iv/(iv+jv)) * dx * (1 + 2*rf*rng()-rf);
                v2.dy += (iv/(iv+jv)) * dy * (1 + 2*rf*rng()-rf);
            }
        }
    }
    var e = 0;
    for(i = 0; i < vessels.length; i++) {
        var v = vessels[i];
        if(v.getActiveCount() !== 0) {
            v.getCenter().x += eta * v.dx;
            v.getCenter().y += eta * v.dy;
            e += Math.sqrt(v.dx*v.dx + v.dy*v.dy);
        }
    }
    return e;
  }








  function adjustCenters(){
    var l = [];
    //default vector size in java is 10, so mimicking that
    for(var i = 0; i < 10; i++){
      l[i] = [];
    }
    for(i = 0; i < vessels.length; i++){
      if(vessels[i].activeCount() === 0){ //TODO
        continue;
      }
      p = vessels[i].getCenter(); //TODO
      var added = false;
      var v;
      for(var j = 0; j < l.length && !added; j++){
        v = l[j];
        if(p.distance(v[0].getCenter()) < 0.0001){
          v.push(vessels[i]);
          added = true;
        }
      }
      if(!added){
        v = [];
        v.push(vessels[i]);
        l.push(v);
      }
    }

  }

  function relaxCenters(){
    var maxIter = 200;
    var eta = 1.0;
    var decay = 0.01;
    var energy = vessels.length;
    var cnt = 0;
    do{
      var e = relaxStep(eta); //TODO
      energy = e;
      eta *= (1-decay);
      cnt += 1;
    }while(cnt <10 || (energy*eta > 5e-5*vessels.length && cnt < maxIter));

    for(var i = 0; i < vessels.length; i++){
      vessels[i].updateCenter();
    }

  }
  function getAnchor2D(p){
    for(var i = 0; i < anchors.length; i++){
      if(anchors[i].contains(p)){
          return anchors[i];
      }
    }
    return null;
  }

  function getVessel(p) {  //regular screen point
    try {
        var vt = makeTransform(getWidth(), getHeight()).createInverse();
        // var pp = (Point2D.Double)vt.transform(new Point2D.Double(p.x, p.y), null); //FIXME
        return getVessel2D(pp);
    } catch(e) {
        e.printStackTrace();
        return null;
    }
  }

  function getVessel2D(p){ //2D 'sungear' point
    for(var i = 0; i < vessels.length; i++){
    if(vessels[i].contains(p)){
        return vessels[i];
        }
    }
    return null;
  }



  function updateCount(){
    //create new treeset of Gene objects
    var c1 = new TreeSet();
    console.log("Created new TreeSet");
    for(var i = 0; i < vessels.length; i++){
      if(vessels[i].getHighlight()){
        c1.addAll(vessels[i].selectedGenes);
      }
    }
    highCnt = c1.size();
    console.log("TreeSet's size is " + highCnt);
  }

  function checkHighlight(a, v){ //anchordisplay and vesseldisplay objects
    if(arguments.length == 2){
      var chg = false;
      if(a != lastAnchor){
        chg = true;
        for(var i = 0; i < anchors.length; i++){
          anchors[i].setHighlight(anchors[i] == a);
          anchors[i].setShowLongDesc(anchors[i] == a);
        }
        for(var i = 0; i < vessels.length; i++) {
          var b = (a !== null && binarySearch(vessels[i].anchor, a) >= 0);
          vessels[i].setHighlight(b);
        }
      }
      if(a === null && v !== lastVessel) {
        chg = true;
        highlightVessel(v);
      }
      lastAnchor = a;
      lastVessel = v;
      if(chg) {
          updateCount();
          repaint(); //TODO
      }
    }else{// one screen point p
      var p = a;
      var x = (p===null) ? null : (isInGear(p) ? null : getAnchor(p));
      var y = (p===null) ? null : (a !== null ? null : getVessel(p));
      checkHighlight(x, y);
    }
  }

  function updateActive() {
  	// update active sets
  	// find max value
  	var max = 0;
  	for(var i = 0; i < vessels.length; i++) {
  		vessels[i].setActiveGenes(genes.getActiveSet());
  		max = Math.max(max, vessels[i].getActiveCount());
  	}
  	// update max values
  	// reshape
  	for(var i = 0; i < vessels.length; i++) {
  		vessels[i].setMax(max);
  		vessels[i].makeShape(rad_inner);
  	}
  }

  function updateHighlight() {
    var a = lastAnchor;
    lastAnchor = null;
    var v = lastVessel;
    lastVessel = null;
    checkHighlight(a, v);
  }


  function makeTransform(w, h){
    var M = Math.min(w, h);
    //declare new AffineTransform object
    var vt = new AffineTransform(); //TODO
    vt.translate(w/2, h/2);
    vt.scale(0.5*M/R_OUTER, 0.5*M/R_OUTER);
    return vt;
  }


  function getMultiSelection(operation){
     var s = new TreeSet();
    var cnt = 0;      // number of selected items in component
    if(operation == MultiSelectable.INTERSECT){ //TODO
        s.addAll(genes.getActiveSet());
      }
    for(var i = 0; i < vessels.length; i++){
        if(vessels[i].getSelect()) {
            cnt++;
            if(operation == MultiSelectable.UNION)
                s.addAll(vessels[i].selectedGenes);
            else
                s.retainAll(vessels[i].selectedGenes);
        }
    }
    for(var i = 0; i < anchors.length; i++){
        if(anchors[i].getSelect()) {
            cnt++;
            // find all of anchor's selected genes
            var ag = new TreeSet();
            var it; //iterator for for loop
            for(it = anchors[i].vessels.iterator(); it.hasNext();)
                ag.addAll(it.next().selectedGenes);
            if(operation == MultiSelectable.UNION)
                s.addAll(ag);
            else
                s.retainAll(ag);
        }
    }
    return (cnt > 0) ? s : null;
  }

  function highlightVessel(v){
    for(var i = 0; i < vessels.length; i++)
      vessels[i].setHighlight(vessels[i] == v);
    for(var i = 0; i < anchors.length; i++) {
        var b = (v != null && anchors[i].vessels.contains(v));
        anchors[i].setHighlight(b);
    }
  }

  function binarySearch(array, desired){
    var mid = Math.floor(array.length/2);

    if(array[mid] == desired) return mid;
    else if(array[mid] < desired && array.length > 1){
      return binarySearch(array.splice(mid, Number.MAX_VALUE), desired);
    }
    else if(array[mid] > desired && array.length > 1){
      return binarySearch(array.splice(0, mid), desired);
    }else{ return -1; }
  }

  function setMulti(b){
    multi = b;
    if(!b){
      for(var i = 0; i < vessels.length; i++){
        vessels[i].setSelect(false);
      }
      for(var i = 0; i < vessels.length; i++){
        anchors[i].setSelect(false);
      }
    }

  }


  return values;
});
