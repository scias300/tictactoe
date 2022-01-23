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
let difficulty = document.querySelector('.difficulty');
let easy = document.querySelector('.easy');
let normal = document.querySelector('.normal');
let hard = document.querySelector('.hard');
let counter = 0;
let tie = 0;
let crosses = [];
let zeros = [];
let win = false;
let vacants = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const wins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

easy.addEventListener('click', () => {
    startGame(makeMoveAiEasy);
});
normal.addEventListener('click', () => {
    startGame(makeMoveAiNormal);
});
hard.addEventListener('click', () => {
    startGame(makeMoveAiHard);
});

onePlayer.addEventListener('click', () => {
    menu.classList.add('hidden');
    difficulty.classList.add('container-visible');
});

twoPlayer.addEventListener('click', () => {
    startGame(makeMove);
});

newGame.addEventListener('click', () => {
    location.reload();
});

function startGame(gameMode) {
    createField();
    cells.forEach(item => {
        item.addEventListener('click', gameMode);
    });
    container.classList.add('container-visible');
    replay.addEventListener('click', createField);
    replay.addEventListener('click', () => {
        startGame(gameMode);
    });
    menu.classList.add('hidden');
    difficulty.classList.remove('container-visible');
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

function isTie() {
    tie++;
    if (tie === 9) {
        overlay.classList.add('visible');
        text.textContent = 'Tie';
    }
}

function isWin() {
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

function addMark(gameMode, targetElem, mark, player, num) {
    targetElem.classList.add(mark);
    player.push(num);
    targetElem.removeEventListener('click', gameMode);
    vacants = vacants.filter((item) => item != num);
    isTie();
    isWin();
}

function makeMove(event) {
    let num = +this.getAttribute('num');
    let target = event.target;
    if (counter == 0) {
        addMark(makeMove, target, 'cross', crosses, num);
        counter++;
        return;
    }
    if (counter == 1) {
        addMark(makeMove, target, 'zero', zeros, num);
        counter--;
        return;
    }
}

function makeMoveAiEasy(event) {
    let num = +this.getAttribute('num');
    let target = event.target;
    addMark(makeMoveAiEasy, target, 'cross', crosses, num);
    if (win === false && tie < 9) {
        let random = vacants[Math.floor(Math.random() * vacants.length)];
        let randomElem = document.querySelector(`.cell-${random}`);
        addMark(makeMove, randomElem, 'zero', zeros, random);
    }
}

function makeMoveAiNormal(event) {
    let num = +this.getAttribute('num');
    let target = event.target;
    addMark(makeMoveAiNormal, target, 'cross', crosses, num);
    if (win === false && tie < 9) {
        for (let item of wins) {
            if (zeros.includes(item[0]) && zeros.includes(item[1]) && vacants.includes(item[2])) {
                let random = item[2];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiNormal, randomElem, 'zero', zeros, random);
                return false;
            } else if (zeros.includes(item[0]) && zeros.includes(item[2]) && vacants.includes(item[1])) {
                let random = item[1];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiNormal, randomElem, 'zero', zeros, random);
                return false;
            } else if (zeros.includes(item[1]) && zeros.includes(item[2]) && vacants.includes(item[0])) {
                let random = item[0];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiNormal, randomElem, 'zero', zeros, random);
                return false;
            }
        }
        for (let item of wins) {
            if (crosses.includes(item[0]) && crosses.includes(item[1]) && vacants.includes(item[2]) && zeros.includes(item[2]) !== true) {
                let random = item[2];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiNormal, randomElem, 'zero', zeros, random);
                return false;
            } else if (crosses.includes(item[0]) && crosses.includes(item[2]) && vacants.includes(item[1]) && zeros.includes(item[1]) !== true) {
                let random = item[1];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiNormal, randomElem, 'zero', zeros, random);
                return false;
            } else if (crosses.includes(item[1]) && crosses.includes(item[2]) && vacants.includes(item[0]) && zeros.includes(item[0]) !== true) {
                let random = item[0];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiNormal, randomElem, 'zero', zeros, random);
                return false;
            }
        }
        let random = vacants[Math.floor(Math.random() * vacants.length)];
        let randomElem = document.querySelector(`.cell-${random}`);
        addMark(makeMoveAiNormal, randomElem, 'zero', zeros, random);
    }
}

function makeMoveAiHard(event) {
    let num = +this.getAttribute('num');
    let target = event.target;
    addMark(makeMoveAiHard, target, 'cross', crosses, num);
    if (win === false && tie < 9) {
        if (vacants.includes(5)) {
            let random = 5;
            let randomElem = document.querySelector(`.cell-${random}`);
            addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
            return false;
        }
        for (let item of wins) {
            if (zeros.includes(item[0]) && zeros.includes(item[1]) && vacants.includes(item[2])) {
                let random = item[2];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
                return false;
            } else if (zeros.includes(item[0]) && zeros.includes(item[2]) && vacants.includes(item[1])) {
                let random = item[1];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
                return false;
            } else if (zeros.includes(item[1]) && zeros.includes(item[2]) && vacants.includes(item[0])) {
                let random = item[0];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
                return false;
            }
        }
        for (let item of wins) {
            if (crosses.includes(item[0]) && crosses.includes(item[1]) && vacants.includes(item[2]) && zeros.includes(item[2]) !== true) {
                let random = item[2];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
                return false;
            } else if (crosses.includes(item[0]) && crosses.includes(item[2]) && vacants.includes(item[1]) && zeros.includes(item[1]) !== true) {
                let random = item[1];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
                return false;
            } else if (crosses.includes(item[1]) && crosses.includes(item[2]) && vacants.includes(item[0]) && zeros.includes(item[0]) !== true) {
                let random = item[0];
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
                return false;
            }
        }
        for (let item of vacants) {
            if (item % 2 !== 0) {
                let random = item;
                let randomElem = document.querySelector(`.cell-${random}`);
                addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
                return false;
            }
        }
        let random = vacants[Math.floor(Math.random() * vacants.length)];
        let randomElem = document.querySelector(`.cell-${random}`);
        addMark(makeMoveAiHard, randomElem, 'zero', zeros, random);
    }
}