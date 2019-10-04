const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const ScanResult = require('../models/results')

chai.use(chaiHttp)
chai.should()

mongoose.Promise = Promise
const mockgoose = new Mockgoose(mongoose)

describe('Create security scan result feature', () => {
    before(async () => {
        await mockgoose.prepareStorage()
        return mongoose.connect('mongodb://localhost/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })

    after(async () => {
        return await ScanResult.deleteMany({})
    })

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
            repository: 'some repo',
            findings: []
        }).end((err, res) => {
            res.should.have.status(201)
            done()
        })
    })

    it('should save result to database', done => {
        chai.request(app).post('/results').send({
            status: 'Queued',
            repository: 'some repo',
            findings: []
        }).end(async (err, res) => {
            const savedResult = await ScanResult.findById(res.body._id).exec()
            savedResult.should.be.an('object')
            done()
        })
    })
})
