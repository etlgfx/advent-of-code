import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

await file.close();

const parse = (input) => {
    return input.trim().split('\n');
};

class

const solution = (input, markerLength) => {
    const stream = parse(input);

    let buffer = '';
    let l = markerLength;

    for (let i = 0; i < stream.length; i++) {
        buffer = stream.substring(i - l, i);

        if (buffer.length === l && strdiff(buffer)) {
            return i;
        }
    }
};

console.log(solution(input, 4));

console.log(solution(input, 14));
