updateList         .push({f: () => logFPS    ()                });
intervalUpdateList .push({f: () => updateFPS (), int: 6, cnt: 0})
drawListP.push({f: () => drawFPS   (), l: 0       });

const FPS_POS = {x: 50, y: 150};
const FPS_FONT = "30px Monospace";
const FPS_INTERVAL = 10; //interval of frames per update

var frameList = [FPS]; //default FPS to avoid NaN on start
var frameTrack = {current: 0, last: 0};
var fpsCount = 0;

function updateFPS(){
    fpsCount = 0;
    for (var i in frameList){
        fpsCount += frameList[i];
    }
    fpsCount = Math.round(fpsCount/(frameList.length));
    frameList = [];
}

function logFPS() {
    frameTrack.current = performance.now();
    frameList.push(1000/(frameTrack.current - frameTrack.last));
    frameTrack.last = performance.now();
}

function drawFPS(){
    drawTextP("FPS: " + fpsCount, 50, 150, "white", "30px Monospace");
}