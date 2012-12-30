
var drawFace = function(face, ctx, fillStyle) {
	var points = face.points;

	ctx.beginPath();

	for(var i=0,l=points.length;i<l;i++){
		var point = points[i];
		if(i==0){
			ctx.moveTo(point.matrix[0]+ctx.width/2, point.matrix[1]+ctx.height/2);
		}else{
			ctx.lineTo(point.matrix[0]+ctx.width/2, point.matrix[1]+ctx.height/2);
		}
	}

	ctx.closePath();
	ctx.fillStyle = face.color || fillStyle || 'rgba(200,200,200, 0.5)';
	ctx.fill();	
};

var drawProjection = function(cube, ctx){
	var projection = cube.Project();

	for(var i=0,l=projection.length;i<l;i++){
	    var face = projection[i];
	    //if(face.zIndex >= 0)
	        drawFace(face, ctx);
	}
};