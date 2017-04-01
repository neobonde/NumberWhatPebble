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

var drawHour = function(ctx, hour, minutes, color1, color2){
	
	var hourMargin = globalState.width/30;
	var hourText = hour.toString();
	var textMetric = ctx.measureText(hourText);
	var hourTextWidth = textMetric.width;
	var hourXPosition;
	var hourYPosition = globalState.height/4-globalState.height/7;
	
	console.log(hourTextWidth);
	
	if(minutes < 30){
		hourXPosition = globalState.width/2  + hourMargin;
		ctx.textAlign = 'left'
		ctx.fillStyle = color1;
	} else{
		hourXPosition = globalState.width/2 - hourMargin;
		ctx.textAlign = 'right'
		ctx.fillStyle = color2;
		if(hour == 12){
			hour = 1;
		} else {
			hour = hour + 1;
		}
	}
	
  ctx.fillText(hour.toString(), hourXPosition, hourYPosition, globalState.width);
};

rocky.on('draw', function(event) {
  var ctx = event.context;
	
	globalState.width = ctx.canvas.unobstructedWidth;
	globalState.height = ctx.canvas.unobstructedHeight;
	
	// STYLING
	ctx.font = '30px bolder Bitham';
	var boardColor = "#4180D0";
	var minuteColor = "#95F6F2";
	var hourColor1 = "black";
	var hourColor2 = "white";
	
	
	ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);
	
	drawBoard(ctx, boardColor);
	var date = new Date();
	drawMinutes(ctx, date.getMinutes(), minuteColor);
	drawHour(ctx, date.getHours(), date.getMinutes(), hourColor1, hourColor2);

});

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});