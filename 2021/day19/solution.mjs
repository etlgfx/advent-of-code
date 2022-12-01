import {input} from './example.mjs';

/*
const rotations = [
    [
        [1, 0, 0],
        [0, 0, -1],
        [0, 1, 0],
    ],
    [
        [1, 0, 0],
        [0, -1, 0],
        [0, 0, -1],
    ],
    [
        [1, 0, 0],
        [0, 0, 1],
        [0, -1, 0],
    ],

    [
        [0, 0, -1],
        [0, 1, 0],
        [1, 0, 0],
    ],
    [
        [-1, 0, 0],
        [0, 1, 0],
        [0, 0, -1],
    ],
    [
        [0, 0, 1],
        [0, 1, 0],
        [-1, 0, 0],
    ],

    [
        [0,-1, 0],
        [1, 0, 0],
        [0, 0, 1],
    ],
    [
        [-1,0, 0],
        [0,-1, 0],
        [0, 0, 1],
    ],
    [
        [0, 1, 0],
        [-1,0, 0],
        [0, 0, 1],
    ],
];
*/

/*
 * x,y,z
 * x,y,-z
 * x,-y,z
 * x,-y,-z
 * -x,y,z
 * -x,y,-z
 * -x,-y,z
 * -x,-y,-z
 *
 * y,z,x
 * y,z,-x
 * y,-z,x
 * y,-z,-x
 * -y,z,x
 * -y,z,-x
 * -y,-z,x
 * -y,-z,-x
 * 
 * z,x,y
 * z,x,-y
 * z,-x,y
 * z,-x,-y
 * -z,x,y
 * -z,x,-y
 * -z,-x,y
 * -z,-x,-y
 *
 */

function a(input) {
    const scanners = input.trim().split(/\n\n/);

    console.log(scanners.map(s => s.split(/\n/).slice(1).map(l => l.split(',').map(Number))));
}

a(input);
