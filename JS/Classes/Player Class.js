const PLAYER_SPEED = 5;
const PLAYER_RADIUS = 30;

var player1;

function spawnPlayer() {
  var x=0;
  var y=0;
  
  player1 = new playerClass(x, y);
}

class playerClass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  update() {
    move();
  }
  
  move() {
    
  }
  
  draw() {
    
  }
}