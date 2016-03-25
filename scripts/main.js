define(['anchor', 'anchorDisplay', 'p5', 'sungear', 'vesselDisplay'],
function(anchor, anchorDisplay, p5, sungear, vesselDisplay){
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
  var setupCanvas = new p5(function(p5){
    p5.setup = function() {
      WIDTH = document.getElementById('sunGui').clientWidth;
      HEIGHT = document.getElementById('sunGui').clientHeight;
      canvas = p5.createCanvas(WIDTH,HEIGHT);
      var testDis = new vesselDisplay.VesselDisplay("testAnc");
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
      p5.stroke("#f00");
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

    document.getElementById("findCool").addEventListener("click", function(){
      currentColor = "#0ff";
      sides++;
      makePolygon = true;
    });

  }, 'sunGui');


});
