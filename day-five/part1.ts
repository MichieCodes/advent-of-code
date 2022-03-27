import fs from 'fs';
import path from 'path'; 

interface Pair {x: number, y: number};

function processInput(input : string[]) : [Pair, Pair][] {
    const coordinatePairs : [Pair, Pair][] = [];

    for(let line of input) {
        if(!line) continue;

        const pairs = line.split(' -> ').map((pair) => {
            const [x, y] = pair.split(',').map((num) => +num);

            return {x, y};
        });

        coordinatePairs.push(pairs as [Pair, Pair]);
    }

    return coordinatePairs;
}

function dayFive(input : string[]) {
    const coordinatePairs = processInput(input);
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
