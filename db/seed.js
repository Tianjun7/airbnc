const db = require("./connection")
const format = require("pg-format")
const createUsersRef = require("../db/utils")

async function seed(propertyTypes, properties, users, reviews){
    await db.query(`DROP TABLE IF EXISTS reviews;`)
    await db.query(`DROP TABLE IF EXISTS properties;`)
    await db.query(`DROP TABLE IF EXISTS users;`)
    await db.query(`DROP TABLE IF EXISTS property_types;`)

    await db.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(40) NOT NULL,
        surname VARCHAR(40) NOT NULL,
        email VARCHAR(40) NOT NULL,
        phone_number VARCHAR(40),
        is_host BOOLEAN NOT NULL,
        avatar VARCHAR(40),
        created_at TIMESTAMP
        );`)

    await db.query(`CREATE TABLE property_types(
        property_type VARCHAR(40) NOT NULL PRIMARY KEY,
        description VARCHAR
        );`)

    await db.query(`CREATE TABLE properties(
        property_id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        property_type VARCHAR(40) NOT NULL REFERENCES property_types(property_type),
        location VARCHAR(40) NOT NULL,
        price_per_night INTEGER NOT NULL,
        description VARCHAR,
        host_id INTEGER NOT NULL REFERENCES users(user_id)
        );`)

    await db.query(`CREATE TABLE reviews(
         review_id SERIAL PRIMARY KEY,
         property_id INTEGER NOT NULL REFERENCES properties(property_id),
         guest_id INTEGER NOT NULL REFERENCES users(user_id),
         rating INTEGER NOT NULL,
         comment TEXT,
         created_at TIMESTAMP
        );`)

    await db.query(
        format(`INSERT INTO property_types(property_type, description) VALUES %L`,
            propertyTypes.map(({property_type, description}) => [property_type, description])
        )
    )

    const {rows: insertedUsers} = await db.query(
        format(`INSERT INTO users(first_name, surname, email, phone_number, is_host, avatar) VALUES %L RETURNING *`,
            users.map(({first_name, surname, email, phone_number, is_host, avatar}) =>
            [first_name, surname, email, phone_number, is_host, avatar])
        )
    )

    const userRef = createUsersRef(insertedUsers);

    await db.query(
        format(`INSERT INTO properties(name, property_type, location, price_per_night, description, host_id)
            VALUES %L`, properties.map(({name, property_type, location, price_per_night, description, host_name}) => [
                name,
                property_type,
                location,
                price_per_night,
                description,
                userRef[host_name]
            ])
        )
    )

    await db.query(
        format(`INSERT INTO reviews(property_id, guest_id, rating, comment) VALUES %L`,
            reviews.map(({}))
        )
    )
 }

module.exports = seed;