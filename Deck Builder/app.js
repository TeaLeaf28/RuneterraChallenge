mongoose = require('mongoose');

mongoose.connect('mongodb+srv://TeaLeaf28:Runeterra123@processedimageinfo-hbpo2.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.once('open', function() {
    console.log('Successfully connected with database...')

    const Image = require('./models/image');
    //Values at index 0, 1, and 2 correspond to RGB values respectively
    //const selectedColor = [0, 128, 0];
    //CHANGES MADE HERE
    var input = document.getElementById("colorInput");
    var selectedColor = hexToRGB(input);
    //
    const colorDiffIndexMap = new Map();

    Image.find({}, function(err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            let colorDiffIndex = 0;
            for (let j = 0; j < result[i].colors.length; j++) {
                colorDiffIndex += result[i].percents[j] * 100 * colorDistance(selectedColor, result[i].colors[j]);
            };

            colorDiffIndexMap.set(result[i].name, colorDiffIndex);
        }
        console.log(Array.from(colorDiffIndexMap).sort((a, b) => { return a[0] - b[0] }));
        //const colorDiffIndexMapSorted = new Map(Array.from(colorDiffIndexMap).sort((a, b) => {return a[0] - b[0]}));
        //console.log(colorDiffIndexMapSorted);
    });
    //Compare with card - first by pixel
    //Then search database for best fit

}).on('error', function(err) {
    console.log(err);
});


function colorDistance (selectedColor, imageColor) {
    const rmean = (selectedColor[0] + imageColor[0])/2;
    const r = selectedColor[0] - imageColor[0];
    const g = selectedColor[1] - imageColor[1];
    const b = selectedColor[2] - imageColor[2];
    return Math.sqrt((((512+rmean)*r*r)>>8) + 4*g*g + (((767-rmean)*b*b)>>8));
}

function hexToRGB(h) {
    //https://css-tricks.com/converting-color-spaces-in-javascript/
    let r = 0, g = 0, b = 0;
    var rgb = [r, g, b]
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return rgb;
  }