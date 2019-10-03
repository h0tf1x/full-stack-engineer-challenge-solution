const ScanResult = require('../models/results')


class ResultsService {

    /**
     * List security scan results with pagination
     * 
     * @param {Number} limit 
     * @param {Number} offset 
     */
    static async list(limit, offset) {
        ScanResult.find().exec()
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
    static async create(data) {

    }
}

module.exports = ResultsService
