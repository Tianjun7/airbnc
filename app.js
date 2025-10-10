const express = require("express")
const { getProperties } = require("./controllers/properties")
const { getReviews } = require("./controllers/reviews")
const { getUser } = require("./controllers/users")
const {handlePathNotFound, handleServerErrors} = require("./errors")

const app = express()

app.get("/api/properties", getProperties)

app.get("/api/reviews", getReviews)

app.get("/api/users/:id", getUser)

app.all("/*path", handlePathNotFound)

app.use(handleServerErrors)

module.exports = app