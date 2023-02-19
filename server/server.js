/*
 *  UPTIMESPY - Backend 
 *  npm start / npm run dev
 */
console.log('UPTIMESPY - Backend');

// import log modules from debug/log.js
const { debuglog } = require('./debug/log');

// load environment variables from .env file
require('dotenv').config()

// Check node version
debuglog('Checking Node version', 'warning', 'Server');
const nodeVersion = process.versions.node;
const major = nodeVersion.split('.')[0];
const requiredMajor = 14;
if (major < requiredMajor) {
    debuglog(`You are running Node ${nodeVersion}.`, 'error');
    debuglog(`UPTIMESPY requires Node ${requiredMajor}.x or higher.`, 'error');
    debuglog('Please update your version of Node.', 'error');
    process.exit(1);
} else {
    debuglog(`You are running Node ${nodeVersion} (supported)`, 'success', 'Server');
}

// import 3rd party libraries
debuglog('Importing 3rd party libraries', 'warning', 'Server');
const express = require('express');
debuglog('Importing cors', 'warning', 'Server');
const cors = require('cors');
debuglog('Importing mongoose', 'warning', 'Server');
const mongoose = require('mongoose');
debuglog('Importing body-parser', 'warning', 'Server');
const bodyParser = require('body-parser');
debuglog('Importing JWT', 'warning', 'Server');
const jwt = require('jsonwebtoken');

// initliaze mongodb connection
debuglog('Connecting to MongoDB...', 'warning', 'Server');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    debuglog('Connection to MongoDB successfully established', 'success', 'Database');
}).catch((err) => {
    debuglog(`Connection to MongoDB failed with error: ${err}`, 'error', 'Database');
});

// set up express app
const app = express();

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure cors
app.use(cors());
app.options('http://localhost:3000', cors());

// configure JWT
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
            if (err) return req.user = undefined;
            req.user = decode;
            debuglog(`JWT token verified: ${decode.username}`, 'success', 'Server');
            next();
        });
    } else {
        req.user = undefined;
        debuglog('No JWT token provided', 'warning', 'Server');
        next();
    }
});


// set up routes
debuglog('Setting up route handling', 'warning', 'Server');
const routes = require('./routes');
app.use('/api/', routes);


app.listen(process.env.SERVER_PORT)
    .on('error', (err) => {
        debuglog(`Error starting server: ${err}`, 'error', 'Server');
    })
    .on('listening', () => {
        debuglog(`Server listening on port ${process.env.SERVER_PORT}`, 'success', 'Server');
    })
    .on('close', () => {
        debuglog(`Server closed on port ${process.env.SERVER_PORT}`, 'warning', 'Server');
    })
    .on('connection', () => {
        debuglog(`Server connection on port ${process.env.SERVER_PORT}`, 'success', 'Server');
    });