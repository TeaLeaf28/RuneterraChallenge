const mongoose = require('mongoose');
const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');

mongoose.connect('mongodb+srv://TeaLeaf28:Runeterra123@processedimageinfo-hbpo2.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function() {
    console.log('Successfully connected to test-image database');

    mongoose.Promise = global.Promise;

    const lorImgDir = './Test Batch';
    fs.readdir(lorImgDir, function(err, files) {
        if (err) throw err;

        processAllImages(lorImgDir, files);
    });

}).on('error', function(err) {
    console.log(err);
});

async function processAllImages(lorImgDir, files) {
    for (let i = 0; i < files.length; i++) {
        await processImage(lorImgDir, files[i]);
    }
}

async function processImage(lorImgDir, file) {
    const Image = require('./models/image');

    if (file.search('full') != -1) {
        await Image.find({ name: file }, async function (err, result) {
            if (err) throw err;
        
            if (result.length === 0) {
                const filePath = path.join(lorImgDir, file);
                const colorProcess = spawn('python', ['./color-process.py', filePath]);
                await colorProcess.stdout.on('data', function(data) {
                    const ImageInfo = JSON.parse(data);
                    const lorImg = new Image({ name: file, percents: ImageInfo.percents, colors: ImageInfo.colors });
                    lorImg.save(function() {
                        console.log(`Saved ${file} to database`);
                    });
                });
            }
            else {
                console.log(`Already saved ${file}`);
            }
        });
    }
}