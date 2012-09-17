//Point.js

Point = function(x, y) {this.x=x; this.y=y;};

Point.prototype = {
	copy : function(){
		return new Point(this.x, this.y);
	},
	negate : function(){
		return new Point(-this.x, -this.y);
	},
	add : function(v){
		return new Point(this.x + v.x, this.y + v.y);
	},
	distance : function(v){
		return Math.sqrt((this.x - v.x)*(this.x - v.x), (this.y - v.y)*(this.y - v.y));
	},
}

Point.zero = new Point(0, 0);

