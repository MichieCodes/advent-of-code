import fs from 'fs';
import path from 'path'; 

interface Pair {x: number, y: number};

function processInput(input : string[]) : [Pair, Pair][] {
  return [[{x: 0, y: 0}, {x: 0, y: 0}]];
}

function dayFive(input : string[]) {
    processInput(input);
}

const testInput = fs.readFileSync(
    path.join(__dirname, 'test.txt'),
    {encoding: 'utf-8'}
).split('\n');

const mainInput = fs.readFileSync(
    path.join(__dirname, 'input1.txt'),
    {encoding: 'utf-8'}
).split('\n'); 

console.log(dayFive(testInput));
console.log(dayFive(mainInput));
