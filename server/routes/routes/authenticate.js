const jwt = require('jsonwebtoken');

/**
 * Authenticate user
 * @param {*} req 
 * @param {*} res 
 */
module.exports = function (req, res) {
    const { username, password } = req.body;
    if (req.user) {
        res.status(200).json({ token: req.headers.authorization.split(' ')[1] });
        return;
    }
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials provided' });
    }
}