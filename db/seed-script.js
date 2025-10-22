const seed = require("../db/seed");
const db = require("./connection")
const { bookings, favouritesData, imagesData, properties, propertyTypes, reviews, users } = require("./data")

seed(propertyTypes, properties, users, reviews).then(() => {
    db.end();
})

