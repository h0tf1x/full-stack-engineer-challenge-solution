module.exports = {
    db: {
        url: process.env.MONGO_URL || 'mongodb://localhost/somedb',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}