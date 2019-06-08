var imageList = []; // Create an array

var imagesToLoad = 0; // Set imagesToLoad to 0

function loadImages() { // Define a function
	if (imageList.length > 0) { // If there are images in imageList...
		imagesToLoad = imageList.length; // ... set imagesToLoad to be the number of images that haven't been loaded yet
		for (var i in imageList) { // ... for each index in imageList
			var name = srcToName(imageList[i]); // ... set the variable name based on the source of the image
			window[name] = document.createElement("img"); // ... create the image element
			window[name].onload = countLoaded(); // ... set the onload of the image to call another function
			window[name].src = imageList[i]; // ... set the source to be source of the image
		}
	} else { // Otherwise...
		startGame(); // ... call another function
	}
}

function srcToName(src) { // Define a function
	var start = src.lastIndexOf("/") + 1; // Set the start index to be the index of the character after the final /
	var end = src.indexOf("."); // Set the end index to be the index of the character after the .
	var name = src.substring(start, end); // Set the name to be the character from the start index to the end index
	return name; // Return the name
}

function countLoaded() { // Define a function
	imagesToLoad--; // Subtract one from imageToLoad
	// console.log("Pics to load: " + picsToLoad);
	if (imagesToLoad === 0) { // If there are no images left to load...
		startGame(); // ... call another function
	}
}