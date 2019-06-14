updateList.push({ f: () => drawAllP()});

var drawListP = [];

function drawAllP() {
    drawRectP(0, 0, canvas.width, canvas.height, "black");

    //sorts drawList by layers
    drawListP.sort(function (a, b) { return b.l - a.l; });

    //draws in order of layers (lowest layer are drawn in front)
    for (var i = 0; i < drawListP.length; i++) {
        drawListP[i].f();
    }
}

function drawRectP(x, y, width, height, color, alpha) {
    var alphaTemp = alpha || 1;
    ctxP.globalAlpha = alphaTemp;
    ctxP.fillStyle = color || "white";
    ctxP.fillRect(x, y, width, height);
    ctxP.globalAlpha = 1;
}

function drawCircleP(x, y, radius, color) {
    ctxP.fillStyle = color || "white";
    ctxP.beginPath();
    ctxP.arc(x, y, radius, 0, Math.PI * 2, true);
    ctxP.fill();
}

function drawTextP(words, textX, textY, fillColor, font, align, baseline) {
    ctxP.font = font || "20px Arial";

    ctxP.textAlign = align || "start";
    ctxP.textBaseline = baseline || "alphabetic";


    ctxP.fillStyle = fillColor || "white";
    ctxP.fillText(words, textX, textY);
}

function drawImageP(image, x, y, ang, scaleX, scaleY, alpha) {
    ctxP.save();
    ctxP.translate(x, y);

    //set angTemp to ang if ang if defined, 0 otherwise
    var angTemp = ang || 0;
    ctxP.rotate(angTemp);

    //set scaleTemp to ang if scale if defined, 1 otherwise
    var scaleXTemp = scaleX || 1;
    var scaleYTemp = scaleY || 1;
    ctxP.scale(scaleXTemp, scaleYTemp);

    var alphaTemp = alpha || 1;
    ctxP.globalAlpha = alphaTemp;

    ctxP.drawImage(image, -image.width / 2, -image.height / 2);
    ctxP.globalAlpha = 1;


    ctxP.scale(1, 1);

    ctxP.restore();
    
}

