class Player {
	constructor(xo, yo) {
		this.dir = [0,0];
		this.x = xo;
		this.y = yo;
		this.FOV = 3;
		this.char = Char.MAN;
		this.color = 'orange';
		this.background = 'rgb(10, 10, 10)'
	}
	show(camera) {

		//Background
		ctx.fillStyle = 'rgb(10, 10, 10)';
		ctx.fillRect((this.x - camera.x) * cellSize, (this.y - camera.y) * cellSize, cellSize, cellSize);

		//Forground
		ctx.fillStyle = this.color;
		ctx.fillText(String.fromCharCode(this.char), (this.x - camera.x) * cellSize, (this.y - camera.y) * cellSize);
		
	}
	update(map) {
		if (map[this.x + this.dir[0]][this.y +  this.dir[1]].cross) {
			this.x += this.dir[0] ;
			this.y += this.dir[1];
		}
		
	}
}
