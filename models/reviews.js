const db = require("../db/connection")

exports.fetchReviews = async () => {
    const {rows: reviews} = await db.query(`SELECT 
        review_id, 
        comment, 
        rating, 
        reviews.created_at AS created_at,
        CONCAT(first_name,' ', surname) AS guest,
        avatar AS guest_avatar 
        FROM reviews 
        join users ON reviews.guest_id = users.user_id;`)

    return reviews;
}