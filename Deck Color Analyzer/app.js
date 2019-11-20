const mongoose = require('mongoose');
const DeckEncoder = require('runeterra').DeckEncoder;
const spawn = require('child_process').spawn;

mongoose.connect('mongodb+srv://TeaLeaf28:Runeterra123@processedimageinfo-hbpo2.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', async function() {
    console.log('Successfully connected to test-image database');

    const deck = DeckEncoder.decode('CEBACAIABEAQCARXAIDACAAUDIRSKJZKA4AQECITDIPCIJJNAIBACAQXEADACAADA4WC2MZU');

    const Image = require('./models/image.js');

    const deckColors = await getDeckColors(deck, Image);
    const strPercentArr = stringifyOneArr(deckColors.percentArr);
    const strColorArr = stringifyThreeArr(deckColors.colorArr);

    const deckProcess = spawn('python', ['./deck-color-process.py', `{\"percentArr\": ${strPercentArr}, \"colorArr\": ${strColorArr}}`]);
    deckProcess.stdout.on('data', function(data) {
        //console.log(`${data}`);
        const msg = JSON.parse(data);
        console.log(msg);
        //console.log(data);
    });

}).on('error', function(err) {
    console.log(err);
});

function stringifyOneArr(oneArr) {
    let s = '[';
    for (let i = 0; i < oneArr.length; i++) {
        s += oneArr[i];
        if (i != oneArr.length - 1) {
            s += ',';
        }
    }
    s += ']'
    return s;
}

function stringifyThreeArr(threeArr) {
    let s = '[';
    for (let i = 0; i < threeArr.length; i++) {
        s += stringifyTwoArr(threeArr[i]);
        if (i != threeArr.length - 1) {
            s += ',';
        }
    }
    s += ']'
    return s;
}

function stringifyTwoArr(twoArr) {
    let s = '[';
    for (let i = 0; i < twoArr.length; i++) {
        s += `[`;
        for (let j = 0; j < twoArr[i].length; j++) {
            s += `${twoArr[i][j]}`;
            if (j != twoArr[i].length - 1) {
                s += ',';
            }
        }
        s += `]`;
        if (i != twoArr.length - 1) {
            s += ',';
        }
    }
    s += ']'
    return s;
}

async function getDeckColors(deck, Image){
    let colorArr = [], percentArr = [];
    for (let i = 0; i < deck.length; i++) {
        const cardName = `${deck[i].code}-full.png`;
        await Image.find({ name: cardName }, function (err, result) {
            if (err) throw err;
            
            for (let j = 0; j < deck[i].count; j++) {
                colorArr = colorArr.concat([result[0].colors]);
                percentArr = percentArr.concat([result[0].percents]);
            }
        });
    }
    return { colorArr, percentArr };
}