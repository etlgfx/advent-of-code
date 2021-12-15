import { input } from "./input.mjs";

/*
const input = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;
*/

function a(input) {
    let coords = input.trim().split(/\n/);

    let folds = [];

    let pop;
    while ((pop = coords.pop())) {
        folds.unshift(pop);
    }

    coords = coords.map((c) => c.split(",").map(Number));
    folds = folds.map((f) => {
        let matches = f.match(/([xy])=(\d+)/);

        if (matches) {
            if (matches[1] === "x") {
                return [Number(matches[2])];
            } else {
                return [, Number(matches[2])];
            }
        }
    });

    //console.log(coords, folds);
    //console.log(displayCoords(coords));

    folds.forEach((f) => {
        coords = fold(coords, f[0], f[1]);
        //console.log(coords);
        //console.log(countCoords(coords));
    });

    console.log(displayCoords(coords));
}

function displayCoords(coords) {
    let matrix = Array(80)
        .fill([])
        .map((r) => {
            return Array(80).fill(".");
        });

    coords.forEach((c) => {
        matrix[c[1]][c[0]] = "#";
    });

    return matrix.map((r) => r.join("")).join("\n") + "\n";
}

function countCoords(coords) {
    let hash = {};
    coords.forEach((c) => {
        let key = c[0] + ":" + c[1];
        hash[key] = (hash[key] ?? 0) + 1;
    });

    return Object.keys(hash).length;
}

function fold(coords, fx, fy) {
    return coords.map((c) => {
        if (fx) {
            if (fx < c[0]) {
                return [fx - (c[0] - fx), c[1]];
            }
        } else {
            if (fy < c[1]) {
                return [c[0], fy - (c[1] - fy)];
            }
        }
        return c;
    });
}

a(input);
