define(['anchor', 'anchorDisplay', 'p5', 'sunGear'],
function(anchor, anchorDisplay, p5, sunGear){
  var setupCanvas = new p5(function(x){
    x.setup = function() {
      var HEIGHT = document.getElementById('sunGui').clientHeight;
      var WIDTH = document.getElementById('sunGui').clientWidth;
      var cnv = x.createCanvas(WIDTH,HEIGHT);
      var testAnc = new Anchor("Oh snap");
      var testDis = new anchorDisplay.AnchorDisplay(testAnc);
      testDis.cleanup();
    }

    x.draw = function() {
      x.background(16,16,16);
      x.fill(0);

      if (x.mouseIsPressed) {
        x.fill(0);
      } else {
        x.fill(sunGear.C_HIGHLIGHT);
      }
      x.ellipse(x.mouseX, x.mouseY, 80, 80);
    }
  }, 'sunGui');
});
