const seed = require("../db/seed");
const {propertyTypes} = require("../db/data/test/property-types.json")
const {properties} = require("../db/data/test/properties.json")

seed(propertyTypes, properties);

