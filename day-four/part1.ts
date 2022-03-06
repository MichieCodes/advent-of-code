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
    for(let board of boards) {
       for(let i in board) {
           let combo = board[i];

           if(combo.delete(num) && combo.size === 0)
                return board; 
       }
    }

    return null;
}

function playBingo(boards : Board[], callNumbers : number[]) : BingoGameResults {
    for(let num of callNumbers) {
        const winningBoard = searchBoards(boards, num);

        if(winningBoard)
            return {winningBoard, lastCall: num};
    }

    return {winningBoard: {}, lastCall: callNumbers.slice(-1)[0]};
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
