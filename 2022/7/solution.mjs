import { open } from 'node:fs/promises';

//const file = await open('./input.txt');

//const input = await file.readFile({ encoding: 'utf8' });

//await file.close();

const parse = (input) => {
    return input.trim().split('\n');
};

const parseTree = (input) => {
    const stream = parse(input);

    const tree = {
        name: '/',
        children: [],
        size: 123,
    };

    let position = tree;
    let stack = [position];

    let mode = 'cmd';

    stream.forEach((cmd) => {
        let m;

        if (cmd.at(0) !== '$' && mode === 'ls') {
            let child = {};

            if ((m = cmd.match(/dir ([a-zA-Z\.]+)/))) {
                child = {
                    name: m[1],
                    size: 0,
                    children: [],
                };
            } else if ((m = cmd.match(/(\d+) ([a-zA-Z\.]+)/))) {
                child = {
                    name: m[2],
                    size: Number(m[1]),
                    children: [],
                };
            }

            position.children.push(child);

            return;
        }

        if (cmd.match(/\$ ls/)) {
            mode = 'ls';
        } else if (cmd === '$ cd ..') {
            stack.pop();
            position = stack[stack.length - 1];
        } else if (cmd === '$ cd /') {
            position = tree;
            stack = [position];
        } else if ((m = cmd.match(/\$ cd ([a-zA-Z\.]+)/))) {
            position = position.children.find((n) => n.name === m[1]);
            stack.push(position);
        }
    });

    return tree;
};

const weightTree = (tree) => {
    if (!tree.children.length)
        return tree.size;

    tree.size = tree.children.reduce(
        (acc, child) => acc + weightTree(child),
        0
    );

    return tree.size;
};

const treeToList = (tree, list) => {

    tree.children.forEach(node => {
        if (node.children.length) {
            list.concat(treeToList(tree, []));
        }
    });

    return list;
};

const solution1 = (input) => {
    const tree = parseTree(input);

    console.dir(tree, {depth: 10})

    weightTree(tree);

    console.dir(tree, {depth: 10})

    treeToList(tree, []);
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
