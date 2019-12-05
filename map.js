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
	// Type Of Element
	//
	// Ground: 0
	// Water: 1
	// Mountain: 2
	// Hight Mountain: 3
	// Hill : 5
	// Deep Water : 4
	// Forest : 6
	// Desert : 7

	// Ok for a 200x100 world map
	const maxForest = Math.round(0.001 * width * height);
	const maxIter = Math.round(0.0008 * width * height);	
	
	const maxDesert = Math.round(0.001 * width * height);
	const maxIterDesert = Math.round(0.0005 * width * height);



	let map = new Array(width); 							// Final map with objects
	let constructionMap = new Array(height);				// Map with number for type of element

	for (let k = 0; k < width; k++) {						// Map's initializing
		map[k] = new Array(height);
		constructionMap[k] = new Array(height);
	}
	
	
	// World generation
	
	for (let i = 1; i < width - 1; i++) {					// Random fillig with ground(point) and water
		for (let j = 1; j < height - 1; j++) {
			let choice = Math.random()
			if (choice < 0.6 ) {
				constructionMap[i][j] = 0; 					// Ground
			} else if (choice > 0.6 && choice < 0.85) {
				constructionMap[i][j] = 2; 					// Mountain
			} else {
				constructionMap[i][j] = 1; 					// Water
			}
		}
	}

	for (let l = 0; l < 150; l++) {							// Shake the map
		for (let i = 1; i < width - 1; i++) {
			for (let j = 1; j < height - 1; j++) {
				let counter;
				let t = constructionMap[i][j];
				for (let n = -1; n < 2; n++) {
					if (t == constructionMap[i-1][j+n]) {counter++;};
					if (t == constructionMap[i][j+n]) {counter++;};
					if (t == constructionMap[i+1][j+n]) {counter++;};
				}
				
				if (counter >= 5) {break;}
				let dx = Math.round(2 * Math.random() - 1);
				let dy = Math.round(2 * Math.random() - 1);

				// Don't get out of the screen !!
				if (i + dx <= 1 || i + dx >= width-1) {
					dx = 0;
				}
				if (j + dy <= 1 || j + dy >= height-1) {
					dy = 0;
				}
				// Copy a random nearest tile
				constructionMap[i+dx][j+dy] = constructionMap[i][j];
			}
		}
	}

	//Cleaning
	for (let i = 1; i < width - 1; i++) {					// Delete isolate water and isolate mountain
		for (let j = 1; j < height - 1; j++) {
			let countMountain = 0;
			let countWater = 0;
			for (let n = -1; n < 2; n++) {
				if (constructionMap[i-1][j+n] == 1) {countWater++;}
				if (constructionMap[i][j+n] ==1) {countWater++;}
				if (constructionMap[i+1][j+n] ==1 ) {countWater++;}

				if (constructionMap[i-1][j+n] == 2) {countMountain++;}
				if (constructionMap[i][j+n] ==2) {countMountain++;}
				if (constructionMap[i+1][j+n] ==2 ) {countMountain++;}
			}
			if (constructionMap[i][j] == 1 && countWater == 1 && countMountain == 0) {
				constructionMap[i][j] = 0 ;
			} else if (constructionMap[i][j] == 0 && countWater > 4) {
				constructionMap[i][j] = 1 ;
			} else if (constructionMap[i][j] == 2 && countMountain < 4) {
				constructionMap[i][j] = 5 ;
			}

			
		}
	}

	for (let i = 1; i < width - 1; i++) {					// Make Hight Mountain (eg center of  a 3x3 square mountain) and deep water
		for (let j = 1; j < height - 1; j++) {
			if (constructionMap[i][j] == 2) {
				let counter = 0;
				for (let n = -1; n < 2; n++) {
					if (constructionMap[i-1][j+n] == 2 || constructionMap[i-1][j+n] == 3) {counter++;}
					if (constructionMap[i][j+n] == 2 || constructionMap[i][j+n] == 3) {counter++;}
					if (constructionMap[i+1][j+n] == 2 || constructionMap[i+1][j+n] == 3) {counter++;}
				}
				if (counter == 9) {constructionMap[i][j] = 3 ;}
			}

			if (constructionMap[i][j] == 1) {
				let counter = 0;
				for (let n = -1; n < 2; n++) {
					if (constructionMap[i-1][j+n] == 1 || constructionMap[i-1][j+n] == 4) {counter++;}
					if (constructionMap[i][j+n] == 1 || constructionMap[i][j+n] == 4) {counter++;}
					if (constructionMap[i+1][j+n] == 1 || constructionMap[i+1][j+n] == 4) {counter++;}
				}
				if (counter == 9) {constructionMap[i][j] = 4 ;}
			}
		}
	}
	
	// search free Places for forest
	let freePlaces = [];
	for(let i = 1; i < width - 1; i++) {
		for (let j = 1; j < height - 1; j++) {
			if (constructionMap[i][j] == 0) {
				freePlaces.push( [i,j] );
			}
		}
	}
	
	// Search maxForest places randomly
	let forestList = [];
	for (let i = 0; i < maxForest; i++){
		let place = freePlaces[Math.floor(freePlaces.length * Math.random())];
		forestList.push(place);
	}
	
	// Cellular automata for forest growing (brownian mouvment)
	for (let l = 0; l < maxIter; l++) {
		let newTree = [];
		for (let tree of forestList ) {
			for (let n = -1; n < 2; n++) {
				let dx = Math.round(Math.random() * 2 - 1);
				let dy = Math.round(Math.random() * 2 - 1);
				if (constructionMap[tree[0] + dx][tree[1] + dy] == 0) {
					newTree.push([tree[0] + dx,tree[1]+ dy]);
					constructionMap[tree[0] + dx][tree[1] + dy] = 6;
				}
			}
		}
		forestList = forestList.concat(newTree);
	}
	
	freePlaces = [];
	for(let i = 1; i < width - 1; i++) {
		for (let j = 1; j < height - 1; j++) {
			if (constructionMap[i][j] == 0) {
				freePlaces.push( [i,j] );
			}
		}
	}
	
	// Search maxDesert places randomly
	let desertList = [];
	for (let i = 0; i < maxDesert; i++){
		let place = freePlaces[Math.floor(freePlaces.length * Math.random())];
		desertList.push(place);
	}
	
	// Cellular automata for forest growing (brownian mouvment)
	for (let l = 0; l < maxIterDesert; l++) {
		let newSand = [];
		for (let sand of desertList ) {
			for (let n = -1; n < 2; n++) {
				let dx = Math.round(Math.random() * 2 - 1);
				let dy = Math.round(Math.random() * 2 - 1);
				if (constructionMap[sand[0] + dx][sand[1] + dy] == 0) {
					newSand.push([sand[0] + dx,sand[1]+ dy]);
					constructionMap[sand[0] + dx][sand[1] + dy] = 7;
				}

			}
		}
		desertList = desertList.concat(newSand);
	}

	// Fill the map
	// Border
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			let tile = new Border(i,j);
			map[i][j] = tile;
		}
	}

	// Inside
	for (let i = 1; i < width - 1; i++) {
		for (let j = 1; j < height - 1; j++) {
			if (constructionMap[i][j] == 0) {
				map[i][j] = new Floor0(i, j);
			} else if (constructionMap[i][j] == 1) {
				map[i][j] = new Water(i, j);
			} else if (constructionMap[i][j] == 2) {
				map[i][j] = new Mountain(i, j);
			} else if (constructionMap[i][j] == 3) {
				map[i][j] = new HightMountain(i, j);
			} else if (constructionMap[i][j] == 4) {
				map[i][j] = new DeepWater(i, j);
			} else if (constructionMap[i][j] == 5) {
				map[i][j] = new Hill(i, j);
			} else if (constructionMap[i][j] == 6) {
				map[i][j] = new Forest(i, j);
			} else if (constructionMap[i][j] == 7) {
				map[i][j] = new Desert(i, j);
			} else {
				map[i][j] = new House(i, j);
			}
		}
	}
	
	return map;
}

