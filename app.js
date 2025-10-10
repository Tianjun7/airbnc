const express = require("express")
const { getProperties, getPropertyById } = require("./controllers/properties")
const { getReviews } = require("./controllers/reviews")
const { getUser } = require("./controllers/users")
const {handlePathNotFound, handleServerErrors, handleBadRequests} = require("./errors")

const app = express()

app.get("/api/properties", getProperties)

app.get("/api/reviews", getReviews)

app.get("/api/users/:id", getUser)

app.get("/api/properties/:id", getPropertyById)

app.all("/*path", handlePathNotFound)

app.use(handleBadRequests)

app.use(handleServerErrors)

module.exports = app