const MongoClient = require('mongodb');

class MongoConn {
    constructor() {
        // this.URL = 'mongodb://localhost:27017/Cookmaster';
        this.URL = 'mongodb://mongodb:27017/Cookmaster';
        this.NAME = 'Cookmaster';
        this.OPTIONS = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        this.DATABASE = null;
    }

    async connection() {
        if (this.DATABASE) return Promise.resolve(this.DATABASE);
        const mongo = await MongoClient.connect(this.URL, this.OPTIONS);
        this.DATABASE = mongo.db(this.NAME);
        return this.DATABASE;
    }
}

module.exports = MongoConn;
