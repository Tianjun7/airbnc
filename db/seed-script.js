const seed = require("../db/seed");
const db = require("./connection")
const { bookingsData, favouritesData, imagesData, propertiesData, propertyTypesData, reviewsData, usersData } = require("./data")

seed(propertyTypesData, propertiesData, usersData, reviewsData).then(() => {
    db.end();
})

