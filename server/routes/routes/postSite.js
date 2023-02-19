const siteSchema = require('../../database/siteSchema');

/**
 * Create a new site in the database
 * @param {*} req 
 * @param {*} res 
 */
module.exports = async function (req, res) {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const site = new siteSchema({
        name: req.body.name,
        url: req.body.url,
        status: "up",
        lastChecked: new Date(),
        lastResponseTime: "0ms",
        certificateExpires: "0 days",
        lastResponseCode: 0,
        lastResponseSize: "0B",
        uptime24h: [
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
            {
                up: true,
            },
        ],

    });

    site.save(function (err) {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ message: 'Site added' });
    });
}