
const PLAYER_SPEED = 5;

var player1;

function resetPlayer() {
    player1 = new PlayerClass;
}



class PlayerClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        move();
    }

    move() {
        if (keyboard.key)
    }

    draw() {

    }
}