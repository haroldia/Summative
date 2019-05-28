drawList.push({f: () => drawWorld(), lay: 0});
onKeyPressedList.push({f: () => resetGame(), key: keyboard.KEY_R.code});

const GROUND_HEIGHT = CANVAS_HEIGHT - 50;

function drawWorld()
{
    drawRect(0, GROUND_HEIGHT, canvas.width, canvas.height,"green");
}
