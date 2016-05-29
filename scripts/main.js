define(['p5', 'sungear', 'jquery', 'vesselDisplay', 'geneList', 'visGene', 'geneList', 'TreeSet', 'MultiSelectable', 'CoolVessel', 'genesGene'],
function(p5, sungear, $, vesselDisplay, geneList, visGene, GeneList, TreeSet, MultiSelectable, CoolVessel, Gene){

  var masterFileArray = [];
  var canvas;
  var DrawStack = [];
  var added = false;
  var pressed = false;
  var toDraw;
  var currentColor = sungear.C_HIGHLIGHT;
  var sides = 1;
  var HEIGHT;
  var WIDTH;

  // FIXME Testing main p5 shit.
  var sets = [];
  // STILL TESTING

  // FUCK YOUR COUCH WE GOT P5 TO WORK.
  // ALL U GOTTA DO IS PASS IT TO THE FUNCTION THAT WANTS TO DRAW THEN BACK UP AND PRAY.

  //DEV VARIABLES - these should all be taken care of/filled by user's file input
  //---------------------------------------------------------------
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

  var geneDictionary = [];

  //WRAP AS GENE OBJECTS!
  geneDictionary[0] = new Gene('At1g01040', "DEAD/DEAH");
  geneDictionary[1] = new Gene('At1g01050', "inorganic");
  geneDictionary[2] = new Gene('At1g01060', "myb family traits");
  geneDictionary[3] = new Gene('At1g01090', "pyruvate dehydration");
  geneDictionary[4] = new Gene('At1g01100', "60S acidic");
  geneDictionary[5] = new Gene('At1g01120', "fatty acid elongated");
  geneDictionary[6] = new Gene('At1g01130',  "CBL-interactivity");
  geneDictionary[7] = new Gene('At1g01150', "expressed protein");
  geneDictionary[8] = new Gene('At1g01160', "SSXT protein-rich");
  geneDictionary[9] = new Gene('At1g01170', "ozone-responsive");
  geneDictionary[10] = new Gene('At1g01220', "GHMP kinasede");
  geneDictionary[11] = new Gene('At1g01250', "encodes a metosis");
  geneDictionary[12] = new Gene('At1g01630', "SEC14 cytososis");
  geneDictionary[13] = new Gene('At1g01640',"speckle type");


  var currentGoHierarchy = goHierarchy;
  var currentGoStraight = goStraight;
  var currentGeneDictionary = geneDictionary;

  devGeneList.setSource(this);

  //now all the values of geneDictionary are in the master genelist treeset
  devGeneList.update(geneDictionary); //sets genesS and activeS lists
  devGeneList.master = geneDictionary;  //set as master too

  //---------------------------------------------------------------

  function main(side) {
    if(arguments.length > 0) {sides = side;}
    var setupCanvas = new p5(function(p5){
      p5.setup = function() {
        WIDTH = document.getElementById('sunGui').clientWidth;
        HEIGHT = document.getElementById('sunGui').clientHeight;
        canvas = p5.createCanvas(WIDTH,HEIGHT);
        p5.textSize(18);

      },

      p5.draw = function() {
        p5.background(16,16,16);
        p5.fill(0);
        /*
        var edges = p5.polygon(WIDTH/2, HEIGHT/2, HEIGHT/2-10, sides);
        p5.labels(edges);
        p5.testVessels(edges);
        */
        if (p5.mouseIsPressed) {
          var myVessel = new vesselDisplay("homie");
        }
      },

      p5.testVessels = function(vertecies) {
        for (var i = 0; i < vertecies.length; i++) {
          p5.fill(16,16,16);
          p5.strokeWeight(2);
          p5.stroke(sungear.C_PLAIN);
          var size = sets[i].genes.length;
          var x = vertecies[i].x;
          var y = vertecies[i].y;
          var vesX;
          var vesY;

          if (x < WIDTH/2) {
            vesX = x + size;
          } else {
            vesX = x - size*2;
          }

          if (y < HEIGHT/2) {
            vesY = y + size*1.5;
          } else {
            vesY = y - size*1.5;
          }
          var d = p5.dist(p5.mouseX,p5.mouseY,vesX,vesY);
          if (d < size*2) {
            p5.fill(sungear.C_PLAIN);
            p5.stroke(16,16,16);
          }
          p5.ellipse(vesX,vesY,size*2,size*2);
        }
      },

      p5.polygon = function(x, y, radius, npoints) {
        p5.fill(16,16,16);
        p5.stroke(sungear.C_PLAIN);
        p5.strokeWeight(4);
        var vertecies = [];
        if (npoints > 2) {
          var angle = p5.TWO_PI / npoints;
          p5.beginShape();
          for (var a = 0; a < p5.TWO_PI; a += angle) {
            var sx = x + p5.cos(a) * radius;
            var sy = y + p5.sin(a) * radius;
            p5.vertex(sx, sy);
            var combined = {
              x: sx,
              y: sy
            };
            vertecies.push(combined);
          }
          p5.endShape(p5.CLOSE);
        } else {
          p5.ellipse(x,y,HEIGHT-10,HEIGHT-10);
          var combined1 = {
            x: x,
            y: HEIGHT-10
          };
          var combined2 = {
            x: x,
            y: 10
          };
          vertecies.push(combined1);
          vertecies.push(combined2);
        }
        return vertecies;
      },

      p5.labels = function(vertecies) {
        for (var i = 0; i < vertecies.length; i++) {
          var x = vertecies[i].x;
          var y = vertecies[i].y;
          var labX;
          var labY;

          if (x < WIDTH/2) {
            labX = x - 40;
          } else {
            labX = x + 10;
          }

          if (y < HEIGHT/2) {
            labY = y - 10;
          } else {
            labY = y + 10;
          }
          p5.stroke(0);
          p5.strokeWeight(0);
          p5.fill(sungear.C_PLAIN);
          p5.text(sets[i].name, labX, labY);
        }
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
          };
        })(f);
        reader.readAsText(f, "UTF-8");
    }
    document.getElementById("setupload").innerHTML = "";
    return files.length;
  }

  // TODO: REMOVE THIS.
  function DataSet(name, genes) {
    this.name = name;
    this.genes = genes;
  }

 //TODO: READ CONTROLS.JAVA
  document.getElementById("upload").addEventListener('click', function() {
    //var inside = loadData();
    //sides = inside;
    var inText = document.getElementById("infield").value;
    var separated = inText.split("\n");
    var currentGenes = [];
    var currentName;
    $('#setupload').remove();
    for (var i = 0; i < separated.length; i++) {
      if (separated[i][0] == ">") {
        if (currentGenes.length > 0) {
          sets.push(new DataSet(currentName, currentGenes));
        }
        currentName = separated[i].substring(1);
        currentGenes = [];
      } else {
        currentGenes.push(separated[i]);
      }
    }
    sets.push(new DataSet(currentName, currentGenes));
    main(sets.length);
  });

  // Sungear Direct Control Panel options.
  document.getElementById("restart").addEventListener("click", function(){
    console.log("Restarting Sungear...");
    var answer = confirm("Are you sure you want to restart? ");
    if(answer){
      devGeneList.restart(this);
    }
  });

  //select all groupings
  document.getElementById("all").addEventListener("click", function(){
    console.log("Selecting all genes...");
    devGeneList.setSelection(this, devGeneList.getActiveSet());

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
    //TODO: IMPLEMENT UPDATECOOL()
    // console.log("Locating cool genes...");
    // if(cool === null){
    //    updateCool(true);
    //    if(cool.length === 0){
    //      alert("No cool vessels found - try narrowing or restarting");
    //    }
    // }
    // if(cool.length > 0){
    //   //TODO: show option menu on cool button (frontend)
    // }
    // devGeneList.addGeneListener(this);

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

    //NOTE: This query is based off the gene list's SELECTED SET. Thus,when you first press 'Query' without any query, it brings up the entire selected set. However if you query for an ID then query an empty string, it won't do anything because the selected set has been changed by the query.
    
    // var tbody = document.getElementById("geneTbody");
    //
    // for(var key in currentGeneDictionary){
    //   if(currentGeneDictionary.hasOwnProperty(key)){
    //     var row = tbody.insertRow(0);
    //     var cell1 = row.insertCell(0);
    //     var cell2 = row.insertCell(1);
    //     cell1.innerHTML = key;
    //     cell2.innerHTML = currentGeneDictionary[key];
    //   }
    // }
    // $('#geneTbody tr').on('click', function(event) {
    //     $(this).addClass('highlight').siblings().removeClass('highlight');
    // });

    //parse value and loop through genes list to see which match
    var query = document.getElementById('geneQueryText').value;
    console.log('query is:' + query);
    if(query !== null && query !== ""){
      var s = new TreeSet();
      var gene = query;
      var length = 1;
      if(query.match(/\n/g)){
          gene = query.split("/n");
          length = gene.length;
      }
      console.log('query is:' + gene);
      console.log('length is: ' + length);
      if(length > 1){
        for(var i = 0; i < length; i++){
          //loop through master gene list array and compare
          console.log(devGeneList.master.length);
          for(var j = 0; j < devGeneList.master.length; j++){
            var geneName = devGeneList.master[j].name;
            console.log('comparing query' + gene[i]+' to ' + geneName);
            if(geneName === gene[i]){
              s.add(devGeneList.master[j]);
              console.log('added gene');
            }
          }
        }
      }else{
        console.log(devGeneList.master[0]);
        for(var j = 0; j < devGeneList.master.length; j++){
          console.log("J is: " + j);
          var geneName = devGeneList.master[j].name;
          if(geneName === gene){
            s.add(devGeneList.master[j]);
            console.log('added gene');
          }
        }
      }
      devGeneList.setSelection(this, s);
      console.log("Selected set has changed to: " + devGeneList);
    }else{
      console.log('nothinggg');
    }
    var tbody = document.getElementById("geneTbody");


    //loop thru selected set
    var list = devGeneList.getSelectedSet();

    //iterate through and get gene info
    var it = list.iterator();
    tbody.innerHTML = "";
    while(it.hasNext()){
      var row = tbody.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      var myGene = it.next();
      var name = myGene.getName();
      var description = myGene.getDesc();

      cell1.innerHTML = name;
      cell2.innerHTML = description;
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

  //can search by name (value) or ZScore (first half of key/index)
  document.getElementById("zFind").addEventListener("click", function() {

    var toFind = document.getElementById("zSearch").value;
    var count = 0;
    var list = devGeneList.getSelectedSet();
    var goStraightFound = {};
    var goHierarchyFound = {};

    //STRING SEARCH?
    if(!isNaN(toFind) && toFind !== ""){
      toFind = Number(toFind);
      document.getElementById("goCount").innerHTML = "GO Terms: " + count;
      console.log("numerical search");

      for(var key in currentGoHierarchy){
         var searchKey = Number(key.split(';')[0]);
        if(searchKey === toFind){
          goHierarchyFound[key] = currentGoHierarchy[key];
        }
      }

      for(var key in currentGoStraight){
        var searchKey = Number(key.split(';')[0]);
        if(searchKey === toFind){
          goStraightFound[key] = currentGoStraight[key];
        }
      }
      currentGoStraight = goStraightFound;
      currentGoHierarchy = goHierarchyFound;
    }else if(typeof(toFind) === 'string'){ //NUMERICAL SEARCH
      if(toFind !== ""){
        document.getElementById("goCount").innersHTML = "GO Terms: " + count;

        for(var key in currentGoHierarchy){
          //get first val
          if(currentGoHierarchy.hasOwnProperty(key) && currentGoHierarchy[key].includes(toFind)){
            goHierarchyFound[key] = currentGoHierarchy[key];
          }
        }

        for(var key in currentGoStraight){
          if(currentGoStraight.hasOwnProperty(key)  && currentGoStraight[key].includes(toFind)){
            console.log(key + " : " + currentGoStraight[key]);
            goStraightFound[key] = currentGoStraight[key];
          }
        }
        currentGoStraight = goStraightFound;
        currentGoHierarchy = goHierarchyFound;
      }else{ //empty search string? reset search results
        currentGoStraight = goStraight;
        currentGoHierarchy = goHierarchy;
      }
    }
    goPopulated = false;
    document.getElementById("expand").click();

  });

  //TODO: implement - same issue as Gene copy button, so once that's figured out
  //implement the same way but with GO Terms
  document.getElementById("goCopy").addEventListener("click", function(){
    console.log("Copying GO Terms...");
  });


  //TODO: Finish implementing - shouldn't make a complicated sorting function
  //until I know exactly how we're storing GO Terms (rather than a hardcoded object, like it is now)
  document.getElementById("sort").addEventListener("change", function(){
    var value = document.getElementById("sort").value;

    var goStraightFound = {};
    var goHierarchyFound = {};

    if(value === 'zscore'){ //sort by zscore

    }else if(value === 'name'){ //sort by name

    }else if(value === 'count'){ //sort by count!

    }else{ //reset

    }

    currentGoStraight = goStraightFound;
    currentGoHierarchy = goHierarchyFound;
    goPopulated = false;
    document.getElementById("expand").click();

  });

});
