const db = require("./connection")
const format = require("pg-format")
const {createUsersRef, createPropertyRef}= require("../db/utils")

async function seed(propertyTypes, properties, users, reviews, images, favourites, bookings){
    console.log("seeding...")

    await db.query(`DROP TABLE IF EXISTS bookings`)
    await db.query(`DROP TABLE IF EXISTS favourites`)
    await db.query(`DROP TABLE IF EXISTS images`)
    await db.query(`DROP TABLE IF EXISTS reviews;`)
    await db.query(`DROP TABLE IF EXISTS properties;`)
    await db.query(`DROP TABLE IF EXISTS users;`)
    await db.query(`DROP TABLE IF EXISTS property_types;`)

    await db.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(40) NOT NULL,
        surname VARCHAR(40) NOT NULL,
        email VARCHAR(50) NOT NULL,
        phone_number VARCHAR(40),
        is_host BOOLEAN NOT NULL,
        avatar VARCHAR,
        created_at TIMESTAMP
        );`
    )

    await db.query(`CREATE TABLE property_types(
        property_type VARCHAR(40) NOT NULL PRIMARY KEY,
        description VARCHAR
        );`
    )

    await db.query(`CREATE TABLE properties(
        property_id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        property_type VARCHAR(40) NOT NULL REFERENCES property_types(property_type),
        location VARCHAR(40) NOT NULL,
        price_per_night INTEGER NOT NULL,
        description VARCHAR,
        host_id INTEGER NOT NULL REFERENCES users(user_id)
        );`
    )

    await db.query(`CREATE TABLE reviews(
         review_id SERIAL PRIMARY KEY,
         guest_id INTEGER NOT NULL REFERENCES users(user_id),
         property_id INTEGER NOT NULL REFERENCES properties(property_id),
         rating INTEGER NOT NULL,
         comment TEXT,
         created_at TIMESTAMP
        );`
    )

    await db.query(`CREATE TABLE images(
            image_id SERIAL PRIMARY KEY,
            property_id INTEGER NOT NULL REFERENCES properties(property_id),
            image_url VARCHAR NOT NULL,
            alt_text VARCHAR NOT NULL
        );`
    )

    await db.query(`CREATE TABLE favourites(
            favourite_id SERIAL PRIMARY KEY,
            guest_id INTEGER NOT NULL REFERENCES users(user_id),
            property_id INTEGER NOT NULL REFERENCES properties(property_id)
        );`
    )

    await db.query(`CREATE TABLE bookings(
            booking_id SERIAL PRIMARY KEY,
            property_id INTEGER NOT NULL REFERENCES properties(property_id),
            guest_id INTEGER NOT NULL REFERENCES users(user_id),
            check_in_date DATE NOT NULL,
            check_out_date DATE NOT NULL,
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

    const {rows: insertedProperties} = await db.query(
        format(`INSERT INTO properties(name, property_type, location, price_per_night, description, host_id)
            VALUES %L RETURNING *`, properties.map(({name, property_type, location, price_per_night, description, host_name}) => [
                name,
                property_type,
                location,
                price_per_night,
                description,
                userRef[host_name]
            ])
        )
    )

    const propertyRef = createPropertyRef(insertedProperties);

    await db.query(
        format(`INSERT INTO reviews(guest_id, property_id, rating, comment, created_at) VALUES %L`,
            reviews.map(({guest_name, property_name, rating, comment, created_at}) => [
                userRef[guest_name],
                propertyRef[property_name],
                rating,
                comment,
                created_at
            ])
        )
    )

    await db.query(
        format(`INSERT INTO images(property_id, image_url, alt_text) VALUES %L`, 
            images.map(({property_name, image_url, alt_tag}) => [
                propertyRef[property_name],
                image_url,
                alt_tag
            ])
        )
    )

    await db.query(
        format(`INSERT INTO favourites(guest_id, property_id) VALUES %L`,
            favourites.map(({guest_name, property_name}) => [
                userRef[guest_name],
                propertyRef[property_name]
            ])
        )
    )

    await db.query(
        format(`INSERT INTO bookings(property_id, guest_id, check_in_date, check_out_date) VALUES %L`,
            bookings.map(({property_name, guest_name, check_in_date, check_out_date}) => [
                propertyRef[property_name],
                userRef[guest_name],
                check_in_date,
                check_out_date
            ])
        )
    )
 }

module.exports = seed;