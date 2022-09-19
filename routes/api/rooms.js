require('../../models/User');
require('../../models/Room');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Room = mongoose.model('Room');
const { requireUser } = require('../../config/passport');
const validateRoomInput = require('../../validation/rooms');

router.get('/', async (_req, res) => {
    try {
        const rooms = await Room.find()
                                .populate("host", "_id, username")
                                .sort({ createdAt: -1});
        return res.json(rooms);
    }
    catch(_err) {
        return res.json([]);
    }
})


router.get('/:id', async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
                                .populate("host", "id, username");
        return res.json(room);
    }
    catch(_err) {
        const err = new Error("Room not found.");
        err.statusCode = 404;
        err.errors = { message: "No Room found with that id"};
        return next(err);
    }
})

router.post('/create',
    requireUser,
    validateRoomInput,
    async (res, req, next) => {
        try {
            const newRoom = new Room({
                host: req.user._id,
                game: req.room.game,
                duration: req.room.duration,
                private: req.room.private
            })

            let room = await newRoom.save();
            room = await room.populate("host", "_id, username");
            return res.json(room);
        }
        catch(err) {
            next(err);
        }
    }
)

module.exports = router;
