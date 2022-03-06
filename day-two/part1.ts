import fs from 'fs';
import path from 'path';

type Direction = 'forward' | 'up' | 'down';
type Command = `${Direction} ${number}`;

const commands = {
    forward: (factor : number) => [factor, 0] as const,
    up: (factor : number) => [0, -factor] as const,
    down: (factor : number) => [0, factor] as const
}

function dayTwo(input : Command[]) {
    const [horizontal, depth] = input.reduce((acc, command) => {
        const [direction, factor] = command.split(/\s/g) as [Direction, string];
        const [h, d] = commands[direction](+factor) || [0, 0];

        acc[0] += h;
        acc[1] += d;

        return acc;
    }, [0, 0]);
    
    return horizontal * depth; 
}

const testInput : Command[] = [
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
).split('\n') as Command[];

console.log(dayTwo(testInput));
console.log(dayTwo(mainInput));
