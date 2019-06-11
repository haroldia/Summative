drawListP.push({f: () => spriteCast(), l: 0});

function spriteCast() {
    for (var i of enemyList) {
        var x = radToDeg(i.relAng) * (CANVAS_WIDTH / PLAYER_FOV); //(i.x + (PLAYER_FOV / 2)) * SLICE_WIDTH * (1 / SCAN_RES);
        var h = (64 / (i.dist)) * PLANE_DIST;
        // drawImageP(goblin, x, CANVAS_HEIGHT/2)
        // drawRectP(x - h/2, CANVAS_HEIGHT/2 - h / 2, h, h, "Blue");
        var q;
        if (i.dead) {
            q = GoblinDead;
        } else {
            if (i.attack) {
                q = GoblinAttack;
            } else {
                if (i.reload > 3) {
                    q = GoblinShoot;
                } else {
                    q = GoblinMain;

                }

            }

        }
        var v = false;
        
        walls.push({x: x, h: i.dist, s: true, d: i.dist, p: i.health, q: q, m: i.health, v: i.hit});
        // console.log(x, h);
    }
}
