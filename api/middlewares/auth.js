const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        if( !req.headers.authorization || ((req.headers.authorization.split(' ')).length < 1) ){
            throw new Error('Missing or invalid authorization header')
        }
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.BCRYPT_SECRET);

        next();
    } catch (e) {
        res.status(401).json({
            error: e.message || 'Requête non authentifiée'
        });
    }
}