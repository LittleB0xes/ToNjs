let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');
let ctx2 = canvas.getContext('2d');
let cellSize = 16;
let viewWidth = 40;
let viewHeight = 20;

canvas.width = viewWidth  * cellSize;
canvas.height = (viewHeight + 2) * cellSize;

ctx.textBaseline = 'top';
ctx.font = cellSize + 'px ibm';

let player;
let camera;
let map;

let newTurn = true;



window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);


function init() {
	player = new Player(5,5);
	camera = new Camera(0,0);
	map = randomMapGenrator(200, 20);
	window.requestAnimationFrame(mainLoop);
	
}

function displayInfo() {
	ctx.fillStyle = 'white';
	ctx.fillText(String.fromCharCode(0x2552), 0, (viewHeight) * cellSize);
	ctx.fillText(String.fromCharCode(0x2555), (viewWidth - 1) * cellSize, (viewHeight) * cellSize);
	for(let i = 1; i < viewWidth - 1; i++) {
		ctx.fillText(String.fromCharCode(0x2550), i * cellSize, (viewHeight) * cellSize);
	}
}



function mainLoop() {
	ctx.fillStyle = 'rgb(10, 10, 10)';
	ctx.fillRect(0,0, canvas.width, canvas.height);

	
	showMap(viewWidth, viewHeight, map, camera);
	displayInfo();
	player.show(camera);

	if (newTurn) {
		player.update(map, camera);
		camera.update(player, map);
		circularFOV(viewWidth, viewHeight,map, player, camera);
		newTurn = false;
	}
	
	requestAnimationFrame(mainLoop);
}



function keyDown(e) {
    switch(e.key) {
	case "ArrowLeft" : 
		player.dir = [-1, 0]; 
		newTurn = true;
		break;
	case "ArrowRight" :
		    player.dir = [1,0];
		    newTurn = true;
		    break;
	case "ArrowUp" :
		    player.dir = [0,-1];
		    newTurn = true;
		    break;
	case "ArrowDown" :
		    player.dir = [0,1];
		    newTurn = true;
		    break;

		 
	}

}

function keyUp(e) {
    switch(e.key) {
	}

}

window.onload = init;
