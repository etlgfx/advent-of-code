const input = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

//import {input} from './input.mjs';

function p1(input) {
    let map = input.trim().split(/\n/).map(line => line.split(''));

    console.log(map);
}

p1(input);
