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

exports.insertReview = async (guest_id, rating, comment, id) => {
    const { rows: [review] } = await db.query(`INSERT INTO reviews (guest_id, rating, comment, property_id)
        VALUES 
        ($1, $2, $3, $4) RETURNING *;`, 
        [guest_id, rating, comment, id]
    )
    return review
}