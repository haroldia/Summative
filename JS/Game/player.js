updateList.push({f: () => updatePlayer()});
resetList.push({f: () => resetPlayer()});
drawList.push({f: () => drawPlayer(), l: 1});


const PLAYER_SPEED = 5;
const PLAYER_RAD = 10;


var p;

function resetPlayer() {
    p = new PlayerClass(200, 200);
}

function updatePlayer() {
    p.update();
}

function drawPlayer() {
    p.draw();
}

class PlayerClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ang = 0;
        this.angRad = 0;
    }

    update() {
        this.angUpdate();
        this.move();
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
            this.x += Math.cos(this.angRad) * PLAYER_SPEED;
            this.y += Math.sin(this.angRad) * PLAYER_SPEED;
        }
        if (keyboard.KEY_S.held) {
            this.x -= Math.cos(this.angRad) * PLAYER_SPEED;
            this.y -= Math.sin(this.angRad) * PLAYER_SPEED;
        }
        if (keyboard.KEY_A.held) {
            this.ang -= 2;
        }
        if (keyboard.KEY_D.held) {
            this.ang += 2;
        }
    }

    draw() {
        drawCircle(this.x, this.y, PLAYER_RAD, "red");
        // for (var i = 0; i < 5; i++) {
        //     drawCircle(this.x + Math.cos(this.angRad) * 5 * i, this.y + Math.sin(this.angRad) * 5 * i, 5, "yellow")
        // }
        for (var i = 0; i < 200; i++) {
            drawCircle(this.x + Math.cos(this.angRad) * 5 * i, this.y + Math.sin(this.angRad) * 5 * i, 2, "yellow")
        }
        drawText(this.ang, 20, 20);
    }
}