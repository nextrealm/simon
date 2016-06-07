var buttons = [];
var lit = 0;
var sequence = [];
var current = 0;
var last = 0;
var playerInputAllowed = false;
var userCount = 0;

simonGame = {
  	create: function(){
  		buttons = [];
  		for(var i = 0; i < 4; i++){
	  		var button = game.add.button((128 * i) + (game.width * 0.5) - (128 * 1.5), (game.height * 0.5), "simon", this.simonClicked, this);
			button.anchor.setTo(0.5);
			button.frame = i;
			button.onInputDown.add(this.select, this);
			button.onInputOut.add(this.out, this);
			button.onInputUp.add(this.release, this);
			button.alpha = 0.3;
			buttons.push(button);
		}
		playerInputAllowed = false;
		userCount = 0;
		current = 0;
		sequence = [];
		this.addToSequence();
		this.simonSequence();
	},
	simonClicked: function(button, pointer, isOver){
		
	},
	select: function(button, pointer){
		if(playerInputAllowed){
			button.alpha = 1;
		}
	},
	out: function(button, pointer){
		if(playerInputAllowed){
			button.alpha = 0.3;
		}
	},
	release: function(button, pointer, isOver){
		if(isOver){
			if(playerInputAllowed){
				button.alpha = 0.3;
				this.playerSequence(button);
			}
		}
	},
	addToSequence: function(){
		var choice = game.rnd.integerInRange(0,3);
		sequence.push(choice);
	},
	simonSequence: function(){
		isSimon = true;
		lit = sequence[current];
		current++;
		buttons[lit].alpha = 1;
		last = game.time.now;
	},
	playerSequence: function(selected) {
		var correctSquare = sequence[userCount];
		userCount++;
		choice = buttons.indexOf(selected);

		if (choice == correctSquare){
			if(userCount == sequence.length){
				this.addToSequence();
				userCount = 0;
				current = 0;
				isSimon = true;
				playerInputAllowed = false;
			}
		}
		else
		{
			if(sequence.length - 1 > game.global.game.best){
				game.global.game.best = sequence.length - 1;
				game.user.save();
			}
			game.state.start("Start");
		}
	},
	update: function(){
		if(isSimon){
			if(game.time.now - last > 700 - sequence.length * 40){
				buttons[lit].alpha = 0.3;
				game.paused = true;

				setTimeout(function(){
					if(current < sequence.length)
					{
						simonGame.simonSequence();
					}
					else
					{
						isSimon = false;
						playerInputAllowed = true;
					}
					game.paused = false;
				}, 400 - sequence.length * 20);
			}
		}
	}
}