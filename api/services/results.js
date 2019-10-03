const ScanResult = require('../models/results')

const DEFAULT_LIMIT = 10

class ResultsService {

    /**
     * List security scan results with pagination
     * 
     * @param {Number} limit 
     * @param {Number} offset 
     */
    static async list(limit, offset) {
        limit = parseInt(limit) || DEFAULT_LIMIT
        offset = parseInt(offset) || 0
        return ScanResult.find().limit(limit).skip(offset).exec()
    }

    /**
     * Create security scan result
     * 
     * @param {Object} data 
     * @param {String} data.status
     * @param {String} data.repository
     * @param {Array}  data.findings
     * @param {Date}   data.queuedAt
     * @param {Date}   data.scanningAt
     * @param {Date}   data.finishedAt
     */
    static create(data) {
        let result = new ScanResult(data)
        return result.save()
    }
}

module.exports = ResultsService
