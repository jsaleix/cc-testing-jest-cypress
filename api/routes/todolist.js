const express       = require('express');
const router        = express.Router();

const auth = require('../middlewares/auth');

//Controllers
const todolistCtrller  = require('../controllers/todoListController.js');
const itemCntroller  = require('../controllers/itemController.js');

//Middlewares
const canCreateList = require('../middlewares/todolist/canCreateList');
const hasAList = require('../middlewares/todolist/hasAList');
const isOwner = require('../middlewares/todolist/isOwner');

const checkLimit = require('../middlewares/item/checkLimit');
const checkTimeLimit = require('../middlewares/item/checkTimeLimit');
const validItem = require('../middlewares/item/validItem');

//Routes
router.post('/items/:id', auth, isOwner, validItem, itemCntroller.addItem);
router.patch('/items/:id', auth, isOwner, validItem, itemCntroller.updateItem);
router.get('/items/:id', auth, isOwner, itemCntroller.listItems);
router.delete('/items/:id', auth, isOwner, itemCntroller.deleteItem);
// router.get('/items/:id', auth, (req, res) => console.log( "itemCntroller.listItems" ));

router.post('/', auth, todolistCtrller.createList);
router.get('/:id', auth, isOwner, todolistCtrller.getList);
router.get('/', auth, todolistCtrller.listsOfUser);
router.get('/all', todolistCtrller.lists);
router.delete('/:id', auth, isOwner, todolistCtrller.delete); //tmp

module.exports = router;