define(['p5', 'sungear', 'vesselDisplay','Container'],
function(p5, sungear, vesselDisplay, Container){

  var masterFileArray = [];
  var canvas;
  var DrawStack = [];
  var added = false;
  var pressed = false;
  var makePolygon = false;
  var toDraw;
  var currentColor = Container.sungear.C_HIGHLIGHT;
  var sides = 1;
  var HEIGHT;
  var WIDTH;
  var isPulling = false;

  function main() {


    sides = masterFileArray.length;
    makePolygon = true;
    var setupCanvas = new p5(function(p5){
      p5.setup = function() {
        WIDTH = document.getElementById('sunGui').clientWidth;
        HEIGHT = document.getElementById('sunGui').clientHeight;
        canvas = p5.createCanvas(WIDTH,HEIGHT);
        // var testDis = new Container.vesselDisplay("testAnc");
        // var testShape = testDis.makeShape(4);
        // console.log(testShape);
        // DrawStack.push(testShape);

      },

      p5.draw = function() {
        p5.background(16,16,16);
        p5.fill(0);

        // if(!added){
        //   toDraw = DrawStack.pop();
        //   console.log(toDraw);
        //   added = true;
        // }

        if(makePolygon) {
          p5.polygon(WIDTH/2, HEIGHT/2, HEIGHT/2-5, sides);
        }

        if (p5.mouseIsPressed) {
          p5.fill(0);
        } else {
          p5.fill(currentColor);
        }
        p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);

        p5.fill(Container.sungear.C_PLAIN);
        // p5.ellipse(toDraw.p5, toDraw.y, toDraw.width, toDraw.height);
      },

      p5.polygon = function(x, y, radius, npoints) {
        p5.fill(16,16,16);
        p5.stroke(Container.sungear.C_PLAIN);
        p5.strokeWeight(4);
        if (npoints > 2) {
          var angle = p5.TWO_PI / npoints;
          p5.beginShape();
          for (var a = 0; a < p5.TWO_PI; a += angle) {
            var sx = x + p5.cos(a) * radius;
            var sy = y + p5.sin(a) * radius;
            p5.vertex(sx, sy);
          }
          p5.endShape(p5.CLOSE);
        } else {
          p5.ellipse(x,y,HEIGHT-5,HEIGHT-5)
        }
        p5.stroke(0);
        p5.strokeWeight(1);
      }

    }, 'sunGui');
  }

  function loadData() {
    isPulling = true;
    var files = document.getElementById("inFiles").files;
    var inFiles = [];
    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function (f) {
          return function (e) {
            var contents = e.target.result;
            masterFileArray.push({name:f.name, contents:contents});
          }
        })(f);
        reader.readAsText(f, "UTF-8");
    }
    document.getElementById("setupload").innerHTML = "";
    isPulling = false;
  }

  document.getElementById("upload").addEventListener('click', function() {
    loadData();
    function continuePulling() {
      if (isPulling) {
        setTimeout(function(){continuePulling()},100);
      } else {
        main();
      };
    }
  });

  // Sungear Direct Control Panel options.
  document.getElementById("restart").addEventListener("click", function(){
    console.log("Restarting Sungear...");
  });

  document.getElementById("all").addEventListener("click", function(){
    console.log("Selecting all genes...");

  });

  document.getElementById("none").addEventListener("click", function(){
    console.log("Deselecting all gene sets...");

  });

  document.getElementById("left").addEventListener("click", function(){
    console.log("Loading previous gene...");

  });

  document.getElementById("right").addEventListener("click", function(){
    console.log("Loading next gene...");

  });

  document.getElementById("narrow").addEventListener("click", function(){
    console.log("Narrowing down gene options...");

  });

  document.getElementById("union").addEventListener("click", function(){
    console.log("Displaying all unions...");

  });

  document.getElementById("intersect").addEventListener("click", function(){
    console.log("Displaying all intersections...");

  });

  document.getElementById("findCool").addEventListener("click", function(){
    console.log("Locating cool genes...");
  });

  document.getElementById("remove").addEventListener("click", function(){
    console.log("Removing genes...");

  });

  document.getElementById("export").addEventListener("click", function(){
    console.log("Exporting genes...");

  });

  // Genes display buttons
  document.getElementById("geneQuery").addEventListener("click", function(){
    console.log("Querying the genes...");

  });

  document.getElementById("geneCopy").addEventListener("click", function(){
    console.log("Copying genes...");

  });

  document.getElementById("geneFind").addEventListener("click", function(){
    var toFind = document.getElementById("geneSearch").value;
    console.log("Locating " + toFind);
  });

  // GO Terms
  document.getElementById("expand").addEventListener("click", function(){
    console.log("Expanding on GO Terms...");

  });

  document.getElementById("collapse").addEventListener("click", function(){
    console.log("Collapsing GO Terms...");
  });

  document.getElementById("zFind").addEventListener("click", function() {
    var toFind = document.getElementById("zSearch").value;
    document.getElementById("goCount").innerHTML = "GO Terms: " + toFind;
  });

  document.getElementById("goCopy").addEventListener("click", function(){
    console.log("Copying GO Terms...");
  });

  document.getElementById("sort").addEventListener("click", function(){
    console.log("Sorting Genes by z-Score");
  });
});
