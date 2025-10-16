const db = require("../db/connection")

exports.fetchProperties =  async (option) => {

    let query = `SELECT 
    property_id, 
    name AS property_name, 
    location, 
    price_per_night, 
    CONCAT(first_name,' ', surname) AS host,
    property_type 
    FROM properties 
    join users ON properties.host_id = users.user_id`

    const params = []

    if(option === undefined){
        const { rows: properties } = await db.query(query)

        return properties
    }

    else if(Object.hasOwn(option, 'property_type')){
        query += ` WHERE property_type = $1;`
        params.push(option.property_type)
    }
    else if(Object.hasOwn(option, 'maxPrice')){
        query += ` WHERE price_per_night <= $1;`
        params.push(option.maxPrice)
    }
    else if(Object.hasOwn(option, 'minPrice')){
        query += ` WHERE price_per_night >= $1;`
        params.push(option.minPrice)
    }

    else if(Object.hasOwn(option, 'sortby', 'order')){
        const order = option.order
        validOrder = ["ASC", "DESC"]

        if(!validOrder.includes(order)){
            return Promise.reject({status:400, msg: "Invalid sort option"})
        }
        query += ` ORDER BY price_per_night ${order};`
    }

    const { rows: properties } = await db.query(query, params)

    return properties
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