const db = require("./connection")
const format = require("pg-format")

async function seed(propertyTyes){
    await db.query(`DROP TABLE IF EXISTS property-types;`)

    await db.query(`CREATE TABLE property-types(
        property_type VARCHAR(40) NOT NULL
        description VARCHAR
        );`)

    await db.query (
        format(`INSERT INTO property-types(property-type, description) VALUES %L`,
            propertyTyes.map(({property_types, description}) => [property_types, description])
        )
    )
}

module.exports = seed;