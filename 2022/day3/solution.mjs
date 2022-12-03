import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

const solution = (input) => {
    return input
        .trim()
        .split('\n')
        .reduce((acc, line) => {
            let first = line.substring(0, line.length / 2);
            let second = line.substring(line.length / 2);

            let set1 = new Set(first.split(''));
            let set2 = new Set(second.split(''));

            for (let k of set1.keys()) {
                if (set2.has(k)) {
                    //console.log(k);
                    let c = k.charCodeAt(0);
                    if (c > 96) {
                        //console.log(c, c - 96);
                        return acc + (c - 96);
                    } else {
                        //console.log(c, c - 38);
                        return acc + (c - 38);
                    }
                }
            }
        }, 0);
};

const intersect = (s1, s2) => s1.filter((s) => s2.includes(s));

const solution2 = (input) => {
    let coll = [];

    let sum = 0;

    input
        .trim()
        .split('\n')
        .forEach((line) => {
            coll.push(Array.from(new Set(line.split(''))));

            if (coll.length === 3) {
                let i = intersect(intersect(coll[0], coll[1]), coll[2]);
                //console.log(i);
                let c = i[0].charCodeAt(0);
                if (c > 96) {
                    sum += c - 96;
                } else {
                    sum += c - 38;
                }
                coll = [];
            }
        });

    return sum;
};

/*
console.log(
    solution2(`
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`)
);
*/

console.log(solution2(input));

await file.close();
