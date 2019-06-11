var soundList = [
    "Sounds/shift.mp3"
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
