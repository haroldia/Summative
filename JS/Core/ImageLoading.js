var imageList = [];

var imagesToLoad = 0; //set automatically

function loadImages() {
	if (imageList.length > 0) {
		imagesToLoad = imageList.length;
		for (var i in imageList) {
			var name = srcToName(imageList[i]);
			window[name] = document.createElement("img");
			window[name].onload = countLoaded();
			window[name].src = imageList[i];
		}
	} else {
		startGame();
	}
}

function srcToName(src) {
	var start = src.lastIndexOf("/") + 1;
	var end = src.indexOf(".");
	var name = src.substring(start, end);
	return name;
}

function countLoaded() {
	imagesToLoad--;
	// console.log("Pics to load: " + picsToLoad);
	if (imagesToLoad === 0) {
		startGame();
	}
}