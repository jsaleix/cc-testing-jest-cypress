const Item = require('../../models/Item');
MAX_ITEM_NB = 10;
MAIL_STEP = 8;

module.exports = async (req, res, next) => {
    try {
        if(!req.body.todolist._id) throw new Error('Todolist error');

        const items = await Item.find({todolist: req.body.todolist._id});
        if(!items) next();

        if(items.length >= MAX_ITEM_NB) throw new Error('Exceeded max item number possible');
        if(items.length === MAIL_STEP){ console.log('\n\n\nMAIL SENT!\n\n\n') }
        next();
        return
    } catch (e) {
        res.status(401).json({
            error: e.message || 'Une erreur est survenue'
        });
    }
}