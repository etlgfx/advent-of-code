import { open } from 'node:fs/promises';

const file = await open('./input.txt');

const input = await file.readFile({ encoding: 'utf8' });

await file.close();

const parse = (input) => {
    return input.trim().split('\n');
};

const solution1 = (input) => {
    const stream = parse(input);

    const tree = {
        name: '/',
        children: [],
        size: 123,
    };

    let position = tree;
    let stack = [position];

    let mode = 'cmd';

    stream.forEach(cmd => {
        let m;

        if (cmd.at(0) !== '$' && mode === 'ls') {
            let child = {};

            if (m = cmd.match(/dir ([a-zA-Z\.]+)/)) {
                child = {
                    name: m[1],
                    size: 0,
                    children: [],
                };
            }
            else if (m = cmd.match(/(\d+) ([a-zA-Z\.]+)/)) {
                child = {
                    name: m[2],
                    size: m[1],
                    children: [],
                };
            }

            position.children.push(child);
            
            return;
        }

        if (cmd.match(/\$ ls/)) {
            console.log(`ls ${position.name}`);
            mode = 'ls';
        }
        else if (cmd === '$ cd ..') {
            stack.pop();
            position = stack[stack.length - 1];

            console.log(position.name);
            
        }
        else if (cmd === '$ cd /') {
            position = tree;
            stack = [position];

            console.log(position.name);
        }
        else if (m = cmd.match(/\$ cd ([a-zA-Z\.]+)/)) {
            console.log(`cd to ${m[1]}`);
            position = position.children.find(n => n.name === m[1]);
            stack.push(position);

            console.log(position.name);
        }
    });

    console.dir(tree, {depth: 10});
};

const i = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

console.log(solution1(i));

//console.log(solution(input, 14));
