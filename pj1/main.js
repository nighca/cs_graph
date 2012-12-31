var c=document.getElementById("mycanvas"); 
var ctx=c.getContext("2d"); 

ctx.width = c.width;//same with the width of canvas in html
ctx.height = c.height;


var mark = []//mark[y][x], to mark if a point being part of edge
for(i=0,height=ctx.height;i<=height;i++){
    mark[i] = [];
}

var params_in = document.getElementsByClassName('params_in')[0];
var add = document.getElementById("add");
var remove = document.getElementById("remove");
var draw = document.getElementById("draw");


ctx.clear = function(){
    ctx.clearRect(0,0,this.width,this.height);
};

var clear = function(){
    ctx.clear();
    for(i=0,height=ctx.height;i<=height;i++){
        mark[i] = [];
    }
};

var init = function(){
    var point_ins = document.getElementsByClassName('point_in');
    var points = [];
    for(var i=0,num=point_ins.length;i<num;i++){
        var point_in = point_ins[i];
        var x = parseInt(point_in.getElementsByClassName("x")[0].value, 10);
        var y = parseInt(point_in.getElementsByClassName("y")[0].value, 10);
        var point = new Point(x,y);
        points.push(point);
    }
    var polygon = new Polygon(points);
    clear();
    fill_polygon(polygon, "#aaa");
}

function drawpixel(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, ctx.height-y, 1, 1);
}
function draw(x, y, dx, dy, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, ctx.height-y, dx, dy);
}

function markpixel(x, y){
    mark[y][x] = true;
}
function getmark(x, y){
    return mark[y][x];
}

function Bresenham_Line(l, color){//to mark or draw a line 
    var ux = ((l.dx > 0) << 1) - 1;//x的增量方向，取或-1
    var uy = ((l.dy > 0) << 1) - 1;//y的增量方向，取或-1
    var x = l.beginpoint.x;
    var y = l.beginpoint.y;
    var eps;//eps为累加误差

    eps = 0;dx = Math.abs(l.dx); dy = Math.abs(l.dy); 
    if (dx > dy){
        markpixel(x, y);
        for (x = l.beginpoint.x; x != l.endpoint.x; x += ux){
            if(color) drawpixel(x, y, color);
            eps += dy;
            if ((eps << 1) >= dx){
                y += uy;
                if(y != l.endpoint.y && dy != 0){
                    mx = x;
                    my = y;
                    if(getmark(x, y)){
                        mx = x + ux;
                        //console.log("add to1", x, y, mx);
                        //console.log(l);
                    }
                    markpixel(mx, my);
                }
                eps -= dx;
            }
        }
    }else{
        for (y = l.beginpoint.y; y != l.endpoint.y; y += uy){
            if(color) drawpixel(x, y, color);
            mx = x;
            my = y;
            if(getmark(x, y)){
                mx = x + ux;
                //console.log("add to2", x, y, mx);
                //console.log(l);
            }
            markpixel(mx, my);
            eps += dx;
            if ((eps << 1) >= dy){
                x += ux;
                eps -= dy;
            }
        }
    }             
}

function draw_polygon(p, color){//to draw or mark a polygon by its edges
    for(var i in p.edges){
        Bresenham_Line(p.edges[i], color);
    }
}

function rm_special(p){//remove 极值点 out from mark
    for(var i in p.points){
        i = parseInt(i);
        n = p.p_num;
        curr = p.points[i];
        var p1, p2;
        if(i==0){
            p1 = p.points[n-1];
            p2 = p.points[i+1];
        }else{ 
            if(i==n-1){
                p1 = p.points[i-1];
                p2 = p.points[0];
            }else{
                p1 = p.points[i-1];
                p2 = p.points[i+1];
            }
        }

        dy1 = p1.y- curr.y;
        dy2 = p2.y- curr.y;

        if(dy1*dy2 >= 0 && !(dy1*dy2==0 && dy1+dy2<0)){
            mark[curr.y][curr.x] = false;
            //console.log("remove", curr.y, curr.x);
            //draw(curr.x-2, curr.y+2, 5, 5, '#ff0000');
        }
    }
}

function fill_polygon(p, color){
    draw_polygon(p);
    rm_special(p);

    for(var i = p.min_y, j = 0, inside = false;i<p.max_y;){
        if(mark[i] && mark[i][j]===true) inside = !inside;

        if(inside) drawpixel(j, i, color);

        var width = ctx.width;

        j = (j+1)%width;
        if(j == 0) i++;
    }

}


//bind

add.addEventListener("click", function(){
    var point_in = document.getElementsByClassName('point_in')[0].cloneNode(true);
    params_in.appendChild(point_in);
});
remove.addEventListener("click", function(){
    var point_ins = document.getElementsByClassName('point_in');
    var num = point_ins.length;
    if(num > 1){
        var point_in = point_ins[num-1];
        params_in.removeChild(point_in);    
    }
});
draw.addEventListener("click", function(){
    init();
});

//bind end

init();
