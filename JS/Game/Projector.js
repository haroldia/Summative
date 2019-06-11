drawListP.push({f: () => project(), l: 10});


const SLICE_WIDTH = CANVAS_WIDTH / (PLAYER_FOV / SCAN_RES);
const PLANE_DIST = 600;

var walls = []

var g = false;


const INTENSITY = 1;
const INT_MULTI = 300;

function project() {

    walls.sort(function (a, b) { return b.d - a.d; });

    // console.log(SLICE_WIDTH)
    // console.log(walls.length, PLAYER_FOV/SCAN_RES, CANVAS_WIDTH / SLICE_WIDTH);
    for (var i of walls) {
        if (!i.s) {
            var x = (i.x + (PLAYER_FOV / 2)) * SLICE_WIDTH * (1 / SCAN_RES);
            var h = (64 / i.h) * PLANE_DIST;
            var k = 255 * (INTENSITY / i.h) * INT_MULTI;
            var t = Math.floor((walls.indexOf(i) / 12)) % 2 == 0 ? 1 : 0;
            drawSlice(x, h, k, 0);
        } else {
            var k = 255 * (INTENSITY / i.h) * INT_MULTI;
            var h = (64 / (i.h)) * PLANE_DIST;

            drawRectP(i.x - h/4, CANVAS_HEIGHT/2 - h / 2, h/2, h, "rgb(" + (255 - i.p) + ", 0 , " + k + ")");
            ctxP.drawImage(goblin, i.x - h/2, CANVAS_HEIGHT/2 - h / 2, h, h);
            // console.log(i.h);
        }
    }
    walls = [];
    // drawRect(0, CANVAS_HEIGHT/2, CANVAS_WIDTH)
}

function drawSlice(x, h, k, t) {
    drawRectP(x, 0, SLICE_WIDTH + 1, CANVAS_HEIGHT/2 - h/2 - (h * 2) * q, "cyan");
    var s = h * 3/ 20;
    var q = 1;
    for (var i = 0; i < 20; i++) {
        if ((i + t) % 2 == 0) {
            drawRectP(x, CANVAS_HEIGHT/2 - h/2 + (i * s) - (h * 2) * q, SLICE_WIDTH + 1, s, "rgb(" + k + ", 0, 0)");
        } else {
            drawRectP(x, CANVAS_HEIGHT/2 - h/2 + (i * s) - (h * 2) * q, SLICE_WIDTH + 1, s, "rgb(0 , " + k + ", 0)");
        }
    }
    // drawRectP(x, CANVAS_HEIGHT/2 - h/2, SLICE_WIDTH + 1, h, "rgb(" + k + ", 0, 0)");

    drawRectP(x, CANVAS_HEIGHT/2 + h/2, SLICE_WIDTH + 1, CANVAS_HEIGHT, "green");
}