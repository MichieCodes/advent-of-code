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

function findAdditionalPoints(coordinatePairs : [Pair, Pair][]) {
    return coordinatePairs.map((points) => {
        let [pair1, pair2] = points;

        const horizontalDifference = pair2.x - pair1.x; 
        const verticalDifference = pair2.y - pair1.y; 

        if(horizontalDifference && verticalDifference)
            return undefined;

        if(horizontalDifference) {
            const pointCount = Math.abs(horizontalDifference) + 1;
            const sign = horizontalDifference / (pointCount - 1);

            return Array.from({length: pointCount}, (_, i) => (
                {x: pair1.x + sign * i, y: pair1.y} as Pair
            ));
        } else if(verticalDifference) {
            const pointCount = Math.abs(verticalDifference) + 1;
            const sign = verticalDifference / (pointCount - 1);

            return Array.from({length: pointCount}, (_, i) => (
                {x: pair1.x, y: pair1.y + sign * i} as Pair
            ));
        }

        return points;
    }).filter((points) => points);
}

function dayFive(input : string[]) {
    const coordinatePairs = processInput(input);
    const completePairLists = findAdditionalPoints(coordinatePairs);

    return completePairLists;
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
// console.log(dayFive(mainInput));
