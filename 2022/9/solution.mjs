import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

await file.close();

const parse = (input) => {
    return input
        .trim()
        .split('\n')
        .map((l) => {
            const [d, n] = l.split(' ');
            return [d, Number(n)];
        });
};

const follow = (head, tail) => {
    const diff = [head[0] - tail[0], head[1] - tail[1]];

    //console.log('follow', head, tail, diff);
    let newTail = [...tail];

    if ((Math.abs(diff[0]) > 1 || Math.abs(diff[1]) > 1) && (Math.abs(diff[0]) > 0 && Math.abs(diff[1]) > 0)) {
        newTail[0] += diff[0] / Math.abs(diff[0]);
        newTail[1] += diff[1] / Math.abs(diff[1]);
    }
    else if (Math.abs(diff[0]) > 1) {
        newTail[0] += diff[0] / Math.abs(diff[0]);
    }
    else if (Math.abs(diff[1]) > 1) {
        newTail[1] += diff[1] / Math.abs(diff[1]);
    }

    //console.log('new tail', tail);

    return newTail;
};

const solution = (input, size) => {
    const moves = parse(input);

    let tails = new Set();

    let knots = Array(size).fill(0).map(_ => [0, 0]);

    moves.forEach(move => {
        let [d, n] = move;

        //console.log(knots);

        for (var i = 0; i < n; i++) {

            switch (d) {
                case 'U':
                    knots[0][1]++;
                    break;
                case 'R':
                    knots[0][0]++;
                    break;
                case 'L':
                    knots[0][0]--;
                    break;
                case 'D':
                    knots[0][1]--;
                    break;
            }


            for (var j = 1; j < knots.length; j++) {
                knots[j] = follow(knots[j - 1], knots[j]);
            }

            tails.add(`${knots[knots.length - 1][0]}:${knots[knots.length - 1][1]}`);
        }
    });

    //console.log(tails);

    return tails.size;
};

const i = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

console.log('part1', solution(input, 2));

console.log('part2', solution(input, 10));
