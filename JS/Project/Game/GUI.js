resetList.push({f: () => resetScore()});
drawList.push({f: () => drawScore(), lay: -1});

var score = 0;
var highscore = 0;

function resetScore()
{
    score = 0;
}

function updateHighscore()
{
    highscore = (score > highscore) ? score : highscore;
}

function drawScore()
{
    drawText("Score: " + score,500, 50, "Black", "40px Consolas")
    drawText("Highscore: " + highscore,500, 100, "Black", "40px Consolas")
}