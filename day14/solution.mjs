/*
const input = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;
*/

import {input} from './input.mjs';

function a(input) {
    let lines = input.trim().split(/\n/);

    let start = lines.shift().trim();

    lines.shift();

    let code = start;

    let inserts = [];

    lines.forEach((line) => {
        let [pair, c] = line.split(' -> ');
        inserts.push([pair, c]);
    });

    console.log(inserts);


    for (let i = 0; i < 3; i++) {
        let positions = [];

        for (let j = 0; j < code.length - 1; j++) {
            let codepair = code.substring(j, j + 2);
            positions[j] = inserts.filter(([pair, ]) => pair === codepair).map(([, c]) => c)[0];
        }

        //console.log(positions);

        code = code.split('');
        positions.forEach((c, ix) => {
            //console.log(code, c, ix);
            code.splice(ix * 2 + 1, 0, c);
        })
        code = code.join('');

        //console.log(code);
    }

    let counts = code.split('').reduce((acc, cur) => {
        acc[cur] = (acc[cur] ?? 0) + 1;
        return acc;
    }, {});

    let res = Object.entries(counts).sort((a, b) => a[1] - b[1]);

    console.log(res.pop()[1] - res.shift()[1]);
}

//a(input);

function b(input) {
    let lines = input.trim().split(/\n/);

    let code = lines.shift().trim();

    lines.shift();

    let inserts = [];

    lines.forEach((line) => {
        let [pair, c] = line.split(' -> ');
        inserts.push([pair, c]);
    });

    console.log(code);

    let pairs = {};

    for (let i = 0; i < code.length - 1; i++) {
        let pair = code[i] + code[i + 1];
        pairs[pair] = (pairs[pair] ?? 0) + 1;
    }

    let lets = {};
    code.split('').forEach(c => lets[c] = (lets[c] ?? 0) + 1);

    let repl = {};
    inserts.map(([pair, ins]) => [pair, pair[0] + ins, ins + pair[1]]).forEach(r => repl[r[0]] = r.slice(1));

    console.log(repl);

    Object.keys(repl).forEach(r => {
        pairs[r] = (pairs[r] ?? 0);
    });


    for (let i = 0; i < 40; i++) {
        //console.log(pairs);

        let mods = {};

        Object.keys(pairs).forEach(k => {
            let newlet = repl[k][0][1];
            lets[newlet] = (lets[newlet] ?? 0) + pairs[k];

            mods[repl[k][0]] = (mods[repl[k][0]] ?? 0) + pairs[k];
            mods[repl[k][1]] = (mods[repl[k][1]] ?? 0) + pairs[k];
            mods[k] = (mods[k] ?? 0) - pairs[k] * 1;
        });

        Object.entries(mods).forEach(([k, m]) => {
            pairs[k] += m;
        });
    }


    let res = Object.entries(pairs)
        .flatMap(p => [[p[0][0], p[1]], [p[0][1], p[1]]]);

    let counts = res.reduce((acc, cur) => {
        acc[cur[0]] = (acc[cur[0]] ?? 0) + cur[1];
        return acc;
    }, {});

    console.log(res);
    console.log(counts);


    let tot = Object.entries(counts).sort((a, b) => a[1] - b[1]);

    console.log(lets);
    let tot2 = Object.entries(lets).sort((a, b) => a[1] - b[1]);
    console.log(tot2.pop()[1] - tot2.shift()[1]);
}

b(input);
