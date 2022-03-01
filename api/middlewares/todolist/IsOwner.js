const userHelper = require('../../helpers/UserHelper');
const TodoList = require('../../models/TodoList');

module.exports = async (req, res, next) => {
    try {
        let creator = userHelper.getUser(req);
        if(!creator) throw new Error('Auth error');

        let todolistId = req.params.id;
        if(!todolistId) throw new Error('Missing id');

        const todolist = await TodoList.findOne({ _id: todolistId, creator });
        if(!todolist) throw new Error('You\'re not allowed');
        next();
    } catch (e) {
        res.status(401).json({
            error: e.message || 'Une erreur est survenue'
        });
    }
}