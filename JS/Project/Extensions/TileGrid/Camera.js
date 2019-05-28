updateList.push({f: () => centerCam ()          });
drawList  .push({f: () => cameraDraw (), lay: 0}); 

const PAN_BORDER_X = 150;
const PAN_BORDER_Y = 100;
const MOUSE_PAN_SPEED = 5;

var DEFAULT_CAM_CENTER_X = 400;
var DEFAULT_CAM_CENTER_Y = 400;


var camPanX = 0.0;
var camPanY = 0.0;

var camCenterPoint = {x: "canvas.width/2", y: "canvas.height/2"};

var cameraDrawList = [];

function cameraDraw() {

	cameraDrawList.sort(function (a, b) { return b.lay - a.lay; });

	ctx.save(); 
	ctx.translate(-camPanX,-camPanY);
    
b
    //draws in order of layers (lowest layer are drawn in front)
    for (var i = 0; i < cameraDrawList.length; i++) {
        cameraDrawList[i].f();
    }

	ctx.restore();
}

function centerCam() {
	// camPanX = eval(camCenterPoint.x) - canvas.width/2;
	// camPanY = eval(camCenterPoint.y) - canvas.height/2;

	if (mouseButton.right.held) {
		drawText("camera", 50, 50)
		if (mousePos.x > 550) {
			camPanX += (mousePos.x-500)*2/60;
		} else if (mousePos.x < 450) {
			camPanX -= (500-mousePos.x)*2/60;
		}
	
		if (mousePos.y > 350) {
		camPanY += (mousePos.y-300)/60;
		} else if (mousePos.y < 250) {
		camPanY -= (300-mousePos.y)/60;
		}
	}
}


