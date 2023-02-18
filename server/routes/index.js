const express = require('express');
const router = express.Router();
const { debuglog } = require('../debug/log');

// import routes
const authenticate = require('./routes/authenticate');
const getSites = require('./routes/sites');
const getSite = require('./routes/getSite');
const deleteSite = require('./routes/deleteSite');

router.post('/authenticate', function (req, res) {
    debuglog('POST /api/authenticate called', 'warning', 'Routes');
    authenticate(req, res);
});

router.get('/sites', function (req, res) {
    debuglog('GET /api/sites called', 'warning', 'Routes');
    getSites(req, res);
});

router.get('/site/:id', function (req, res) {
    debuglog(`GET /api/site/${req.params.id} called`, 'warning', 'Routes');
    getSite(req, res);
});

router.delete('/site/:id', function (req, res) {
    debuglog(`DELETE /api/site/${req.params.id} called`, 'warning', 'Routes');
    deleteSite(req, res);
});


module.exports = router;