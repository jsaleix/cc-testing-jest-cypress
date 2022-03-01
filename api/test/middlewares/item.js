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

const checkLimit = require('../../middlewares/item/checkLimit');
const validItem = require('../../middlewares/item/validItem');

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

describe('ITEM MIDDLEWARES', () => {
    describe('MIDDLEWARE checkLimit', () => {
    
        it('should not work because there is already 10 items', async function() {
            //Adding a new todolist with 10 items in it
            let user = new User( {...registeredUser, email: 'edsdsdsdsds@test.fr'} );
            await user.save();
            let newList = new TodoList({ creator: user._id});
            await newList.save();

            for(let i= 0; i<11; i++){
                let newItem = new Item({ name: i + 'a', content: i+'a', todolist: newList._id });
                await newItem.save();
            }
            
            let req = { body: { user: registeredUser, todolist: {_id: newList._id} } } ;
            const resSpy = mockResponse()
            const nextSpy = sinon.spy();
    
            checkLimit( req , resSpy, nextSpy);
    
            await User.deleteOne({email: user.email});
            expect(nextSpy.calledOnce).to.be.false;
        });
        
        // Mail should be sent with this test, look the console
        it('should work since there is only 8 items', async function() {
            //Adding a new todolist with 7 items in it
            let user = new User( {...registeredUser, email: 'edsdsdsdsds@test.fr'} );
            await user.save();
            let newList = new TodoList({ creator: user._id});
            await newList.save();

            for(let i =0; i<8; i++){
                let newItem = new Item({ name: i + 'a', content: i+'a', todolist: newList._id });
                await newItem.save();
            }
            

            let req = { body: { user: registeredUser, todolist: {_id: newList._id} } } ;
            const resSpy = mockResponse()
            const nextSpy = sinon.spy();
    
            checkLimit( req , resSpy, nextSpy);
    
            await User.deleteOne({email: user.email});
            expect(nextSpy.calledOnce).to.be.true;
        });

        describe('MIDDLEWARE validUser', () => {

            it('should not work: 1000+ char in content', async function() {
                let user = new User( {...registeredUser, email: 'edsdsdsdsds@test.fr'} );
                await user.save();
                let newList = new TodoList({ creator: user._id});
                await newList.save();


                let content = new Array(1001 + 1).join( 'A' );//generates a string of 1001 A letters
                let req = { body: { user: registeredUser, item: { name: 'test', content} } } ;
                const resSpy = mockResponse()
                const nextSpy = sinon.spy();
        
                validItem( req , resSpy, nextSpy);
        
                await User.deleteOne({email: user.email});
                expect(nextSpy.calledOnce).to.be.false;
            });

            it('should work: 1000 chars in content', async function() {
                let user = new User( {...registeredUser, email: 'edsdsdsdsds@test.fr'} );
                await user.save();
                let newList = new TodoList({ creator: user._id});
                await newList.save();


                let content = new Array(1000 + 1).join( 'A' );//generates a string of 1001 A letters
                let req = { body: { user: registeredUser, item: { name: 'test', content} } } ;
                const resSpy = mockResponse()
                const nextSpy = sinon.spy();
        
                validItem( req , resSpy, nextSpy);
        
                await User.deleteOne({email: user.email});
                expect(nextSpy.calledOnce).to.be.true;
            });

        });

    });
    
    
});
