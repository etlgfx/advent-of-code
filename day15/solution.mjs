/*
const input = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;
*/

import { input } from "./input.mjs";

function calcCost(matrix, cost, pos, end) {
    let next = [];
    let done = false;

    pos.forEach((p) => {
        [
            [0, 1],
            [1, 0],
            //[-1, 0],
            //[0, -1],
        ].forEach((offset) => {
            let x = p[0] + offset[0];
            let y = p[1] + offset[1];

            if (matrix[x] === undefined || matrix[x][y] === undefined) return;
            if (cost[x][y] !== undefined) return;

            next.push([
                [p[0], p[1]],
                [x, y],
            ]);
        });
    });

    next.forEach(([o, p]) => {
        let [x, y] = p;
        let t = cost[o[0]][o[1]] + matrix[x][y];
        if (t !== undefined && (cost[x][y] === undefined || t < cost[x][y])) {
            cost[x][y] = t;
        }

        if (end[0] == x && end[1] == y) {
            done = true;
        }
    });

    if (done) return;

    calcCost(
        matrix,
        cost,
        next
            .map((pair) => pair[1])
            .reduce(
                (acc, cur) => {
                    let key = cur[0] + ":" + cur[1];

                    if (!acc.hash[key]) {
                        acc.hash[key] = true;
                        acc.pairs.push(cur);
                    }

                    return acc;
                },
                { pairs: [], hash: {} }
            ).pairs,
        end
    );
}

function a(input) {
    let matrix = input
        .trim()
        .split(/\n/)
        .map((row) => row.split("").map(Number));

    console.log(matrix);

    let pos = [0, 0];
    let end = [matrix.length - 1, matrix[0].length - 1];

    let cost = Array(matrix.length)
        .fill()
        .map((row) => Array(matrix[0].length));

    cost[0][0] = 0;

    calcCost(matrix, cost, [pos], end);

    console.log(cost);
}

a(input);
