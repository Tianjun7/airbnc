const db = require("../db/connection")

exports.fetchProperties =  async (options) => {

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

    if(options === undefined){
        query += ";"
        const { rows: properties } = await db.query(query)

        return properties
    }
    else{
        query += " WHERE"
        let count = 0

        for(const option in options){
            console.log("iteration")
            if(options[option] !== "" && option !== "sortby" && option !== "order"){
                const arr = query.split(" ")
                if(arr[arr.length - 1] !== "WHERE"){
                    query += " AND"
                }
                count += 1
                if(option === "minPrice"){
                    query += ` price_per_night>=$${count}`
                    params.push(options[option])
                }
                if(option === "maxPrice"){
                    query += ` price_per_night<=$${count}`
                    params.push(options[option])
                }
                if(option === "property_type"){
                    query += ` property_type=$${count}`
                    params.push(options[option])
                }
            }
        }

        if(Object.hasOwn(options, 'sortby', 'order')){
            const order = options.order
            validOrder = ["ASC","DESC"]

            if(!validOrder.includes(order)){
                return Promise.reject({status:400, msg: "Invalid sort option"})
            }
            query += ` ORDER BY price_per_night ${order}`
        }
        
        query += ";"
        console.log(query)

        const { rows: properties } = await db.query(query, params)

        return properties
    }
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
