/**
 * Interactive generalization of a Venn diagram to many dimensions.
 * @author crispy & RajahBimmy
 */

var WIDTH = 800;
var HEIGHT = 600;
var clicked = false;

var canvas = document.getElementById("sungear_plot");
var context = canvas.getContext("2d");

context.rect(0, 0, WIDTH, HEIGHT);
context.fillStyle = "black";
context.fill();
