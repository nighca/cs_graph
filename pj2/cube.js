var Cube = function(center, radius) {
	this.center = center;
	this.radius = radius;
	this.init();
};

Cube.prototype.init = function() {
	// points
	var center = this.center, radius = this.radius;
	var points = [];
	points.push(center.Add(radius, radius, radius));
	points.push(center.Add(radius, radius, -radius));
	points.push(center.Add(radius, -radius, radius));
	points.push(center.Add(radius, -radius, -radius));
	points.push(center.Add(-radius, radius, radius));
	points.push(center.Add(-radius, radius, -radius));
	points.push(center.Add(-radius, -radius, radius));
	points.push(center.Add(-radius, -radius, -radius));
	this.points = points;

	for (var i = points.length - 1; i >= 0; i--) {
		points[i].index = i;
	};

	var faces = [];
	faces.push(new Face([points[0], points[1], points[3], points[2]], "rgba(200,0,0, 1)"));
	faces.push(new Face([points[0], points[4], points[5], points[1]], "rgba(0,200,0, 1)"));
	faces.push(new Face([points[0], points[2], points[6], points[4]], "rgba(0,0,200, 1)"));
	faces.push(new Face([points[1], points[3], points[7], points[5]], "rgba(200,200,0, 1)"));
	faces.push(new Face([points[2], points[3], points[7], points[6]], "rgba(200,0,200, 1)"));
	faces.push(new Face([points[4], points[5], points[7], points[6]], "rgba(0,200,200, 1)"));
	this.faces = faces;
	
};

Cube.prototype.Rotate = function(x,y,z) {
	var points = this.points;
	for(var i=0,l=points.length;i<l;i++){
		var point = points[i];
		//console.log(point.matrix, i);
		point.Rotate(x,y,z);
		//console.log(point.matrix, i);
	}
	return this;
};

// default project face: z=3*radius, default watcher position: (0,0,6*radius)
Cube.prototype.Project = function(projectFaceZ, watcherPosition) {
	var pFaceZ = projectFaceZ || this.radius*2;
	var wPosition = watcherPosition || new Point3([0, 0, this.radius*3]);
	var faces = this.faces;
	var resultFaces = [];

	for(var i=0,l=faces.length;i<l;i++){
		var face = faces[i];
		resultFaces.push(face.Project(pFaceZ, wPosition));
	}

	resultFaces.sort(function(a,b){return a.dist<b.dist?1:-1});

	return resultFaces;
};