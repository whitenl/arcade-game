// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 58;
    this.xMove = 101; // horizontal movement unit
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if (this.x < this.xMove * 5) {
		this.x += this.speed * dt;
   	}  
	else {
   		this.x = -this.xMove;
   	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
	constructor() {
	 
	// sets game boundaries to prevent player from moving off game board
    // update these if row or column is added to game  
    this.gameLeftBoundary = 0;
    this.gameUpBoundary = -25;
    this.gameRightBoundary = 404;
    this.gameDownBoundary = 390;

    // Player start position
	this.xStart = 202, 
	this.yStart = 390; 
    this.x = this.xStart;
    this.y = this.yStart;

    // Movement in pixels.
	this.yMove = 83; //vertical movement unit
	this.xMove = 101; // horizontal movement unit

	//player character
	this.sprite = 'images/char-horn-girl.png';

	//flag to stop the game from rendering 
	this.stopPlaying = false;

	}

	render() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	handleInput(input) {
		switch(input) {
			case 'left':
				if(this.x > this.gameLeftBoundary) {
					this.x -= this.xMove;
				}
				break;
			case 'up':
				if(this.y > this.gameUpBoundary ) {
				this.y -= this.yMove;
				}
				break;
			case 'right':
				if(this.x < this.gameRightBoundary ) {
				this.x += this.xMove;
				}
				break;
			case 'down':
				if(this.y < this.gameDownBoundary) {
				this.y += this.yMove;
				}
				break;
		}
	}

	//places player back in start position
	startOver() {
				this.x = this.xStart;
            	this.y = this.yStart;
            	this.stopPlaying = false;
	}

	//modal popup and related event listeners 
	modal() {
		
		const popup = document.querySelector('.modal');
		popup.classList.remove('hide');  

		document.querySelector('.yes-please').addEventListener('click', function() {
	   		popup.classList.add('hide'); 	
	   	});  

		document.querySelector('.no-thanks').addEventListener('click', function(){
	    	popup.classList.add('hide');
	    	player.stopPlaying = true;
		});
	}	
	
	update() {
		//checks for a collision
		
		for (let enemy of allEnemies) {
			if((player.y === enemy.y) && (player.x - enemy.x < enemy.xMove/2 && player.x -  enemy.x > -enemy.xMove/2)) {
				this.startOver();
			}
			//checks if safe zone is reached and triggers win modal
			if(this.y === this.gameUpBoundary) {
				
				this.modal();
				this.startOver();
			}
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101, 83, 150);
const enemy3 = new Enemy(-101, 83, 290);
const enemy4 = new Enemy(-202, 166, 100);
allEnemies.push(enemy1,enemy2,enemy3,enemy4);
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
