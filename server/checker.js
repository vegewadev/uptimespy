const axios = require('axios');
const { debuglog } = require('./debug/log');
require('dotenv').config()
const mongoose = require('mongoose');
const https = require('https');

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

const siteSchema = require('./database/siteSchema');

/**
 * Get days from today to a given date
 * @param {String} date
 * @returns {String}
 */
function getDaysFromToday(date) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const today = new Date();
    const dateObj = new Date(date);
    const diffDays = Math.round(Math.abs((today - dateObj) / oneDay));
    return `${diffDays} days`;
}


/**
 * 
 * @param {String} hostname 
 * @returns {Promise<Date>}
 */
function getSSLCertExpirationDate(hostname) {
    hostname = hostname.replace(/(^\w+:|^)\/\//, '');
    return new Promise((resolve, reject) => {
        const options = {
            port: 443,
            host: hostname,
            method: 'GET',
            rejectUnauthorized: true,
            agent: false,
        };

        const req = https.request(options, (res) => {
            const cert = res.socket.getPeerCertificate();
            const certExpiration = new Date(cert.valid_to);
            resolve(certExpiration);
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

/**
 * Get remaining days from today to a given date
 * @param {String} date
 * @returns {String}
 */
function getDaysFromToday(date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const dateObj = new Date(date);
    const diffDays = Math.round(Math.abs((today - dateObj) / oneDay));
    return `${diffDays} days`;
}


debuglog("Checker started", 'success', 'Checker');
setInterval(async () => {
    debuglog("Checking sites", 'success', 'Checker');
    siteSchema.find({}, function (err, sites) {
        if (err) {
            debuglog("Error while checking sites", 'error', 'Checker');
            return;
        }
        sites.forEach(async site => {
            try {
                const start = Date.now();

                const response = await axios({
                    method: 'get',
                    url: site.url,
                    responseType: 'stream'
                });

                site.status = "up";

                site.lastResponseTime = Date.now() - start + " ms";

                await getSSLCertExpirationDate(site.url).then((date) => {

                    site.certificateExpires = getDaysFromToday(date);
                }).catch((err) => {
                    console.log(err)
                    site.certificateExpires = "Invalid SSL";
                });

                site.lastResponseCode = response.status;

                let sizeInBytes = 0;

                for await (const chunk of response.data) {
                    sizeInBytes += chunk.length;
                }

                const sizeInMB = (sizeInBytes / 1000000).toFixed(2) + " MB";

                site.lastResponseSize = sizeInMB;

                site.lastChecked = new Date();
                debuglog(`Site ${site.name} is up`, 'warning', 'Checker');
            } catch (error) {
                site.status = "down";
                site.lastChecked = new Date();
                debuglog(`Site ${site.name} is down`, 'error', 'Checker');
            }
            site.save();
            debuglog(`Site ${site.name} has been checked`, 'success', 'Checker');
        });
    });
}, 1000);


setInterval(async () => {
    debuglog("Checking sites hourly", 'success', 'Checker');
    siteSchema.find({}, function (err, sites) {
        if (err) {
            debuglog("Error while checking sites hourly", 'error', 'Checker');
            return;
        }
        sites.forEach(async site => {
            try {
                const response = await axios.get(site.url);
                site.status = "up";

                site.uptime24h.shift();
                site.uptime24h.push({ up: true });
                debuglog(`Site ${site.name} is up`, 'warning', 'Checker');
            } catch (error) {
                site.status = "down";
                site.lastChecked = new Date();
                site.uptime24h.shift();
                site.uptime24h.push({ up: false });
                debuglog(`Site ${site.name} is down`, 'error', 'Checker');
            }
            site.save();
            debuglog(`Site ${site.name} has been checked`, 'success', 'Checker');
        });
    });
}, 1000 * 60 * 60);