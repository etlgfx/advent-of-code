const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

function getBoards(lines) {
    let boards = [];

    let currBoard = [];

    lines.forEach(line => {
        line = line.trim();
        if (line) {
            currBoard.push(line.split(/\s+/).map(s => Number(s)));
        }
        else if (currBoard.length) {
            boards.push(currBoard);
            currBoard = [];
        }
    });

    if (currBoard.length) {
        boards.push(currBoard);
    }

    return boards;
}

function makeMove(board, move) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === move) {
                board[i][j] = false;
            }
        }
    }
}

function checkBoard(board) {
    let answer = board.find(row => {
        if (row.every(cell => cell === false)) {
            return true;
        }
    });

    if (answer) return true;

    let col;

    for (let i = 0; i < board.length; i++) {
        col = [];

        for (let j = 0; j < board[i].length; j++) {
            col.push(board[j][i]);
        }

        if (col.every(cell => cell === false)) {
            return true;
        }
    }
}

function remaining(board) {
    return board.flat().reduce((prev, curr) => prev + curr);
}

function bingo1(input) {
    let lines = input.split(/\n/);

    let moves = lines.shift().split(',').map(s => Number(s));

    let boards = getBoards(lines);

    for (let i = 0; i < moves.length; i++) {
        let move = moves[i];

        console.log('move', move);

        boards.forEach(board => makeMove(board, move))

        console.log(boards);
        let winner = boards.find(board => checkBoard(board));

        if (winner) {
            return remaining(winner) * move;
        }
    }
}

function bingoLast(input) {
    let lines = input.split(/\n/);

    let moves = lines.shift().split(',').map(s => Number(s));

    let boards = getBoards(lines);

    let winning = [];

    for (let i = 0; i < moves.length; i++) {
        let move = moves[i];

        console.log('move', move);

        boards.forEach(board => makeMove(board, move))

        boards.forEach((board, index) => {
            if (checkBoard(board)) {
                console.log(board, index, winning);

                if (!winning.includes(index)) {
                    winning.push(index);
                }
            }
        });

        if (winning.length === boards.length) {
            return remaining(boards[winning[winning.length - 1]]) * move;
        }
    }
}

console.log(bingoLast(input));
