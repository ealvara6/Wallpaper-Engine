'use strict';
module.exports = function(app) {
    const wallpapers = require('../controllers/wallpaperController');


    app.route('/api/wallpapers')
    .post(wallpapers.upload_wallpapers)
    .get(wallpapers.list_wallpapers);

    app.route('/api/wallpaper/download/:imagePath')
    .get(wallpapers.download_wallpaper);
}