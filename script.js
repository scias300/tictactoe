let cells = document.querySelectorAll('.cell');
let overlay = document.querySelector('.overlay');
let text = document.querySelector('.text');
let replay = document.querySelector('.replay');
let lines = document.querySelectorAll('.line');
let onePlayer = document.querySelector('.mode-1');
let twoPlayer = document.querySelector('.mode-2');
let menu = document.querySelector('.menu');
let newGame = document.querySelector('.new-game');
let container = document.querySelector('.container');
let counter = 0;
let tie = 0;
let crosses = [];
let zeros = [];
let win = false;
let vacants = [1, 2, 3, 4, 5, 6, 7, 8, 9];

onePlayer.addEventListener('click', startGameOne);

twoPlayer.addEventListener('click', startGameTwo);

newGame.addEventListener('click', () => {
    location.reload();
});

function startGameOne() {
    createField();
    cells.forEach(item => {
        item.addEventListener('click', makeMoveAi);
    });
    container.classList.add('container-visible');
    replay.addEventListener('click', createField);
    replay.addEventListener('click', startGameOne);
    menu.classList.add('hidden');
}

function startGameTwo() {
    createField();
    cells.forEach(item => {
        item.addEventListener('click', makeMove);
    });
    container.classList.add('container-visible');
    replay.addEventListener('click', createField);
    replay.addEventListener('click', startGameTwo);
    menu.classList.add('hidden');
}

function createField() {
    cells.forEach((item, index) => {
        item.setAttribute('num', index + 1);
    });
    counter = 0;
    tie = 0;
    crosses = [];
    zeros = [];
    vacants = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    cells.forEach(item => {
        item.classList.remove('cross');
        item.classList.remove('zero');
    });
    overlay.classList.remove('visible');
    text.textContent = '';
    lines.forEach(item => {
        item.classList.remove('visible');
    });
    win = false;
}

function makeMove(event) {
    let num = +this.getAttribute('num');
    if (counter == 0) {
        event.target.classList.add('cross');
        crosses.push(num);
        counter++;
        event.target.removeEventListener('click', makeMove);
        vacants = vacants.filter((item) => item != num);
        isTie();
        isWin();
        return;
    }
    if (counter == 1) {
        event.target.classList.add('zero');
        zeros.push(num);
        counter--;
        event.target.removeEventListener('click', makeMove);
        vacants = vacants.filter((item) => item != num);
        isTie();
        isWin();
        return;
    }
}

function isTie() {
    tie++;
    if (tie === 9) {
        overlay.classList.add('visible');
        text.textContent = 'Tie';
    }
}

function isWin() {
    const wins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    wins.forEach((item, index) => {
        if (crosses.includes(item[0]) && crosses.includes(item[1]) && crosses.includes(item[2])) {
            overlay.classList.add('visible');
            text.textContent = 'Cross Win';
            document.querySelector(`.line-${index + 1}`).classList.add('visible');
            win = true;
        }
        if (zeros.includes(item[0]) && zeros.includes(item[1]) && zeros.includes(item[2])) {
            overlay.classList.add('visible');
            text.textContent = 'Zero Win';
            document.querySelector(`.line-${index + 1}`).classList.add('visible');
            win = true;
        }
    });
}

function makeMoveAi(event) {
    let num = +this.getAttribute('num');
    event.target.classList.add('cross');
    crosses.push(num);
    event.target.removeEventListener('click', makeMoveAi);
    vacants = vacants.filter((item) => item != num);
    isTie();
    isWin();
    if (win === false && tie < 9) {
        let random = vacants[Math.floor(Math.random() * vacants.length)];
        let randomElem = document.querySelector(`.cell-${random}`);
        randomElem.classList.add('zero');
        zeros.push(random);
        randomElem.removeEventListener('click', makeMoveAi);
        vacants = vacants.filter((item) => item != random);
        isTie();
        isWin();
    }
}