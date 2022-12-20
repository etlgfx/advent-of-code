import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

await file.close();

const parse = (input) => {
    const [init, moves] = input.split('\n\n');

    const stacks = new Array(10).fill().map((_) => []);

    init.split('\n').forEach((line) => {
        for (let i = 0; i < line.length; i++) {
            if (line[i].match('[A-Z]')) {
                stacks[1 + (i - 1) / 4].unshift(line[i]);
            }
        }
    });

    return [
        stacks,
        moves
            .trim()
            .split('\n')
            .map((line) => {
                const m = line.match(/(\d+).+(\d+).+(\d+)/);
                return [Number(m[1]), Number(m[2]), Number(m[3])];
            }),
    ];
};

const solution1 = (input) => {
    const [stacks, moves] = parse(input);

    moves.forEach(move => {
        for (let i = move[0]; i > 0; i--) {
            stacks[move[2]].push(stacks[move[1]].pop());
        }
    });

    return stacks.reduce((acc, cur) => acc + (cur.pop() ?? ''), '');
}

const solution2 = (input) => {
    const [stacks, moves] = parse(input);

    moves.forEach(move => {
        console.log(stacks);
        stacks[move[2]] = stacks[move[2]].concat(stacks[move[1]].splice(-move[0]));
    });

    return stacks.reduce((acc, cur) => acc + (cur.pop() ?? ''), '');
}

console.log(solution1(input));

console.log(solution2(input));
