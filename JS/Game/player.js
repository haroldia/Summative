updateList.push({f: () => updatePlayer()});
resetList.push({f: () => resetPlayer()});
drawList.push({f: () => drawPlayer(), l: 1});


const PLAYER_SPEED = 5;
const PLAYER_RAD = 30;


var player1;

function resetPlayer() {
    player1 = new PlayerClass(200, 200);
}

function updatePlayer() {
    player1.update();
}

function drawPlayer() {
    player1.draw();
}

class PlayerClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        this.move();
    }

    move() {
        if (keyboard.KEY_W.held) {
            this.y -= PLAYER_SPEED;
        }
        if (keyboard.KEY_S.held) {
            this.y += PLAYER_SPEED;
        }
        if (keyboard.KEY_A.held) {
            this.x -= PLAYER_SPEED;
        }
        if (keyboard.KEY_D.held) {
            this.x += PLAYER_SPEED;
        }
    }

    draw() {
        console.log(this.x, this.y);
        drawCircle(this.x, this.y, PLAYER_RAD, "red");
    }
}