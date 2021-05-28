var canvas = null;
var context = null;
var center = {};

window.onload = function(e){
    canvas = document.querySelector('#canvas');
    context = canvas.getContext('2d');
    center = {x:200, y:200};
    drawClock();
}

function drawClock()
{
    clearRect();
    drawFrame();
    drawHour();
    drawMinute();
    drawSecond();
    drawDot();
    requestAnimationFrame(drawClock);
}

function clearRect()
{
    context.clearRect(0, 0, 400, 400);
}

function drawFrame()
{
    for(var i = 0; i<60; i++)
    {
        var angle = i * 6;
        var width = (i%5 == 0)?3:1;
        var pts = createPoints(angle, center, 180, 190);
        drawLine(pts, width, '#555555');
    }
}
function createPoints(angle, centerPoint, r1, r2)
{
    var point1 = {
        x:(centerPoint.x+(r1*Math.cos(Math.PI*angle/180))),
        y:(centerPoint.y+(r1*Math.sin(Math.PI*angle/180)))
    }
    var point2 = {
        x:(centerPoint.x+(r2*Math.cos(Math.PI*angle/180))),
        y:(centerPoint.y+(r2*Math.sin(Math.PI*angle/180)))
    }
    return [point1, point2];
}

function drawLine(points, lineWidth, strokeStyle)
{
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
}

function drawHour()
{
    var hour = ((new Date()).getHours() % 12);
    var minute = (new Date()).getMinutes();
    var second = (new Date()).getSeconds();
    var angle = (((hour) + (minute / 60) + (second/3600)) * 30) - 90;
    var points = createPoints(angle, center, -10, 100);
    drawLine(points, 5, '#555566');
}

function drawMinute()
{
    var minute = (new Date()).getMinutes();
    var second = (new Date()).getSeconds();
    var angle = (((minute) + (second/60)) * 6) - 90;
    var points = createPoints(angle, center, -15, 150);
    drawLine(points, 3, '#228822');
}

function drawSecond()
{
    var angle = ((new Date()).getSeconds() * 6) - 90;
    var points = createPoints(angle, center, 0, 175);
    drawLine(points, 1, '#DD2222');
    var points2 = createPoints(angle, center, 0, -40);
    drawLine(points2, 5, '#DD2222');
}

function drawDot()
{
    var radius = 5;
    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#DD2222';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#DD2222';
    context.stroke();
}
