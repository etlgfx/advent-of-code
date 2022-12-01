/*
const input = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;
*/


const input = `
lg-GW
pt-start
pt-uq
nx-lg
ve-GW
start-nx
GW-start
GW-nx
pt-SM
sx-GW
lg-end
nx-SM
lg-SM
pt-nx
end-ve
ve-SM
TG-uq
end-SM
SM-uq
`;

function updateNode(nodes, a, b) {
    if (nodes[a] && !nodes[a].edges.includes(b))
        nodes[a].edges.push(b);
    else
        nodes[a] = {
            node: a,
            edges: [b],
            large: a === a.toUpperCase(),
        };

    if (nodes[b] && !nodes[b].edges.includes(a))
        nodes[b].edges.push(a);
    else
        nodes[b] = {
            node: b,
            edges: [a],
            large: b === b.toUpperCase(),
        };
}

let ends = 0;

function traverse(nodes, here, path) {
    if (here.node === 'end') {
        ends++;
        return path;
    }

    here.edges.forEach((next) => {
        if (!path.includes(next) || nodes[next].large) {
            traverse(nodes, nodes[next], path.concat([next]));
        }
    });
}

function a(input) {
    let lines = input.trim().split(/\n/);

    let nodes = {};

    lines.forEach(line => {
        let [begin, end] = line.split('-');

        updateNode(nodes, begin, end);
    });

    let path = traverse(JSON.parse(JSON.stringify(nodes)), nodes['start'], ['start']);
}

let ends2 = 0;

function traverse2(nodes, here, path) {
    if (here.node === 'end') {
        ends2++;
        return path;
    }

    let counts = path.filter(n => n.toLowerCase() === n).reduce((acc, cur) => {
        acc[cur] = (acc[cur] ?? 0) + 1;

        return acc;
    }, {});

    let hasTwo = Object.values(counts).filter(c => c === 2).length > 0;

    here.edges.forEach((next) => {
        if (next === 'start');
        else if (!hasTwo || !path.includes(next) || nodes[next].large) {
            traverse2(nodes, nodes[next], path.concat([next]));
        }
    });
}

function b(input) {
    let lines = input.trim().split(/\n/);

    let nodes = {};

    lines.forEach(line => {
        let [begin, end] = line.split('-');

        updateNode(nodes, begin, end);
    });

    let path = traverse2(JSON.parse(JSON.stringify(nodes)), nodes['start'], ['start']);
}

b(input);
