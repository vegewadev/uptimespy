const siteSchema = require('../../database/siteSchema');

/**
 * Update a site in the database
 * @param {*} req
 * @param {*} res
 */
module.exports = async function (req, res) {
    const { name, url } = req.body;
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const site = await siteSchema.findOne({ _id: req.params.id });
    if (!site) {
        res.status(404).json({ message: 'Site not found' });
        return;
    }

    site.name = name;
    site.url = url;
    site.save();

    res.status(200).json({ site });
}