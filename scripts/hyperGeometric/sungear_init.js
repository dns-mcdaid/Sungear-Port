var WIDTH = 800;
var HEIGHT = 600;
var clicked = false;

var canvas = document.getElementById("sungear_plot");
var context = canvas.getContext("2d");
	


(function(){
	var mousePos;
	
	context.rect(0, 0, WIDTH, HEIGHT);
	context.fillStyle = "black";
	context.fill();
	canvas.onmousemove = mouseIsMoving;

	canvas.addEventListener("mousedown", mouseIsClicked, false);
	canvas.addEventListener("mouseup", mouseIsntClicked, false);
	

	setInterval(getMousePosition, 1);

	function mouseIsClicked(event){
		clicked = true;
	} 

	function mouseIsntClicked(event){
		clicked = false;
	}

	function mouseIsMoving(event){
		var dot, eventDoc, doc, body, pageX, pageY;
		var rect = canvas.getBoundingClientRect();
		
		mousePos = {
            x: event.clientX - rect.left,
          	y: event.clientY - rect.top
        };
	}
	function getMousePosition(){
		
		var pos = mousePos;

		context.clearRect(0,0, WIDTH, HEIGHT);
		context.rect(0, 0, WIDTH, HEIGHT);
		context.fillStyle = "black";
		context.fill();
		
		if(clicked){
			context.clearRect(0,0, WIDTH, HEIGHT);
			context.rect(0, 0, WIDTH, HEIGHT);
			context.fillStyle = "red";
			context.fill();

			context.font="30px Georgia";
			context.fillStyle = "blue";
			context.fillText("AHH!", mousePos.x, mousePos.y)
			
		}
		else if (pos){
	
			context.font="20px Georgia";
			context.fillStyle = "white";
			context.fillText("Hello World!", mousePos.x, mousePos.y);
			// TODO: WIPE CANVAS
		}
	}
})();