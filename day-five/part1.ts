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

function findAdditionalPoints(coordinatePairs : [Pair, Pair][]) : Pair[][] {
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

function findOverlap(coordinatePairs : Pair[][]) {
    const frequencyMap = new Map();
    let overlapCount = 0;

    for(let points of coordinatePairs) {
        for(let pair of points) {
            const key = pairToString(pair);
            let frequency = frequencyMap.get(key) || 0;

            if(frequency === 0)
                overlapCount++;

            frequencyMap.set(key, ++frequency);
        }
    }

    return overlapCount;
}

function pairToString(pair : Pair) {
    return `${pair.x},${pair.y}`;
}

function dayFive(input : string[]) {
    const coordinatePairs : [Pair, Pair][] = processInput(input);
    const completePairLists : Pair[][] = findAdditionalPoints(coordinatePairs);
    const overlapCount = findOverlap(completePairLists);

    return overlapCount;
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
