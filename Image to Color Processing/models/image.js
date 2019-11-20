const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: String,
    percents: [Number],
    colors: [[Number]]
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;