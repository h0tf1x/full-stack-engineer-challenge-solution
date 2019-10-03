const dot = require('dot-object')

/**
 * Prettify errors
 * 
 * @param {Object} errors 
 */
const formatErrors = (errors) => {
    return dot.object(errors)
}

module.exports = (cls) => {
    let Model = cls
    return (req, res, next) => {
        let model = new Model(req.body)
        let errors = model.validateSync()
        if(errors) {
            return res.status(422).json(formatErrors(errors.errors))
        }
        next()
    }
}