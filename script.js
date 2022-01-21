let cells = document.querySelectorAll('.cell');
let overlay = document.querySelector('.overlay');
let text = document.querySelector('.text');
let start = document.querySelector('.start');
let counter = 0;
let tie = 0;
let crosses = [];
let zeros = [];

start.addEventListener('click', () => {
    location.reload();
});

cells.forEach((item, index) => {
    item.setAttribute('num', index + 1);
    item.addEventListener('click', makeMove);
});

function makeMove(event) {
    if (counter == 0) {
        event.target.classList.add('cross');
        crosses.push(+this.getAttribute('num'));
        counter++;
        event.target.removeEventListener('click', makeMove);
        isTie();
        isWin();
        return;
    }
    if (counter == 1) {
        event.target.classList.add('zero');
        zeros.push(+this.getAttribute('num'));
        counter--;
        event.target.removeEventListener('click', makeMove);
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
    wins.forEach(item => {
        if (crosses.includes(item[0]) && crosses.includes(item[1]) && crosses.includes(item[2])) {
            overlay.classList.add('visible');
            text.textContent = 'Cross Win';
        }
        if (zeros.includes(item[0]) && zeros.includes(item[1]) && zeros.includes(item[2])) {
            overlay.classList.add('visible');
            text.textContent = 'Zero Win';
        }
    });
}