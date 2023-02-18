const siteSchema = require('../../database/siteSchema');

/**
 * Get database entry a specific site
 * @param {*} req 
 * @param {*} res 
 */
module.exports = async function (req, res) {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    siteSchema.findOne({ _id: req.params.id }, function (err, site) {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ site });
    });
}