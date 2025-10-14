const { fetchReviews } = require("../models/reviews")

exports.getReviews = async (req, res, next) => {
    const {id} = req.params
    const reviews = await fetchReviews(id);

    res.status(200).send({ reviews })
}

exports.insertReview = async (req,res,next) => {
    
    res.status(201).send();
}