

var soundList = [
    "Sounds/music.aac",
    "Sounds/gunshot.mp3",
    "Sounds/growl.mp3",
    "Sounds/scream.mp3",
    "Sounds/zap.mp3",
    "Sounds/zoom.mp3",


];

setSounds()

function setSounds() {
    for (var i in soundList) {
        window[srcToName(soundList[i])] = soundList[i];
    }
}

function playSound(sound) {
    var sound1 = new Audio(sound);
    sound1.play();
}


setTimeout(loopMusic, 1000)
setInterval(loopMusic, 147000)



function loopMusic() {
    playSound(music);
}