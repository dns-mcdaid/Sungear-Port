define(['jquery'], function(jq){

  // Control table highlighter
  $('#controls tbody tr').on('click', function(event) {
      $(this).addClass('highlight').siblings().removeClass('highlight');
  });

  $('#genes tbody tr').on('click', function(event) {
      $(this).addClass('highlight').siblings().removeClass('highlight');
  });
});



/**
HTML Canvas initialization

var WIDTH = 800;
var HEIGHT = 600;
var clicked = false;

var canvas = document.getElementById("sungear_plot");
var context = canvas.getContext("2d");

context.rect(0, 0, WIDTH, HEIGHT);
context.fillStyle = "black";
context.fill();
*/
