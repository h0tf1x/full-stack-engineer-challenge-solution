const express = require('express')
const ResultsService = require('../services/results')
const results = express.Router()


results.post('/', async (req, res) => {
    const result = await ResultsService.create(req.body)
    return res.json(result)
})

results.get('/', async (req, res) => {
    const results = await ResultsService.list(req.params.limit, req.params.offset)
    return res.json(results)
})

module.exports = results
