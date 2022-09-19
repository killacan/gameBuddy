const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = Schema({
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Game', roomSchema);