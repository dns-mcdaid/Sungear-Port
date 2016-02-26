define(['jquery', 'p5'], function(jq, p5){

  // Control table highlighter
  $('#controls tbody tr').on('click', function(event) {
      $(this).addClass('highlight').siblings().removeClass('highlight');
  });

  $('#geneTbody tr').on('click', function(event) {
      $(this).addClass('highlight').siblings().removeClass('highlight');
  });

  /*
  // HTML Canvas initialization
  var WIDTH = 300; // NO IDEA WHY BUT DON'T CHANGE IT
  var HEIGHT = 325;
  var clicked = false;

  var canvas = document.getElementById("sunGui");
  var context = canvas.getContext("2d");

  context.rect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = "#fff";
  context.fill();
  */
  var img;
  var canvas;

  function setup() {

    img = createImg("http://th07.deviantart.net/fs70/PRE/i/2011/260/3/5/dash_hooray_by_rainbowcrab-d49xk0d.png");
    canvas = createCanvas(400, 400);

    img.position(190, 50);
    img.size(200, 200);
    canvas.position(300, 50);
  }

  function draw() {
    noStroke();
    background(220, 180, 200);
    fill(180, 200, 40);
    strokeWeight(6);
    stroke(180, 100, 240);
    for (var i = 0; i < width; i += 15) {
      line(i, 0, i, height);
    }
  }
});
