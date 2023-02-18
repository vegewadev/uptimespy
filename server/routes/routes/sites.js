const siteSchema = require('../../database/siteSchema');

/**
 * Get all sites from database
 * @param {*} req 
 * @param {*} res 
 */
module.exports = async function (req, res) {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    siteSchema.find({}, function (err, sites) {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ sites });
    });
}