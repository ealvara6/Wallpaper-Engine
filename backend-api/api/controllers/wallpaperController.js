'use strict';
const { json } = require('express');
var mongoose = require('mongoose');
    Wallpaper = mongoose.model('Wallpapers');


exports.upload_wallpapers = (req, res) => {
    Wallpaper.insertMany([
        {name: "cat", image: "images/cat.jpg", width: 1920, height: 1080, tags: ["cat", "fire", "animal"]},
        {name: "city", image: "images/city.jpg", width: 1920, height: 1080, tags: ["urban", "city"]},
        {name: "fish", image: "images/fish.jpg", width: 3112, height: 4959, tags: ["ocean", "water", "fish"]},
        {name: "beach", image: "images/beach.jpg", width: 5472, height: 3420, tags: ["beach", "woman", "water"]},
        {name: "car", image: "images/car.jpg", width: 4096, height: 2730, tags: ["red", "car", "lot"]},
        {name: "city view", image: "images/city-view.jpg", width: 6000, height: 4000, tags: ["city", "view", "urban"]},
        {name: "desert cliff", image: "images/desert-cliff.jpg", width: 5337, height: 3691, tags: ["stars", "desert", "cliff", "nature"]},
        {name: "dark desert", image: "images/desert-dark.jpg", width: 6000, height: 4000, tags: ["desert", "dark", "sand", "nature"]},
        {name: "sunny desert", image: "images/desert-light.jpg", width: 6720, height: 4480, tags: ["desert", "light", "sand", "nature"]},
        {name: "feathers", image: "images/feathers.jpg", width: 3383, height: 2258, tags: ["feathers", "bird"]},
        {name: "food", image: "images/food.jpg", width: 5113, height: 3409, tags: ["food", "bright"]},
        {name: "galaxy", image: "images/galaxy.jpg", width: 2500, height: 1794, tags: ["galaxy", "space", "starts"]},
        {name: "igloo", image: "images/ice.jpg", width: 4216, height: 2848, tags: ["ice", "stars", "igloo", "snow", "nature"]},
        {name: "rocks", image: "images/ice-rock.jpg", width: 4048, height: 2699, tags: ["ice", "rocks", "mountain", "nature"]},
        {name: "jellyfish", image: "images/jellyfish.jpg", width: 4272, height: 2848, tags: ["fish", "ocean", "nature", "jellyfish"]},
        {name: "lights", image: "images/lights.jpg", width: 5184, height: 3456, tags: ["lights"]},
        {name: "ocean", image: "images/ocean.jpg", width: 5184, height: 3456, tags: ["ocean", "grey", "gray"]},
        {name: "plasma", image: "images/plasma.jpg", width: 6537, height: 4358, tags: ["plasma", "lights", "man", "person"]},
        {name: "storm", image: "images/storm.jpg", width: 5242, height: 3499, tags: ["lightning", "storm", "dark", "nature", "ocean"]},
        {name: "waterfall", image: "images/waterfall.jpg", width: 5472, height: 3648, tags: ["waterfall", "fog", "cliff", "nature", "water"]},
    ]);
    res.json({Message: "Wallpapers added!"});
}

exports.list_wallpapers = (req, res) => {
    Wallpaper.find({}, (err, wallpapers) => {
        if(err)
            return res.send(err);
        return res.json(wallpapers);
    })
}