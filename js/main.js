var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'simon', { init: init, preload: preload, create: create, update: update });

game.global = {
	start: {
		buttonWidth: 256,
		buttonHeight: 64
	},
	game: {
		count: 10,
		best: 0
	}
}

game.user = {
	serialize: function() {
		var saveObject = {};
		saveObject.best = game.global.game.best;
		return JSON.stringify(saveObject);
	},
	unserialize: function(json) {
		var saveObject = JSON.parse(json);
		game.global.game.best = saveObject.best;
	},
	save: function(key) {
		if (key === undefined) key = 'default';
		localStorage.setItem('save-'+key, this.serialize());
	},
	load: function(key) {
		if (key === undefined) key = 'default';
		var state = localStorage.getItem('save-'+key);
		if (state) {
			this.unserialize(state);
		}
	}
}

function init() {
	game.stage.backgroundColor = "#FFFFFF";
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.user.load();
}

function preload() {
	game.load.spritesheet('play_button', 'img/play_button.png', game.global.start.buttonWidth, game.global.start.buttonHeight);
	game.load.spritesheet("simon", "img/simon.png", 128, 128);
}

function create() {
	game.state.start("Start");
}

function update() {
	//console.log("update");
}

// game states
game.state.add("Start", start);
game.state.add("Game", simonGame);