//convert degrees to radians
function degToRad(deg){
    return deg*(Math.PI/180);
}

//convert radians to degrees
function radToDeg(rad){
    return rad*(180/Math.PI);
}

//calculate angle from one point to another point
function angleOf(x1, y1, x2, y2) {
    return Math.atan2(y1 - y2, x1 - x2) + Math.PI;
}

//calculates distance between two points
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}

function moveVectorAng(ang) {
    return {x: Math.cos(ang),
            y: Math.sin(ang)};
}

function moveVectorPoint(x1, y1, x2, y2){
    return moveVectorAng(angleOf(x1, y1, x2, y2))
}

//checks if two objects(circles) are colliding 
function collision(x1, y1, r1, x2, y2, r2) { 
    //r is radius of objects
    if (distance(x1, y1, x2, y2) < r1 + r2){
        return true;
    } else {
        return false;
    }
}

function bounce(angI, angM) {
    return -(angI + angM);
}
