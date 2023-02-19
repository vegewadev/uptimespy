/**
 * Returns the date from the remaining days
 * @param {*} days 
 * @returns {String}
 */
module.exports = function getDateFromRemainingDays(days) {
    days = days.split(" ")[0];
    const date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    return date.toDateString();
}
