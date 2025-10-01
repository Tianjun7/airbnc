const express = require("express")
const db = require("./db/connection")
const { getProperties } = require("./controllers/properties")
const { getReviews } = require("./controllers/reviews")

const app = express()

app.get("/api/properties", getProperties)

app.get("/api/reviews", getReviews)

module.exports = app