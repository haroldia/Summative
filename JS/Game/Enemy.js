updateList.push({ f: () => updateEnemy()});
resetList.push({f: () => resetEnemy()});
cameraDrawList.push({f: () => drawEnemy(), l: 1});

const ENEMY_RADIUS = 16;

const ENEMY_DAMAGE = 4;

const ENEMY_SPEED = 5;

var enemyList = [];

var enemyShooting = false;

function updateEnemy() {
    enemyShooting = false;
    for (var i of enemyList) {
        i.update();
    }
}

function resetEnemy() {
    // enemyList.push(new Enemy(200, 350));
    enemyList.push(new Enemy(300, 450));

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
        this.speed = 5;
        this.health = 200;
        this.reload = 0;
        this.lastPlayer = {x: this.x, y: this.y};
    }
    update() {
       this.updateAng();
       this.move();
       this.updateHealth();
       this.shoot();
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
            enemyList.splice(enemyList.indexOf(this), 1);
        }
    }
    move() {
        // this.x += this.speed;
        // if (this.x > 300) {
        //     this.speed *= -1;
        // } else if (this.x < 200) {
        //     this.speed *= -1;
        // }

        

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
                this.x += angX * ENEMY_SPEED;
            }
            if (!wallY) {
                this.y += angY * ENEMY_SPEED;
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
        console.log(this.reload);
        if (this.reload <= 0) {
            this.reload = 10;
            var x = this.x;
            var y = this.y;
            for (var i = 0; i < 500; i++) {
                x += Math.cos(this.ang) * PLAYER_RAD/4;
                y += Math.sin(this.ang) * PLAYER_RAD/4;
                if (distance(x, y, p.x, p.y) < PLAYER_RAD) {
                    // enemyList.splice(enemyList.indexOf(j), 1);
                    enemyShooting = true;
                    p.health -= ENEMY_DAMAGE;
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