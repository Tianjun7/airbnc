const fetchReviews = require("../models/properties")

exports.getReviews = async (req,res,next) => {
    const reviews = fetchReviews();
    res.status(200).send({ reviews })
}