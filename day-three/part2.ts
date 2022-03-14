import fs from 'fs';
import path from 'path'; 

interface Partition {0: string[], 1: string[]}
interface CommonValue {
    mostCommonValue: string,
    leastCommonValue: string
} 

function processInput(input : string) {
    return input.split(/\s+/).filter((bits) => bits);
}

function partitionByBit(bitList : string[], i : number) {
    let partition : Partition = {0: [], 1: []};
    
    for(const bits of bitList)
        partition[bits[i] as ('0' | '1')].push(bits);

    return partition;
}

function processValues(bitList : string[]) : CommonValue {
    const size = bitList[0].length; 
    let leastCommonList = [...bitList];
    let mostCommonList = [...bitList];

    for(let i = 0; i < size; i++) {
        if(leastCommonList.length <= 1 && mostCommonList.length <= 1) break;

        if(leastCommonList.length > 1) {
            const partition = partitionByBit(leastCommonList, i);
            const leastCommonPartition = +(partition[0].length > partition[1].length);

            leastCommonList = partition[leastCommonPartition as (0 | 1)]; 
        }

        if(mostCommonList.length > 1) {
            const partition = partitionByBit(mostCommonList, i);
            const mostCommonPartition = +(partition[0].length <= partition[1].length);

            mostCommonList = partition[mostCommonPartition as (0 | 1)]; 
        }
    }

    return {
        mostCommonValue: mostCommonList[0],
        leastCommonValue: leastCommonList[0]
    }; 
}

function dayThree(input : string) {
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
