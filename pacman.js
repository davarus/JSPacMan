/*
 * 2D Tile Based Map Handling
 * 
 */
var set = "img-32/";
var ext = ".gif";
function MapChunk_Test (level)
{
	var map = getElement("map");
	if (!map) {
		alert("No map node!");
		return;
	}
	if (map.hasChildNodes() == true) // while
		map.removeChild(map.childNodes[0]);

	this.data = level;
	this.tiles = new Array();
	var y, x;
	var chunk = document.createElement("div");
	//chunk.style.position = "absolute";
	var inner = document.createElement("div");
	inner.style.height = chunk.style.height = (level.length - 1) * 32 + "px";
	inner.style.width = chunk.style.width = (level[0].length) * 32 + "px";
	for (y = 0; y< level.length - 1; y++) {
		var row = document.createElement("div");
		this.tiles[y] = new Array();
		for (x = 0; x < level[y].length; x++) {
			var tile = document.createElement("span");
			var img = document.createElement("img");
			img.style.height = "32px";
			img.style.width = "32px";
			this.tiles[y][x] = img;
			tile.appendChild(img);
			row.appendChild(tile);
		}
		inner.appendChild(row);
	}
	chunk.appendChild(inner);

	this.Load = MapSpriteLoad;
	this.Load(level);

	//map.appendChild(chunk);
	map.insertBefore(chunk, map.firstChild);
	this.chunk = chunk;
//	this.table = table;
}

function MapChunk(level)
{
	var map = getElement("map");
	if (!map) {
		alert("No map node!");
		return;
	}
	if (map.hasChildNodes() == true) // while
		map.removeChild(map.childNodes[0]);

	this.data = level;
	this.tiles = new Array();
	var y, x;
	var chunk = document.createElement("div");
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	table.cellPadding = "0";
	table.cellSpacing = "0";
	table.style.height = (level.length - 1) * 32 + "px";
	table.style.width = level[0].length * 32 + "px";
	for (y = 0; y< level.length - 1; y++) {
		var row = document.createElement("tr");
		this.tiles[y] = new Array();
		for (x = 0; x < level[y].length; x++) {
			var tile = document.createElement("td");
			var img = document.createElement("img");
			img.style.height = "32px";
			img.style.width = "32px";
			this.tiles[y][x] = img;
			tile.appendChild(img);
			row.appendChild(tile);
		}
		tbody.appendChild(row);
	}
	table.appendChild(tbody);
	
	chunk.appendChild(table);

	this.Load = MapSpriteLoad;
	this.Load(level);

	//map.appendChild(chunk);
	map.insertBefore(chunk, map.firstChild);
	this.chunk = chunk;
	this.table = table;
}

function MapWallSprite (level, x, y)
{
	var walltype = "wall";
	
	if (y == 0 || level[y - 1].charAt(x) == "w")
		walltype += "1";
	else
		walltype += "0";

	if (x == level[y].length - 1 || level[y].charAt(x + 1) == "w")
		walltype += "1";
	else
		walltype += "0";

	if (y == level.length - 2 || level[y + 1].charAt(x) == "w")
		walltype += "1";
	else
		walltype += "0";

	if (x == 0 || level[y].charAt(x - 1) == "w")
		walltype += "1";
	else
		walltype += "0";

	return walltype;
}


function MapSpriteLoad(level)
{
	var y, x;

	for (y = 0; y < level.length - 1; y++) {
		for (x = 0; x < level[y].length; x++) {
			switch(level[y].charAt(x)) {
			// Pellets
			case "s":	// Super Pellet
			case " ":
			case "t":	// teleporter
				this.tiles[y][x].src = set + "dot" + ext;
				break;

			// Gate
			// TODO:  angle of gate
			case "g":
				this.tiles[y][x].src = set + "gate" + ext;
				break;

			// Player Start Positions
			case "1":
			case "2":
			case "3":
			case "4":
			// Ghost Start Positions
			case "b":
			case "i":
			case "c":
			case "p":
			default:
				this.tiles[y][x].src = set + "wall1111" + ext;
				break;

			// Walls
			case "w":
				this.tiles[y][x].src = set
					+ MapWallSprite(level, x, y) + ext;
				break;
			}
		}
	}
}

