const moment = require('moment');
const User = require('../../models/User');

const checkAge = (birthdate, requiredAge) => {
    return (moment().diff(moment(birthdate, 'DD/MM/YYYY'), 'years', false) >= requiredAge);
}

module.exports = async (req, res, next) => {
    try {
        if(!req.body){ throw new Error('Missing body'); }
        if(!req.body.user){ throw new Error('Missing user object'); }
        let { firstname, lastname, email, birthdate, password } = req.body.user;

        if(password.length < 8 || password.length > 40){
            throw new Error('Invalid password');
        }

        if( !firstname 
            && !lastname 
            && !email.match(/^\S+@\S+\.\S+$/) 
            && !checkAge(birthdate, 13) 
        ){
            throw new Error('Invalid user');
        }

        let userExists = await User.findOne({ email: email });
        if(userExists){
            throw new Error('Mail already used');
        }else{
            next();
        }

    } catch (e) {
        //console.log(e.message);
        res.status(401).json({
            error: e.message || 'Une erreur est survenue'
        });
    }
}