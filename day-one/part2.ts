import fs from 'fs';
import path from 'path';

function getNumIncreases(depths : number[]) {
    return depths.slice(1).reduce((acc, cur, i) => (
        depths[i] < cur ? acc + 1 : acc
    ), 0);
}

function getWindowSums(depths : number[], n : number) : number[] {
    const sums = [...Array(depths.length - n + 1)];

    for(const i in sums) {
        for(let j = 0; j < n; j++) {
            const num = depths[+i + j];
            const sum = sums[i] + num || num;
            
            sums[i] = sum;
        }
    }

   return sums;
}

function dayOne(depths : number[]) {
    const numericalDepths = getWindowSums(depths, 3);
    return getNumIncreases(numericalDepths);
}

const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
const mainInput = fs.readFileSync(
    path.join(__dirname, 'input1.txt'),
    {encoding: 'utf-8'}
).split('\n').map(num => +num);


console.log(dayOne(testInput));
console.log(dayOne(mainInput));
