module.exports = (model) => {
    return (req, res, next) => {
        let model = new model(req.body)
        let errors = model.validateSync()
        if(errors) {
            return res.status(422).json(errors)
        }
        next()
    }
}