import {input} from './input.mjs';

function part1(input) {
    return input.trim().split('\n').reduce((acc, line) => {
        if (line !== '') {
            acc[acc.length - 1] += Number(line);
        }
        else {
            acc[acc.length] = 0;
        }
        return acc;
    }, [0]).sort((a, b) => a - b);
}

console.dir(part1(input).pop());
console.dir(part1(input).slice(-3).reduce((a, n) => a + n));

