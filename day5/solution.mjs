const input2 = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

function drawMatrix(matrix) {
    let output = '';

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            output += matrix[x][y];
        }
        output += '\n';
    }

    console.log(output);
}

function isStraight(linePair) {
    return linePair[0][0] === linePair[1][0] || linePair[0][1] === linePair[1][1]
}

function solution(input) {
    const coords = input.trim().split(/\n/).map(line => line.split(' -> ').map(coord => coord.split(',').map(Number)));

    const size = 1000;
    let matrix = Array(size).fill([]).map(k => Array(size).fill(0));

    coords
        .filter(isStraight)
        .forEach(line => {
        let x = line[0][0];
        let y = line[0][1];

        let ix = line[0][0] === line[1][0] ? 0 : line[0][0] < line[1][0] ? 1 : -1;
        let iy = line[0][1] === line[1][1] ? 0 : line[0][1] < line[1][1] ? 1 : -1;

        while (x != line[1][0] || y != line[1][1]) {
            matrix[x][y]++;

            x += ix;
            y += iy;
        } 

        matrix[x][y]++;
    });

    //drawMatrix(matrix);

    return matrix.map(line => line.reduce((prev, cur) => prev + (cur > 1 ? 1 : 0), 0)).reduce((prev, cur) => prev + cur, 0);
}

console.log('solution1', solution1(input));
