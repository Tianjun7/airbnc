const db = require("./connection")
const format = require("pg-format")

async function seed(propertyTypes, properties){
    await db.query(`DROP TABLE IF EXISTS properties;`)
    await db.query(`DROP TABLE IF EXISTS property_types;`)

    await db.query(`CREATE TABLE property_types(
        property_type VARCHAR(40) NOT NULL PRIMARY KEY,
        description VARCHAR
        );`)

    await db.query(`CREATE TABLE properties(
        name VARCHAR(40) NOT NULL,
        property_type VARCHAR(40) NOT NULL REFERENCES property_types(property_type),
        location VARCHAR(40),
        price_per_night INTEGER,
        description VARCHAR(40),
        host_name VARCHAR(40),
        amenities VARCHAR ARRAY
        );`)

    await db.query (
        format(`INSERT INTO property_types(property_type, description) VALUES %L`,
            propertyTypes.map(({property_type, description}) => [property_type, description])
        )
    )

    // await db.query (
    //     format(`INSERT INTO properties(name, property_type, location, price_per_night, description, host_name, amenities) VALUES %L`,
    //         properties.map(({name, property_type, location, price_per_night, description, host_name, amenities}) => 
    //             [name, property_type, location, price_per_night, description, host_name, amenities])
    //     )
    // )
}

module.exports = seed;