function iswall (y, x) {
	if (map.data[y].charAt(x) == 'w')
		return 1;
	if (map.data[y].charAt(x) == 't')
		return 1;
	if (map.data[y].charAt(x) == 'g')
		return 1;

	return 0;
}

function trydir (dir, x, y) {
	var nx = x;
	var ny = y;

	switch (dir) {
	case 0:
		return 1;
	case 1:	// left
		nx -= 1;
		break;
	case 2:	// right
		nx += 1;
		break;
	case 3:	// down
		ny += 1;
		break;
	case 4:	// up
		ny -= 1;
		break;
	}

	var col = Math.floor(nx / 32);
	var row = Math.floor(ny / 32);
	var col2 = Math.floor((nx + 32 - 1) / 32);
	var row2 = Math.floor((ny + 32 - 1) / 32);

	if (iswall(row, col) || iswall(row, col2)
			|| iswall(row2, col) || iswall(row2, col2))
		return 0;

	var message = [ "none", "left", "right", "down", "up" ];
	//alert(message[dir]);
	return 1;
}

function PacMan() {
	this.inherit = Ghost;
	this.inherit("pac");
	this.Think = PacThink;
}

function PacThink() {
	// USER CONTROLLED
}

function Ghost(name) {
	this.name = name;
	this.element = document.createElement("div");
	this.element.id = name;
	this.img = document.createElement("img");
	this.img.src = set + this.name + "r1" + ext;
	this.img.style.width = "32px";
	this.img.style.height = "32px";
	this.element.appendChild(this.img);
	this.element.style.position = "absolute";
	this.element.style.left = "32px";
	this.element.style.top = "32px";
	//this.inherit = Sprite;
	//this.inherit(name);
	//this.Think = GhostThink;

	this.Think = GhostThink;
	this.Move = GhostMove;
	this.Interpolate = GhostInterpolate;

	this.x = 32;
	this.y = 32;
	this.dir = 2;
	this.speed = 8;
	
	this.cur_x = 32.0;
	this.cur_y = 32.0;
	this.x_diff = 0.0;
	this.y_diff = 0.0;
	
	this.state = 0;
	this.frame = 0.0;

	getElement("map").appendChild(this.element);
}

function GhostMove()
{
	switch(this.dir) {
	case 1:
		this.x -= this.speed;
		//this.element.style.left = this.x + "px";
		break;
	case 2:
		this.x += this.speed;
		//this.element.style.left = this.x + "px";
		break;
	case 3:
		this.y += this.speed;
		//this.element.style.top = this.y + "px";
		break;
	case 4:
		this.y -= this.speed;
		//this.element.style.top = this.y + "px";
		break;
	}

	this.x_diff = this.x - this.cur_x;
	this.y_diff = this.y - this.cur_y;
	//this.Interpolate();
}

function GhostThink()
{
	var newdir = new Array();
	var nodir, olddir;
	var i, c;

	if (!this.dir)
		return;

	this.Move();
	if (this.x % 32 || this.y % 32)
		return;	

	if (!this.speed) {
		this.speed = 8;
		return;
	}

	if (this.dir % 2)
		nodir = this.dir + 1;
	else
		nodir = this.dir - 1;
	for (c = 0, i = 1; i < 5; i++) {
		if (i == nodir)
			continue;
		if (trydir(i, this.x, this.y))
			newdir[c++] = i;
	}

	olddir = this.dir;
	if (!c)
		this.dir = 0;
	else
		this.dir = newdir[Math.floor(Math.random() * c)];
	
	if (olddir != this.dir)
		this.speed = 0;
}

