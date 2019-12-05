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
	WATER: 0x2248,//0x2593,
	ROCK: 0x002A,   //Star
    WALL: 0x0023,   // Hashtag
    POINT: 0x002E,
    TREE1: 0x2660,
    TREE2: 0x2663,
    MOUNTAIN: 0x25B2,
    MOUNTAIN2:0x2229 ,
    CAVE: 0x03a9,
    BLOCK: 0x2588,
    CASTLE: 0x25D9
}

class Tile {
    constructor(type, x, y, char, color, bgcolor, cross) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.char = char;
        this.color = color;
        this.background = bgcolor;
        this.cross = cross;
        this.seen = false;
        this.visited = false;
    }
    show(camera) {
        if (this.seen) {
            if (this.background) {
                ctx.fillStyle = this.background;
                ctx.fillRect((this.x - camera.x) * cellSize, (this.y - camera.y)* cellSize, cellSize, cellSize);
            }
            ctx.fillStyle = this.color;
            ctx.fillText(String.fromCharCode(this.char), (this.x - camera.x) * cellSize, (this.y - camera.y)* cellSize);    
        } else if (this.visited && !this.seen) {
            ctx.fillStyle = this.color;
            ctx.fillText(String.fromCharCode(this.char), (this.x - camera.x) * cellSize, (this.y - camera.y)* cellSize);    

            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect((this.x - camera.x) * cellSize, (this.y - camera.y) * cellSize, cellSize, cellSize);
        }
    }

}

class Floor0 extends Tile {
    constructor(x, y) {
        super('floor0', x, y, Char.POINT, 'darkolivegreen', undefined, true);
    }
    show(camera) {
        super.show(camera);
    }
}

class Floor1 extends Tile {
    constructor(x, y) {
        super('floor1', x, y, Char.FLOOR1, 'orange', undefined, true)
    }
    show(camera) {
        super.show(camera);
    }
}

class Hill extends Tile {
    constructor(x, y) {
        super('hill', x, y, Char.MOUNTAIN, 'olivedrab', undefined, true)
    }
    show(camera) {
        super.show(camera);
    }
}



class Mountain extends Tile {
    constructor(x, y) {
        super('mountain', x, y, Char.MOUNTAIN, 'dimgrey', undefined, true)
    }
    show(camera) {
        super.show(camera);
    }
}

class HightMountain extends Tile {
    constructor(x, y) {
        super('hight mountain', x, y, Char.MOUNTAIN, 'white', undefined, true)
    }
    show(camera) {
        super.show(camera);
    }
}



class House extends Tile {
    constructor(x, y) {
        super('house', x, y, Char.HOUSE, 'white', undefined, true);
    }
    show(camera) {
        super.show(camera);
    }
}

class Border extends Tile {
    constructor(x, y) {
        super('border', x, y, Char.BLOCK, 'slategray', undefined, false);
    }
    show(camera) {
        super.show(camera);
    }
}

class Water extends Tile {
    constructor(x, y) {
        super('water', x, y, Char.WATER, 'blue', undefined, true);
    }
    show(camera) {
        super.show(camera);
    }
}

class DeepWater extends Tile {
    constructor(x, y) {
        super('deep water', x, y, Char.WATER, 'midnightblue', undefined, false );
    }
    show(camera) {
        super.show(camera);
    }
}

class Forest extends Tile {
    constructor(x, y) {
        super('forest', x, y, Char.TREE1, 'forestgreen', undefined, true );
    }
    show(camera) {
        super.show(camera);
    } 
}

class Desert extends Tile {
    constructor(x, y) {
        super('desert', x, y, Char.FLOOR3, 'sienna', 'khaki',  true );
    }
    show(camera) {
        super.show(camera);
    } 
}

class Castle extends Tile {
    constructor(x, y) {
        super('castle', x, y, Char.CASTEL, 'white', undefined,  true );
    }
    show(camera) {
        super.show(camera);
    } 
}