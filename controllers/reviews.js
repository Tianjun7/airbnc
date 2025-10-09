const { fetchReviews } = require("../models/reviews")

exports.getReviews = async (req, res, next) => {
    const reviews = await fetchReviews();

    res.status(200).send({ reviews })
}