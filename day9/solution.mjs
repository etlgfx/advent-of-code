/*
const input = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;
*/
import {input} from './input.mjs';

function adjacent(matrix, x, y) {
    let xlen = matrix[0].length;
    let ylen = matrix.length;

    let res = [];
    if (x > 0) {
        res.push(matrix[y][x - 1]);
    }
    if (y > 0) {
        res.push(matrix[y - 1][x]);
    }
    if (x < xlen - 1) {
        res.push(matrix[y][x + 1]);
    }
    if (y < ylen - 1) {
        res.push(matrix[y + 1][x]);
    }
    return res;
}

function p1(input) {
    let map = input.trim().split(/\n/).map(line => line.split('').map(Number));

    let minima = [];

    map.forEach((row, y) => {
        row.forEach((c, x) => {
            let adj = adjacent(map, x, y);

            let minadj = adj.reduce((prev, cur) => Math.min(prev, cur))

            if (c < minadj) {
                minima.push(c);
            }
        })
    });

    return minima.map(n => n + 1).reduce((prev, cur) => prev + cur);
}

function growBasin(matrix, v, x, y, res) {
    let xlen = matrix[0].length;
    let ylen = matrix.length;

    if (x > 0 &&
        matrix[y][x - 1] < 9 &&
        matrix[y][x - 1] > v
    ) {
        if (!res.includes((x - 1) +':'+ y)) {
            res.push((x - 1) +':'+ y);
            growBasin(matrix, matrix[y][x - 1], x - 1, y, res);
        }
    }
    if (y > 0 &&
        matrix[y - 1][x] < 9 &&
        matrix[y - 1][x] > v
    ) {
        if (!res.includes(x +':'+ (y - 1))) {
            growBasin(matrix, matrix[y - 1][x], x, y - 1, res);
            res.push(x +':'+ (y - 1));
        }
    }
    if (x < xlen - 1 &&
        matrix[y][x + 1] < 9 &&
        matrix[y][x + 1] > v
    ) {
        if (!res.includes((x + 1) +':'+ y)) {
            res.push((x + 1) +':'+ y);
            growBasin(matrix, matrix[y][x + 1], x + 1, y, res);
        }
    }
    if (y < ylen - 1 &&
        matrix[y + 1][x] < 9 &&
        matrix[y + 1][x] > v
    ) {
        if (!res.includes(x +':'+ (y + 1))) {
            res.push(x +':'+ (y + 1));
            growBasin(matrix, matrix[y + 1][x], x, y + 1, res);
        }
    }

    console.log(res);

    return res;
}

function p2(input) {
    let map = input.trim().split(/\n/).map(line => line.split('').map(Number));

    let basins = [];

    map.forEach((row, y) => {
        row.forEach((c, x) => {
            let adj = adjacent(map, x, y);

            let minadj = adj.reduce((prev, cur) => Math.min(prev, cur))

            if (c < minadj) {
                basins.push(growBasin(map, c, x, y, [x+':'+y]));
            }
        })
    });

    return basins
        .sort((a, b) => b.length - a.length)
        .slice(0, 3)
        .reduce((prev, cur) => prev * cur.length, 1);
}

console.log(p2(input));
