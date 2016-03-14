define(['anchor', 'anchorDisplay', 'p5', 'sunGear', 'vesselDisplay'],
function(anchor, anchorDisplay, p5, sunGear, vesselDisplay){
  var canvas;
  var DrawStack = [];
  var added = false;
  var toDraw;
  var setupCanvas = new p5(function(x){
    x.setup = function() {
      var HEIGHT = document.getElementById('sunGui').clientHeight;
      var WIDTH = document.getElementById('sunGui').clientWidth;
      canvas = x.createCanvas(WIDTH,HEIGHT);
      var testDis = new vesselDisplay.VesselDisplay("testAnc");
      var testShape = testDis.makeShape(4);
      console.log(testShape);
      DrawStack.push(testShape);
    }

    x.draw = function() {
      x.background(16,16,16);
      x.fill(0);

      if(!added){
        toDraw = DrawStack.pop();
        console.log(toDraw);
        added = true;
      }

      if (x.mouseIsPressed) {
        x.fill(0);
      } else {
        x.fill(sunGear.C_HIGHLIGHT);
      }
      x.ellipse(x.mouseX, x.mouseY, 80, 80);

      x.fill(sunGear.C_PLAIN);
      x.ellipse(toDraw.x, toDraw.y, toDraw.width, toDraw.height);
    }
  }, 'sunGui');
});
