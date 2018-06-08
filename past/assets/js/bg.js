var canvas = document.querySelector("#background canvas");
var ctx = canvas.getContext("2d");
var W = window.innerWidth, H = window.innerHeight;

var pointsCount = 0;
var points = [];

var maxSpeed = 2;

function onResize() {

    _W = W; _H = H;
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;
    
    newPointsCount = ~~((W * H) / (150 * 150));
    for (var i = 0; i < points.length; ++i) {
        var point = points[i];
        point.x = point.x / _W * W;
        point.y = point.y / _H * H;
    }
    
    if (pointsCount < newPointsCount) {
        // add new points
        for (var i = pointsCount; i < newPointsCount; ++i) {
            points.push({
                x: ~~(Math.random() * W),
                y: ~~(Math.random() * H),
                sx: ~~(Math.random() * maxSpeed * 2) - maxSpeed,
                sy: ~~(Math.random() * maxSpeed * 2) - maxSpeed
            });
        }       
    } else if (pointsCount > newPointsCount) {
        // remove points
        for (var i = newPointsCount; i < pointsCount; ++i) {
            points.splice(points.length-1, 1);
        }
    }
    
    pointsCount = newPointsCount;
}
window.onresize = onResize;
onResize();

render();
function render() {

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(132,212,255,145)";
    for (var i = 0; i < pointsCount; ++i) {
        point = points[i];
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();       
    }
    
    for (var i = 0; i < pointsCount; ++i) {
        for (var j = i+1; j < pointsCount; ++j) {
            var point1 = points[i];
            var point2 = points[j];
            var dist = Math.sqrt( (point1.x - point2.x) * (point1.x - point2.x) + 
                                  (point1.y - point2.y) * (point1.y - point2.y));
                                  
            if (dist > 150)
                continue;
                
            ctx.strokeStyle = "rgba(132,212,255,"+(dist/150)+")";
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.stroke();
            
        }
    }
    
    for (var i = 0; i < pointsCount; ++i) {
        point = points[i];
        point.x += point.sx;
        point.y += point.sy;
        if (point.x > W || point.x < 0)
            point.sx = -point.sx;
        if (point.y > H || point.y < 0)
            point.sy = -point.sy;
    }
    
    requestAnimationFrame(render);
}