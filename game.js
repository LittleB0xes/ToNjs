let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');
let ctx2 = canvas.getContext('2d');
const cellSize = 12;
const viewWidth = 80; // 40
const viewHeight = 40; //20
const worldWidth = 200;
const worldHeight = 100;
const info = 6;

canvas.width = viewWidth  * cellSize;
canvas.height = (viewHeight + info + 1) * cellSize;

ctx.textBaseline = 'top';
ctx.font = cellSize + 'px ibm';

let player;
let monsterList = [];
let camera;
let map;

let messageLog = [];

let newTurn = true;



window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);


function init() {
	map = growingMapGenerator(worldWidth, worldHeight);

	const place = findFreeRandomPlace(map, worldWidth, worldHeight);
	const xo = place[0];
	const yo = place[1];

	player = new Player(xo, yo);
	monsterList.push(new Gobelin(player.x + 1, player.y + 1));
	camera = new Camera(player.x - viewWidth / 2, player.y - viewHeight / 2);
	/*player = new Player(5,5);
	camera = new Camera(0,0);*/
	window.requestAnimationFrame(mainLoop);
	
}

function displayInfo() {
	//Hight border
	ctx.fillStyle = 'white';
	ctx.fillText(String.fromCharCode(0x2552), 0, (viewHeight) * cellSize);
	ctx.fillText(String.fromCharCode(0x2555), (viewWidth - 1) * cellSize, (viewHeight) * cellSize);
	for(let i = 1; i < viewWidth - 1; i++) {
		ctx.fillText(String.fromCharCode(0x2550), i * cellSize, (viewHeight) * cellSize);
	} 

	// Info
	while(messageLog.length > 4) {
		messageLog.pop();
	}
	ctx.fillText("x: " + player.x + "  y: " + player.y, cellSize, (viewHeight + 1) * cellSize);
	for (let i = 0; i < messageLog.length && i < 4; i++) {
		ctx.fillStyle = 'rgba(255,255,255,'+ (1/(i+1)) +')';
		ctx.fillText(messageLog[i], 15 * cellSize, (viewHeight + 1 + i) * cellSize);

	}

	//Low border
	ctx.fillStyle = 'white';

	ctx.fillText(String.fromCharCode(0x2558), 0, (viewHeight + info) * cellSize);
	ctx.fillText(String.fromCharCode(0x255B), (viewWidth - 1) * cellSize, (viewHeight + info) * cellSize);

	for(let i = 1; i < viewWidth - 1; i++) {
		ctx.fillText(String.fromCharCode(0x2550), i * cellSize, (viewHeight + info) * cellSize);
	} 
}



function mainLoop() {
	ctx.fillStyle = 'rgb(10, 10, 10)';
	ctx.fillRect(0,0, canvas.width, canvas.height);

	
	showMap(viewWidth, viewHeight, map, camera);
	displayInfo();
	player.show(viewWidth, viewHeight, camera);
	for (let monster of monsterList) {
		monster.show(viewWidth, viewHeight,camera);
	}

	if (newTurn) {
		player.update(map, monsterList);

		for (let monster of monsterList) {
			monster.update(map, player);
		}

		// Cleaning dead monster
		let i = 0;
		while(i < monsterList.length) {
			if (monsterList[i].dead) {
				monsterList.splice(i, 1);
			} else {
				i+=1;
			}
		}
		camera.update(player, map);
		circularFOV(viewWidth, viewHeight,map, player, monsterList);
		newTurn = false;
	}
	
	requestAnimationFrame(mainLoop);
}



function keyDown(e) {
    switch(e.key) {
	case "h":
	case "ArrowLeft":
	case "4": 
		player.dir = [-1, 0]; 
		newTurn = true;
		break;
	case "l":
	case "ArrowRight":
	case "6" :
		    player.dir = [1,0];
		    newTurn = true;
			break;
	case "ArrowUp":
	case "k":
	case "8" :
		player.dir = [0,-1];
		newTurn = true;
		break;
	case "ArrowDown":
	case "j":
case "2" :
		player.dir = [0,1];
		newTurn = true;
		break;
	case "7":
		player.dir = [-1,-1];
		newTurn = true;
		break;

	case "9":
		player.dir = [1,-1];
		newTurn = true;
		break;

	case "1":
		player.dir = [-1,1];
		newTurn = true;
		break;
	case "3":
		player.dir = [1,1];
		newTurn = true;
		break;

		 
	}

}

function keyUp(e) {
    switch(e.key) {
	}

}

window.onload = init;
