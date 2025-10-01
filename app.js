const express = require("express")
const db = require("./db/connection")
const { getProperties } = require("./controllers/properties")

const app = express()

app.get("/api/properties", getProperties)

module.exports = app