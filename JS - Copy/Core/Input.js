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
var onKeyReleasedList = []; // Create an array for specific even handlers
var onMouseClickList  = []; // Create an array for specific even handlers
var onMouseDownList   = []; // Create an array for specific even handlers
var onMouseUpList     = []; // Create an array for specific even handlers



function keyPressedHandler(evt){ // Define a function
	for (var i in onKeyPressedList){ // For each index in onKeyPressedList
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

function keyReleasedHandler(evt){
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

function updateKeyHeldState(key, value) {
	for (var i in keyboard) {
		if (keyboard[i].code == key) {
			keyboard[i].held = value;
		}
	}
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	
	mousePos.x = evt.clientX - rect.left;
	mousePos.y = evt.clientY - rect.top;
}

function mouseDown(evt) {
	for (var i in mouseButton) {
		if (mouseButton[i].code == evt.button) {
			mouseButton[i].held = true;
		}
	}
	for (var i in onMouseDownList){
		if (onMouseDownList[i].but === undefined){
			onMouseDownList[i].f(evt.button);
		} else {
			if (evt.button == onMouseDownList[i].but){
				onMouseDownList[i].f();
			}
		}
        
	}
}

function mouseUp(evt) {
	for (var i in mouseButton) {
		if (mouseButton[i].code == evt.button) {
			mouseButton[i].held = false;
		}
	}
	for (var i in onMouseUpList){
		if (onMouseUpList[i].but === undefined){
			onMouseUpList[i].f(evt.button);
		} else {
			if (evt.button == onMouseUpList[i].but){
				onMouseUpList[i].f();
			}
		}
        
	}
}

function click(evt) {
	for (var i in onMouseClickList){
        onMouseClickList[i].f();
    }
}