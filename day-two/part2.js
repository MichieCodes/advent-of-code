const fs = require('fs');
const path = require('path');

const commands = {
    forward: ([,,aim], factor) => [factor, factor * aim, 0],
    up: (_, factor) => [0, 0, -factor],
    down: (_, factor) => [0, 0, factor]
}

/**
 * 
 * @param {string[]} input
 */
function dayTwo(input) {
    const [horizontal, depth] = input.reduce((acc, command) => {
        const [direction, factor] = command.split(/\s/g);
        const [h, d, a] = commands[direction](acc, +factor) || [0, 0];

        acc[0] += h;
        acc[1] += d;
        acc[2] += a;

        return acc;
    }, [0, 0, 0]);
    
    return horizontal * depth; 
}

const testInput = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2"
];
const mainInput = fs.readFileSync(
    path.join(__dirname, 'input1.txt'),
    {encoding: 'utf-8'}
).split('\n');

console.log(dayTwo(testInput));
console.log(dayTwo(mainInput));