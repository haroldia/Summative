updateList.push({f: () => updatePlayer()});
resetList.push({f: () => resetPlayer()});
cameraDrawList.push({f: () => drawPlayer(), l: 1});
drawListP.push({f: () => drawPlayerP(), l: 0});
onKeyPressedList.push({f: () => resetGame(),  key: keyboard.KEY_R.code});
onKeyPressedList.push({f: () => dash(),  key: keyboard.KEY_I.code});
onKeyPressedList.push({f: () => dashB(),  key: keyboard.KEY_K.code});
// onKeyPressedList.push({f: () => turnLeft(),  key: keyboard.KEY_Q.code});
// onKeyPressedList.push({f: () => turnRight(),  key: keyboard.KEY_E.code});



const PLAYER_SPEED = 8;
const PLAYER_RAD = 16;
const PLAYER_TURN_SPEED = 5;
const PLAYER_MAX_HEALTH = 20;


var p;

function resetPlayer() {
    // p = new PlayerClass(150, 500, 320);
    for(var i of worldGridCurrent) { 
        for(var j of i) { 

            if(j == 3) {
                
                p = new PlayerClass(gridToPixelX(i.indexOf(j)) + TILE_W/2, gridToPixelY(worldGridCurrent.indexOf(i)) + TILE_H/2, 180);
                
                worldGridCurrent[worldGridCurrent.indexOf(i)][i.indexOf(j)] = 0; 
            }
        }
    }
}

function turnLeft() {
    p.ang -= 45;
}


function turnRight() {
    p.ang += 45;
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

function dash() {
    if (p.dash <= 0 && p.dashB <= 0) {
        playSound(zoom);

        p.dash = 10;
    }
}

function dashB() {
    if (p.dash <= 0 && p.dashB <= 0) {
        playSound(zoom);

        p.dashB = 10;
    }
}

class PlayerClass {
    constructor(x, y, ang) {
        this.x = x;
        this.y = y;
        this.ang = ang;
        this.angRad = 0;
        this.health = 20;
        this.cnt = 0;
        this.dash = 0;
        this.dashB = 0;

        this.speed = PLAYER_SPEED;
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
        this.dash--;
        this.dashB--;
        if (this.dash > 0 || this.dashB > 0) {
            
            
            this.speed = PLAYER_SPEED * 5;
        } else {
            this.speed = PLAYER_SPEED;
        }
        if (keyboard.KEY_W.held || this.dash > 0) {
            this.collision(1, 0);
            // this.x += Math.cos(this.angRad) * PLAYER_SPEED;
            // this.y += Math.sin(this.angRad) * PLAYER_SPEED;
        }
        if (keyboard.KEY_S.held|| this.dashB > 0) {
            this.collision(-1, 0);

            // this.x -= Math.cos(this.angRad) * PLAYER_SPEED;
            // this.y -= Math.sin(this.angRad) * PLAYER_SPEED;
        }
        if (keyboard.KEY_A.held && this.dash <= 0 && this.dashB  <= 0 ) {
            this.collision(-1, 1);
        }
        if (keyboard.KEY_D.held && this.dash <= 0 && this.dashB  <= 0 ) {
            this.collision(1, 1);
        }
        if (keyboard.KEY_J.held) {
            this.ang -= PLAYER_TURN_SPEED;
        }
        if (keyboard.KEY_L.held) {
            this.ang += PLAYER_TURN_SPEED;
        }
    }

    updateHealth() {
        if (this.health < PLAYER_MAX_HEALTH && this.health > 0) {
            this.health ++;
        }
        if (this.health < 0) {
            this.health = 0;
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
            this.dash = 0;
            this.dashB = 0;
        }
        //down
        if (worldGridCurrent[yp][x] == 1 && angY > 0) {
            wallY = true;
            this.dash = 0;
            this.dashB = 0;
        }
        //left
        if (worldGridCurrent[y][xm] == 1 && angX < 0) {
            wallX = true;
            this.dash = 0;
            this.dashB = 0;            
        }
        //right
        if (worldGridCurrent[y][xp] == 1 && angX > 0) {
            wallX = true;
            this.dash = 0;
            this.dashB = 0;            
        }

        if (!wallX) {
            this.x += angX * this.speed;
        }
        if (!wallY) {
            this.y += angY * this.speed;
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
        drawTextP(this.health, 20, 80, "white", "80px arial");

        drawRectP(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "red", (0.41 - (this.health*2)/100));

        if (this.dash > 0 || this.dashB > 0) {
            drawRectP(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "cyan", 0.1);
        }

        if (this.health == 0) {
            pause = true;
            drawRectP(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "pink", 0.5);
            // drawTextP("GAME OVER", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, "black", "100px arial", "center", "center");
            drawImageP(gameoverscreen, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
        } 
        drawTextP(enemyTotal - enemyCnt + "/" + enemyTotal, 600, 80, "white", "80px arial");

    }
}