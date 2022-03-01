const moment = require('moment');
const sinon = require('sinon');
const expect = require('chai').expect
const { mockRequest, mockResponse } = require('mock-req-res')

const User = require('../../models/User');

const validUser = require('../../middlewares/user/validUser');
const auth = require('../../middlewares/auth');

function createUser(){
    return {
        email: 'testail@test.fr',
        firstname: 'name',
        lastname: 'lastname',
        birthdate: moment().subtract(14, 'years').format('DD/MM/YYYY').toString(),
        password: 'eightCaractersOrMore'
    }
}

/*
    If a middleware verification fails, the middleware will use res.status() function
    If the verification works it will use the next() function
    So we mock res and next and see which one has been called
*/

describe('USER MIDDLEWARE', function() {

    describe('MIDDLEWARE ValidUser', function() {

        describe('Checkings values', function() {
    
            it('should accept three arguments', function() {//req, res & next functions
                expect(validUser.length).to.equal(3);
            });

            it('should not work because of missing parameters', function() {//Missing email
                let req = { body: { user: createUser() } } ;
                req.body.user.email= '';

                const resSpy = mockResponse()
                const nextSpy = sinon.spy();

                validUser( req , resSpy, nextSpy);

                expect(resSpy.json.calledOnce).to.be.true
            });

            it('should not work: password too short', function() {
                let req = { body: { user: createUser() } } ;
                req.body.user.password= '1234';

                const resSpy = mockResponse()
                const nextSpy = sinon.spy();

                validUser( req , resSpy, nextSpy);

                expect(resSpy.status.calledOnce).to.be.true
            });

            it('should not work: password too long', function() {
                let req = { body: { user: createUser() } } ;
                req.body.user.password= new Array(41 + 1).join( 'A' );//generates a string of 41 A letter

                const resSpy = mockResponse()
                const nextSpy = sinon.spy();

                validUser( req , resSpy, nextSpy);

                expect(resSpy.status.calledOnce).to.be.true
            });

            it('should not work: user too young', function() {
                let req = { body: { user: createUser() } } ;
                req.body.user.birthdate = moment().subtract(10, 'years').format('DD/MM/YYYY').toString();

                const resSpy = mockResponse()
                const nextSpy = sinon.spy();

                validUser( req , resSpy, nextSpy);

                expect(resSpy.status.calledOnce).to.be.true
            });

        });
    
        describe('should call the creation function', function() {

        it('should call next() once', function() {
            let req = { body: { user: createUser() } } ;
            const nextSpy = sinon.spy();

            validUser( req , null, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });

        });

    });
  
    describe('MIDDLEWARE authUser', function() {
    
        const registeredUser = {
            "email": 'sample1@test.fr',
            "firstname": 'name',
            "lastname": 'lastname',
            "birthdate": ( moment().subtract(14, 'years').format('MM/DD/YYYY') ),
            "password": 'dsdsdsdsd'
        }

        before(function() {
            let user = new User( registeredUser );
            return Promise.resolve( user.save() );
        });
    
        after(function (){
            return Promise.resolve(
                User.deleteOne({email: 'sample1@test.fr'})
            );
        });
        
        /*it('should find the user and add its id in the req', function() {
            let { email, password } = registeredUser;
    
            const req = { body: { user: {email, password} } } ;
            const resSpy = mockResponse()
            const nextSpy = sinon.spy();
    
            authUser( req , resSpy, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
            expect(req.body.user._id).to.not.be.null;
        });*/
    
        it('should not work: no user is provided', function() {
            let req = { body: { user: {} } } ;
            const resSpy = mockResponse()
            const nextSpy = sinon.spy();
    
            auth( req , resSpy, nextSpy);
            expect(resSpy.status.calledOnce).to.be.true
            expect(nextSpy.calledOnce).to.be.false
        });  
    
    });

});
