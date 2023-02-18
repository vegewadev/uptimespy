const chalk = require('chalk');

/**
 * Debug logs: e.g. server startup
 * @param {string} message
 * @param {string} type
 */
exports.debuglog = async function (message, type, service) {
    const date = new Date();
    const time = date.toLocaleTimeString();
    const datestamp = date.toLocaleDateString();
    const timestamp = `${datestamp} ${time}`;
    const log = `[${timestamp}] [${service}] ${message}`;
    switch (type) {
        case 'error':
            console.log(chalk.red(log));
            break;
        case 'warning':
            console.log(chalk.yellow(log));
            break;
        case 'success':
            console.log(chalk.green(log));
            break;
        default:
            console.log(log);
    }
}