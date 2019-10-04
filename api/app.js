const express = require('express')
const resultsRouter = require('./routes/results')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const app = express()

mongoose.Promise = Promise

app.use(bodyParser.json())
app.use(cors())

app.use('/results', resultsRouter)

app.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        error: err.message
    })
})

if(require.main == module) {
    mongoose.connect(config.db.url, config.db.options).then(() => {
        app.listen(8000)
    })
}

module.exports = app