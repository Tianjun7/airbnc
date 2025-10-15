const { fetchReviews, insertReview, deleteReview } = require("../models/reviews")

exports.getReviews = async (req, res, next) => {
    const {id} = req.params
    const reviews = await fetchReviews(id);

    res.status(200).send({ reviews })
}

exports.postReview = async (req,res,next) => {
    const { guest_id, rating, comment } = req.body
    const { id } = req.params
    
    const review = await insertReview(guest_id, rating, comment, id)

    res.status(201).send({ review });
}

exports.deleteReview = async (req,res,next) => {
    const{ id } = req.params
    const deletedReview = await deleteReview(id)

    res.status(204).send(deletedReview)
}