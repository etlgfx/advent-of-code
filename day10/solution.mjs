import {input} from './input.mjs';

/*
const input = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;
*/

function reduceMin(prev, cur) {
    return Math.min(prev, cur);
}

function reduceMax(prev, cur) {
    return Math.max(prev, cur);
}

function reduceSum(prev, cur) {
    return prev + cur;
}

function reduceMul(prev, cur) {
    return prev * cur;
}

function matrixAdjacent(matrix, x, y, offset) {
    return matrixGet[x + offset[0]][y + offset[1]];
}

function matrixGet(matrix, x, y) {
    return matrix[x] && matrix[x][y];
}

const opens = '<[{(';
const closes = '>]})';

const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

function matchBrack(c) {
    if (opens.includes(c)) {
        return closes[opens.indexOf(c)];
    }
    else if (closes.includes(c)) {
        return opens[closes.indexOf(c)];
    }
}

function p1(input) {
    const lines = input.trim().split(/\n/);


    let score = 0;
    lines.forEach(line => {
        const stack = [];

        for (let i = 0; i < line.length; i++) {
            let c = line[i];

            if (opens.includes(c)) {
                stack.push(c);
            }
            else if (closes.includes(c) && matchBrack(c) === stack[stack.length - 1]) {
                stack.pop();
            }
            else {
                console.log('err', c);
                score += scores[c];
                break;
            }
        }
    });

    return score;
}

//console.log('p1', p1(input));



const scores2 = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};


function p2(input) {
    const lines = input.trim().split(/\n/);

    let allscores = lines.filter(line => {
        const stack = [];

        for (let i = 0; i < line.length; i++) {
            let c = line[i];

            if (opens.includes(c)) {
                stack.push(c);
            }
            else if (closes.includes(c) && matchBrack(c) === stack[stack.length - 1]) {
                stack.pop();
            }
            else {
                return false;
            }
        }
        return true;
    }).map(line => {
        const stack = [];

        for (let i = 0; i < line.length; i++) {
            let c = line[i];

            if (opens.includes(c)) {
                stack.push(c);
            }
            else if (closes.includes(c) && matchBrack(c) === stack[stack.length - 1]) {
                stack.pop();
            }
        }

        let score = 0;

        stack.reverse().forEach(s => score = score * 5 + scores2[matchBrack(s)]);

        return score;
    });

    allscores.sort((a, b) => a - b);

    console.log(allscores);
    console.log(allscores[Math.floor(allscores.length / 2)]);

    //return score;
}

console.log('p2', p2(input));
