const input = '3,4,3,1,2';

function part1(input) {
    let days = [];

    input.split(',').map(Number).forEach(f => days[f] = (days[f] ?? 0) + 1);

    for (let d = 0; d < 256; d++) {
        console.log(days);
        console.log(days.reduce((prev, cur) => prev + cur));

        let zero = days.shift();

        if (zero) {
            days[8] = zero;
            days[6] = (days[6] ?? 0) + zero;
        }
    }

    console.log(days);

    console.log(days.reduce((prev, cur) => prev + cur));
}

part1(input);
