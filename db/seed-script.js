const seed = require("../db/seed");
const propertyTypes = require("../db/data/test/property-types.json")
const properties = require("../db/data/test/properties.json")
const users = require("../db/data/test/users.json")
const reviews = require("../db/data/test/reviews.json")

seed(propertyTypes, properties, users, reviews);

