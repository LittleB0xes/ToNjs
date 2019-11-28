class Camera {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update(player, map) {
        let offset = 5;
        if (player.x > viewWidth + this.x - offset) {
            this.x += 1;
            if (this.x > map.length - viewWidth) {
                this.x -= 1;
            }
        } else if (player.x < this.x + offset) {
            this.x -= 1;
            if (this.x < 0) {
                this.x = 0;
            }
        }

        if (player.y > viewHeight + this.y - offset) {
            this.y +=1;
            if (this.y >  map[0].length - viewHeight) {
                this.y -=1 ;
            }
        } else if (player.y < this.y + offset) {
            this.y -=1;
            if (this.y < 0) {
                this.y = 0;
            }
        }
    }
}

const Char = {
	MAN: 0x0040,
	HOUSE: 0x2302,
	FLOOR1: 0x2591,
	FLOOR2: 0x2592,
	FLOOR3: 0x2593,
	WATER: 0x2248,
	ROCK: 0x002A,
    WALL: 0x0023,
    POINT: 0x002E,
}

class Tile {
    constructor(x, y, char, color, cross) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.color = color;
        this.background;
        this.cross = cross;
        this.visible = false;
        this.seen = false;
    }
    show(camera) {
        if (this.visible) {
            if (this.background) {
                ctx.fillStyle = this.color;
                ctx.fillRect((this.x - camera.x) * cellSize, (this.y - camera.y)* cellSize, cellSize, cellSize);
            }
            ctx.fillStyle = this.color;
            ctx.fillText(String.fromCharCode(this.char), (this.x - camera.x) * cellSize, (this.y - camera.y)* cellSize);    
        } else if (this.seen && !this.visible) {
            ctx.fillStyle = this.color;
            ctx.fillText(String.fromCharCode(this.char), (this.x - camera.x) * cellSize, (this.y - camera.y)* cellSize);    

            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect((this.x - camera.x) * cellSize, (this.y - camera.y) * cellSize, cellSize, cellSize);
        }
    }

}

class Floor0 extends Tile {
    constructor(x, y) {
        super(x, y, Char.POINT, 'orange', true);
    }
    show(camera) {
        super.show(camera);
    }
}

class Floor1 extends Tile {
    constructor(x, y) {
        super(x, y, Char.FLOOR1, 'orange', true)
    }
    show(camera) {
        super.show(camera);
    }
}

class House extends Tile {
    constructor(x, y) {
        super(x, y, Char.HOUSE, 'white', false);
    }
    show(camera) {
        super.show(camera);
    }
}