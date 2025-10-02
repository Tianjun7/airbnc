const { fetchReviews } = require("../models/properties")

exports.getReviews = async (req, res, next) => {
    const reviews = await fetchReviews();
    res.status(200).send({ reviews })
}