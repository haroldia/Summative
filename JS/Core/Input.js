//adds event listeners
function setupInput() {
	document.addEventListener("keydown"    , keyPressedHandler );
	document.addEventListener("keyup"      , keyReleasedHandler);
	canvas  .addEventListener("mousemove"  , updateMousePos    );
	document.addEventListener("mousedown"  , mouseDown         );
	document.addEventListener("mouseup"    , mouseUp           );
	document.addEventListener("click"      , click             );

	//disables context menu
	canvas.addEventListener("contextmenu", function(evt) {evt.preventDefault();});
}

var onKeyPressedList  = [];
var onKeyReleasedList = [];
var onMouseClickList  = [];
var onMouseDownList  = [];
var onMouseUpList  = [];

function keyPressedHandler(evt){
	for (var i in onKeyPressedList){
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
	evt.preventDefault();
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