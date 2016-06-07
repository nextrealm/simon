loading = {
	init: function(){
		// going fullscreen
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setScreenSize(true);
	},
	preload: function(){
		// preloading various assets
        game.load.spritesheet("levels", "img/levels.png", game.global.thumbWidth, game.global.thumbHeight);
		game.load.spritesheet("level_arrows", "img/level_arrows.png", 48, 48);
	},
  	create: function(){
  		// going to level select state
		game.state.start("LevelSelect");
	}
}