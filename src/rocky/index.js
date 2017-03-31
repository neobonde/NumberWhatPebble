var rocky = require('rocky');

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;
	
	ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);

	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.rockyFillRadial(72, 84, 0, 30, 0, 2 * Math.PI);
	
});

rocky.on('minutechange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});