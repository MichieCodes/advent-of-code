const fs = require('fs');
const path = require('path');

/**
* @param {string} input
* @return {string[]}
*/
function processInput(input) {
    return input.split(/\s+/).filter((bits) => bits);
}

/**
* @param {string[]} bitList
* @param {number} i
* @returns {{0: string[], 1: string[]}}
*/ 
function partitionByBit(bitList, i) {
    let partition = {0: [], 1: []};
    
    for(const bits of bitList) {
        partition[bits[i]].push(bits);
    }

    return partition;
}

/**
* @param {string[]} bitList
* @returns {{mostCommonValue: string, leastCommonValue: string}}
*/   
function processValues(bitList) {
    const size = bitList[0].length; 
    let leastCommonList = [...bitList];
    let mostCommonList = [...bitList];

    for(let i = 0; i < size; i++) {
        if(leastCommonList.length <= 1 && mostCommonList.length <= 1) break;

        if(leastCommonList.length > 1) {
            const partition = partitionByBit(leastCommonList, i);
            const leastCommonPartition = (partition[0].length > partition[1].length) | 0

            leastCommonList = partition[leastCommonPartition]; 
        }

        if(mostCommonList.length > 1) {
            const partition = partitionByBit(mostCommonList, i);
            const mostCommonPartition = (partition[0].length <= partition[1].length) | 0

            mostCommonList = partition[mostCommonPartition]; 
        }
    }

    return {
        mostCommonValue: mostCommonList[0],
        leastCommonValue: leastCommonList[0]
    }; 
}

/**
 * @param {string} input 
 */
function dayThree(input) {
    const bitList = processInput(input);

    const {mostCommonValue, leastCommonValue} = processValues(bitList);

    return parseInt(mostCommonValue, 2) * parseInt(leastCommonValue, 2);
}

const testInput = fs.readFileSync(
    path.join(__dirname, 'test.txt'),
    {encoding: 'utf-8'}
);

const mainInput = fs.readFileSync(
    path.join(__dirname, 'input1.txt'),
    {encoding: 'utf-8'}
);

console.log(dayThree(testInput));
console.log(dayThree(mainInput)); 
