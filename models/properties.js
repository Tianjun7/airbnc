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