const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = require('../models/User');

exports.signup = async (req, res, next) => {
    console.log('here')
    try{
        let password = await bcrypt.hash(req.body.user.password, 10);

        let birthdate = moment(req.body.user.birthdate, 'DD/MM/YYYY');
        const user = new User({...req.body.user, password, birthdate});
        user.save()
            .then( () => res.status(201).json({ message: 'User created'}))
            .catch( err => res.status(400).json(err.message));
    }catch(e){
        res.status(500).json({message: e.message})
    }
};

exports.login = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if( !user ){
        return res.status(401).json({error: 'User not found'})
    }
    let isValid = await bcrypt.compare(req.body.password, user.password)
    if(!isValid){
        return res.status(401).json({error: 'Wrong password'});
    }

    let token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.BCRYPT_SECRET,
        { expiresIn: '24h'}
    );
    
    res.status(200).json({ userId: user._id, token })
};