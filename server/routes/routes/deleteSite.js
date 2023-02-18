const siteSchema = require('../../database/siteSchema');

/**
 * Delete a site from the database
 * @param {*} req 
 * @param {*} res 
 */
module.exports = async function (req, res) {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    siteSchema.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ message: 'Site deleted' });
    });

}