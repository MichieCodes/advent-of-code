const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {string} input
 * @return {string[]}
 */
function processInput(input) {
    let bitList = [];
    let size = input.match(/\d+/)[0].length;

    for (let i = 0; i < size; i++) {
        const previousBits = '.'.repeat(i);
        const pattern = new RegExp(`^${previousBits}(\\d)(.+)?`, 'gm');
        const bits = input.replace(pattern, '$1').replace(/\s/g, '');
        bitList.push(bits);
    }

    return bitList;
}

/**
 * 
 * @param {string[]} bitList 
 * @returns {{mostCommonBits: string, leastCommonBits: string}}
 */
function getCommonBits(bitList) {
    let mostCommonBits = '';
    let leastCommonBits = '';
    
    for(let bits of bitList) {
        const numOnes = bits.replace(/0/g, '').length
        const numZeros = bits.length - numOnes;
        const commonBitIndex = numOnes > numZeros;

        mostCommonBits += [0, 1][commonBitIndex | 0];
        leastCommonBits += [0, 1][!commonBitIndex | 0];
    }

    return {mostCommonBits, leastCommonBits};
}

/**
 * 
 * @param {string} input 
 */
function dayThree(input) {
    const bitList = processInput(input);
    const {mostCommonBits, leastCommonBits} = getCommonBits(bitList);

    return parseInt(mostCommonBits, 2) * parseInt(leastCommonBits, 2);
}

const testInput = fs.readFileSync(
    path.join(__dirname, 'test.txt'),
    {encoding: 'utf-8'}
)
const mainInput = fs.readFileSync(
    path.join(__dirname, 'input1.txt'),
    {encoding: 'utf-8'}
)

console.log(dayThree(testInput));
console.log(dayThree(mainInput));