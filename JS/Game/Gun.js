drawListP.push({f: () => drawGun(), l: 1});
onKeyPressedList.push({f: () => shoot(),  key: keyboard.SPACE.code});

const GUN_DAMAGE = 60;

var e = 0;

function drawGun() {
    if (e > 0){
        let p = e*2;
        ctxP.drawImage(explosion, 405 - p/2, 415 - p/2, p, p);
    }
    e -= 25;

    drawImageP(gun, 415, 475, 0, 0.5, 0.5);
    // drawRectP(CANVAS_WIDTH/2 -5, 0, 10, CANVAS_HEIGHT, "Black", "0.2");
}


function shoot() { 


    if (e < 0) {
        playSound(gunshot);

        e = 100;

        var x = p.x;
        var y = p.y;
        for (var i = 0; i < 500; i++) {
            x += Math.cos(p.angRad) * ENEMY_RADIUS/4;
            y += Math.sin(p.angRad) * ENEMY_RADIUS/4;
            for (var j of enemyList) {
                if (distance(x, y, j.x, j.y) < ENEMY_RADIUS && !j.dead) {
                    // enemyList.splice(enemyList.indexOf(j), 1);
                    j.health -= GUN_DAMAGE;
                    j.hit = 10;
                    return;
                }
            }
            if (worldGridCurrent[pixelToGridY(y)][pixelToGridX(x)] == 1) {
                // console.log("a")
                return;
            }
        }
    }
    
}