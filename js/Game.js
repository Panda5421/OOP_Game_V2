/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
 	constructor() {
 		this.missed = 0;
 		this.phrases = ['Dont worry', 'Be Happy', 
 						'Hakuna Matata', 'Problem free philosophy',
 						'Ohana'];
 		this.activePhrase = null;
 	}

	/**
     * Chooses and displays a random phrase, and hides the start game overlay.
     */
 	startGame() {
 		this.activePhrase = new Phrase(this.getRandomPhrase());
 		this.activePhrase.addPhraseToDisplay();
 		document.querySelector('#overlay').style.display = 'none';
 	}

 	/**
     * Gets a random phrase from this.phrases array
     * @return  {String}	a random phrase from this.phrases array
     */
 	getRandomPhrase() {
 		const random = Math.floor(Math.random() * this.phrases.length);
 		return this.phrases[random];
 	}

 	/**
     * Branches code, depending on which letter was clicked/typed
     * @param   {Event}	e - event being triggered
     */
 	handleInteraction(e) {
 		let button;
 		if(e.target.nodeName === 'BODY') {
 			const buttons = document.querySelectorAll('#qwerty button');
	 		for(let b of buttons) {
	 			if(b.textContent == e.key) {
	 				button = b;
	 				break;
	 			}
 			}
 		} else { button = e.target }

 		button.disabled = true;

 		if(this.activePhrase.checkLetter(button.textContent)) {
 			button.className = 'chosen';
 			this.activePhrase.showMatchedLetter(button.textContent);

 			if(this.checkForWin()) {
 				this.gameOver(true);
 			}

 		} else {
 			button.className = 'wrong';
 			this.removeLife();
 		}
 	}

 	/**
     * Removes a life and ends game once all lives lost
     */
 	removeLife() {
 		const hearts = document.querySelector('.tries img[src="images/liveHeart.png"]');
 		hearts.src = 'images/lostHeart.png';

 		this.missed++;
 		if(this.missed === 5) {
 			this.gameOver(false);
 		}
 	}

 	/**
     * Checks to see if the entire phrase has been shown
     * @return  {boolean}	whether game has been won
     */
 	checkForWin() {
 		const letters = document.querySelectorAll('#phrase li');
 		for(let i=0; i<letters.length; i++) {
 			if(letters[i].matches('.hide')) {
 				return false;
 			}
 		};

 		return true;
 	}

 	/**
     * Ends game, shows start screen displaying message, and resets gameboard
     * @param   {boolean}	outcome - whether game has been won or lost
     */
 	gameOver(outcome) {
 		const overlay = document.querySelector('#overlay');
 		const msg = document.querySelector('#game-over-message');
 		overlay.style.display = 'flex';

 		if(outcome) {
 			msg.textContent = 'Yay! You guessed the phrase!'
 			overlay.className =  'win';
 		} else {
 			msg.textContent = 'You ran out of lives!';
 			overlay.className = 'lose';
 		}

 		this.reset();
 	}

 	/**
     * Resets the gameboard
     */
 	reset() {
 		const phrase = document.querySelector('#phrase ul');
 		const buttons = document.querySelectorAll('#qwerty button');
 		const imgs = document.querySelectorAll('.tries img');

 		while(phrase.firstChild) {
 			phrase.removeChild(phrase.firstChild);
 		}

 		buttons.forEach(button => {
 			button.disabled = false;
 			button.className = 'key';
 		});
 		
 		for(let i=0; i<imgs.length; i++) {
 			imgs[i].src = 'images/liveHeart.png';
 		}
 	}
 }