// Package
// Config env
require('dotenv').config()

const express = require('express');
const logged = require('morgan');
const path = require('path');
const cors = require('cors')


// Module
const route = require('./routes');
const db = require('./config/database');

const app = express();

app.disable('etag');
// cors
const corsOptions = {
    exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));


/*assuming an express app is declared here*/
app.use(express.json());    

// Connect DB
db.connect();

// Middlewares
app.use(logged('dev'));

// Path upload img
app.use("/images", express.static(path.resolve(__dirname, 'public/images')));

// Path attachment
app.use('/files', express.static(path.join(__dirname, 'public/files')))

// Route init
route(app);

// Handle production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '../client/dist'))
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}

// Start server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port} !`);
})