import { default as Graph } from "node-dijkstra";

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

function displayMatrix(matrix) {
    return matrix.map((r) => r.join(",")).join("\n");
}

/**
 * function Dijkstra(Graph, source):

      create vertex set Q

      for each vertex v in Graph:            
          dist[v] ← INFINITY                 
          prev[v] ← UNDEFINED                
          add v to Q                     
      dist[source] ← 0                       
     
      while Q is not empty:
          u ← vertex in Q with min dist[u]   
                                             
          remove u from Q
         
          for each neighbor v of u still in Q:
              alt ← dist[u] + length(u, v)
              if alt < dist[v]:              
                  dist[v] ← alt
                  prev[v] ← u

      return dist[], prev[]
 */
function d(matrix, start, end) {
    return;
    let unvisited = {};
    let cost = Array(matrix.length)
        .fill([])
        .map((r) => Array(matrix[0].length));

    cost[start[0]][start[1]] = 0;

    let cur = start;

    while (cur[0] != end[0] && cur[1] != end[1]) {
        console.log(displayMatrix(cost));

        let next = [];

        [
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1],
        ].forEach((offset) => {
            let x = cur[0] + offset[0];
            let y = cur[1] + offset[1];

            if (matrix[x] === undefined || matrix[x][y] === undefined) return;
            if (cost[x][y] !== undefined) return;

            next.push([[x, y], matrix[x][y]]);
        });

        next.sort((a, b) => a[1] - b[1]);

        console.log(next);

        let [n, c] = next.pop();

        cost[n[0]][n[1]] = cost[cur[0]][cur[1]] + c;
        cur = n;
    }

    //pos.push
    /*
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
    */
}

function a(input) {
    let matrix = input
        .trim()
        .split(/\n/)
        .map((row) => row.split("").map(Number));

    //console.log(displayMatrix(matrix));

    let pos = [0, 0];
    let end = [matrix.length - 1, matrix[0].length - 1];

    const route = new Graph();

    matrix.forEach((r, x) => {
        r.forEach((c, y) => {
            let k = `${x}:${y}`;
            let edges = {};
            [
                [0, 1],
                [1, 0],
                [-1, 0],
                [0, -1],
            ].forEach(([ox, oy]) => {
                let a = x + ox;
                let b = y + oy;
                let ek = `${a}:${b}`;

                if (matrix[a] && matrix[a][b] !== undefined) {
                    edges[ek] = matrix[a][b];
                }
            });
            route.addNode(k, edges);
        });
    });

    let cost = route.path('0:0', `${matrix.length - 1}:${matrix[0].length - 1}`, {cost: true});

    console.log(cost);
}

//a(input);

function key(coord) {
    return coord.join(':');
}

function b(input) {
    let matrix = input
        .trim()
        .split(/\n/)
        .map((row) => row.split("").map(Number));

    let bigmatrix = Array(matrix.length * 5).fill([]).map(r => Array(matrix[0].length * 5).fill(0));

    bigmatrix.forEach((r, x) => {
        r.forEach((c, y) => {
            bigmatrix[x][y] = (matrix[x % matrix.length][y % matrix.length] + Math.floor(x / matrix.length) + Math.floor(y / matrix.length) - 1) % 9 + 1;
        })
    });

    let start = [0, 0];
    let end = [bigmatrix.length - 1, bigmatrix[0].length - 1];

    const route = new Graph();

    //console.log(bigmatrix);

    bigmatrix.forEach((r, x) => {
        r.forEach((c, y) => {
            let k = key([x, y]);
            let edges = {};
            [
                [0, 1],
                [1, 0],
                [-1, 0],
                [0, -1],
            ].forEach(([ox, oy]) => {
                let a = x + ox;
                let b = y + oy;
                let ek = key([a, b]);

                if (bigmatrix[a] && bigmatrix[a][b] !== undefined) {
                    edges[ek] = bigmatrix[a][b];
                }
            });
            route.addNode(k, edges);
        });
    });

    let cost = route.path(key(start), key(end), {cost: true});

    console.log(cost);
}

b(input);
