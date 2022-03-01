const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getUser = (req) => {
    try{
        if( !req.headers.authorization || ((req.headers.authorization.split(' ')).length < 1) ){
            throw new Error('Missing or invalid authorization header')
        }

        let token = req.headers.authorization.split(' ')[1];
        token = jwt.verify(token, process.env.BCRYPT_SECRET);

        if( !token.userId ) throw new Error('Wrong token');
        return token.userId;
        // let user = await User.findOne({ _id: token.userId });
        // if(user){ 
        //     return user;
        // }else{
        //     throw new Error('User not found');
        // }
    }catch(e){
        console.log(e)
        return null;
    }

    
}