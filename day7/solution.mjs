const input = '16,1,2,0,4,2,7,1,2,14';

function part1(input) {
    let crabs = [];
    input.split(',').map(Number).forEach(crab => crabs[crab] = (crabs[crab] ?? 0) + 1);

    let fuels = [];

    for (let c = 0; c < crabs.length; c++) {
        let cost = 0;

        for (let i = 0; i < crabs.length; i++) {
            //cost += Math.abs(c - i) * (crabs[i] ?? 0); //part1

            let move = 0;
            for (var j = 0; j < Math.abs(c - i); j++) {
                move += 1 + j;
            }
            cost += move * (crabs[i] ?? 0);
        }

        fuels[c] = cost;
    }

    console.log(fuels.reduce((prev, cur) => Math.min(prev, cur)));
}

part1(input);
