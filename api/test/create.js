const Mongoose = require('mongoose').Mongoose
const Mockgoose = require('mockgoose').Mockgoose
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
chai.should()

const mongoose = new Mongoose()
const mockgoose = new Mockgoose(mongoose)


before(async () => {
    await mockgoose.prepareStorage()
    return mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

describe('Create security scan result feature', () => {
    it('should return 422 error, if not valid payload received', done => {
        chai.request(app)
        .post('/results')
        .send({
            status: 'Queued',
            repository: '',
            findings: []
        }).end((err, res) => {
            res.status.should.equal(422)
            res.body.should.have.own.property('repository')
            done()
        })
    })

    it('should validate nested objects', done => {
        chai.request(app)
        .post('/results')
        .send({
            status: 'Queued',
            repository: 'somerepo',
            findings: [{}]
        }).end((err, res) => {
            res.status.should.equal(422)
            res.body.findings[0].should.have.all.keys('type', 'ruleId', 'location', 'metadata')
            done()
        })
    })

    it('should return 201 if valid payload present', done => {
        chai.request(app).post('/results').send({
            status: 'Queued',
            repository: '',
            findings: []
        }).end((err, res) => {
            res.should.have.status(422)
            done()
        })
    })
})