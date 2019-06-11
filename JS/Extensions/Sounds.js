

var soundList = [
    "Sounds/music.aac",
    "Sounds/gunshot.mp3",
    "Sounds/growl.mp3",
];

setSounds()

function setSounds() {
    for (var i in soundList) {
        window[srcToName(soundList[i])] = soundList[i];
    }
}

function playSound(sound) {
    var sound = new Audio(sound);
    sound.play();
}


setTimeout(loopMusic, 1000)
setInterval(loopMusic, 147000)



function loopMusic() {
    playSound(music);
}