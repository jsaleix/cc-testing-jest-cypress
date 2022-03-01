const userHelper = require('../../helpers/UserHelper');
const TodoList = require('../../models/TodoList');

module.exports = async (req, res, next) => {
    try {
        let creator = userHelper.getUser(req);
        if(!creator) throw new Error('Auth error');

        const todolist = await TodoList.findOne({ creator });
        if(!todolist) throw new Error('you have not yet created a todolist');
        req.body.todolist = {};
        req.body.todolist._id = todolist._id;
        next();
    } catch (e) {
        res.status(401).json({
            error: e.message || 'Une erreur est survenue'
        });
    }
}