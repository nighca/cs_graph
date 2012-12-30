var Face = function(points, color){
	this.points = points;
	this.color = color;
};

Face.prototype.Project = function(projectFaceZ, watcherPosition) {
	var points = this.points;

	var resultPoints = [];
	var dist = 0;
	for(var i=0,l=points.length;i<l;i++){
		var point = points[i];

		dist += Math.sqrt(watcherPosition.DistanceSquare(point));

		resultPoints.push(point.Project(projectFaceZ, watcherPosition));
	}

	dist /= points.length;
	var result = new Face(resultPoints, this.color);
	result.dist = dist;
	return result;
};
