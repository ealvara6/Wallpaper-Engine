const express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    User = require('./api/models/userModel')
    Wallpaper = require('./api/models/wallpaperModel');
    errorController = require('./api/controllers/errorController');
    path = require('path');

//mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://ealvara6:Idontknow73.@cluster0.glxq4.mongodb.net/React-Nodejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
//importing routes
var contactRoutes = require('./api/routes/contactRoutes');
var userRoutes = require('./api/routes/userRoutes');
const wallpaperRoutes = require('./api/routes/wallpaperRoutes');

//registering routes
userRoutes(app);
wallpaperRoutes(app);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.use(errorController);

app.listen(port);
console.log('todo list RESTful API server started on ' + port);