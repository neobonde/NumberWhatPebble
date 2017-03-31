var rocky = require('rocky');

 var globalState = {
	 width:0,
	 height:0
 };

var drawBoard = function(ctx, color){
	ctx.fillStyle = color;
	ctx.rockyFillRadial(globalState.width/2, globalState.height/2, 0, globalState.width/2, 0, 2*Math.PI);
};

var drawMinutes = function(ctx, minutes, color){
	var startingAngle = -Math.PI/2;
	var angle = 6*minutes*2*Math.PI/360;
	
	ctx.fillStyle = color;
	ctx.rockyFillRadial(globalState.width/2, globalState.height/2, 0, ctx.canvas.unobstructedWidth/2, startingAngle, startingAngle+angle);
};

var drawHour = function(ctx, hour, minutes, color){
	
	var hourMargin = globalState.width/30;
	var hourText = hour.toString();
	var textMetric = ctx.measureText(hourText);
	var hourTextWidth = textMetric.width;
	var hourXPosition;
	var hourYPosition = globalState.height/4-globalState.height/7;
	
	if(minutes < 30){
		hourXPosition = globalState.width/2 + hourTextWidth/2 + hourMargin;
	} else{
		hourXPosition = globalState.width/2 - hourMargin - hourTextWidth/2;
	}
	
  ctx.fillStyle = color;
  ctx.fillText(hour.toString(), hourXPosition, hourYPosition, globalState.width);
};

rocky.on('draw', function(event) {
  var ctx = event.context;
	
	globalState.width = ctx.canvas.unobstructedWidth;
	globalState.height = ctx.canvas.unobstructedHeight;
	
	// STYLING
	ctx.font = '30px bolder Bitham';
	var boardColor = "#FF7900";
	var minuteColor = "#5555AA";
	var hourColor = "white";
	
	ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);
	
	drawBoard(ctx, boardColor);
	var date = new Date();
	drawMinutes(ctx, date.getMinutes(), minuteColor);
	drawHour(ctx, date.getHours(), date.getMinutes(), hourColor);

});

rocky.on('minutechange', function(event) {
  console.log("Another minute with your Pebble!");
	
  rocky.requestDraw();
});