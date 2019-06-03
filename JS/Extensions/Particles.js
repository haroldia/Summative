var particles = [];


function drawParticles(pic, x, y, frequency, num, sizeX, sizeY, movement, duration) {
	if (Math.random()*100 < frequency/1.2){
		for(var i = 0; i < num; i++){
			particles.push(new particleClass(pic, x + Math.random()*sizeX - sizeX/2,
												  y + Math.random()*sizeY - sizeY/2,
												  duration, movement));
		}
	}
}

function particleClass(pic, x, y, duration, movement) {

	this.duration = duration;
	this.x = x;
	this.y = y;
	this.ang = Math.random()*Math.PI*2

	this.draw = function(){
		if (this.duration > 0){
			ctx.globalAlpha = this.duration/duration
			switch (movement){
				case "float":
					this.y -= 1;
					break;
				case "scatter":
					this.x += Math.cos(this.ang) * 1;
					this.y += Math.sin(this.ang) * 1;
					break;

			}
			ctx.drawImage(pic, this.x-pic.width/2, this.y-pic.height/2);
			ctx.globalAlpha = 1;
			this.duration--;
		} else {
			particles.splice(particles.indexOf(this), 1);
		}
	}

}