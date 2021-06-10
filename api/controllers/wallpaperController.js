'use strict';
const { json, response } = require('express');
var mongoose = require('mongoose'),
    Wallpaper = mongoose.model('Wallpapers'),
    fs = require('fs')
    path = require('path');


exports.upload_wallpapers = (req, res) => {
    Wallpaper.insertMany([
        {name: "cat", image: "cat.jpg", width: 1920, height: 1080, tags: ["cat", "fire", "animal"]},
        {name: "city", image: "city.jpg", width: 1920, height: 1080, tags: ["urban", "city"]},
        {name: "fish", image: "fish.jpg", width: 3112, height: 4959, tags: ["ocean", "water", "fish"]},
        {name: "beach", image: "beach.jpg", width: 5472, height: 3420, tags: ["beach", "woman", "water"]},
        {name: "car", image: "car.jpg", width: 4096, height: 2730, tags: ["red", "car", "lot"]},
        {name: "city view", image: "city-view.jpg", width: 6000, height: 4000, tags: ["city", "view", "urban"]},
        {name: "desert cliff", image: "desert-cliff.jpg", width: 5337, height: 3691, tags: ["stars", "desert", "cliff", "nature"]},
        {name: "dark desert", image: "desert-dark.jpg", width: 6000, height: 4000, tags: ["desert", "dark", "sand", "nature"]},
        {name: "sunny desert", image: "desert-light.jpg", width: 6720, height: 4480, tags: ["desert", "light", "sand", "nature"]},
        {name: "feathers", image: "feathers.jpg", width: 3383, height: 2258, tags: ["feathers", "bird"]},
        {name: "food", image: "food.jpg", width: 5113, height: 3409, tags: ["food", "bright"]},
        {name: "galaxy", image: "galaxy.jpg", width: 2500, height: 1794, tags: ["galaxy", "space", "starts"]},
        {name: "igloo", image: "ice.jpg", width: 4216, height: 2848, tags: ["ice", "stars", "igloo", "snow", "nature"]},
        {name: "rocks", image: "ice-rock.jpg", width: 4048, height: 2699, tags: ["ice", "rocks", "mountain", "nature"]},
        {name: "jellyfish", image: "jellyfish.jpg", width: 4272, height: 2848, tags: ["fish", "ocean", "nature", "jellyfish"]},
        {name: "lights", image: "lights.jpg", width: 5184, height: 3456, tags: ["lights"]},
        {name: "ocean", image: "ocean.jpg", width: 5184, height: 3456, tags: ["ocean", "grey", "gray"]},
        {name: "plasma", image: "plasma.jpg", width: 6537, height: 4358, tags: ["plasma", "lights", "man", "person"]},
        {name: "storm", image: "storm.jpg", width: 5242, height: 3499, tags: ["lightning", "storm", "dark", "nature", "ocean"]},
        {name: "waterfall", image: "waterfall.jpg", width: 5472, height: 3648, tags: ["waterfall", "fog", "cliff", "nature", "water"]},
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

exports.download_wallpaper = (req, res) => {
    try{
        const file = path.join(__dirname, `../../frontend-react/public/Images/${req.params.imagePath}`);
        res.download(file);
        console.log(file);
        // res.sendFile(file);
        }
    catch(err){
        response.json(err);
    }
}