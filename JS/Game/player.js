updateList.push({f: () => updatePlayer()});
resetList.push({f: () => resetPlayer()});
cameraDrawList.push({f: () => drawPlayer(), l: 1});
drawListP.push({f: () => drawPlayerP(), l: 0});


const PLAYER_SPEED = 8;
const PLAYER_RAD = 16;
const PLAYER_TURN_SPEED = 5;
const PLAYER_MAX_HEALTH = 20;


var p;

function resetPlayer() {
    p = new PlayerClass(150, 500, 320);
}

function updatePlayer() {
    p.update();
}

function drawPlayer() {
    p.draw();
}

function drawPlayerP() {
    p.drawP();
}


class PlayerClass {
    constructor(x, y, ang) {
        this.x = x;
        this.y = y;
        this.ang = ang;
        this.angRad = 0;
        this.health = 20;
        this.cnt = 0;
    }

    update() {
        this.cnt++;
        // console.log(this.x, this.y, this.ang);
        this.angUpdate();
        this.move();
        if (this.cnt % 15 == 0) {
            this.updateHealth();
        }
    }

    angUpdate() {
        if (this.ang > 360) {
            this.ang -=360;
        } else if (this.ang < 0) {
            this.ang += 360;
        }

        this.angRad = degToRad(this.ang);
    }

    move() {
        if (keyboard.KEY_W.held) {
            this.collision(1, 0);
            // this.x += Math.cos(this.angRad) * PLAYER_SPEED;
            // this.y += Math.sin(this.angRad) * PLAYER_SPEED;
        }
        if (keyboard.KEY_S.held) {
            this.collision(-1, 0);

            // this.x -= Math.cos(this.angRad) * PLAYER_SPEED;
            // this.y -= Math.sin(this.angRad) * PLAYER_SPEED;
        }
        if (keyboard.KEY_A.held) {
            this.collision(-1, 1);
        }
        if (keyboard.KEY_D.held) {
            this.collision(1, 1);
        }
        if (keyboard.LEFT_ARROW.held) {
            this.ang -= PLAYER_TURN_SPEED;
        }
        if (keyboard.RIGHT_ARROW.held) {
            this.ang += PLAYER_TURN_SPEED;
        }
    }

    updateHealth() {
        if (this.health < PLAYER_MAX_HEALTH) {
            this.health ++;
        }

    }

    collision(d, s) {

        var angX = Math.cos(this.angRad + ((Math.PI / 2) * s)) * d;
        var angY = Math.sin(this.angRad + ((Math.PI / 2) * s)) * d;

        var x = pixelToGridX(this.x);
        var y = pixelToGridY(this.y);

        var xp = pixelToGridX(this.x + PLAYER_RAD);
        var xm = pixelToGridX(this.x - PLAYER_RAD);
        var yp = pixelToGridY(this.y + PLAYER_RAD);
        var ym = pixelToGridY(this.y - PLAYER_RAD);

        var wallX = false;
        var wallY = false;


        //up
        if (worldGridCurrent[ym][x] == 1 && angY < 0) {
            wallY = true;
        }
        //down
        if (worldGridCurrent[yp][x] == 1 && angY > 0) {
            wallY = true;
        }
        //left
        if (worldGridCurrent[y][xm] == 1 && angX < 0) {
            wallX = true;            
        }
        //right
        if (worldGridCurrent[y][xp] == 1 && angX > 0) {
            wallX = true;            
        }

        if (!wallX) {
            this.x += angX * PLAYER_SPEED;
        }
        if (!wallY) {
            this.y += angY * PLAYER_SPEED;
        }
    }

    draw() {
        drawCircle(this.x, this.y, PLAYER_RAD, "red");
        for (var i = 0; i < 500; i += 1) {
            drawCircle(this.x + Math.cos(this.angRad) * i * ENEMY_RADIUS/4, this.y + Math.sin(this.angRad) * i * ENEMY_RADIUS/4, 1, "black")
        }
        
        // drawText(this.ang, 20, 20);
    }
    drawP() {
        drawTextP(this.health, 20, 80, "black", "80px arial");
    }
}