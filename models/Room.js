const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = Schema({
    host: {
        type: Schema.Types.Object,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.Object,
        ref: 'User'
    }],
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
        default: false,
    },
    socketKey: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Room', roomSchema);