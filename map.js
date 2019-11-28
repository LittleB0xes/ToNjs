function randomMapGenrator(width, height) {
	let map = new Array(width);

	// Edge of the world
	for (let k = 0; k < width; k++) {
		map[k] = new Array(height);
	}

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			let tile = new House(i,j);
			map[i][j] = tile;
		}
	}
	
	// World generation
	for (let i = 1; i < width - 1; i++) {
		for (let j = 1; j < height - 1; j++) {
			let tile;
			let choice = Math.random()
			if (choice > 0.8) {
				tile = new Floor1(i,j);
			} else if (choice > 0.7) {
				tile = new House(i,j);
			} else {
				tile = new Floor0(i,j);
			}
			map[i][j] = tile;
		}
	}
	return map;
}

function growingMapGenerator(width, height) {
}

function showMap(width, height, map, camera) {
	for (let i = camera.x; i < width + camera.x; i++) {
		for (let j = camera.y; j < height + camera.y; j++) {
			map[i][j].show(camera);
		}
	}
}

function circularFOV(width, height,map, player) {
	for(let i = camera.x; i < camera.x + width; i++) {
		for (let j = camera.y ; j < camera.y + height; j++) {
			let dx = player.x - i;
			let dy = player.y - j;
			if (Math.pow(dx,2) + Math.pow(dy,2) < Math.pow(player.FOV,2)) {
				map[i][j].visible = true;
				map[i][j].seen = true;

			} else {
				map[i][j].visible = false;

			}
		}
	}
	/*
	for(let i = 0; i < 2 * Math.PI; i += Math.PI / 6) {
		for (let r = 0; r <= radius; r++) {
			let cellX = player.x + Math.round(r * Math.cos(i));
			let cellY = player.y + Math.round(r * Math.sin(i));
			if (cellX < 0 || cellX > map.length - 1 || cellY < 0 || cellY > map[0].length - 1) {
				continue;
			} else {
				map[cellX][cellY].visible = true;
				map[cellX][cellY].seen = true;


			}
		}
	}*/
}