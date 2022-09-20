const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = Schema({
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    duration: {
        type: Number, //in minutes
        required: true
    },
    privacy: {
        type: Boolean,
        default: true,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Room', roomSchema);