'use strict';
module.exports = function(app) {
    const wallpapers = require('../controllers/wallpaperController');
    const auth = require('../controllers/auth');
    const { check } = require('express-validator');


    app.route('/api/wallpapers')
    .post(wallpapers.upload_wallpapers)
    .get(wallpapers.list_wallpapers);

    app.route('/api/wallpaper/upload')
    .post(auth.verify,
        wallpapers.upload_a_wallpaper);

    app.route('/api/wallpaper/download/:imagePath')
    .get(wallpapers.download_wallpaper);
}