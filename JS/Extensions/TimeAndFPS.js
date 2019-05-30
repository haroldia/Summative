updateList.push({f: () => updateTimer   ()});
resetList .push({f: () => resetTimer    ()});
drawList  .push({f: () => drawTime(), lay: -1});

const TIMER_POS = {x: 50, y: 60};
const FONT      = "30px Arial";

var timerFrames       = 0;
var timerMilliseconds = 0;
var timerSeconds      = 0;
var timerMinutes      = 0;

var displaySeconds      = "";
var displayMilliseconds = "";
var displayMinutes      = "";

function updateTimer(){
    updateFPS();
    var now = performance.now() - oldNow;
    timerMilliseconds = Math.floor(now%1000);
    timerSeconds = Math.floor((now/1000)%60);
    timerMinutes = Math.floor((now/60000));


    displayMilliseconds = String(timerMilliseconds);
    displaySeconds = String(timerSeconds);
    displayMinutes = String(timerMinutes);


    if (timerMilliseconds < 100){
        displayMilliseconds = "0" + displayMilliseconds ;
        if (timerMilliseconds < 10){
            displayMilliseconds = "0" + displayMilliseconds ;
        }
    }

    if (timerSeconds < 10){
        displaySeconds = "0" + displaySeconds ;
    }
    if (timerMinutes < 10){
        displayMinutes = "0" + displayMinutes ;
    }    
}

function resetTimer(){
    oldNow = performance.now();
}

function drawTime(){
    drawText(displayMinutes + ":" + displaySeconds + ":" + displayMilliseconds, TIMER_POS.x, TIMER_POS.y, "white", FONT);
}