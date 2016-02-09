define(['jquery', 'd3'], function(jq, d3){

  // Control table highlighter
  $('#controls tbody tr').on('click', function(event) {
      $(this).addClass('highlight').siblings().removeClass('highlight');
  });

  $('#genes tbody tr').on('click', function(event) {
      $(this).addClass('highlight').siblings().removeClass('highlight');
  });

  // HTML Canvas initialization

  /**
  var WIDTH = 300; // NO IDEA WHY BUT DON'T CHANGE IT
  var HEIGHT = 325;
  var clicked = false;

  var canvas = document.getElementById("sunGui");
  var context = canvas.getContext("2d");

  context.rect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = "#000";
  context.fill();
  */
});
