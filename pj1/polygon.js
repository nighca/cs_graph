//polygon.js

Polygon = function(points){
	for(i=0;i<points.length;){
		p1 = points[i];
		p2 = points[(i+1)%points.length];
		if(p1.x==p2.x && p1.y==p2.y){
			points.splice(i, 1);
		}else{
			i++;
		}
	}
	this.points = points;
	this.p_num = points.length;
	this.edges = [];
	for(i=0;i<this.p_num;i++){
		p1 = points[i];
		p2 = points[(i+1)%this.p_num];
		l = new Line(p1, p2);
		this.edges.push(l);
	}
	this.min_y = points[0].y;
	this.max_y = points[0].y;
	for(var i in points){
		if(points[i].y < this.min_y) this.min_y = points[i].y;
		if(points[i].y > this.max_y) this.max_y = points[i].y;
	}
}