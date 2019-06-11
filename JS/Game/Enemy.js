updateList.push({ f: () => updateEnemy()});
resetList.push({f: () => resetEnemy()});
cameraDrawList.push({f: () => drawEnemy(), l: 1});

const ENEMY_RADIUS = 16;
const ENEMY_DAMAGE = 2;
const ENEMY_SPEED = 7;
const ENEMY_MAX_HEALTH = 180;

var enemyList = [];

var enemyShooting = false;


function updateEnemy() {
    enemyShooting = false;

    var win = true;

    for (var i of enemyList) {
        if (!i.dead) {
            win = false;
        }
        i.update();
    }

    if (win) {
        pause = true;
        drawRectP(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "green", 0.5);
        drawTextP("Level Cleared", CANVAS_WIDTH/2, CANVAS_WIDTH/2, "black", "100px arial", "center", "center");
    }
}

function resetEnemy() {
    enemyList = [];
    // enemyList.push(new Enemy(200, 350));
    // enemyList.push(new Enemy(300, 450));

    for(var i of worldGridCurrent) { 
        for(var j of i) { 

            if(j == 2) {
                
                enemyList.push(new Enemy(gridToPixelX(i.indexOf(j)) + TILE_W/2, gridToPixelY(worldGridCurrent.indexOf(i)) + TILE_H/2));
                
                worldGridCurrent[worldGridCurrent.indexOf(i)][i.indexOf(j)] = 0; 
            }
        }
    }

}

function drawEnemy() {
    for (var i of enemyList) {
        i.draw();
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dist = 0;
        this.ang = 0;
        this.relAng = 0;
        this.speed = ENEMY_SPEED;
        this.health = ENEMY_MAX_HEALTH;
        this.reload = 0;
        this.lastPlayer = {x: this.x, y: this.y};
        this.dead = false;
        this.attack = false;
        this.hit = 0;
    }
    update() {
        this.updateAng();
        if (!this.dead) {
            this.move();
            this.updateHealth();
            this.shoot();
            this.charge();
        }
        if (this.hit > 0){
            this.hit --; 

        }
       
    }
    updateAng() {
        this.dist = distance(this.x, this.y, p.x, p.y);
        this.ang = angleOf(this.x, this.y, this.lastPlayer.x, this.lastPlayer.y);
        this.relAng = angleOf(this.x, this.y, p.x, p.y) - p.angRad + degToRad(PLAYER_FOV/2) + Math.PI;
        if (this.relAng < 0) {
            this.relAng += Math.PI * 2;
        } else if (this.relAng > Math.PI*2) {
            this.relAng -= Math.PI * 2;
        }
    }
    updateHealth() {
        if (this.health <= 0) {
            // enemyList.splice(enemyList.indexOf(this), 1);
            this.dead = true;
        }
    }
    charge() {
        if (distance(this.x, this.y, p.x, p.y) < 200) {
            this.speed = ENEMY_SPEED * 3;
            this.attack = true;
            if (distance(this.x, this.y, p.x, p.y) < 10) {
                p.health = 0;
                p.ang = this.ang;
            } 
        } else {
            this.speed = ENEMY_SPEED;
            this.attack = false;
        }
    }
    move() {
        if (distance(this.x, this.y, this.lastPlayer.x, this.lastPlayer.y) > 10) {
            var angX = Math.cos(this.ang);
            var angY = Math.sin(this.ang);

            var x = pixelToGridX(this.x);
            var y = pixelToGridY(this.y);

            var xp = pixelToGridX(this.x + ENEMY_RADIUS);
            var xm = pixelToGridX(this.x - ENEMY_RADIUS);
            var yp = pixelToGridY(this.y + ENEMY_RADIUS);
            var ym = pixelToGridY(this.y - ENEMY_RADIUS);

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
                this.x += angX * this.speed;
            }
            if (!wallY) {
                this.y += angY * this.speed;
            }
        }
        

        
        var ang = angleOf(this.x, this.y, p.x, p.y);

        this.scan(0, 0)
        this.scan(Math.cos(ang + Math.PI/2) * ENEMY_RADIUS, Math.sin(ang + Math.PI/2) * ENEMY_RADIUS)
        this.scan(Math.cos(ang - Math.PI/2) * ENEMY_RADIUS, Math.sin(ang - Math.PI/2) * ENEMY_RADIUS)

        
        
        

        

    }
    scan(k, l) {
        var x = this.x + k;
        var y = this.y + l;
        for (var i = 0; i < 500; i++) {
            x += Math.cos(angleOf(this.x + k, this.y + l, p.x, p.y)) * PLAYER_RAD/4;
            y += Math.sin(angleOf(this.x + k, this.y + l, p.x, p.y)) * PLAYER_RAD/4;
            // console.log(y, x)
            drawCircle(x, y, 2, "orange");
            if (distance(x, y, p.x, p.y) < PLAYER_RAD) {
                // enemyList.splice(enemyList.indexOf(j), 1);
                
                this.lastPlayer.x = p.x;
                this.lastPlayer.y = p.y;

                break;
            }
            if (worldGridCurrent[pixelToGridY(y)][pixelToGridX(x)] == 1) {
                // console.log("a")
                break;
            }
        }
    }
    shoot() {
        // console.log(this.reload);
        if (this.reload <= 0) {
            this.reload = 5;
            var x = this.x;
            var y = this.y;
            for (var i = 0; i < 500; i++) {
                x += Math.cos(this.ang) * PLAYER_RAD/4;
                y += Math.sin(this.ang) * PLAYER_RAD/4;
                if (distance(x, y, p.x, p.y) < PLAYER_RAD) {
                    // enemyList.splice(enemyList.indexOf(j), 1);
                    enemyShooting = true;
                    if (p.health > 0) {

                        p.health -= ENEMY_DAMAGE;
                        drawRectP(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "red", 0.5);

                    }
                    return;
                }
                if (worldGridCurrent[pixelToGridY(y)][pixelToGridX(x)] == 1) {
                    // console.log("a")
                    return;
                }
            }
        } else {
            this.reload -= Math.random(); 
        }
    }
    draw() {
        drawCircle(this.x, this.y, ENEMY_RADIUS, "purple");
        drawCircle(this.lastPlayer.x, this.lastPlayer.y, ENEMY_RADIUS, "yellow");

        drawText(Math.round(this.relAng * 100)/100, 200, 200);
        drawText(Math.round(p.angRad * 100)/100, 200, 220)

    }
}