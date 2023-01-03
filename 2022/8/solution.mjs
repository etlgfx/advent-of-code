import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

await file.close();

const parse = (input) => {
    return input.trim().split('\n').map(l => l.split('').map(_ => Number(_)));
};

/*
const parseTree = (input) => {
    const stream = parse(input);
};
*/

const walk = (matrix, visible, direction) => {
    const width = matrix[0].length;
    const height = matrix.length;

    let maxrow = new Array(width).fill(-1);

    for (var i = direction ? height - 1: 0; direction ? i >= 0 : i < height; direction ? i-- : i++) {

        let maxcol = -1;

        for (var j = direction ? width - 1: 0; direction ? j >= 0 : j < width; direction ? j-- : j++) {
            //console.log(i, j);
            if (maxcol < matrix[i][j]) {
                //console.log('visible c');
                visible.set(`${i}:${j}`, [i, j, matrix[i][j]]);
                maxcol = matrix[i][j];
            }

            if (maxrow[j] < matrix[i][j]) {
                //console.log('visible r');
                visible.set(`${i}:${j}`, [i, j, matrix[i][j]]);
                maxrow[j] = matrix[i][j];
            }
        }
    }
};

const solution = (input) => {
    const matrix = parse(input);

    //console.log(matrix);

    let visible = new Map();

    walk(matrix, visible, false);
    walk(matrix, visible, true);

    return visible;
};

const scenicScore = (matrix, i, j) => {
    const width = matrix[0].length;
    const height = matrix.length;

    let h = matrix[i][j];
    let r = 0;
    let d = 0;
    let l = 0;
    let u = 0;

    for (; j + r < width - 1 && (matrix[i][j + r] < h || r == 0); r++);
    for (; i + u < height - 1 && (matrix[i + u][j] < h || u == 0); u++);
    for (; j - l > 0 && (matrix[i][j - l] < h || l == 0); l++);
    for (; i - d > 0 && (matrix[i - d][j] < h || d == 0); d++);

    //console.log(i, j, r, d, l, u);

    return r * d * l * u;
}

const solution2 = (input) => {
    const matrix = parse(input);

    const width = matrix[0].length;
    const height = matrix.length;

    let max = {
        score: 0,
    };

    for (var i = 1; i < height - 1; i++) {
        for (var j = 1; j < width - 1; j++) {

            let score = scenicScore(matrix, i, j);

            if (score > max.score) {
                max.score = score;
                max.i = i;
                max.j = j;
            }
        }
    }

    return max;
};

/*
const i = `
30373
25512
65332
33549
35390`;
*/

console.log('part1', solution(input).size);

console.log('part2', solution2(input));
