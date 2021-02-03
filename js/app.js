/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startBtn = document.querySelector('#btn__reset');
const keyboard = document.querySelector('#qwerty');
let game;

//handles physical keyboard interaction
document.querySelector('body').addEventListener('keydown', e => {
	game.handleInteraction(e);
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