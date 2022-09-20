require('../../models/User');
require('../../models/Room');

const { json } = require('express');
const express = require('express');
const { Result } = require('express-validator');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Room = mongoose.model('Room');
const { requireUser } = require('../../config/passport');
const { collection } = require('../../models/User');
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


router.get('/:roomId', async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.roomId)
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
    // requireUser,
    validateRoomInput,
    async (req, res, next) => {
        try {
            const newRoom = new Room({
                host: req.hostId,
                title: req.body.title,
                game: req.body.game,
                duration: req.body.duration,
                privacy: req.body.privacy
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

router.delete('/:roomId', requireUser, async (req, res, next) => {
    try {
        const room = await Room.findOneAndDelete(req.params.roomId)
                                .populate();
        return res.json(room);
    }
    catch(_err) {
        const err = new Error('Room not found');
        err.statusCode = 404;
        err.errors = { message: "No room found." };
        return next(err);
    }
})

router.patch('/:roomId', async (res, req, next) => {
    try {
        const room = await Room.findById(req.params.roomId);

        if (room) {
            room.game = req.body.game || room.game;
            room.duration = req.body.duration || room.duration;
            room.privacy = req.body.privacy || room.privacy;
            room.title = req.body.title || room.title;
        }
        return res.json(room);
    }
    catch (err) {
        next(err);
    }
})


module.exports = router;
