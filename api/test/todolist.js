const moment = require('moment');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server.js');
const TodoList = require('../models/TodoList');
const Item = require('../models/Item');
const User = require('../models/User');

chai.use(chaiHttp);
chai.should();

function validUser(){
    return {
        "email": 'sample@test.fr',
        "password": 'dsdsdsdsd'
    }
}

describe('TodoList route', () => {    

    before(function() {
        let user = new User({
            "email": 'sample@test.fr',
            "firstname": 'name',
            "lastname": 'lastname',
            "birthdate": ( moment().subtract(14, 'years').format('MM/DD/YYYY') ),
            "password": 'dsdsdsdsd'
        });

        return Promise.resolve(user.save());
      });

    after(function (){
        return Promise.resolve(
                User.deleteOne({email: 'sample@test.fr'})
                .then(()=>Item.remove())
                .then(()=>TodoList.remove())
        );
    });

    describe('POST /todolist', () => {
        it('it should insert a new todo list', (done) => {
            let user = validUser();

            chai.request(app)
                .post('/todolist')
                .set('content-type', 'application/json')
                .send({user})
                .end((err, res) => {
                    res.status.should.equal(201);
                    done();
                });

        });

        it('it should not work since the user has already created a todolist', (done) => {
            let user = validUser();

            chai.request(app)
                .post('/todolist')
                .set('content-type', 'application/json')
                .send({user})
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                });

        });

    });

    describe('GET /todolist', () => {
        it('it should get all the todolists created', (done) => {
            let user = validUser();
            chai.request(app)
                .get('/todolist')
                .set('content-type', 'application/json')
                //.send({user})
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.lists.should.be.a('array');
                    done();
                });
        });
    });

    describe('GET /todolist/items', (done) => {
        it('it should get all the items of the current user\'s todolist', (done) => {
            let user = validUser();
            chai.request(app)
                .get('/todolist/items')
                .set('content-type', 'application/json')
                .send({user})
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.items.should.be.a('array');
                    res.body.items.length.should.be.eql(0);
                    done();
                });
        });

        it('it should not work since no user credentials is provided', (done) => {
            chai.request(app)
                .get('/todolist/items')
                .set('content-type', 'application/json')
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                });
        });
    });

    
    describe('POST /todolist/addItem', () => {
        it('it should add a new item in the todolist and confirm with a 201 response code ', (done) => {
            let user = validUser();
            let item = {name: 'test', content: 'Content'};

            chai.request(app)
                .post('/todolist/addItem')
                .set('content-type', 'application/json')
                .send({user, item})
                .end((err, res) => {
                    res.status.should.equal(201);
                    res.body.message.should.equal('Item added!')
                    done();
                });
        });

        it('it should not add a new item since the last one was inserted a few sec ago', (done) => {
            let user = validUser();
            let item = {name: 'test2', content: 'Content'};

            chai.request(app)
                .post('/todolist/addItem')
                .set('content-type', 'application/json')
                .send({user, item})
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                });
        });
    });

});
 
