import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

await file.close();

const contains = (a, b) => {
    if (a[0] >= b[0] && a[1] <= b[1])
        return true;
    return false;
};

const overlaps = (a, b) => {
    if ((a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1]))
        return true;
    return false;
};

const parse = (input) => input
        .trim()
        .split('\n')
        .map(line => line.split(','))
        .map(([a, b]) => [a.split('-').map(Number), b.split('-').map(Number)]);

const solution = (input) => parse(input).filter(([a, b]) => contains(a, b) || contains(b, a)).length;

const solution2 = (input) => parse(input).filter(([a, b]) => overlaps(a, b) || overlaps(b, a)).length;

console.log(solution2(input));

