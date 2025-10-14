const db = require("../db/connection")

exports.fetchReviews = async (id) => {
    const {rows: reviews} = await db.query(`SELECT 
        review_id, 
        comment, 
        rating, 
        reviews.created_at AS created_at,
        CONCAT(first_name,' ', surname) AS guest,
        avatar AS guest_avatar 
        FROM reviews 
        join properties ON reviews.property_id = properties.property_id 
        join users ON reviews.guest_id = users.user_id
        WHERE reviews.property_id = $1`, [id])

    return reviews;
}