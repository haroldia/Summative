updateList.push({ f: () => drawAll()}); // Push

var drawList = []; // Creating an array

function drawAll() { // Define a function
  drawRect(0, 0, canvas.width, canvas.height, "cyan"); // Calls another function

  drawList.sort(function (a, b) { return b.lay - a.lay; }); // Sorts drawList by layers

  // for (var i = 0; i < drawList.length; i++) { // Draws in order of layers (lowest layer are drawn in front)
  //   drawList[i].f();
  // }
  
  for (var index of drawList) { // Draws in order of layers (lowest layer are drawn in front)
    index.f();
  }
}

function drawLoadingScreen() { // Define a function
  drawRect(0, 0, canvas.width, canvas.height, 'black'); // Calls another function
  drawText("Loading images...", canvas.width / 2, canvas.height / 2, 'white'); // Calls another functio
}

function drawRect(x, y, width, height, color, alpha) { // Define a function
  var alphaTemp = alpha || 1; // Set the value alphaTemp to alpha if alpha is defined, otherwise set it to 1
  ctx.globalAlpha = alphaTemp; // Define globalAlpha to alphaTemp
  ctx.fillStyle = color || "white"; // Set the value of fillStyle to color if color is defined, otherwise set it to white
  ctx.fillRect(x, y, width, height); // Call another function
  ctx.globalAlpha = 1; // globalAlpha is set to 1
}

function drawCircle(x, y, radius, color) { // Define a function
  ctx.fillStyle = color || "white"; // Set the value of fillStyle to color if color is defined, otherwise set it to white
  ctx.beginPath(); // Call another function
  ctx.arc(x, y, radius, 0, Math.PI * 2, true); // Call another function
  ctx.fill(); // Call another function
}

function drawText(words, textX, textY, fillColor, font, align, baseline) { // Define a function
  ctx.font = font || "20px Arial"; // Set the value of font to font if font is defined, otherwise set it to 20px Arial

  ctx.textAlign = align || "start"; // Set the value of textAlign to align if align is defined, otherwise set it to start
  ctx.textBaseline = baseline || "alphabetic"; // Set the value of textBaseline to baseline if baseline is defined, otherwise set it to alphabetic

  ctx.fillStyle = fillColor || "white"; // Set the value of fillStyle to fillColor if fillColor is defined, otherwise set it to white
  ctx.fillText(words, textX, textY); // Call another function
}

function drawImage(image, x, y, ang, scaleX, scaleY, alpha) { // Define a function
  ctx.save(); // Call another function
  ctx.translate(x, y); // Call another function

  var angTemp = ang || 0; // Create a variable called angTemp and set it to ang if ang is defined, otherwise set it to 0
  ctx.rotate(angTemp);

  var scaleXTemp = scaleX || 1; // Create a variable called scaleXTemp and set it to scaleX if scaleX is defined, otherwise set it to 1
  var scaleYTemp = scaleY || 1; // Create a variable called scaleYTemp and set it to scaleY if scaleY is defined, otherwise set it to 1
  ctx.scale(scaleXTemp, scaleYTemp); // Call another function

  var alphaTemp = alpha || 1; // Create a variable called alphaTemp and set it to alpha if alph is defined, otherwise set it to 1
  ctx.globalAlpha = alphaTemp; // Set globalAlpha to alphaTemp

  ctx.drawImage(image, -image.width / 2, -image.height / 2); // Call another function
  ctx.globalAlpha = 1; // Set globalAlpha to 1

  ctx.scale(1, 1); // Call another function

  ctx.restore(); // Call another function
}

function randomColor() { // Define a function
  return "#" + ((1 << 24) * Math.random() | 0).toString(16); // Return a value
}
