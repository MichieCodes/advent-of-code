import fs from 'fs';
import path from 'path'; 

interface Board {
    [index : number]: Set<number>
}
interface BingoGame {
    boards: Board[],
    callNumbers: number[]
}
interface BingoGameResults {
    winningBoard: Board,
    lastCall: number
} 

function processInput(input : string[]) : BingoGame {
    const callNumbers = input[0].split(',').map((n) => +n);
    const boards : Board[] = [];

    input.slice(1).forEach((row, i) => {
        const offset = i % 5;
        const board = boards[(i / 5)|0] || {};
        const rowSet = row.match(/\d+/g)?.map((n) => +n) || [];

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

function searchBoards(boards : Board[], num : number) {
    let winningBoard = null;

    for(let i in boards) {
        const board = boards[i];

        for(let j in board) {
           let combo = board[j];

           if(combo.delete(num) && combo.size === 0) {
               winningBoard = boards[i];
               delete boards[i];

               break;
           }
        }
    }
    
    return winningBoard;
}

function playBingo(boards : Board[], callNumbers : number[]) : BingoGameResults {
    let winningBoard = {};
    let lastCall = callNumbers[callNumbers.length - 1];

    for(let num of callNumbers) {
        const win = searchBoards(boards, num);

        if(win) {
            winningBoard = win;
            lastCall = num;
        }
    }

    return {winningBoard, lastCall};
}

function sumBoard(board : Board) {
    let sum = 0; 

    for(let i = 0; i < 5; i++) {
        const combo = board[i];
        
        combo.forEach((num) => {
            sum += num;
        });
    }

    return sum;
}

function dayFour(input : string[]) {
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
