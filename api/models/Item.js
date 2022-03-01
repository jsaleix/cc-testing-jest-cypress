const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const itemSchema = mongoose.Schema({
    name: { type: String, required: true, unique: false},
    content: { type: String, required: true, unique: false},
    todolist: { type: mongoose.Schema.Types.ObjectId, ref: 'TodoList', required: true},
    creationDate: { type: Date, required: true, default: Date.now }
});

itemSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Item', itemSchema);