function showMap(width, height, map, camera) {
	for (let i = camera.x; i < width + camera.x; i++) {
		for (let j = camera.y; j < height + camera.y; j++) {
			map[i][j].show(camera);
		}
	}
}

function circularFOV(width, height,map, player, listOfMonster) {
	for(let i = camera.x; i < camera.x + width; i++) {
		for (let j = camera.y ; j < camera.y + height; j++) {
			let dx = player.x - i;
			let dy = player.y - j;
			if (Math.pow(dx,2) + Math.pow(dy,2) < Math.pow(player.FOV,2)) {
				map[i][j].seen = true;
				map[i][j].visited = true;

			} else {
				map[i][j].seen = false;

			}
		}
	}
	for (let monster of listOfMonster) {
		let dx = player.x - monster.x;
			let dy = player.y - monster.y;
			if (Math.pow(dx,2) + Math.pow(dy,2) < Math.pow(player.FOV,2)) {
				monster.seen = true;
				//monster.visited = true;

			} else {
				monster.seen = false;

			}
	}
}

function findFreeRandomPlace(map, width, height) {
	const middleX = Math.round(width / 2);
	const middleY = Math.round(height / 2);
	const zone = 30;
	let freePlaces = [];
	for(let i = middleX - zone ; i < middleX + zone; i++) {
		for (let j = middleY - zone; j < middleY + zone; j++) {
			if (map[i][j].cross) {
				freePlaces.push( [i,j] );
			}
		}
	}
	return freePlaces[Math.floor(Math.random() * freePlaces.length)];


}