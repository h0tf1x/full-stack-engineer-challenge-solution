const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose
const ScanResult = require('../models/results')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
chai.should()

const mockgoose = new Mockgoose(mongoose)


describe('List security scan results feature', () => {
    before(async () => {
        await mockgoose.prepareStorage()
        await mongoose.connect('mongodb://localhost/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        let a = [...new Array(50).keys()]
        return Promise.all(a.map((value, index) => {
            let result = ScanResult({
                status: 'Queued',
                repository: `Some repo ${index}`,
                findings: []
            })
            return result.save()
        }))
    })

    after(async () => {
        return ScanResult.deleteMany({})
    })

    it('should return list of scan results', done => {
        chai.request(app)
        .get('/results')
        .end((err, res) => {
            res.body.should.have.lengthOf(10)
            done()
        })
    })

    it('should limit scan results', done => {
        chai.request(app)
        .get('/results?limit=1&offset=10')
        .end((err, res) => {
            res.body.should.have.lengthOf(1)
            done()
        })
    })

    it('should limit scan results with default value, if not number received', done => {
        chai.request(app)
        .get('/results?limit=not_a_number&offset=10')
        .end((err, res) => {
            res.body.should.have.lengthOf(10)
            done()
        })
    })

    it('should return empty array, if offset more than results count', done => {
        chai.request(app)
        .get('/results?limit=not_a_number&offset=100')
        .end((err, res) => {
            res.body.should.have.lengthOf(0)
            done()
        })
    })
})
