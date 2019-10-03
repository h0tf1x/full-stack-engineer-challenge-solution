const express = require('express')
const ResultsService = require('../services/results')
const modelValidationMiddleware = require('../middleware/validate')
const ScanResult = require('../models/results')
const results = express.Router()


results.post('/', modelValidationMiddleware(ScanResult), async (req, res) => {
    const result = await ResultsService.create(req.body)
    return res.status(201).json(result)
})

results.get('/', async (req, res) => {
    const results = await ResultsService.list(req.query.limit, req.query.offset)
    return res.json(results)
})

module.exports = results
