require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const todoListRouter = require('./routes/todolist');

mongoose.connect(process.env.MONGO_LOGS, {
        useNewUrlParser   : true,
        dbName            : 'todoList'
    })
    //.then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/todolist', todoListRouter);

app.listen(3001);
console.log("Listening on port " + 3001);

module.exports = app;