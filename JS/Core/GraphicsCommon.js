updateList.push({ f: () => drawAll()});

var drawList = [];

function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, "Black");

    //sorts drawList by layers
    drawList.sort(function (a, b) { return b.l - a.l; });

    //draws in order of layers (lowest layer are drawn in front)
    for (var i = 0; i < drawList.length; i++) {
        drawList[i].f();
    }
}

function drawLoadingScreen() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawText("Loading images...", canvas.width / 2, canvas.height / 2, 'white');
}

function drawRect(x, y, width, height, color, alpha) {
    var alphaTemp = alpha || 1;
    ctx.globalAlpha = alphaTemp;
    ctx.fillStyle = color || "white";
    ctx.fillRect(x, y, width, height);
    ctx.globalAlpha = 1;
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color || "white";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawText(words, textX, textY, fillColor, font, align, baseline) {
    ctx.font = font || "20px Arial";

    ctx.textAlign = align || "start";
    ctx.textBaseline = baseline || "alphabetic";


    ctx.fillStyle = fillColor || "white";
    ctx.fillText(words, textX, textY);
}

function drawImage(image, x, y, ang, scaleX, scaleY, alpha) {
    ctx.save();
    ctx.translate(x, y);

    //set angTemp to ang if ang if defined, 0 otherwise
    var angTemp = ang || 0;
    ctx.rotate(angTemp);

    //set scaleTemp to ang if scale if defined, 1 otherwise
    var scaleXTemp = scaleX || 1;
    var scaleYTemp = scaleY || 1;
    ctx.scale(scaleXTemp, scaleYTemp);

    var alphaTemp = alpha || 1;
    ctx.globalAlpha = alphaTemp;

    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.globalAlpha = 1;


    ctx.scale(1, 1);

    ctx.restore();
    
}

function randomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}
