define(['p5', 'sungear', 'jquery', 'vesselDisplay', 'geneList', 'visGene', 'geneList', 'TreeSet', 'MultiSelectable', 'CoolVessel'],
function(p5, sungear, $, vesselDisplay, geneList, visGene, GeneList, TreeSet, MultiSelectable, CoolVessel){

  var masterFileArray = [];
  var canvas;
  var DrawStack = [];
  var added = false;
  var pressed = false;
  var makePolygon = false;
  var toDraw;
  var currentColor = sungear.C_HIGHLIGHT;
  var sides = 1;
  var HEIGHT;
  var WIDTH;

  //DEV VARIABLES
  var devGeneList = new GeneList();
  var cool = new CoolVessel();
  var genesPopulated = false;
  var goPopulated = false;

  var goHierarchy = {};
  goHierarchy["-10;11231"] = "biological_process";
  goHierarchy["-1;14082"] = "cellular_component";
  goHierarchy["-9;13754"] = "biological_process";
  goHierarchy["-10;11231"] = "cellular_component";
  goHierarchy["-9;13754"] = "molecular_function";

  var goStraight = {};

  goStraight["13;6301"] = "biological_process";
  goStraight["5;494"] = "response to stress";
  goStraight["5;893"] = "transport";
  goStraight["5;969"] = "transporter activity";
  goStraight["4;267"] = "amino acid and derivative metabolism";
  goStraight["4;605"] = "development";
  goStraight["4;541"] = "hydrolase activity, acting on ester bonds";
  goStraight["4;210"] = "intracellular transport";
  goStraight["4;304"] = "lipid metabolism";
  goStraight["4;235"] = "nitrogen compound metabolism";

  var geneDictionary = {};
  geneDictionary['At1g01040'] = "DEAD/DEAH";
  geneDictionary["At1g01050"] = "inorganic";
  geneDictionary["At1g01060"] = "myb family traits";
  geneDictionary["At1g01090"] = "pyruvate dehydration";
  geneDictionary["At1g01100"] = "60S acidic";
  geneDictionary["At1g01120"] = "fatty acid elongated";
  geneDictionary["At1g01130"] = "CBL-interactivity";
  geneDictionary["At1g01150"] = "expressed protein";
  geneDictionary["At1g01160"] = "SSXT protein-rich";
  geneDictionary["At1g01170"] = "ozone-responsive";
  geneDictionary["At1g01220"] = "GHMP kinasede";
  geneDictionary["At1g01250"] = "encodes a metosis";
  geneDictionary["At1g01630"] = "SEC14 cytososis";
  geneDictionary["At1g01640"] = "speckle type";

  var currentGoHierarchy = goHierarchy;
  var currentGoStraight = goStraight;
  var currentGeneDictionary = geneDictionary;




  function main(side) {
    if(arguments.length > 0) {sides = side;}
    makePolygon = true;
    var setupCanvas = new p5(function(p5){
      p5.setup = function() {
        WIDTH = document.getElementById('sunGui').clientWidth;
        HEIGHT = document.getElementById('sunGui').clientHeight;
        canvas = p5.createCanvas(WIDTH,HEIGHT);

        var testDis = new vesselDisplay("testAnc");
        var testShape = testDis.makeShape(4);
        console.log(testShape);
        DrawStack.push(testShape);

      },

      p5.draw = function() {
        p5.background(16,16,16);
        p5.fill(0);

        if(!added){
          toDraw = DrawStack.pop();
          console.log(toDraw);
          added = true;
        }

        if(makePolygon) {
          p5.polygon(WIDTH/2, HEIGHT/2, HEIGHT/2-5, sides);
        }

        if (p5.mouseIsPressed) {
          p5.fill(0);
        } else {
          p5.fill(currentColor);
        }
        p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);

        p5.fill(sungear.C_PLAIN);
        p5.ellipse(toDraw.p5, toDraw.y, toDraw.width, toDraw.height);
      },

      p5.polygon = function(x, y, radius, npoints) {
        p5.fill(16,16,16);
        p5.stroke(sungear.C_PLAIN);
        p5.strokeWeight(4);
        if (npoints > 2) {
          var angle = p5.TWO_PI / npoints;
          p5.beginShape();
          for (var a = 0; a < p5.TWO_PI; a += angle) {
            var sx = x + p5.cos(a) * radius;
            var sy = y + p5.sin(a) * radius;
            p5.vertex(sx, sy);
            p5.textSize(18);
            p5.text("Hello!", sx, sy);
          }
          p5.endShape(p5.CLOSE);
        } else {
          p5.ellipse(x,y,HEIGHT-5,HEIGHT-5);
        }
        p5.stroke(0);
        p5.strokeWeight(1);
      };

    }, 'sunGui');
  }

  function populateGenes(contents) {

    for (var j = 0; j < contents.length; j++) {
      var separated = contents[i].split("\n");

    }
  }

  function loadData() { //FIXME
    var files = document.getElementById("inFiles").files;
    var tbody = document.getElementById("geneTbody");
    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function (f) {
          return function (e) {
            var contents = e.target.result;
            var separated = contents.split("\n");
            for(var i = 0; i < separated.length; i++){
              if (separated[i] === null) {
                continue;
              }
              var row = tbody.insertRow(0);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              cell1.innerHTML = separated[i];
              cell2.innerHTML = "pls work";
            }
          }
        })(f);
        reader.readAsText(f, "UTF-8");
    }
    document.getElementById("setupload").innerHTML = "";
    return files.length;
  }


 //TODO: READ CONTROLS.JAVA
  document.getElementById("upload").addEventListener('click', function() {
    var inside = loadData();
    sides = inside;
    main(inside);
  });

  // Sungear Direct Control Panel options.
  document.getElementById("restart").addEventListener("click", function(){
    console.log("Restarting Sungear...");
    var answer = confirm("Are you sure you want to restart? ");
    devGeneList.restart(this);
    if(answer){
      location.reload(true); //FIXME; not what it's supposed to do. meant to reload data, see below
    }
    //visGene.geneList.restart(src); //calls geneList method

  });

  //select all groupings
  document.getElementById("all").addEventListener("click", function(){
    console.log("Selecting all genes...");
    devGeneList.setSelection(this, devGeneList.getActiveSet());
    //TODO: get selected groupings from HTML
    //loop... and add gene groups from
    //add these to geneList's selected treeset

  });
  //select no groupings
  document.getElementById("none").addEventListener("click", function(){
    console.log("Deselecting all gene sets...");
    devGeneList.setSelection(this, new TreeSet());


  });

  //go backward to a previous selection
  document.getElementById("left").addEventListener("click", function(){
    console.log("Loading previous gene...");
    devGeneList.back(this);

  });

  //go forward to a selection
  document.getElementById("right").addEventListener("click", function(){
    console.log("Loading next gene...");
    devGeneList.forward(this);

  });

  //create a new group based on selected elements and clear selection history
  document.getElementById("narrow").addEventListener("click", function(){
    console.log("Narrowing down gene options...");
    devGeneList.narrow(this);

  });

  //union 2 or more selected elements
  document.getElementById("union").addEventListener("click", function(){
    console.log("Displaying all unions...");
    devGeneList.finishMultiSelect(this, MultiSelectable.UNION);

  });
  //intersect 2 or more selected elements
  document.getElementById("intersect").addEventListener("click", function(){
    console.log("Displaying all intersections...");
    devGeneList.finishMultiSelect(this, MultiSelectable.INTERSECT);
  });

  //Find the vessel consisting of the most overrepresented set.
  //The results are saved after the first click.
  //If saved results are available, the button will read "Show Cool".
  document.getElementById("findCool").addEventListener("click", function(){
    console.log("Locating cool genes...");
    if(cool === null){
       updateCool(true);
       if(cool.length === 0){
         alert("No cool vessels found - try narrowing or restarting");
       }
    }
    if(cool.length > 0){
      //TODO: show option menu on cool button (frontend)
    }
    devGeneList.addGeneListener(this);

  });

  //TODO: EXPORT AND REMOVE
  document.getElementById("remove").addEventListener("click", function(){
    console.log("Removing genes...");
    //

  });

  document.getElementById("export").addEventListener("click", function(){
    console.log("Exporting genes...");

  });

  // Genes display buttons
  /**
 * Prompts the user for an end-of-line separated list of gene pub IDs,
 * and sets the selected set based on this list.
 */
  document.getElementById("geneQuery").addEventListener("click", function(){
    console.log("Querying the genes...");
    //get query value
    // var query = document.getElementById("geneQuery").value;
    //
    // //parse value and loop through genes list to see which match
    // if(query !== null && query !== ""){
    //   var s = new TreeSet();
    //   var gene = query.split("/n");
    //   for(var i = 0; i < gene.length; i++){
    //     if(devGeneList.includes(gene[i])){
    //       s.add(gene[i]);
    //     }
    //   }
    //   //FIXME: front end display of matching genes
    //   devGeneList.setSelection(this, s);
    // }
    if(genesPopulated){
      return;
    }
    genesPopulated = true;

    var tbody = document.getElementById("geneTbody");

    for(var key in currentGeneDictionary){
      if(currentGeneDictionary.hasOwnProperty(key)){
        var row = tbody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = key;
        cell2.innerHTML = currentGeneDictionary[key];
      }
    }
    $('#geneTbody tr').on('click', function(event) {
        $(this).addClass('highlight').siblings().removeClass('highlight');
    });


  });

  //copy selectedset of genes to user clipboard
  //FIXME: execCommand not working :(
  document.getElementById("geneCopy").addEventListener("click", function(){
    console.log("Copying genes...");
    var list = devGeneList.getSelectedSet();
    var content = "hello";

    //iterate through and get gene info
    var it = list.iterator();
    while(it.hasNext()){
      var gene = it.next();
      content += gene.getName() + " - " + gene.getDesc() + " \n";
    }

    //create hidden HTML element for copying
    var ret = document.createElement("textarea");
    ret.value = content; //set content
    ret.setAttribute("hidden", true); //hidden from user
    document.body.appendChild(ret);//add to end of body

    var range = document.createRange();
    range.selectNode(ret);
    window.getSelection().addRange(range);

    //copy to clipboard
    try{
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert('Copying text command was ' + msg + " ... " + content);
    } catch (err) {
      alert('Oops, unable to copy');
    }

    //remove textarea element
    window.getSelection().removeAllRanges();
  });

  //matches by name OR description
  document.getElementById("geneFind").addEventListener("click", function(){
    var toFind = document.getElementById("geneSearch").value;
    console.log("Locating " + toFind);

    var found = new TreeSet();
    var list = devGeneList.getActiveSet();
    var it = list.iterator();
    while(it.hasNext()){
      var gene = it.next();
      var name = gene.getName();
      var description = gene.getDesc();
      if(toFind === name || toFind === description){
        found.add(gene);
      }
    }
    //FIXME: front end display of matching genes
    devGeneList.setSelection(this, found);


  });

  // GO Terms
  document.getElementById("expand").addEventListener("click", function(){
    console.log("Expanding on GO Terms...");
    if(goPopulated){
      return;
    }

    goPopulated = true;

    var goDir = document.getElementById("goDir");
    var goList = document.getElementById("goList");
    goDir.innerHTML = "";
    goList.innerHTML = "";

    //set up nested hierarchy
    for(var key in currentGoHierarchy){
      if(currentGoHierarchy.hasOwnProperty(key)){
        var node = document.createElement("li");
        var textnode = document.createTextNode("(" + key + ") " + currentGoHierarchy[key]);
        node.appendChild(textnode);
        goDir.appendChild(node);
      }
    }

    for(var key in currentGoStraight){
      if(currentGoStraight.hasOwnProperty(key)){
        var node = document.createElement("li");
        var textnode = document.createTextNode("(" + key + ") " + currentGoStraight[key]);
        node.appendChild(textnode);
        goList.appendChild(node);
      }
    }

  });

  document.getElementById("collapse").addEventListener("click", function(){
    console.log("Collapsing GO Terms...");
    goPopulated = false;

    //reset to original dev lists when collapsed
    currentGoStraight = goStraight;
    currentGoHierarchy = goHierarchy;

    var goDir = document.getElementById("goDir");
    while(goDir.firstChild){
      goDir.removeChild(goDir.firstChild);
    }

    var goList = document.getElementById("goList");
    while(goList.firstChild){
      goList.removeChild(goList.firstChild);
    }
  });
  //TODO: SEARCHING BY GO TERM NAME OR ZSCORE?
  document.getElementById("zFind").addEventListener("click", function() {
    var toFind = document.getElementById("zSearch").value;
    var count = 0;
    var list = devGeneList.getSelectedSet();


    document.getElementById("goCount").innerHTML = "GO Terms: " + count;
    var goStraightFound = {};
    var goHierarchyFound = {};
    for(var key in currentGoHierarchy){
      if(currentGoHierarchy.hasOwnProperty(key) && currentGoHierarchy[key] === toFind){
        goHierarchyFound[key] = currentGoHierarchy[key];
      }
    }

    for(var key in currentGoStraight){
      if(currentGoStraight.hasOwnProperty(key)  && currentGoStraight[key] === toFind){
        console.log(key + " : " + currentGoStraight[key]);
        goHierarchyFound[key] = currentGoStraight[key];
      }
    }

    currentGoStraight = goStraightFound;
    currentGoHierarchy = goHierarchyFound;
    goPopulated = false;
    document.getElementById("expand").click();

  });

  //TODO: implement
  document.getElementById("goCopy").addEventListener("click", function(){
    console.log("Copying GO Terms...");
  });


  document.getElementById("sort").addEventListener("click", function(){
    console.log("Sorting Genes by z-Score");
    //collect array of z scores of all genes in list
    //array.sort()
    //display array
  });
});
