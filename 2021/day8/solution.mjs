/*(
const input = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;
*/

import {input} from './input.mjs';

function part1(input) {
    let lines = input.trim().split(/\n/);

    let pairs = lines.map(line => line.split('|').map(pairs => pairs.trim().split(' ')));

    console.log(pairs);

    return pairs.map(o => 
        o[1].filter(d => [2, 3, 4, 7].includes(d.length)).length
    ).reduce((prev, cur) => prev + cur, 0);
}

function findDigits(numbers) {
    numbers.sort((a, b) => a.length - b.length);

    let one = numbers.shift();

    let seven = numbers.shift();

    let four = numbers.shift();

    let eight = numbers.pop();

    let sixes = numbers.slice(3);
    let fives = numbers.slice(0, 3);

    let six = sixes.findIndex(n => !(n.includes(one[0]) && n.includes(one[1])));
    [six] = sixes.splice(six, 1);

    let nine = sixes.findIndex(n => n.includes(four[0]) && n.includes(four[1]) && n.includes(four[2]) && n.includes(four[3]));
    [nine] = sixes.splice(nine, 1);

    let zero = sixes.pop();

    let three = fives.findIndex(n =>
        n.includes(seven[0])
        && n.includes(seven[1])
        && n.includes(seven[2]));
    [three] = fives.splice(three, 1);

    let five = fives.findIndex(n =>
        six.includes(n[0]) &&
        six.includes(n[1]) &&
        six.includes(n[2]) &&
        six.includes(n[3]) &&
        six.includes(n[4]));
    [five] = fives.splice(five, 1);

    let two = fives.pop();

    let digits = {}
    digits[zero.split('').sort().join('')] = 0;
    digits[one.split('').sort().join('')] = 1;
    digits[two.split('').sort().join('')] = 2;
    digits[three.split('').sort().join('')] = 3;
    digits[four.split('').sort().join('')] = 4;
    digits[five.split('').sort().join('')] = 5;
    digits[six.split('').sort().join('')] = 6;
    digits[seven.split('').sort().join('')] = 7;
    digits[eight.split('').sort().join('')] = 8;
    digits[nine.split('').sort().join('')] = 9;

    return digits;
}

function mapOutput(digits, output) {
    console.log(digits, output);
    return output.map(str => digits[str.split('').sort().join('')])
}

function part2(input) {
    let lines = input.trim().split(/\n/);

    let pairs = lines.map(line => line.split('|').map(pairs => pairs.trim().split(' ')));

    return pairs.map(o => {
        let out = mapOutput(findDigits(o[0]), o[1]);
        return Number(out.join(''));

    }).reduce((prev, cur) => prev + cur, 0);
}

console.log(part2(input));
