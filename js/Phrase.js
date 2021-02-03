/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
 	constructor(phrase) {
 		this.phrase = phrase.toLowerCase();
 	}
 	/**
     * Displays the phrase on the gameboard
     */
 	addPhraseToDisplay() {
 		for(let i=0; i<this.phrase.length; i++) {

 			const li = document.createElement('LI');

 			if(/\w/.test(this.phrase[i])) {
 				li.classList.add('hide', 'letter', `${this.phrase[i]}`);
 			} else if(/ /.test(this.phrase[i])) {
 				li.classList.add('space');
 			}

 			li.textContent = this.phrase[i];
 			document.querySelector('#phrase ul').appendChild(li);
 		}
 	}

 	/**
     * Checks to see if the phrase contains the letter chosen
     * @param   {String}	letter - the letter chosen
     * @return  {boolean}	whether the letter chosen is in the phrase
     */
 	checkLetter(letter) {
 		return this.phrase.indexOf(letter) >= 0 ? true : false;
 	}

 	/**
     * Shows any letter within the phrase that matches the chosen letter
     * @param   {String}	letter - the chosen letter
     */
 	showMatchedLetter(letter) {
 		const letters = document.querySelectorAll(`.${letter}`);
 		
 		letters.forEach(l => {
 			l.classList.replace('hide', 'show');
 		});
 	}
 }