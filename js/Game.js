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
          this.win = this.createAudio('win', 'sounds/win_game.mp3');
          this.lose = this.createAudio('lose', 'sounds/lose_game.wav');
          this.wrong = this.createAudio('wrong', 'sounds/wrong.wav');
          this.correct = this.createAudio('correct', 'sounds/correct.wav');
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
          //sets button variable depending on whether user typed or clicked letter
 		let button;
 		if(e.target.nodeName === 'BODY') {
 			const buttons = document.querySelectorAll('#qwerty button');
	 		for(let b of buttons) {
	 			if(b.textContent == e.key.toLowerCase() && !b.disabled) {
	 				button = b;
	 				break;
	 			}
 			}
 		} else if(e.target.disabled !== true) { button = e.target }

 		if(button) {
               button.disabled = true;

      		if(this.activePhrase.checkLetter(button.textContent)) {
                    //loads all sounds so they don't overlap
                    this.wrong.pause();
                    this.correct.pause();
                    this.correct.currentTime = 0;
                    this.correct.play();
      			button.className = 'chosen';
      			this.activePhrase.showMatchedLetter(button.textContent);

      			if(this.checkForWin()) {
      				this.gameOver(true);
      			}

      		} else {
      			button.className = 'wrong';
                    //loads all sounds so they don't overlap
                    this.wrong.pause();
                    this.correct.pause();
                    this.wrong.currentTime = 0;
      			this.removeLife();
      		}
          }
 	}

 	/**
     * Removes a life and ends game once all lives lost
     */
 	removeLife() {
          this.wrong.currentTime = 0;
          this.wrong.play();

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
     * Ends game, shows start screen display message, and resets gameboard
     * @param   {boolean}	outcome - whether game has been won or lost
     */
 	gameOver(outcome) {
          //resets gameboard and pauses all sounds so 
          //they don't overlap with win/lose sound
          this.reset();
          this.wrong.pause();
          this.correct.pause();

 		const overlay = document.querySelector('#overlay');
 		const msg = document.querySelector('#game-over-message');
 		overlay.style.display = 'flex';

 		if(outcome) {
 			msg.textContent = 'Yay! You guessed the phrase!'
 			overlay.className =  'win';
               this.win.currentTime = 0;
               this.win.play();
 		} else {
 			msg.textContent = `You ran out of lives! The phrase was: "${this.activePhrase.phrase}"`;
 			overlay.className = 'lose';
               this.lose.currentTime = 0;
               this.lose.play();
 		}
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

     /**
     * Creates an audio and source element and adds it to the DOM
     * @param   {String} name - the name of the sound, used to set the id attr of the audio element
     * @param   {String} src - used to set the src attr of the source element to the sound file
     * @return  {Object} audio - the audio element holding the sound effect
     */
     createAudio(name, src) {
          const audio = document.createElement('audio');
          const source = document.createElement('source');
          source.src = src;
          audio.id = name;
          audio.appendChild(source);
          document.querySelector('.main-container').appendChild(audio);

          return audio;
     }
 }