const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    lastname: { type: String, required: true},
    firstname: { type: String, required: true},
    birthdate: { type: Date, required: true },
    password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);