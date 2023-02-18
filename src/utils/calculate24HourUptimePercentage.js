/**
  * Calculates the uptime percentage of the last 24 hours
  * @param {Object} item
  * @returns {String}
  */
module.exports = function calculate24hUptimePercentage(item) {
    let up = 0;
    let down = 0;
    item.uptime24h.forEach((item) => {
        if (item.up) {
            up++;
        } else {
            down++;
        }
    });
    return Math.round((up / (up + down)) * 100) + "%";
}