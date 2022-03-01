const TodoList = require('../models/TodoList');
const userHelper = require('../helpers/UserHelper');

exports.createList = async (req, res, next) => {
    if( ! req.body.name ){
        return res.status(400).json({ message: 'Missing name'});
    }

    let creator = userHelper.getUser(req);
    const todoList = new TodoList({ creator, name: req.body.name });
    todoList.save()
        .then( () => res.status(201).json({ message: 'Todolist created!'}))
        .catch( err => res.status(400).json(err.message));
}

exports.lists = async (req, res, next) => {
    const todoLists = await TodoList.find();
    res.status(200).json({ lists: todoLists })
}

exports.listsOfUser = async (req, res, next) => {
    let creator = userHelper.getUser(req);
    const todoLists = await TodoList.find({ creator});
    if(todoLists){
        let list = todoLists.map( l => { return { id:l._id, creationDate: l.creationDate, name: l.name??'None'} })
        res.status(200).json(list);
    }else{
        res.status(400).json('No list yet');
    }
};

exports.getList = async (req, res, next) => {
    let creator = userHelper.getUser(req);
    let id = req.params.id;
    const todoList = await TodoList.findOne({ creator, _id: id});
    if(todoList){
        res.status(200).json(todoList);
    }else{
        res.status(404).json('No list found');
    }
};

exports.delete = async (req, res, next) => {
    TodoList.deleteOne({ _id: req.params.id })
    .then(() => res.status(204).json('List successfully deleted!'))
    .catch( e => res.status(400).json(e) );
}