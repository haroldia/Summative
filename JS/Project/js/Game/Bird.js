updateList.push({f: () => updateBird()});
drawList.push({f: () => drawBird(), lay: 1});
resetList.push({f: () => resetBird()});
onKeyPressedList.push({f: () => flap(), key: keyboard.SPACE.code});

const BIRD_X = 200;
const FLAP_POWER = 10;
const GRAVITY = 0.3;
const AIR_RESISTANCE = 0.95;
const BIRD_HEIGHT = 25;
const BIRD_WIDTH = 25;

var bird;
var autoFlapMode = true;


function resetBird()
{
    bird = new birdClass();
}

function updateBird()
{
    bird.update();
}

function drawBird()
{
    bird.draw();
}

function flap()
{
    bird.flap();
}

function killBird()
{
    bird.live = false;
    if (bird.speed > 0)
    {
        bird.speed = 0;
    }
    updateHighscore();
}

class birdClass
{
    constructor()
    {
        this.height = 200;
        this.speed = 0;
        this.live = true;
    }

    update()
    {
        this.move();
        this.physics();
        this.collision();
        if (autoFlapMode)
        {
            this.autoFlap();
        }
    }

    move()
    {
        if (this.height < GROUND_HEIGHT - BIRD_HEIGHT)
        {
            this.height -= this.speed;
        }
    }

    physics()
    {
        this.speed -= GRAVITY;
        this.speed *= AIR_RESISTANCE;
    }

    collision()
    {
        if (this.height < 0 || this.height > GROUND_HEIGHT - BIRD_HEIGHT)
        {
            this.live = false;
        }
    }

    flap()
    {
        if (this.live)
        {
            this.speed = FLAP_POWER;
        }
    }

    autoFlap()
    {
        for (var i of pipeList)
        {
            if (i.score === false)
            {
                if (this.height + BIRD_HEIGHT + 6> i.height + PIPE_GAP_SIZE)
                {
                    flap();
                }
                break;

            }
        }
    }

    draw()
    {
        var color = (this.live) ? "red" : "black";
        drawRect(BIRD_X, this.height, BIRD_WIDTH, BIRD_HEIGHT, color);
    }
}