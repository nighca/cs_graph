var c=document.getElementById("mycanvas"); 
var ctx=c.getContext("2d"); 

ctx.width = c.width;//same with the width of canvas in html
ctx.height = c.height;

ctx.clear = function(){
    ctx.clearRect(0,0,this.width,this.height);
};

var centerPoint = new Point3([0,0,0]);
centerPoint.Test(); 

var cube = new Cube(centerPoint, 200);
console.log(cube);

var PI = Math.PI;

drawProjection(cube, ctx);


// bind

var $ = function (id) {
    return document.getElementById(id);
};

var timer = 0;
var command = "";

var RotateAndDraw = function(x, y, z){
    cube.Rotate(x,y,z);
    ctx.clear();
    drawProjection(cube, ctx);
};

$("rotateX").addEventListener("click", function(event){
    clearInterval(timer);
    command = "RotateAndDraw(PI/72,0,0)";
    timer = setInterval(command, 100);
});

$("rotateY").addEventListener("click", function(event){
    clearInterval(timer);
    command = "RotateAndDraw(0,PI/72,0)";
    timer = setInterval(command, 100);
});

$("rotateZ").addEventListener("click", function(event){
    clearInterval(timer);
    command = "RotateAndDraw(0,0,PI/72)";
    timer = setInterval(command, 100);
});

$("stop").addEventListener("click", function(event){
    clearInterval(timer);
});

$("goon").addEventListener("click", function(event){
    clearInterval(timer);
    timer = setInterval(command, 100);
});

/*
var testPoints = [];
testPoints.push(new Point2(100, 100));
testPoints.push(new Point2(300, 100));
testPoints.push(new Point2(300, 300));
var testFace = new Face(testPoints);
drawFace(testFace, ctx);
*/