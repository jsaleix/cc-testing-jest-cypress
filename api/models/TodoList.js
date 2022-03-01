const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const todoListSchema = mongoose.Schema({
    name: { type: String, required: true },
    creationDate: { type: Date, required: true, default: Date.now },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

todoListSchema.plugin(uniqueValidator);
module.exports = mongoose.model('TodoList', todoListSchema);