require('../../models/User');
require('../../models/Review');

const { json } = require('express');
const express = require('express');
const { Result } = require('express-validator');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Room = mongoose.model('Room');
const { requireUser } = require('../../config/passport');
const Review = require('../../models/Review');
const { collection } = require('../../models/User');
const validateReviewInput = require('../../validation/reviews');



/* POST ----- CREATE REVIEW ----- */
router.post('/create', validateReviewInput, async (req, res, next) => {
    try {
        const newReview = new Review({
            reviewer: req.user._id,
            reviewee: req.body.reviewee,
            rating: req.body.rating,
            comments: req.body.comments,
            toxic: req.body.toxic,
            friendly: req.body.friendly,
            skilled: req.body.skilled,
            griefing: req.body.griefing,
            teamPlayer: req.body.teamPlayer,
            leader: req.body.leader
        })
        let review = await newReview.save();
        review = await review.populate("reviewer", "_id, username");
        return res.json(review);
    }
    catch(err) {
        next(err);
    }
})


/* GET ----- RENDER ALL REVIEWS ----- */
router.get('/', async (_req, res) => {
    // debug("hello")
    try {
        debug("hello")
        debug("hello2")
        const reviews = await Review.find()
                                    .populate("reviewer", "_id, username")
                                    .sort({ createdAt: -1});
        return res.json(reviews);
    }
    catch(err) {
        return res.json([]);
    }
    
})


/* GET ----- RENDER REVIEW ----- */
router.get('/:reviewId', async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId)
                                    .populate("reviewer", "_id, username");
        return res.json(review);
    }
    catch(_err) {
        const err = new Error("Review not found.");
        err.statusCode = 404;
        err.errors = { message: "No Review found"};
        return next(err);
    }
})

/* PATCH ----- UPDATE REVIEW ----- */
router.patch('/:reviewId', requireUser, validateReviewInput, async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId)

        if (review) {
            review.rating = req.body.review || review.rating;
            review.comments = req.body.comments || review.comments;
            review.toxic = req.body.toxic || review.toxic;
            review.friendly = req.body.friendly || review.friendly;
            review.skilled = req.body.skilled || review.skilled;
            review.griefing = req.body.griefing || review.griefing;
            review.teamPlayer = req.body.teamPlayer || review.teamPlayer;
            review.leader = req.body.leader || review.leader;
        }
        return res.json(review);
    }
    catch(err){
        next(err);
    }
})


/* DESTROY ----- DESTROY REVIEW ----- */
router.delete('/:reviewId', requireUser, validateReviewInput, async (req, res, next) => {
    try {
        const review = await Room.findOneAndDelete(req.params.reviewId)
                                    .populate();
        return res.json(review);
    }
    catch(_err) {
        const err = new Error('Review not found');
        err.statusCode = 404;
        err.errors = { message: "No review found." };
        return next(err);
    }
})


module.exports = router;
