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

router.get('/', async (_req, res) => {
    try {
        const reviews = await Review.find()
                                    .populate("reviewer", "_id, username")
                                    .sort({ createdAt: -1});
        return res.json(reviews);
    }
    catch(err) {
        return res.json([]);
    }
})