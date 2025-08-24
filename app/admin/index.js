const express = require('express');
const path = require('path');
const route = require('./routes');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = require('./config/db');
const app = express();
const port = 3001;

//Connect Database
db.connect();

// Override methods
app.use(methodOverride('_method'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Parse JSON bodies
app.use(express.json());

//HTTP logger
// app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',

    handlebars.engine({
        extname: '.hbs',
        // helpers: require('./app/helpers'),
    }),
);

// Set view engine and views directory
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes
route(app);

// Start server
app.listen(port, () => {
    console.log(`Esportsify app listening on port ${port}`);
});