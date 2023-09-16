let canvas = null;
let ctx = null;

let lines = [];
let start = {x:0, y:0};
let end  = {x:0, y:0};
let paint = false;

window.addEventListener('load', () => {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    resize();
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('keydown', keydown);
});

function absDistance(start, end) {
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
}

function getCoord(evt) {
    return {
        x: evt.clientX - canvas.offsetLeft,
        y: evt.clientY - canvas.offsetTop
    };
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function startPainting(evt) {
    if (evt.which == 1 && !paint)
    {
        start = getCoord(evt)
        paint = true;
    }
}

function stopPainting(evt) {
    paint = false;

    if (absDistance(start, end) > 5)
    {
        lines.push({
            start: start,
            end: end
        })
    }
}

function mouseMove(evt)
{
    if (!paint)
        return;

    end = getCoord(evt);
    sketch();
}

function sketch()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(line => {
        drawArrow(ctx, line.start.x, line.start.y, line.end.x, line.end.y);
    })

    if (absDistance(start, end) > 5)
    {
        drawArrow(ctx, start.x, start.y, end.x, end.y);
    }
}

function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth = 10, color = 'green') {
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
 
    ctx.save();
    ctx.strokeStyle = color;
 
    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
 
    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
               toy-headlen*Math.sin(angle+Math.PI/7));
 
    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}

function keydown(evt) {
    if (evt.key == 'Escape')
    {
        lines = [];
        start = end;
        sketch();
    }
}