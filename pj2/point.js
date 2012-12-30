var Point2 = function(x, y) {
	this.matrix = [x, y, 1];
};

var Point3 = function(matrix) {
	if(typeof matrix[3] === "undefined") matrix[3] = 1;
	this.matrix = matrix;
};

Point3.prototype.Add = function(px, py, pz) {
	var x = this.matrix[0],
		y = this.matrix[1],
		z = this.matrix[2],
		h = this.matrix[3] || 1;

	x += px * h;
	y += py * h;
	z += pz * h;

	return new Point3([x, y, z, h]);
};

Point3.prototype.Rotate = function(angleX, angleY, angleZ) {
	var x = this.matrix[0],
		y = this.matrix[1],
		z = this.matrix[2],
		h = this.matrix[3] || 1;
	var tx,ty,tz,th;

	var PI = Math.PI, Sin = Math.sin, Cos = Math.cos;

	// x
	if(angleX){
		var sin = Sin(angleX), cos = Cos(angleX);
		tx = x;
		ty = y*cos - z*sin;
		tz = y*sin + z*cos;
		th = h;

		x = tx;
		y = ty;
		z = tz;
		h = th;
	}

	// y
	if(angleY){
		var sin = Sin(angleY), cos = Cos(angleY);
		tx = x*cos + z*sin;
		ty = y;
		tz = -x*sin + z*cos;
		th = h;

		x = tx;
		y = ty;
		z = tz;
		h = th;
	}

	// z
	if(angleZ){
		var sin = Sin(angleZ), cos = Cos(angleZ);
		tx = x*cos - y*sin;
		ty = x*sin + y*cos;
		tz = z;
		th = h;

		x = tx;
		y = ty;
		z = tz;
		h = th;
	}

	this.matrix = [x, y, z, h];
	return this;
};

Point3.prototype.DistanceSquare = function(p) {
	var x = this.matrix[0],
		y = this.matrix[1],
		z = this.matrix[2],
		h = this.matrix[3] || 1;

	if(h===0) return null;

	if(h!==1){
		x /= h;
		y /= h;
		z /= h;
	}

	var xc = p.matrix[0],
		yc = p.matrix[1],
		zc = p.matrix[2],
		hc = p.matrix[3] || 1;
		
	if(hc===0) return null;

	if(hc!==1){
		xc /= hc;
		yc /= hc;
		zc /= hc;
	}

	return (xc-x)*(xc-x) + (yc-y)*(yc-y) + (zc-z)*(zc-z);
};

Point3.prototype.Project = function(projectFaceZ, watcherPosition) {
	var x = this.matrix[0],
		y = this.matrix[1],
		z = this.matrix[2],
		h = this.matrix[3] || 1;

	if(h===0) return null;

	if(h!==1){
		x /= h;
		y /= h;
		z /= h;
	}

	var xc = watcherPosition.matrix[0],
		yc = watcherPosition.matrix[1],
		zc = watcherPosition.matrix[2],
		hc = watcherPosition.matrix[3] || 1;
		
	if(hc===0) return null;

	if(hc!==1){
		xc /= hc;
		yc /= hc;
		zc /= hc;
	}

	var xs,ys, zs = projectFaceZ;
	var t = (zs - zc) / (z - zc);
	xs = xc + (x-xc) * t;
	ys = yc + (y-yc) * t;

	//console.log(this.index, x, y, z, xs, ys);

	var result = new Point2(xs, ys);
	result.index = this.index;
	return result;
};

//-------- test -----------

Point3.prototype.Test = function() {
	var p1 = new Point3([1,2,3]);

	var m = p1.Add(4,5,6).matrix;
	if(!(m[0]===5 && m[1]===7 && m[2]===9)){
		//console.log(p1, m);
		alert("Point3 add test wrong!");
	}

	var p2 = new Point3([0,0,1]);
	var m2 = p1.Project(2, p2).matrix;
	if(!(m2[0]===0.5 && m2[1]===1 && m2[2]===1)){
		//console.log(p1, p2, m2);
		alert("Point3 project test wrong!");
	}

	var p3 = new Point3([2,2,2]);
	//console.log(p3.Rotate(Math.PI/6).matrix);
	//console.log(p3.Rotate(-Math.PI/6).matrix);
	//console.log(p3.Rotate(0, Math.PI/6).matrix);
	//console.log(p3.Rotate(0, -Math.PI/6).matrix);
	//console.log(p3.Rotate(0,0, Math.PI/6).matrix);
};

