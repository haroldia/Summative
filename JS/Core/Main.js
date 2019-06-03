const FPS = 60;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

var canvas;
var ctx;

var updateList = [];
var resetList  = [];

var pause = false;

document.getElementById("gameCanvas").setAttribute("width",  CANVAS_WIDTH );
document.getElementById("gameCanvas").setAttribute("height", CANVAS_HEIGHT);

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    //loads all images and automatically starts game when done
    drawLoadingScreen(); //optional draw loading screen
	loadImages();
};

function startGame() { //starts game (func called after images load)
	setupInput();
	setInterval(updateAll, 1000/FPS);
    resetGame();
}

function updateAll() {
    if (!pause){
        for (var i in updateList){
            updateList[i].f();
        }
    }
    
}

function resetGame() {
    for (var i in resetList) {
        resetList[i].f();
    }
}