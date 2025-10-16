const db = require("../db/connection")

exports.fetchProperties =  async (query) => {
    if(Object.hasOwn(query, 'property_type')){
        const {rows: properties} = await db.query(
        `SELECT 
        property_id, 
        name AS property_name, 
        location, 
        price_per_night, 
        CONCAT(first_name,' ', surname) AS host,
        property_type 
        FROM properties 
        join users ON properties.host_id = users.user_id 
        WHERE property_type = $1;`,[query.property_type]
    )
    return properties;
    }
    else if(Object.hasOwn(query, 'maxPrice')){
        const {rows: properties} = await db.query(
        `SELECT 
        property_id, 
        name AS property_name, 
        location, 
        price_per_night, 
        CONCAT(first_name,' ', surname) AS host,
        property_type 
        FROM properties 
        join users ON properties.host_id = users.user_id 
        WHERE price_per_night <= $1;`,[query.maxPrice]
    )
    return properties
    }
    else if(Object.hasOwn(query, 'minPrice')){
        const {rows: properties} = await db.query(
        `SELECT 
        property_id, 
        name AS property_name, 
        location, 
        price_per_night, 
        CONCAT(first_name,' ', surname) AS host,
        property_type 
        FROM properties 
        join users ON properties.host_id = users.user_id 
        WHERE price_per_night >= $1;`,[query.minPrice]
    )
    return properties
    }

    else if(Object.hasOwn(query, 'sortby', 'order')){
        if(query.order = 'ascending'){
            const {rows: properties} = await db.query(
            `SELECT 
            property_id, 
            name AS property_name, 
            location, 
            price_per_night, 
            CONCAT(first_name,' ', surname) AS host,
            property_type 
            FROM properties 
            join users ON properties.host_id = users.user_id 
            ORDER BY price_per_night ASC;`,[query.sortby]
            )
            console.log(properties)
            console.log(query)
            return properties
        }
        else if(query.order = 'descending'){
            const {rows: properties} = await db.query(
            `SELECT 
            property_id, 
            name AS property_name, 
            location, 
            price_per_night, 
            CONCAT(first_name,' ', surname) AS host,
            property_type 
            FROM properties 
            join users ON properties.host_id = users.user_id 
            ORDER BY $1 DESC;`,[query.sortby]
            )
            return properties
        }
    }
    
    const {rows: properties} = await db.query(
        `SELECT 
        property_id, 
        name AS property_name, 
        location, 
        price_per_night, 
        CONCAT(first_name,' ', surname) AS host 
        FROM properties 
        join users ON properties.host_id = users.user_id;`
    )
    return properties;
}

exports.fetchPropertyById = async (id) => {
    const { rows: [property] } = await db.query(
        `SELECT property_id, 
        name AS property_name, 
        location, 
        price_per_night, 
        CONCAT(first_name,' ', surname) AS host,
        avatar AS host_avatar
        FROM properties 
        join users ON properties.host_id = users.user_id 
        WHERE property_id = $1;`, [id]
    )
    return property;
}