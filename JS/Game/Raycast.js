cameraDrawList.push({f: () => updateRay(), l: 0});

const PLAYER_HEIGHT = 32;
const PLAYER_FOV = 60;

const PROJECTION_PLANE_WIDTH = 320;
const PROJECTION_PLANE_HEIGHT = 320;

const MINI_SCAN_RES_L = 5;

const SCAN_RES = 0.25 //PLAYER_FOV / CANVAS_WIDTH;
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
    // drawRectP(0, 54, 10, 10, "red");
    // findRay(0);

    // findRay(30);
    for (var i = -PLAYER_FOV/2; i < PLAYER_FOV/2; i += SCAN_RES) {
        walls.push({h: findRay(i), x: i, s: false, d: findRay(i)});
    }
}

function findRay(ang) {

    var pAngRad = Math.PI*2 - p.angRad - (ang * (Math.PI / 180));
    var pAng = p.ang + ang;

    if (pAngRad < 0) {
        pAngRad += Math.PI*2;
    } else if (pAngRad > Math.PI*2) {
        pAngRad -= Math.PI*2;
    }

    if (pAng > 360) {
        pAng -= 360;
    } else if (pAng < 0) {
        pAng += 360;
    }

    // console.log(pAngRad, pAng, pAngRad * (180 / Math.PI))

    // if facing up
    if (pAng > 180) {
        a.y = Math.floor(p.y / TILE_H) * TILE_H - 1;
        ya = -TILE_H;
        xa = TILE_H/Math.tan(pAngRad);
    } else {
        a.y = Math.floor(p.y / TILE_H) * TILE_H + TILE_H;
        ya = TILE_H;
        xa = -TILE_H/Math.tan(pAngRad);
        
    }

    //if facing left
    if (pAng > 90 && pAng < 270) {
        b.x = Math.floor(p.x / TILE_W) * TILE_W - 1;
        yb = TILE_W*Math.tan(pAngRad);
        xb = -TILE_W;
    } else {
        b.x = Math.floor(p.x / TILE_W) * TILE_W + TILE_W;
        yb = -TILE_W*Math.tan(pAngRad);
        xb = TILE_W;
    }

    a.x = p.x + (p.y - a.y)/Math.tan(pAngRad);
    b.y = p.y + (p.x - b.x)*Math.tan(pAngRad);

    var nextA = {x: a.x, y: a.y};
    var nextB = {x: b.x, y: b.y};

    var hit = {x: 0, y: 0};

    var wall = false;

    for (var i = 0; i < 50; i++) {
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

    if (Math.random() > 0.65) {
        for (var i = 0; i < 200; i += MINI_SCAN_RES_L) {
            if (Math.random() > 0.75) {
                let x = p.x + Math.cos(-pAngRad) * 5 * i;
                let y = p.y + Math.sin(-pAngRad) * 5 * i;
                if (distance(x, y, p.x, p.y) > distance(hit.x, hit.y, p.x, p.y)) {
                    drawCircle(x, y, 2, "red")
                } else {
                    drawCircle(x, y, 2, "white")
                }
            }
        }
        if (wall) {
            // console.log(hit.x, hit.y)
            drawCircle(hit.x, hit.y, 10, "magenta")
        }
    
    }
    

    // return distance(hit.x, hit.y, p.x, p.y);
    
    var trueDist = distance(hit.x, hit.y, p.x, p.y) * Math.cos(Math.abs(ang * (Math.PI/180)));
    return trueDist;

    function castX() {
        // drawCircle(nextA.x, nextA.y, 8, "Black");

        // drawCircle(gridToPixelX(pixelToGridX(nextA.x)) + 32, gridToPixelY(pixelToGridY(nextA.y)) + 32, 20, "orange");
        // drawText(cnt + ":" + pixelToGridX(nextA.x) + ":" + pixelToGridY(nextA.y), gridToPixelX(pixelToGridX(nextA.x)) + 32, gridToPixelY(pixelToGridY(nextA.y)) + 32, "Black");

        if (pixelToGridY(nextA.y) < 0 || pixelToGridY(nextA.y) >= MAP_ROWS) {
            return; 
        }

        if (pixelToGridX(nextA.x) < 0 || pixelToGridX(nextA.x) >= MAP_COLS) {
            return; 
        }

        if (worldGridCurrent[pixelToGridY(nextA.y)][pixelToGridX(nextA.x)] == 1) {
            wall = true;
            hit.x = nextA.x;
            hit.y = nextA.y;
        } 
        
        nextA.x += xa;
        nextA.y += ya;
    }

    function castY() {
        // drawCircle(nextB.x, nextB.y, 5, "White");

        // drawCircle(gridToPixelX(pixelToGridX(nextB.x)) + 32, gridToPixelY(pixelToGridY(nextB.y)) + 32, 15, "cyan");
        // drawText(cnt + ":" + pixelToGridX(nextB.x) + ":" + pixelToGridY(nextB.y), gridToPixelX(pixelToGridX(nextB.x)) + 32, gridToPixelY(pixelToGridY(nextB.y)) + 32, "Black");

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

