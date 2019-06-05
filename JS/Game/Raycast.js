cameraDrawList.push({f: () => updateRay(), l: 0});

const PLAYER_HEIGHT = 32;
const PLAYER_FOV = 60;

const PROJECTION_PLANE_WIDTH = 320;
const PROJECTION_PLANE_HEIGHT = 320;

//dimension of pp = 320 x 200
//centre of pp = (160,100)
// distance of pp = 277
// angle between rays = 60/320

var a = {x: 0, y: 0}; 
var b = {x: 0, y: 0}; 

var ya = 0;
var xa = 0;

var yb = 0;
var xb = 0;

function updateRay() {
    findRay();
}

function findRay() {

    var pAng = Math.PI*2 - p.angRad

    // if facing up
    if (p.ang > 180) {
        a.y = Math.floor(p.y / TILE_H) * TILE_H - 1;
        ya = -TILE_H;
        xa = TILE_H/Math.tan(pAng);
    } else {
        a.y = Math.floor(p.y / TILE_H) * TILE_H + TILE_H;
        ya = TILE_H;
        xa = -TILE_H/Math.tan(pAng);
        
    }

    //if facing left
    if (p.ang > 90 && p.ang < 270) {
        b.x = Math.floor(p.x / TILE_W) * TILE_W - 1;
        yb = TILE_W*Math.tan(pAng);
        xb = -TILE_W;
    } else {
        b.x = Math.floor(p.x / TILE_W) * TILE_W + TILE_W;
        yb = -TILE_W*Math.tan(pAng);
        xb = TILE_W;
    }

    a.x = p.x + (p.y - a.y)/Math.tan(pAng);
    b.y = p.y + (p.x - b.x)*Math.tan(pAng);



    var nextA = {x: a.x, y: a.y};
    var nextB = {x: b.x, y: b.y};

    var hit = {x: 0, y: 0};

    var wall = false;
    var cnt = 0;

    for (var i = 0; i < 50; i++) {
        cnt++;
        if (!wall) {
            if (distance(nextA.x, nextA.y, p.x, p.y) < distance(nextB.x, nextB.y, p.x, p.y)) {
                castX();
            } else {
                castY();
            }
        } else {
            break;
        }
    }

    if (wall) {
        console.log(hit.x, hit.y)
        drawCircle(hit.x, hit.y, 10, "magenta")
    }

    for (var i = 0; i < 200; i++) {
        let x = p.x + Math.cos(p.angRad) * 5 * i;
        let y = p.y + Math.sin(p.angRad) * 5 * i;
        if (distance(x, y, p.x, p.y) > distance(hit.x, hit.y, p.x, p.y)) {
            drawCircle(x, y, 2, "yellow")
        } else {
            drawCircle(x, y, 2, "sienna")
        }
    }

    function castX() {
        drawCircle(nextA.x, nextA.y, 8, "Black");

        drawCircle(gridToPixelX(pixelToGridX(nextA.x)) + 32, gridToPixelY(pixelToGridY(nextA.y)) + 32, 20, "orange");
        drawText(cnt + ":" + pixelToGridX(nextA.x) + ":" + pixelToGridY(nextA.y), gridToPixelX(pixelToGridX(nextA.x)) + 32, gridToPixelY(pixelToGridY(nextA.y)) + 32, "Black");

        if (pixelToGridY(nextA.y) < 0 || pixelToGridY(nextA.y) >= MAP_ROWS) {
            return; 
        }

        if (pixelToGridX(nextA.x) < 0 || pixelToGridX(nextA.x) >= MAP_COLS) {
            return; 
        }

        if (worldGridCurrent[pixelToGridY(nextA.y)][pixelToGridX(nextA.x)] == 1) {
            drawCircle(gridToPixelX(pixelToGridX(nextA.x)) + 32, gridToPixelY(pixelToGridY(nextA.y)) + 32, 20, "orange");
            wall = true;
            hit.x = nextA.x;
            hit.y = nextA.y;
        } 
        
        nextA.x += xa;
        nextA.y += ya;
    }

    function castY() {
        drawCircle(nextB.x, nextB.y, 5, "White");

        drawCircle(gridToPixelX(pixelToGridX(nextB.x)) + 32, gridToPixelY(pixelToGridY(nextB.y)) + 32, 15, "cyan");
        drawText(cnt + ":" + pixelToGridX(nextB.x) + ":" + pixelToGridY(nextB.y), gridToPixelX(pixelToGridX(nextB.x)) + 32, gridToPixelY(pixelToGridY(nextB.y)) + 32, "Black");

        if (pixelToGridY(nextB.y) < 0 || pixelToGridY(nextB.y) >= MAP_ROWS) {
            return; 
        }

        if (pixelToGridX(nextB.x) < 0 || pixelToGridX(nextB.x) >= MAP_COLS) {
            return; 
        }

        if (worldGridCurrent[pixelToGridY(nextB.y)][pixelToGridX(nextB.x)] == 1) {
            wall = true;
            hit.x = nextB.x;
            hit.y = nextB.y;
        }

        nextB.x += xb;
        nextB.y += yb;
    }
}

