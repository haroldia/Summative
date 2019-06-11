drawListP.push({f: () => drawGun(), l: 0});
onKeyPressedList.push({f: () => shoot(),  key: keyboard.SPACE.code});

const GUN_DAMAGE = 50;

var e = 0;

function drawGun() {
    if (e > 0){
        drawCircleP(440, 430, e, "orange");
    }
    e -= 10;
    drawImageP(gun, 440, 475, 0, 0.5, 0.5);
    drawRectP(CANVAS_WIDTH/2 -5, 0, 10, CANVAS_HEIGHT, "Black", "0.2");
}

function shoot() {
    e = 100;
    var x = p.x;
    var y = p.y;
    for (var i = 0; i < 500; i++) {
        x += Math.cos(p.angRad) * ENEMY_RADIUS/4;
        y += Math.sin(p.angRad) * ENEMY_RADIUS/4;
        for (var j of enemyList) {
            if (distance(x, y, j.x, j.y) < ENEMY_RADIUS) {
                // enemyList.splice(enemyList.indexOf(j), 1);
                j.health -= GUN_DAMAGE;
                return;
            }
        }
        if (worldGridCurrent[pixelToGridY(y)][pixelToGridX(x)] == 1) {
            // console.log("a")
            return;
        }
    }
}