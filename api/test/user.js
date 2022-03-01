const moment = require('moment');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server.js');
let should = chai.should();

chai.use(chaiHttp);
chai.should();

function createUser(){
    return {
        "email": (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)) + '@test.fr',
        "firstname": 'name',
        "lastname": 'lastname',
        "birthdate": ( moment().subtract(14, 'years').format('DD/MM/YYYY') ),
        "password": 'eightCaractersOrMore'
    }
}

describe('User route', () => {    
    /*
    * Test the /POST route
    */
    describe('POST /user', () => {

        it('it should insert a new user in the db', (done) => {
            let user = createUser();

            chai.request(app)
                .post('/user')
                .set('content-type', 'application/json')
                .send({user})
                .end((err, res) => {
                        res.status.should.equal(201);
                done();
                });
        });

        it('It should not work: user too young', (done) => {
            let user = createUser();
            user.birthdate = ( moment().subtract(10, 'years').format('DD/MM/YYYY') )

            chai.request(app)
                .post('/user')
                .set('content-type', 'application/json')
                .send({user})
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                });

        });

    });

});
 
