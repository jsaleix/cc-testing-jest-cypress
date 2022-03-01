const Item = require('../../models/Item');

const moment = require('moment');
const TIME_LIMIT = 30 ;

const getTimeSinceLastItem = (itemTime) => {
    return (moment().diff(moment(itemTime, 'DD/MM/YYYY'), 'minutes', false) );
}

module.exports = async (req, res, next) => {
    try {
        if(!req.body.todolist._id) throw new Error('Todolist error');

        const item = await Item.findOne({todolist: req.body.todolist._id.toString()}).sort({creationDate: -1});

        if(!item || !item['creationDate']){ 
            next();
            return;
        }
        
        let timeSinceLastItem = getTimeSinceLastItem(item.creationDate);
        if(timeSinceLastItem < TIME_LIMIT ){
            throw new Error(`You have to wait ${TIME_LIMIT - timeSinceLastItem} minutes before adding a new item `);
        }else{
            next();
        }
    } catch (e) {
        res.status(401).json({
            error: e.message || 'Une erreur est survenue'
        });
    }
}