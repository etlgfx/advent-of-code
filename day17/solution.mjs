const input = `target area: x=96..125, y=-144..-98`;



function a(input) {
    //input = 'target area: x=20..30, y=-10..-5';

    const [, x1, x2, y1, y2] = input.trim().match(/x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/);

    console.log(x1, x2, y1, y2);

    for (let i = 5; i < 126; i++) {
        for (let j = -145; j < 1000; j++) {
            let coords = [0, 0];
            let vinit = [i, j];
            let v = JSON.parse(JSON.stringify(vinit));
            let ymax = 0;

            while (coords[0] <= x2 && coords[1] > y1) {
                coords[0] += v[0];
                coords[1] += v[1]--;

                ymax = Math.max(ymax, coords[1]);

                if (coords[0] >= x1 && coords[0] <= x2 && coords[1] >= y1 && coords[1] <= y2) {
                    hit(vinit, ymax);
                }

                if (v[0] > 0)
                    v[0]--;
                else if (v[0] < 0)
                    v[0]++;
            }
        }
    }

    console.log(Object.keys(hits).sort());
    console.log(Object.keys(hits).length);
}

function listToKey(list) {
    return list.join(',');
}

const hits = {};

function hit(vinit, ymax) {
    hits[listToKey(vinit)] = true;
    //console.log(vinit, ymax);
}

/*
const test = `
23,-10  25,-9   27,-5   29,-6   22,-6   21,-7   9,0     27,-7   24,-5
25,-7   26,-6   25,-5   6,8     11,-2   20,-5   29,-10  6,3     28,-7
8,0     30,-6   29,-8   20,-10  6,7     6,4     6,1     14,-4   21,-6
26,-10  7,-1    7,7     8,-1    21,-9   6,2     20,-7   30,-10  14,-3
20,-8   13,-2   7,3     28,-8   29,-9   15,-3   22,-5   26,-8   25,-8
25,-6   15,-4   9,-2    15,-2   12,-2   28,-9   12,-3   24,-6   23,-7
25,-10  7,8     11,-3   26,-7   7,1     23,-9   6,0     22,-10  27,-6
8,1     22,-8   13,-4   7,6     28,-6   11,-4   12,-4   26,-9   7,4
24,-10  23,-8   30,-8   7,0     9,-1    10,-1   26,-5   22,-9   6,5
7,5     23,-6   28,-10  10,-2   11,-1   20,-9   14,-2   29,-7   13,-3
23,-5   24,-8   27,-9   30,-7   28,-5   21,-10  7,9     6,6     21,-5
27,-10  7,2     30,-9   21,-8   22,-7   24,-9   20,-6   6,9     29,-5
8,-2    27,-8   30,-5   24,-7
`;

console.log(
    test.trim().split(/\n/).flatMap(l => l.split(/\s+/)).sort()
);
*/

a(input);
