import { input } from "./input.mjs";

/*
const input = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;
*/

const adj = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

let flashes = 0;

function flash(matrix, i, j) {
    adj.forEach((offset) => {
        let x = i + offset[0];
        let y = j + offset[1];

        if (matrix[x] && matrix[x][y] !== undefined && matrix[x][y] < 10) {
            matrix[x][y]++;

            if (matrix[x][y] == 10) {
                flashes++;

                flash(matrix, x, y);
            }
        }
    });
}

function p1(input) {
    const matrix = input
        .trim()
        .split(/\n/)
        .map((row) => row.trim().split("").map(Number));

    for (let s = 0; s < 100; s++) {
        console.log(s);
        console.log(matrix.map((r) => r.join("")).join("\n"));

        if (matrix.every((row) => row.every((c) => c == 0))) {
            return s;
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (matrix[i][j] < 10) {
                    matrix[i][j]++;

                    if (matrix[i][j] == 10) {
                        flashes++;
                        flash(matrix, i, j);
                    }
                }
            }
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (matrix[i][j] == 10) matrix[i][j] = 0;
            }
        }
    }

    return flashes;
}

console.log(p1(input));
