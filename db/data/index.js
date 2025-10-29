const ENV = process.env.NODE_ENV || "production"

const devData = require("./dev")
const testData = require("./test")

const data = {
    test: testData,
    development:devData,
    production:devData
}

module.exports = data[ENV]