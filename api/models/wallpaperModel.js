'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WallpaperSchema = new Schema({
    user_id: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "Please enter wallpaper name."],
    },
    image: {
        type: String,
        required: [true, 'Please upload an image'],
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

WallpaperSchema.pre('remove', (next) => {
    this.model('Users').remove({ $pull: { favorites: this._id } }, next);
});

module.exports = mongoose.model('Wallpapers', WallpaperSchema);