// TODO: Pixel level perfection... Currently is off by a pixel or two.
function GhostInterpolate () {
	//var timediff = time - lasttime;
	var timediff = 20.0 / 1000.0;
	var update_fps = 1000.0 / 150.0;
	var dir;
	
	switch (this.dir) {
	case 1:
		this.cur_x -= timediff * this.speed * update_fps / (32.0 / this.speed);
		dir = "l";
		break;
	case 2:
		this.cur_x += timediff * this.speed * update_fps / (32.0 / this.speed);
		dir = "r";
		break;
	case 3:
		this.cur_y += timediff * this.speed * update_fps / (32.0 / this.speed);
		dir = "d";
		break;
	case 4:
		this.cur_y -= timediff * this.speed * update_fps / (32.0 / this.speed);
		dir = "u";
		break;
	}

	if (this.x_diff)
		this.cur_x += (this.x_diff * timediff * update_fps); // / 2.0; 
	if (this.y_diff)
		this.cur_y += (this.y_diff * timediff * update_fps); // / 2.0;

	this.element.style.left = Math.floor(this.cur_x) + "px";
	this.element.style.top = Math.floor(this.cur_y) + "px";
	
	this.frame += timediff * 6.0 / 3.0; 
	//  frames / fps
	if (this.frame > 1.0)
		this.frame -= 1.0;
	if (dir)
		this.img.src = set + this.name + dir + (Math.round(Math.abs((this.frame * 4.0) - 2.0)) + 1) + ext;
}

sprite_images = [
set + "pacr1" + ext,
set + "pacr2" + ext,
set + "pacr3" + ext,
set + "pacl1" + ext,
set + "pacl2" + ext,
set + "pacl3" + ext,
set + "pacu1" + ext,
set + "pacu2" + ext,
set + "pacu3" + ext,
set + "pacd1" + ext,
set + "pacd2" + ext,
set + "pacd3" + ext,
set + "blinkyr1" + ext,
set + "blinkyr2" + ext,
set + "blinkyr3" + ext,
set + "blinkyl1" + ext,
set + "blinkyl2" + ext,
set + "blinkyl3" + ext,
set + "blinkyu1" + ext,
set + "blinkyu2" + ext,
set + "blinkyu3" + ext,
set + "blinkyd1" + ext,
set + "blinkyd2" + ext,
set + "blinkyd3" + ext,
set + "pinkyr1" + ext,
set + "pinkyr2" + ext,
set + "pinkyr3" + ext,
set + "pinkyl1" + ext,
set + "pinkyl2" + ext,
set + "pinkyl3" + ext,
set + "pinkyu1" + ext,
set + "pinkyu2" + ext,
set + "pinkyu3" + ext,
set + "pinkyd1" + ext,
set + "pinkyd2" + ext,
set + "pinkyd3" + ext,
set + "inkyr1" + ext,
set + "inkyr2" + ext,
set + "inkyr3" + ext,
set + "inkyl1" + ext,
set + "inkyl2" + ext,
set + "inkyl3" + ext,
set + "inkyu1" + ext,
set + "inkyu2" + ext,
set + "inkyu3" + ext,
set + "inkyd1" + ext,
set + "inkyd2" + ext,
set + "inkyd3" + ext,
set + "clyder1" + ext,
set + "clyder2" + ext,
set + "clyder3" + ext,
set + "clydel1" + ext,
set + "clydel2" + ext,
set + "clydel3" + ext,
set + "clydeu1" + ext,
set + "clydeu2" + ext,
set + "clydeu3" + ext,
set + "clyded1" + ext,
set + "clyded2" + ext,
set + "clyded3" + ext,

	set + "dot" + ext,
	set + "gate" + ext,
	set + "wall0000" + ext,
	set + "wall1000" + ext,
	set + "wall0100" + ext,
	set + "wall0010" + ext,
	set + "wall0001" + ext,
	set + "wall1100" + ext,
	set + "wall0110" + ext,
	set + "wall0011" + ext,
	set + "wall1110" + ext,
	set + "wall0111" + ext,
	set + "wall1010" + ext,
	set + "wall0101" + ext,
	set + "wall1011" + ext,
	set + "wall1101" + ext,
	set + "wall1001" + ext,
	set + "wall1111" + ext
];

var preload_images;
function Preload(doit) {

	if (!preload_images) {
		preload_images = new Array();
		for (var i = 0; i < sprite_images.length; i++) {
			preload_images[i] = new Image();
			preload_images[i].src = sprite_images[i];
		}
	}

	var loaded = 0;
	for (var i = 0; i < preload_images.length; i++) {
		if (preload_images[i].complete)
			loaded++;
	}

	if (loaded < preload_images.length) {
		setTimeout("Preload('" + doit + "');", 100);
		return;
	}

	eval(doit);
}
