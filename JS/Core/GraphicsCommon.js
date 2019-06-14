updateList.push({ f: () => drawAll()});

var drawList = []; // Create an empty array


const minimapEnable = false; // Disable the minimap

function drawAll() { // Define a function
  drawRect(0, 0, canvas.width, canvas.height, "Black"); // Call another function

  drawList.sort(function (a, b) { return b.l - a.l; }); // Sort drawList by layers

  for (var i = 0; i < drawList.length; i++) { // Draws in order of layers (lowest layer are drawn in front)
    drawList[i].f(); // Call another function
  }
}

function drawLoadingScreen() { // Define a function
  drawRect(0, 0, canvas.width, canvas.height, 'black'); // Call another function
  drawText("Loading images...", canvas.width / 2, canvas.height / 2, 'white'); // Call another function
}

function drawRect(x, y, width, height, color, alpha) { // Define a function
  if (minimapEnable) { // Conditional statement
    var alphaTemp = alpha || 1; // Set the variable alphaTemp to alpha if alpha is defined. Otherwise, set it to 1
    ctx.globalAlpha = alphaTemp; // Set globalAlpha of ctx to alphaTemp if alphaTemp is defined
    ctx.fillStyle = color || "white"; // Set fillStyle of ctx to color if color is defined. Otherwise, set it to white
    ctx.fillRect(x, y, width, height); // Call another function
    ctx.globalAlpha = 1; // Set globalAlpha of ctx to 1
  }
}

function drawCircle(x, y, radius, color) { // Define a function
  if (minimapEnable) { // Conditional statement
    ctx.fillStyle = color || "white"; // Set fillStyle of ctx to color if color is defined. Otherwise, set it to white
    ctx.beginPath(); // Call another function
    ctx.arc(x, y, radius, 0, Math.PI * 2, true); // Call another function
    ctx.fill(); // Call another function
  }
}

function drawText(words, textX, textY, fillColor, font, align, baseline) { // Define a function
  if (minimapEnable) { // Conditional statement
    ctx.font = font || "20px Arial"; // Set font of ctx to font if font is defined. Otherwise, set it to 20px Arial
    ctx.textAlign = align || "start"; // Set textAlign of ctx to align if align is defined. Otherwise, set it to start
    ctx.textBaseline = baseline || "alphabetic"; // Set textBaseline of ctx to baseline if baseline is defined. Otherwise, set it to alphabetic
    ctx.fillStyle = fillColor || "white"; // Set fillStyle of ctx to fillColor if fillColor is defined. Otherwise, set it to white
    ctx.fillText(words, textX, textY); // Call another function
  }
}

function drawImage(image, x, y, ang, scaleX, scaleY, alpha) { // Define a function
  if (minimapEnable) { // Conditional statement
    ctx.save(); // Call another function
    ctx.translate(x, y); // call another function
    var angTemp = ang || 0; // Set angTemp to ang if ang is defined. Otherwise, set it to 0
    ctx.rotate(angTemp); // Call another function
    var scaleXTemp = scaleX || 1; // Set scaleXTemp to scaleX if scaleX is defined. Otherwise, set it to 1
    var scaleYTemp = scaleY || 1; // Set scaleYTemp to scaleY if scaleY is defined. Otherwise, set it to 1
    ctx.scale(scaleXTemp, scaleYTemp); // Call another function
    var alphaTemp = alpha || 1; // Set alphaTemp to alpha if alpha is defined. Otherwise set it to 1
    ctx.globalAlpha = alphaTemp; // Set globalAlpha of ctx to alphaTemp
    ctx.drawImage(image, -image.width / 2, -image.height / 2); // Call another function
    ctx.globalAlpha = 1; // Set globalAlpha of ctx to 1
    ctx.scale(1, 1); // Call another function
    ctx.restore(); // Call another function
  }
}

function randomColor() { // Define a function
  return "#" + ((1 << 24) * Math.random() | 0).toString(16); // Generate a random code for the color and put the # before it so that it returns
}
