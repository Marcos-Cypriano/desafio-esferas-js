const express = require("express")

class AppController {
    constructor() {
        this.express = express()

        this.express.use(express.json())
        this.routes()
    }

    routes() {
        this.express.use(require("./routes"))
    }
}

module.exports = new AppController().express