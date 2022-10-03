const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema({
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    toxic: {
        type: Boolean,
        default: false,
        required: true
    },
    friendly: {
        type: Boolean,
        default: false,
        required: true
    },
    skilled: {
        type: Boolean,
        default: false,
        required: true
    },
    griefing: {
        type: Boolean,
        default: false,
        required: true
    },
    teamPlayer: {
        type: Boolean,
        default: false,
        required: true
    },
    leader: {
        type: Boolean,
        default: false,
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