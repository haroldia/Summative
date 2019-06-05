function setupInput() {  // Define a function
	document.addEventListener("keydown"    , keyPressedHandler ); // Add listener for when a key is pressed
	document.addEventListener("keyup"      , keyReleasedHandler); // Add listener for when a key is released
	canvas  .addEventListener("mousemove"  , updateMousePos    ); // Add a listener for the the mouse is moved
	document.addEventListener("mousedown"  , mouseDown         ); // Add a listener for when a mouse is pressed
	document.addEventListener("mouseup"    , mouseUp           ); // Add a listener for when a mouse is released
	document.addEventListener("click"      , click             ); // Add a listener for when a click occurs
	
	canvas.addEventListener("contextmenu", function(evt) {evt.preventDefault();}); // Disables context menu
}

var onKeyPressedList  = []; // Create an array for specific even handlers
var onKeyReleasedList = [];
var onMouseClickList  = [];
var onMouseDownList   = [];
var onMouseUpList     = [];



function keyPressedHandler(evt){ // Define a function
	for (var i in onKeyPressedList){ // For each index in onKeyPressedList call the function assigned to that key
		if (onKeyPressedList[i].key === undefined){
			onKeyPressedList[i].f(evt.keyCode);
		} else {
			if (evt.keyCode == onKeyPressedList[i].key){
				onKeyPressedList[i].f();
			}
		}
	}
    updateKeyHeldState(evt.keyCode, true);
	
	//prevents special keys from moving page
	// evt.preventDefault();
}

function keyReleasedHandler(evt){ // For each index in the onKeyReleasedList call the functino assigned to that key
	for (var i in onKeyReleasedList){
		if (onKeyReleasedList[i].key === undefined){
			onKeyReleasedList[i].f(evt.keyCode);
		} else {
			if (evt.keyCode == onKeyReleasedList[i].key){
				onKeyReleasedList[i].f();
			}
		}
  }
	updateKeyHeldState(evt.keyCode, false);
}

function updateKeyHeldState(key, value) { // Runs the functinos for keys that are held down
	for (var i in keyboard) {
		if (keyboard[i].code == key) {
			keyboard[i].held = value;
		}
	}
}

function updateMousePos(evt) { // Updating the position of the mouse
	var rect = canvas.getBoundingClientRect();
	
	mousePos.x = evt.clientX - rect.left;
	mousePos.y = evt.clientY - rect.top;
}

function mouseDown(evt) { // When a mmouse button is pressed, run its functions
	for (var i in mouseButton) {
		if (mouseButton[i].code == evt.button) {
			mouseButton[i].held = true;
		}
	}
	for (var k in onMouseDownList){
		if (onMouseDownList[k].but === undefined){
			onMouseDownList[k].f(evt.button);
		} else {
			if (evt.button == onMouseDownList[k].but){
				onMouseDownList[k].f();
			}
		}
        
	}
}

function mouseUp(evt) { // When a mouse button is released, fun its functions
	for (var i in mouseButton) {
		if (mouseButton[i].code == evt.button) {
			mouseButton[i].held = false;
		}
	}
	for (var k in onMouseUpList){
		if (onMouseUpList[k].but === undefined){
			onMouseUpList[k].f(evt.button);
		} else {
			if (evt.button == onMouseUpList[i].but){
				onMouseUpList[k].f();
			}
		}
	}
}

function click(evt) { // Run click functions
	for (var i in onMouseClickList){
        onMouseClickList[i].f();
    }
}