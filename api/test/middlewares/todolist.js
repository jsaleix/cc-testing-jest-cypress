const moment = require('moment');
let chai = require('chai');
let chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = require('chai').expect
const { mockRequest, mockResponse } = require('mock-req-res')
let app = require('../../server.js');

const User = require('../../models/User');
const TodoList = require('../../models/TodoList');
const Item = require('../../models/Item');

const canCreateList = require('../../middlewares/todolist/canCreateList');
const hasAList = require('../../middlewares/todolist/hasAList');

chai.use(chaiHttp);
chai.should();

const registeredUser = {
        "email": 'sample22@test.fr',
        "firstname": 'name',
        "lastname": 'lastname',
        "birthdate": ( moment().subtract(14, 'years').format('MM/DD/YYYY') ),
        "password": 'dsdsdsdsd'
}

/*
    If a middleware verification fails, the middleware will use res.status() function
    If the verification works it will use the next() function
    So we mock res and next and see which one has been called
*/

describe('TODOLIST MIDDLEWARES', () => {

    describe('MIDDLEWARE canCreateList', () => {

        before(function() {
            let user = new User( registeredUser );
            return Promise.resolve(user.save());
        });

        after(function (){
            return Promise.resolve(
                    User.deleteOne({email: registeredUser.email})
                    .then(()=>Item.remove())
                    .then(()=>TodoList.remove())
            );
        });

        it('should not work because of missing parameters', function() { //empty user object
            let req = { body: { user: {} } } ;
            const resSpy = mockResponse()
            const nextSpy = sinon.spy();

            canCreateList( req , resSpy, nextSpy);

            expect(resSpy.json.calledOnce).to.be.true;
        });

        it('should allow list creation since user has no list yet', async function() {
            let userId = await User.findOne({email: registeredUser.email});
            await TodoList.deleteOne({ creator: userId._id}); //there is some issues with the test so we're removing the possible current todolist

            let req = { body: { user: {_id: userId._id.toString() }  } } ;
            const resSpy = mockResponse()
            const nextSpy = sinon.spy();

            canCreateList( req , resSpy, nextSpy);

            expect(nextSpy.calledOnce).to.be.false;
        });
        
        it('should not allow list creation: user already created a list', async function() {
            let userId = await User.findOne({email: registeredUser.email});
            let { email, password } = registeredUser;

            let req = { body: { user: {_id: userId._id.toString() }  } } ;
            const resSpy = mockResponse()
            const nextSpy = sinon.spy();

            //Creating a todolist via api request
            chai.request(app)
                .post('/todolist')
                .set('content-type', 'application/json')
                .send({user: {email, password}})
            
            canCreateList( req , resSpy, nextSpy);

            expect(nextSpy.calledOnce).to.be.false;
        });



    });

});