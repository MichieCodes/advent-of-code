import fs from 'fs';
import path from 'path'; 

function dayFive(input : string[]) {
    //
}

const testInput = fs.readFileSync(
    path.join(__dirname, 'test.txt'),
    {encoding: 'utf-8'}
).split(/\r?\n\r?\n?/);

const mainInput = fs.readFileSync(
    path.join(__dirname, 'input1.txt'),
    {encoding: 'utf-8'}
).split(/\r?\n\r?\n?/); 

console.log(dayFive(testInput));
console.log(dayFive(mainInput));
