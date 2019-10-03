

class ResultsService {

    /**
     * 
     * @param {Number} limit 
     * @param {Number} offset 
     */
    static list(limit, offset) {

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

    }
}

module.exports = ResultsService
