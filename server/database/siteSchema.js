const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    name: String,
    url: String,
    status: String,
    lastChecked: Date,
    lastResponseTime: String,
    certificateExpires: String,
    lastResponseCode: Number,
    lastResponseSize: String,
    uptime24h: [
        {
            up: Boolean,
        },
    ],
});

const Site = mongoose.model('Site', siteSchema);
module.exports = Site;