const db = require("../db/connection");

exports.fetchReviews = async () => {
    console.log("error")
    const {rows: reviews} = await db.query("SELECT * FROM reviews;")
    return reviews;
}