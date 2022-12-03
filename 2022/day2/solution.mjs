import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

const scores = {
    X: 1,
    Y: 2,
    Z: 3,
};

const moves = {
    A: 'X', //rock
    B: 'Y', //paper
    C: 'Z', //scissors
};

//win 6 draw 3 loss 0

const beats = {
    Y: 'A',
    Z: 'B',
    X: 'C',
};

const solution = (input) => {
    return input.trim().split('\n').reduce((acc, line) => {
        const [o, u] = line.trim().split(' ');

        console.log(o, u, acc);

        let score = 0;

        if (moves[o] === u) score += 3;
        else if (beats[u] === o) score += 6;

        console.log(score + scores[u]);

        return (acc + score + scores[u]);
    }, 0);
};

const loses = {
    A: 'Z', 
    B: 'X',
    C: 'Y',
};

const rbeats = {
    A: 'Y',
    B: 'Z',
    C: 'X',
};

const solution2 = (input) => {
    return input.trim().split('\n').reduce((acc, line) => {
        let [o, r] = line.trim().split(' ');

        let score = 0;

        if (r === 'Y') {
            console.log('draw', o, r, moves[o]);
            score = 3;
            score += scores[moves[o]];
        }
        else if (r === 'Z') {
            console.log('win', o, r, rbeats[o]);
            score = 6;
            score += scores[rbeats[o]];
        }
        else {
            console.log('lose', o, r, loses[o]);
            score = scores[loses[o]];
        }

        console.log(score);
        return (acc + score);
    }, 0);
};

/*
console.log(solution2(`
A X
B X
C X
A Y
B Y
C Y
A Z
B Z
C Z
`));
*/

console.log(solution2('A X'));
console.log(solution2('B X'));
console.log(solution2('C X'));
console.log(solution2('A Y'));
console.log(solution2('B Y'));
console.log(solution2('C Y'));
console.log(solution2('A Z'));
console.log(solution2('B Z'));
console.log(solution2('C Z'));

//console.log(solution2(input));

await file.close();
