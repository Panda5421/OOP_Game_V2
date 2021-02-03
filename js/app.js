/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startBtn = document.querySelector('#btn__reset');
const keyboard = document.querySelector('#qwerty');
let game;

document.querySelector('body').addEventListener('keydown', e => {
	game.handleInteraction(e);
});

keyboard.addEventListener('click', e => {
	if(e.target.nodeName === 'BUTTON') {
		game.handleInteraction(e);
	}
});

startBtn.addEventListener('click', e => {
	game = new Game();
	game.startGame();
});