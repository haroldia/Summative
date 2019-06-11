drawListP.push({f: () => spriteCast(), l: 0});

function spriteCast() {
    for (var i of enemyList) {
        var x = radToDeg(i.relAng) * (CANVAS_WIDTH / PLAYER_FOV); //(i.x + (PLAYER_FOV / 2)) * SLICE_WIDTH * (1 / SCAN_RES);
        var h = (64 / (i.dist)) * PLANE_DIST;
        // drawImageP(goblin, x, CANVAS_HEIGHT/2)
        // drawRectP(x - h/2, CANVAS_HEIGHT/2 - h / 2, h, h, "Blue");
        walls.push({x: x, h: i.dist, s: true, d: i.dist, p: i.health});
        // console.log(x, h);
    }
}
