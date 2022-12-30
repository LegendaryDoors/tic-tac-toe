const board = document.getElementById('board');
const cells = document.querySelectorAll('td');
const message = document.getElementById('message');

let gameOver = false;
let currentPlayer = 'X';

function handleCellClick(event) {
// do nothing if game is over or cell is already occupied
if (gameOver || event.target.textContent) {
return;
}

// place player's symbol on the cell and switch players
event.target.textContent = currentPlayer;
event.target.setAttribute('data-player', currentPlayer);
currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

// check for a win
checkWin();
}

function checkWin() {
// check rows
for (let i = 0; i < 9; i += 3) {
if (cells[i].textContent && cells[i].textContent === cells[i + 1].textContent && cells[i].textContent === cells[i + 2].textContent) {
endGame(cells[i].textContent);
return;
}
}

// check columns
for (let i = 0; i < 3; i++) {
if (cells[i].textContent && cells[i].textContent === cells[i + 3].textContent && cells[i].textContent === cells[i + 6].textContent) {
endGame(cells[i].textContent);
return;
}
}

// check diagonals
if (cells[0].textContent && cells[0].textContent === cells[4].textContent && cells[0].textContent === cells[8].textContent) {

    endGame(cells[0].textContent);
return;
}
if (cells[2].textContent && cells[2].textContent === cells[4].textContent && cells[2].textContent === cells[6].textContent) {
endGame(cells[2].textContent);
return;
}

// check for draw
if (Array.from(cells).every(cell => cell.textContent)) {
endGame();
}
}

function endGame(winner) {
gameOver = true;

if (winner) {
message.textContent = `Player ${winner} wins!`;
// highlight the winning cells
for (let i = 0; i < 9; i++) {
if (cells[i].textContent === winner) {
cells[i].classList.add('win');
}
}
} else {
message.textContent = "It's a draw!";
}
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));