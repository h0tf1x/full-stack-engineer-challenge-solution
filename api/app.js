const express = require('express')
const resultsRouter = require('./routes/results')
const app = express()


app.use('/results', resultsRouter)

if(require.main == module) {
    app.listen(8000)
}