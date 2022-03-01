const User = require('../../models/User');
const TodoList = require('../../models/TodoList');
const userHelper = require('../../helpers/UserHelper');

module.exports = async (req, res, next) => {
    try {
        let creator = userHelper.getUser(req);
        if(!creator) throw new Error('Auth error');

        const todolist = await TodoList.findOne({ creator });

        if(todolist) throw new Error('You\'ve already created a todolist!');
        next();
    } catch (e) {
        res.status(401).json({
            error: e.message || 'Une erreur est survenue'
        });
    }
}