import fs from 'fs';
import path from 'path';

type Direction = 'forward' | 'up' | 'down';
type Command = `${Direction} ${number}`; 
type Stats = [number, number, number];

const commands = {
    forward: ([,,aim] : Stats, factor : number) => [factor, factor * aim, 0] as const,
    up: (_ : Stats, factor : number) => [0, 0, -factor] as const,
    down: (_ : Stats, factor : number) => [0, 0, factor] as const
}

function dayTwo(input : string[]) {
    const [horizontal, depth] = input.reduce((acc, command) => {
        const [direction, factor] = command.split(/\s/g) as [Direction, string];
        const [h, d, a] = commands[direction](acc, +factor) || [0, 0];

        acc[0] += h;
        acc[1] += d;
        acc[2] += a;

        return acc;
    }, [0, 0, 0]);
    
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
