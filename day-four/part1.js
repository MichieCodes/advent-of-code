const fs = require('fs');
const path = require('path');

/**
* @param {string[]} input
* @return {{boards: Object[], callNumbers: number[]}}
*/
function processInput(input) {
    const callNumbers = input[0].split(',').map((n) => +n);
    const boards = [];

    input.slice(1).forEach((row, i) => {
        const offset = i % 5;
        const board = boards[(i / 5)|0] || {};
        const rowSet = row.match(/\d+/g).map((n) => +n);

        board[offset] = new Set(rowSet);

        for(const j in rowSet) {
            const colSet = board[5 + +j] || new Set();
            colSet.add(rowSet[j]);
            board[5 + +j] = colSet;
        }

        boards[(i / 5)|0] = board;
    });

    return {boards, callNumbers};
}

/**
* @param {Object[]} boards
* @param {number} num
* @return {Object}
*/  
function searchBoards(boards, num) {
    for(let board of boards) {
       for(let i in board) {
           let combo = board[i];

           if(combo.delete(num) && combo.size === 0)
                return board; 
       }
    }

    return null;
}

/**
* @param {Object[]} boards
* @param {number[]} callNumbers
* @return {{winningBoard: Object, lastCall: number}}
*/  
function playBingo(boards, callNumbers) {
    for(let num of callNumbers) {
        const winningBoard = searchBoards(boards, num);

        if(winningBoard)
            return {winningBoard, lastCall: num};
    }

    return {winningBoard: {}, lastCall: callNumbers.slice(-1)[0]};
}

/**
* @param {Object[]} board
* @return {number}
*/  
function sumBoard(board) {
    let sum = 0; 

    for(let i = 0; i < 5; i++) {
        const combo = board[i];
        
        combo.forEach((num) => {
            sum += num;
        });
    }

    return sum;
}

/**
* @param {string[]} input
*/
function dayFour(input) {
    const {boards, callNumbers} = processInput(input);
    const {winningBoard, lastCall} = playBingo(boards, callNumbers);
    const winningBoardSum = sumBoard(winningBoard);

    return winningBoardSum * lastCall;
}

const testInput = fs.readFileSync(
    path.join(__dirname, 'test.txt'),
    {encoding: 'utf-8'}
).split(/\r?\n\r?\n?/);

const mainInput = fs.readFileSync(
    path.join(__dirname, 'input1.txt'),
    {encoding: 'utf-8'}
).split(/\r?\n\r?\n?/); 

console.log(dayFour(testInput));
console.log(dayFour(mainInput));
