var WIDTH = 568;
var HEIGHT = 262;
var canvas;
var context;

var canvas = document.getElementById("sungear_plot");
var context = canvas.getContext("2d");
context.rect(0, 0, WIDTH, HEIGHT);
context.fillStyle = "black";
context.fill();

/**
function init() {
  canvas = document.getElementById('sungear_plot');
  context = canvas.getContext('2d');
  ctx.rect(20,20,150,100);
  ctx.fillStyle='red';
  ctx.fill();
  //return setInterval(draw, 10);
}

function clear() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
  	background(000);
}


init();
*/
