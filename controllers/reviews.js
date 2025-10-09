const { fetchReviews } = require("../models/properties")

exports.getReviews = async (req, res, next) => {
    const reviews = await fetchReviews();
    console.log("error")
    res.status(200).send({ reviews })
}