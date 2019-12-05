class Player extends Entities{
	constructor(xo, yo) {
		super('player', xo, yo, EntitiesChar.MAN, 'orange', 'rgb(10,10,10)', true, 1, 50);
		this.x = xo;
		this.y = yo;
		this.FOV = 3;

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

		

		this.gold = 0;

		this.inventory = [],
		this.seen = true;




		this.dir = [0,0];
		this.thirst;
		this.hunger;
	}
	show(width, height, camera) {
		super.show(width, height, camera)
		
	}
	update(map, listOfMonster) {
		let cellIsFree = true;
		for (let monster of listOfMonster) {
			if (this.x + this.dir[0] == monster.x && this.y + this.dir[1] == monster.y) {
				cellIsFree = false;
				this.hit(monster);
				
			}
		}
		if (map[this.x + this.dir[0]][this.y +  this.dir[1]].cross && cellIsFree) {
			this.x += this.dir[0] ;
			this.y += this.dir[1];
		}
		switch(map[this.x][this.y].type) {
			case 'mountain':
				this.FOV = 4;
				break;
			case 'hight mountain':
				this.FOV = 5;
				break;
			case 'forest':
				this.FOV = 2;
				break;
			default : 
				this.FOV = 3;
		}		
		
	}
	hit(monster) {
		monster.life -=1;
		messageLog.unshift('You hit it!');
	}
}
