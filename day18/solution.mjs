import { strict as assert } from "assert";

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

let lines = input
    .trim()
    .split(/\n/)
    .map((l) => JSON.parse(l));
//console.log(lines);

//nested in four left pair explodes
//n >= 10 split left

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

function add(fish1, fish2) {
    let fish = [fish1, fish2];

    while (true) {
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

function explode(fish) {
    return explodeFish(fish, { depth: 0 });
}

function explodeFish(fish, options) {
    if (fish instanceof Array) {
    }
}

let stopSplit = false;
function split(fish) {
    stopSplit = false;

    return splitFish(fish);
}

function splitFish(fish) {
    if (stopSplit) {
        return fish;
    }

    if (fish instanceof Array) {
        return [splitFish(fish[0]), splitFish(fish[1])];
    } else if (fish >= 10) {
        stopSplit = true;
        return [Math.floor(fish / 2), Math.ceil(fish / 2)];
    } else {
        return fish;
    }
}

//testAdd();
testCanExplode();
testCanSplit();
testSplit();

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
