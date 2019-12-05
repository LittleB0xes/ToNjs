const EntitiesChar = {
    GOBELIN: 0x0067,
    MAN: 0x0040

}

const EntitiesName = [
    'Brown',
    'Humphrey'
]

const EntitiesTitle = [
    'The Yokel',
    'The Clumsy'
]


class Entities {
    constructor(type, x, y, char, color, bgcolor, visible, speed, life) {
        this.x = x;
		this.y = y;
		this.FOV = 3;

        this.name = EntitiesName[Math.floor(Math.random() * EntitiesName.length)] + ' ' + EntitiesTitle[Math.floor(Math.random() * EntitiesTitle.length)];

        this.race;
		this.class;
		this.alignment;
		
		this.st;
		this.dx;
		this.ch;
		this.in;
		this.wi;
		
		this.hp;
		this.mp;

		

		this.gold = 0

		this.inventory = [],

		this.char = char;
		this.color = color;
		this.background = bgcolor;



        this.visible = visible;
        this.speed = speed;
        this.life = life;

        this.dead = false;
        this.cross = false;
    }
    show(width, height, camera) {
        if(this.x >= camera.x && this.x <= width + camera.x && this.y >= camera.y && this.y <= height + camera.y && this.seen) {

            //Background
            ctx.fillStyle = 'rgb(10, 10, 10)';
            ctx.fillRect((this.x - camera.x) * cellSize, (this.y - camera.y) * cellSize, cellSize, cellSize);

            //Forground
            ctx.fillStyle = this.color;
            ctx.fillText(String.fromCharCode(this.char), (this.x - camera.x) * cellSize, (this.y - camera.y) * cellSize);
        }
    }
    
    update() {
        if (this.life < 0) {
            this.dead = true;
            messageLog.unshift('You kill ' + this.name);
        }
    }
}

class Gobelin extends Entities {
    constructor(x, y) {
        super('gobelin', x, y, EntitiesChar.GOBELIN, 'orange', undefined, true, 1, 6);
    }
    show(width, height, camera) {
        if(this.x >= camera.x && this.x <= width + camera.x && this.y >= camera.y && this.y <= height + camera.y && this.seen) {
            //Background
            ctx.fillStyle = 'rgb(10, 10, 10)';
            ctx.fillRect((this.x - camera.x) * cellSize, (this.y - camera.y) * cellSize, cellSize, cellSize);

            super.show(width, height,camera);
        }
    }

    update(map, player) {
        let canMove = false;
        let dx, dy;
        super.update();
        while (!canMove) {
            dx = Math.round(2 * Math.random() - 1);
            dy = Math.round(2 * Math.random() - 1);
            if (this.x + dx != player.x && this.y + dy != player.y) {
                canMove = true;
            }
        }
        this.x += dx;
        this.y += dy;
    }
}