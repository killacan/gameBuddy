const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema({
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema);