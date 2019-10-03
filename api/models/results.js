const mongoose = require('mongoose')

const positionsSchema = new mongoose.Schema({
    begin: {
        line: { type: Number, required: true }
    }
})

const locationSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    positions: {
        type: positionsSchema,
        required: true
    }
})

const metadataSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        required: true
    }
})

const findingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    ruleId: {
        type: String,
        required: true
    },
    location: {
        type: locationSchema,
        required: true
    },
    metadata: {
        type: metadataSchema,
        required: true
    }
})

const ScanResult = mongoose.model('ScanResult', {
    status: {
        type: String,
        enum: ['Queued', 'In Progress', 'Success', 'Failure'],
        required: true
    },
    repository: {
        type: String,
        required: true
    },
    findings: {
        type: [findingSchema]
    }
})

module.exports = ScanResult
