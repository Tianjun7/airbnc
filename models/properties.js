const db = require("../db/connection")

exports.fetchProperties =  async () => {
    const {rows: properties} = await db.query(
        `SELECT property_id, name AS property_name, location, price_per_night, CONCAT(first_name,' ', surname) AS host FROM properties join users ON properties.host_id = users.user_id;`
    )

    return properties;
}