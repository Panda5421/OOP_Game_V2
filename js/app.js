/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const warning = document.createElement('H4');
warning.textContent = 'Beware of sound effects. Turn down your volume if using headphones.';
document.querySelector('#overlay').appendChild(warning);

const startBtn = document.querySelector('#btn__reset');
const keyboard = document.querySelector('#qwerty');
let game;

//handles physical keyboard interaction
document.querySelector('body').addEventListener('keydown', e => {
	if(/[a-z]/.test(e.key.toLowerCase()) && game) {
		game.handleInteraction(e);
	}
});

//handles on-screen keyboard interaction
keyboard.addEventListener('click', e => {
	if(e.target.nodeName === 'BUTTON') {
		game.handleInteraction(e);
	}
});

//initialises new game when start button clicked
startBtn.addEventListener('click', e => {
	game = new Game();
	game.startGame();
});