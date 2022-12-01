import { strict as assert } from "assert";

/*
const input = `
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
`;
*/

import {input} from './input.mjs';

function a(input) {
    /*
    input = `
    [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]
    `;
    */

    let lines = input
        .trim()
        .split(/\n/)
        .map((l) => JSON.parse(l));

    let sum = lines.shift();
    let next;

    while ((next = lines.shift())) {
        sum = add(sum, next);
    }

    console.dir(sum, { depth: 5 });
    console.log(magnitude(sum));
}

function b(input) {
    let lines = input
        .trim()
        .split(/\n/)
        .map((l) => JSON.parse(l));

    let max = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = lines.length - 1; j > 0; j--) {
            if (i == j) {
                continue;
            }

            let mag = magnitude(add(lines[i], lines[j]));

            console.log(i, j, mag, max);

            max = Math.max(mag, max);
        }
    }

    console.log(max);
}

b(input);
//a(input);

function magnitude(fish) {
    if (fish instanceof Array) {
        return 3 * magnitude(fish[0]) + 2 * magnitude(fish[1]);
    }
    else if (typeof fish === 'number') {
        return fish;
    }
}

function add(fish1, fish2) {
    let fish = JSON.parse(JSON.stringify([fish1, fish2]));

    let i = 0;
    while (true) {
        //console.dir(fish, {depth: 5});

        if (canExplode(fish)) {
            fish = explode(fish);
        } else if (canSplit(fish)) {
            fish = split(fish);
        } else {
            break;
        }
    }

    return fish;
}

function canExplode(fish, d = 0) {
    if (d >= 4) return true;

    return fish.some((l) => {
        if (l instanceof Array) {
            return canExplode(l, d + 1);
        } else {
            return false;
        }
    });
}

function canSplit(fish) {
    return fish.some((l) => {
        if (l instanceof Array) {
            return canSplit(l);
        } else {
            return l >= 10;
        }
    });
}

function pathToKey(path) {
    return path.length ? path.join(":") : "root";
}

function explode(fish) {
    //console.log('beforeexplode');
    //console.dir(fish, {depth: 10});

    let nodes = {};
    let leaves = traverseFish(fish, nodes);

    //console.dir(nodes, {depth: 10});
    //console.dir(leaves, {depth: 10});

    for (let i = 0; i < leaves.length; i++) {
        if (leaves[i].depth > 4 && leaves[i + 1].depth > 4) {
            if (leaves[i - 1]) {
                //console.log('left', i - 1);
                let left = leaves[i - 1];
                nodes[pathToKey(left.path.slice(0, -1))][
                    left.path[left.path.length - 1]
                ] += leaves[i].value;
                //left.parent[left.index] += leaves[i].value;

                //console.log('left', left.parent);
            }

            if (leaves[i + 2]) {
                //console.log('right', i + 1);
                let right = leaves[i + 2];
                nodes[pathToKey(right.path.slice(0, -1))][
                    right.path[right.path.length - 1]
                ] += leaves[i + 1].value;
                //right.parent[right.index] += leaves[i + 1].value;

                //console.log('right', right.parent);
            }

            nodes[pathToKey(leaves[i].path.slice(0, 3))][leaves[i].path[3]] = 0;

            //console.log('splode', splode.parent);

            break;
        }
    }

    //console.log('afterexplode');
    //console.dir(fish, {depth: 10});
    return fish;
}

function traverseFish(fish, nodes, path = []) {
    let leaves = [];

    nodes[pathToKey(path)] = fish;

    if (fish instanceof Array) {
        leaves = leaves.concat(traverseFish(fish[0], nodes, path.concat(0)));
        leaves = leaves.concat(traverseFish(fish[1], nodes, path.concat(1)));
    } else if (typeof fish === "number") {
        leaves.push({
            value: fish,
            path: path,
            depth: path.length,
        });
    }

    return leaves;
}

