const PLAYER_SPEED = 5;
const PLAYER_RADIUS = 30;

var p;

function spawnPlayer() {
  var x=0;
  var y=0;
  
  p = new playerClass(x, y);
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