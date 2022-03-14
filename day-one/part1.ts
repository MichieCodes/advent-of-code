import fs from 'fs';
import path from 'path';

function dayOne(depths : number[]) {
    return depths.slice(1).reduce((acc, cur, i) => (
        depths[i] < cur ? acc + 1 : acc
    ), 0);
}

const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
const mainInput = fs.readFileSync(
    path.join(__dirname, 'input1.txt'),
    {encoding: 'utf-8'}
).split('\n').map(num => +num);

console.log(dayOne(testInput));
console.log(dayOne(mainInput));
