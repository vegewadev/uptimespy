const express = require('express');
const router = express.Router();
const { debuglog } = require('../debug/log');

// import routes
const authenticate = require('./routes/authenticate');
const getsites = require('./routes/sites');

router.post('/authenticate', function (req, res) {
    debuglog('POST /api/authenticate called', 'warning', 'Routes');
    authenticate(req, res);
});

router.get('/sites', function (req, res) {
    debuglog('GET /api/sites called', 'warning', 'Routes');
    getsites(req, res);
});


module.exports = router;