const express = require('express')
const resultsRouter = require('./routes/results')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use((err, req, res, next) => {
    return res.status(500).json({
        error: err.message
    })
})

app.use('/results', resultsRouter)

if(require.main == module) {
    app.listen(8000)
}