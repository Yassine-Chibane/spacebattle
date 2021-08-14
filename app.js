console.log("JS test");


// Create Ship Class 

// Give parameters: name hull firepower accuracy 

class ship {
	constructor(name, hull, firepower, accuracy){
		this.name = name;
		this.hull = hull;
		this.firepower = firepower;
		this.accuracy = accuracy
	}

	attack(enemy) {
		// If the random number is less than accuracy, attack!
		if (Math.random().toFixed(1) < this.accuracy){
			// reduce enemy hull by firepower
			enemy.hull -= this.firepower;
			console.log(`${this.name} dealt ${this.firepower} to ${enemy.name}, their hull is now ${enemy.hull}`);
		} else {
			console.log(`${this.name}'s attack is missed`);
		}
	}

	isAlive() {
		if (this.hull > 0)  {
			return true
		} else {
			return false		
		}

	}
}
 


// Make ussSchwarzenegger
const ussSchwarzenegger = new ship("USS Schwarzenegger", 20, 5, .7); 


console.log(ussSchwarzenegger); 
 

const alienShips = [];

const game = {

	alienShips: [],

	makeShip: function() {

		for(let i = 0; i < 6; i++){

 			this.alienShips[i] = new ship("AlienShip_" + i, Math.floor(Math.random() * 4 + 3 ), Math.floor(Math.random() * 3 + 2 ), (Math.random() * .2 + .6).toFixed(1));
		}
	},

	startGame() {
		let askUser = prompt(' Do you want to start the game?');
		if (askUser.toLowerCase() === "yes") {
			this.makeShip();
			// start the attacks
			game.fight();
		}
	},

	// this method assumes there is a living alien in position 0
	fight() {

		// we attack alien0
		ussSchwarzenegger.attack(game.alienShips[0]);

		// if i just killed the alien 
		if (!game.alienShips[0].isAlive()) {
			// get rid off dead alien (shift), get me the next alien
			game.alienShips.shift();
			// say alien is dead, there are x aliens left
			console.log('The Alien ship is dead!');
                        
		} 

		// if there are aliens left
		if (game.alienShips.length > 0){

			// alien 0 attacks us back 
			game.alienShips[0].attack(ussSchwarzenegger);

			// if alien0 is alive and i am alive
			if (game.alienShips[0].isAlive() && ussSchwarzenegger.isAlive()) {
				// see if user wants to keep going to give up		
				game.continueFight();

			} else if (!ussSchwarzenegger.isAlive()){
				console.log("You lost");
			}

		} else {
			console.log("You won");
		}
	},
	
	continueFight() {
		let askAttack = prompt(`You have ${ussSchwarzenegger.hull} hull left, Do you want to continue?`); 

		// If yes USS attacks
		if (askAttack.toLowerCase() === "yes") {
			game.fight();
		} 
        else {
			
		}
	}

};

game.startGame()
