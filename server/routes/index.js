const express = require('express');
const router = express.Router();
const { debuglog } = require('../debug/log');

// import routes
const authenticate = require('./routes/authenticate');

router.post('/authenticate', function (req, res) {
    debuglog('/api/authenticate called', 'warning', 'Routes');
    authenticate(req, res);
});


module.exports = router;