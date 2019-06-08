drawListP.push({f: () => project(), l: 0});


const SLICE_WIDTH = CANVAS_WIDTH / (PLAYER_FOV / SCAN_RES);


var walls = []

var g = false;

function project() {
    // console.log(SLICE_WIDTH, PLAYER_FOV / SCAN_RES)
    for (var i of walls) {
        var x = (i.x + (PLAYER_FOV / 2)) * SLICE_WIDTH;
        var h = (64 / i.h) * 600
        var c = g ? "red" : "green"
        if (g) {
            g = false;
        } else {
            g = true;
        }
        drawRectP(x * 2, CANVAS_WIDTH/2 - h/2, SLICE_WIDTH, h, "red");
        // console.log(x, h)
    }
}