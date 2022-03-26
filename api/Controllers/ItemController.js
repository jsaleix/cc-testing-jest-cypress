const Item = require('../models/Item');
const userHelper = require('../helpers/UserHelper');

exports.addItem = (req, res, next) => {
    let { name, content } = req.body.item;
    let todolist = req.params.id;

    const item = new Item({ name, content, todolist});
    item.save()
        .then( () => res.status(201).json({ message: 'Item added!'}))
        .catch( err => res.status(400).json(err.message));
};

exports.listItems = async (req, res, next) =>{
    if( !req.params.id ) {
        res.status(400).json({ message: 'Missing todolist id' })
        return;
    }
    try{
        const items = await Item.find({todolist: req.params.id});
        res.status(200).json({ items: items||[] })
    }catch(e){
        res.status(400).json({ message: 'An error occured' })
    }
}

exports.updateItem = (req, res, next) => {
    let { name, content } = req.body.item;
    let todolist = req.params.id;

    Item.updateOne({ todolist }, { name, content })
        .then( () => res.status(200).json({ message: 'Item updated!'}))
        .catch( error => res.status(400).json(error));
};

exports.deleteItem = (req, res, next) => {
    let item = req.params.id;
    TodoList.deleteOne({ _id: item })
    .then(() => res.status(204).json('Item successfully deleted!'))
    .catch( e => res.status(400).json(e) );
};

exports.checkItem = (req, res, next) => {
    let itemId = req.params.itemId;
    let item = Item.findOne({_id: itemId});
    if( !item ){
        res.status(400).json('Item not found')
        return;
    }

    Item.updateOne(item, { done: !item.done})
        .then( () => res.status(200).json({ message: 'Item checked!'}))
        .catch( error => res.status(400).json(error));
    
    // Item.updateOne({ todolist }, { checked: true })
    //     .then( () => res.status(200).json({ message: 'Item checked!'}))
    //     .catch( error => res.status(400).json(error));
};