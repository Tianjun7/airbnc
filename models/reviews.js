const db = require("../db/connection");

exports.fetchReviews = async () => {
    const {rows: reviews} = await db.query("SELECT * FROM reviews;")
    
    return reviews;
}