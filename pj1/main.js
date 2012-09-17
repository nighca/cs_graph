var A = new Point(20, 20);
var B = new Point(20, 160);
var C = new Point(160, 160);
var D = new Point(160, 20);
var E = new Point(80, 80);

var sample_points = [A, B, C, D, E];
var sample_polygon = new Polygon(sample_points);

    var c=document.getElementById("mycanvas"); 
    var ctx=c.getContext("2d"); 

    var width = 200;//same with the width of canvas in html
    var height = 200;

    var mark = []//mark[y][x], to mark if a point being part of edge
    for(i=0;i<=height;i++){
        mark[i] = [];
    }

    //ctx.clearRect(0,0,width,height);

    /*
    var x=0;
    var y=0;

    var I=0;

    ctx.fillStyle='#333';

    function fill(){
        ctx.fillRect(x, y, step, step);
        x += step;
        x %= width;
        if(x<step){
            y += step;
            y %= height;
            if(y<step){
                clearInterval(I);
            }
        }
    }
    */

    //I = setInterval(fill, 1);

    function drawpixel(x, y, color){
        ctx.fillStyle = color;
        ctx.fillRect(x, height-y, 1, 1);
    }
    function draw(x, y, dx, dy, color){
        ctx.fillStyle = color;
        ctx.fillRect(x, height-y, dx, dy);
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
                //drawpixel(x, y, color);
                eps += dy;
                if ((eps << 1) >= dx){
                    y += uy;
                    if(y != l.endpoint.y && dy != 0){
                        mx = x;
                        my = y;
                        if(getmark(x, y)){
                            mx = x + ux;
                            console.log("add to1", x, y, mx);
                            console.log(l);
                        }
                        markpixel(mx, my);
                    }
                    eps -= dx;
                }
            }
        }else{
            for (y = l.beginpoint.y; y != l.endpoint.y; y += uy){
                //drawpixel(x, y, color);
                mx = x;
                my = y;
                if(getmark(x, y)){
                    mx = x + ux;
                    console.log("add to2", x, y, mx);
                            console.log(l);
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
                console.log("remove", curr.y, curr.x);
                //draw(curr.x-2, curr.y+2, 5, 5, '#ff0000');
            }
        }
    }

    function fill_polygon(p, color){
        if(!fill_polygon.i) {
            fill_polygon.i = p.min_y;
            fill_polygon.j = 0;
            fill_polygon.inside = false;
        }
        //console.log(fill_polygon.i, fill_polygon.j);

        if(fill_polygon.i<p.max_y){
            if(mark[fill_polygon.i][fill_polygon.j]){
                fill_polygon.inside = !fill_polygon.inside;
            }
            if(fill_polygon.inside){
                drawpixel(fill_polygon.j, fill_polygon.i, color);
            }

            fill_polygon.j = (fill_polygon.j+1)%width;
            if(fill_polygon.j == 0){
                fill_polygon.i = (fill_polygon.i+1);
            }
        }else{
            clearInterval(fill_polygon.sb);
        }
    }

    draw_polygon(sample_polygon, '#333');
    rm_special(sample_polygon);
    
    //fill_polygon(sample_polygon, '#aaa');
    fill_polygon.sb = setInterval('fill_polygon(sample_polygon, "#aaa");', 1);