function split(fish) {
    let nodes = {};
    let leaves = traverseFish(fish, nodes);

    for (let i = 0; i < leaves.length; i++) {
        if (leaves[i].value >= 10) {
            let leaf = leaves[i];
            nodes[pathToKey(leaf.path.slice(0, -1))][leaf.path[leaf.path.length - 1]] = [Math.floor(leaf.value / 2), Math.ceil(leaf.value / 2)];
            break;
        }
    }

    return fish;
}

testAdd();
testCanExplode();
testCanSplit();
testSplit();
testExplode();

function testCanExplode() {
    assert.equal(
        canExplode([
            [
                [[[4, 3], 4], 4],
                [7, [[8, 4], 9]],
            ],
            [1, 1],
        ]),
        true
    );
    assert.equal(
        canExplode([
            [
                [[0, 7], 4],
                [7, [[8, 4], 9]],
            ],
            [1, 1],
        ]),
        true
    );
    assert.equal(
        canExplode([
            [
                [[0, 7], 4],
                [15, [0, 13]],
            ],
            [1, 1],
        ]),
        false
    );
}

function testCanSplit() {
    assert.equal(
        canSplit([
            [
                [[0, 7], 4],
                [15, [0, 13]],
            ],
            [1, 1],
        ]),
        true
    );
}

function testSplit() {
    assert.deepEqual(
        split([
            [
                [[0, 7], 4],
                [15, [0, 13]],
            ],
            [1, 1],
        ]),
        [
            [
                [[0, 7], 4],
                [
                    [7, 8],
                    [0, 13],
                ],
            ],
            [1, 1],
        ]
    );
    assert.deepEqual(
        split([
            [
                [[0, 7], 4],
                [
                    [7, 8],
                    [0, 13],
                ],
            ],
            [1, 1],
        ]),
        [
            [
                [[0, 7], 4],
                [
                    [7, 8],
                    [0, [6, 7]],
                ],
            ],
            [1, 1],
        ]
    );
}

function testExplode() {
    assert.deepEqual(explode([[[[[9, 8], 1], 2], 3], 4]), [
        [[[0, 9], 2], 3],
        4,
    ]);
    assert.deepEqual(explode([7, [6, [5, [4, [3, 2]]]]]), [
        7,
        [6, [5, [7, 0]]],
    ]);
    assert.deepEqual(explode([[6, [5, [4, [3, 2]]]], 1]), [
        [6, [5, [7, 0]]],
        3,
    ]);
    assert.deepEqual(
        explode([
            [3, [2, [1, [7, 3]]]],
            [6, [5, [4, [3, 2]]]],
        ]),
        [
            [3, [2, [8, 0]]],
            [9, [5, [4, [3, 2]]]],
        ]
    );
    assert.deepEqual(
        explode([
            [3, [2, [8, 0]]],
            [9, [5, [4, [3, 2]]]],
        ]),
        [
            [3, [2, [8, 0]]],
            [9, [5, [7, 0]]],
        ]
    );
}

function testAdd() {
    assert.deepEqual(add([1, 2], [2, 3]), [
        [1, 2],
        [2, 3],
    ]);
    assert.deepEqual(add(add(add([1, 1], [2, 2]), [3, 3]), [4, 4]), [
        [
            [
                [1, 1],
                [2, 2],
            ],
            [3, 3],
        ],
        [4, 4],
    ]);
    assert.deepEqual(
        add(add(add(add([1, 1], [2, 2]), [3, 3]), [4, 4]), [5, 5]),
        [
            [
                [
                    [3, 0],
                    [5, 3],
                ],
                [4, 4],
            ],
            [5, 5],
        ]
    );
    assert.deepEqual(
        add(add(add(add(add([1, 1], [2, 2]), [3, 3]), [4, 4]), [5, 5]), [6, 6]),
        [
            [
                [
                    [5, 0],
                    [7, 4],
                ],
                [5, 5],
            ],
            [6, 6],
        ]
    );
}
