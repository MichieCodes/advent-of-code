const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {number[]} depths 
 * @param {number} depths 
 */
function getNumIncreases(depths) {
    return depths.slice(1).reduce((acc, cur, i) => (
        depths[i] < cur ? acc + 1 : acc
    ), 0);
}

/**
 * 
 * @param {number[]} depths
 * @returns {number[]} 
 */
function getWindowSums(depths, n) {
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

/**
 * 
 * @param {number[]} depths 
 * @returns {number}
 */
function dayOne(depths) {
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
