import fs from 'fs';
import path from 'path';

interface CommonBits {
    mostCommonBits: string,
    leastCommonBits: string
}

function processInput(input : string) {
    let bitList : string[] = [];
    let size = input.match(/\d+/)?.[0]?.length || 0;

    for (let i = 0; i < size; i++) {
        const previousBits = '.'.repeat(i);
        const pattern = new RegExp(`^${previousBits}(\\d)(.+)?`, 'gm');
        const bits = input.replace(pattern, '$1').replace(/\s/g, '');
        bitList.push(bits);
    }

    return bitList;
}

function getCommonBits(bitList : string[]) : CommonBits {
    let mostCommonBits = '';
    let leastCommonBits = '';
    
    for(let bits of bitList) {
        const numOnes = bits.replace(/0/g, '').length
        const numZeros = bits.length - numOnes;
        const commonBitIndex = numOnes > numZeros;

        mostCommonBits += ['0', '1'][+commonBitIndex];
        leastCommonBits += ['0', '1'][+!commonBitIndex];
    }

    return {mostCommonBits, leastCommonBits};
}

function dayThree(input : string) {
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
