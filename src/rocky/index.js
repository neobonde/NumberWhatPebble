var rocky = require('rocky');

var drawBoard = function(ctx, color){
	var width = ctx.canvas.unobstructedWidth;
	var height = ctx.canvas.unobstructedHeight;
	
	ctx.fillStyle = color;
	ctx.rockyFillRadial(width/2, height/2, 0, width/2, 0, 2*Math.PI);
};

var drawMinutes = function(ctx, minutes, color){
	var width = ctx.canvas.unobstructedWidth;
	var height = ctx.canvas.unobstructedHeight;
	var startingAngle = -Math.PI/2;
	var angle = 6*minutes*2*Math.PI/360;
	
	console.log(angle);
	ctx.fillStyle = color;
	ctx.rockyFillRadial(width/2, height/2, 0, ctx.canvas.unobstructedWidth/2, startingAngle, startingAngle+angle);
};

var drawHour = function(ctx, hour, color){
		  // Determine the width and height of the display
  var width = ctx.canvas.unobstructedWidth;
  var height = ctx.canvas.unobstructedHeight;
	
	var hourXPosition = 1/4*width;
	var hourYPosition = height/4;

  // Set the text color
  ctx.fillStyle = 'white';

  // Center align the text
  ctx.textAlign = 'center';

  // Display the time, in the middle of the screen
  ctx.fillText(hour.toString(), hourXPosition, hourYPosition, width);
};

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;
	
	// STYLING
	var boardColor = "#FF7900";
	var minuteColor = "#5555AA";
	var hourColor = "white";
	
	ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);
	

	drawBoard(ctx, boardColor);
	var date = new Date();
	drawMinutes(ctx, date.getMinutes(), minuteColor);
	drawHour(ctx, date.getHours(), hourColor);

});

rocky.on('minutechange', function(event) {
  console.log("Another minute with your Pebble!");
	
  rocky.requestDraw();
});