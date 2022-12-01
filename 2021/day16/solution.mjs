const input = `
A20D74AFC6C80CEA7002D4009202C7C00A6830029400F500218080C3002D006CC2018658056E7002DC00C600E75002ED6008EDC00D4003E24A13995080513FA309482649458A054C6E00E6008CEF204BA00B080311B21F4101006E1F414846401A55002F53E9525B845AA7A789F089402997AE3AFB1E6264D772D7345C6008D8026200E41D83B19C001088CB04A294ADD64C0129D818F802727FFF3500793FFF9A801A801539F42200DC3801A39C659ACD3FC6E97B4B1E7E94FC1F440219DAFB5BB1648E8821A4FF051801079C379F119AC58ECC011A005567A6572324D9AE6CCD003639ED7F8D33B8840A666B3C67B51388440193E003413A3733B85F2712DEBB59002B930F32A7D0688010096019375300565146801A194844826BB7132008024C8E4C1A69E66108000D39BAD950802B19839F005A56D9A554E74C08028992E95D802D2764D93B27900501340528A7301F2E0D326F274BCAB00F5009A737540916D9A9D1EA7BD849100425D9E3A9802B800D24F669E7691E19CFFE3AF280803440086C318230DCC01E8BF19E33980331D631C593005E80330919D718EFA0E3233AE31DF41C67F5CB5CAC002758D7355DD57277F6BF1864E9BED0F18031A95DDF99EB7CD64626EF54987AE007CCC3C4AE0174CDAD88E65F9094BC4025FB2B82C6295F04100109263E800FA41792BCED1CC3A233C86600B48FFF5E522D780120C9C3D89D8466EFEA019009C9600A880310BE0C47A100761345E85F2D7E4769240287E80272D3CEFF1C693A5A79DFE38D27CCCA75E5D00803039BFF11F401095F714657DC56300574010936491FBEC1D8A4402234E1E68026200CC5B8FF094401C89D12E14B803325DED2B6EA34CA248F2748834D0E18021339D4F962AB005E78AE75D08050E10066114368EE0008542684F0B40010B8AB10630180272E83C01998803104E14415100623E469821160
`;

//import {input} from './input.mjs';

/*
function a(input) {
    let data = input.trim();

    let bytes = [];
    let b, i = 0;
    while (b = data.slice(i, i + 2)) {
        bytes.push(Number.parseInt(b, 16))
        i += 2;
    }

    let stream = Uint8Array.from(bytes);
    let start = true;

    const types = {
        literal: 0x4,
    };

    let version, type, chunk, chunksize, lengthtype, numpackets, numbits;

    let versions = [];

    for (let i = 0; i < stream.length; i++) {
        let c = stream[i];

        if (start) {
            version = c >> 5;
            type = c >> 2 & 0x5;

            chunk = 0x3 & c;
            chunksize = 2;

            versions.push(version);

            console.log(c, c.toString(2), version, type, types.literal === type);
            start = false;

            continue;
        }

        if (type === types.literal) {
        }
        else if (lengthtype
        
    }
}
*/

let versions = [];
const types = {
    sum: 0x0,
    product: 0x1,
    min: 0x2,
    max: 0x3,
    literal: 0x4,
    gt: 0x5,
    lt: 0x6,
    eq: 0x7,
};


function parsePacket(stream, i) {
    let version, type, lengthtype, numpackets, numbits, res = 0;

    version = Number.parseInt(stream.substring(i, i += 3), 2);
    type = Number.parseInt(stream.substring(i, i += 3), 2);

    versions.push(version);

    console.log(i, version, type, types.literal === type);

    let acc = [];

    if (type === types.literal) {
        let b = '';
        let chunk;

        do {
            chunk = stream.substring(i, i += 5);
            b += chunk.substring(1, 5);
        } while (chunk[0] == 1);

        res = parseInt(b, 2);
        console.log('packet', parseInt(b, 2), parseInt(b, 2).toString(16));
    }
    else if (stream[i] == 1) {
        i++;
        numpackets = parseInt(stream.substring(i, i += 11), 2);

        console.log('numpackets', numpackets);

        for (let p = 0; p < numpackets; p++) {
            [i, res] = parsePacket(stream, i);

            acc.push(res);
        }
    }
    else if (stream[i] == 0) {
        i++;
        numbits = parseInt(stream.substring(i, i += 15), 2);

        console.log('numbits', numbits);

        for (let p = i; (i - p) < numbits; ) {
            [i, res] = parsePacket(stream, i);

            acc.push(res);
        }
    }
    else {
        console.log('i', i, version, type);
        throw 'bad packet?';
    }

    if (acc.length) {
        switch (type) {
            case types.sum:
                res = acc.reduce((acc, cur) => acc + cur);
                break;
            case types.product:
                res = acc.reduce((acc, cur) => acc * cur, 1);
                break;
            case types.min:
                res = acc.reduce((acc, cur) => Math.min(acc, cur));
                break;
            case types.max:
                res = acc.reduce((acc, cur) => Math.max(acc, cur));
                break;
            case types.gt:
                res = acc[0] > acc[1] ? 1 : 0;
                break;
            case types.lt:
                res = acc[0] < acc[1] ? 1 : 0;
                break;
            case types.eq:
                res = acc[0] == acc[1] ? 1 : 0;
                break;
            default:
                throw 'wrong type: '+ type;
        }
    }

    return [i, res];
}

function a(input) {
    let data = input.trim();
    //data = 'D2FE28'; //2021
    //data = '38006F45291200'; //operator packet 2 packets
    //data = 'EE00D40C823060'; //operator packet length type 1
    //data = '8A004A801A8002F478';
    //data = '620080001611562C8802118E34';
    //data = 'C0015000016115A2E0802F182340';
    //data = 'A0016C880162017C3686B18A3D4780';

    let stream = '';
    let b;

    for (let i = 0; i < data.length; i++) {
        stream += parseInt(data[i], 16).toString(2).padStart(4, '0');
    }

    //stream = '110100101111111000101000'; // literal packet
    //stream = '00111000000000000110111101000101001010010001001000000000'; // bits length packet
    //stream = '11101110000000001101010000001100100000100011000001100000'; // packets length packet

    let i = 0;
    let res = 0;

    console.log(stream.length, stream);
    try {
        while (i < stream.length) {
            [i, res] = parsePacket(stream, i);
            let zeropad = 8 - i % 8;
            let zeros = stream.substring(i, i + 8 - i % 8);
            console.log('eat zeropad', zeros, parseInt(zeros, 2));
            i += zeropad;
        }
    }
    catch (e) {
        console.error(e);
    }

    console.log('res', res);
    console.log(versions.join(','));
    console.log(versions.filter(v => !!v).reduce((acc, cur) => acc + cur));
}

a(input);
