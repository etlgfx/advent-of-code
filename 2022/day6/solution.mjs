import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

await file.close();

const parse = (input) => {
    return input.trim();
};

const strdiff = (str) => {
    const u = new Set();

    let s = u.size;
    for (let i = 0; i < str.length; i++) {
        u.add(str[i]);

        if (s == u.size)
            return false;

        s = u.size;
    }

    return true;
};

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
