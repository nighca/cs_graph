//line.js

var Line = function(beginpoint, endpoint) {
    this.beginpoint = beginpoint;
    this.endpoint = endpoint;
    this.dx = endpoint.x - beginpoint.x;
    this.dy = endpoint.y - beginpoint.y;
    this.slope = this.dy / this.dx;
};