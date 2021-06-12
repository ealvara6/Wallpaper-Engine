'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WallpaperSchema = new Schema({
    name: {
        type: String,
        required: "Please enter wallpaper name.",
    },
    image: {
        type: String,
        required: 'Please upload an image',
    },
    cols: {
        type: Number,
    },
    rows: {
        type: Number,
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    tags: [String],
    created_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Wallpapers', WallpaperSchema);