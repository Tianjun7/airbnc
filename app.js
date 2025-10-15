const express = require("express")
const { getProperties, getPropertyById } = require("./controllers/properties")
const { getReviews, postReview } = require("./controllers/reviews")
const { getUser } = require("./controllers/users")
const {handlePathNotFound, handleServerErrors, handleBadRequests} = require("./errors")

const app = express()

app.use(express.json())

app.get("/api/properties", getProperties)

app.get("/api/properties/:id/reviews", getReviews)

app.get("/api/users/:id", getUser)

app.get("/api/properties/:id", getPropertyById)

app.post("/api/properties/:id/reviews", postReview)

app.all("/*path", handlePathNotFound)

app.use(handleBadRequests)

app.use(handleServerErrors)

module.exports = app