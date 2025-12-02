const db = require("../db/connection")

exports.fetchProperties =  async (option) => {

    let query = `SELECT
    properties.property_id, 
    name AS property_name, 
    location, 
    price_per_night, 
    CONCAT(first_name,' ', surname) AS host,
    property_type, 
    img.image_url AS image 
    FROM properties 
    join users ON properties.host_id = users.user_id 
    LEFT JOIN (
    SELECT property_id, MIN(image_url) AS image_url
    FROM images 
    GROUP BY property_id 
)img ON properties.property_id = img.property_id`

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
    console.log(properties)

    return properties
}

exports.fetchPropertyById = async (id) => {

    const { rows: [property] } = await db.query(
        `SELECT properties.property_id, 
        name AS property_name, 
        location, 
        price_per_night, 
        CONCAT(first_name,' ', surname) AS host,
        avatar AS host_avatar, 
        ARRAY_AGG(image_url) AS images
        FROM properties
        INNER JOIN users 
        ON properties.host_id = users.user_id 
        INNER JOIN images 
        ON properties.property_id = images.property_id 
        WHERE properties.property_id = $1
        GROUP BY properties.property_id, users.first_name, users.surname, users.avatar;`, [id]
    )
    return property;
}