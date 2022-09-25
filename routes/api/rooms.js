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



/* POST ----- CREATE ROOM ----- */
router.post('/create', requireUser, validateRoomInput, async (req, res, next) => {
    try {
        const newRoom = new Room({
            host: req.body.host,
            members: [],
            title: req.body.title,
            game: req.body.game,
            duration: req.body.duration,
            privacy: req.body.privacy,
            socketKey: req.body.socketKey
        })

        let room = await newRoom.save();
        room = await room.populate('host');
        return res.json(room);
    }
    catch(err) {
        next(err);
    }
})


/* GET ----- RENDER ALL ROOMS ----- */
router.get('/', async (_req, res) => {
    try {
        const rooms = await Room.find()
                                .populate('host','_id, username')
                                .sort({ createdAt: -1});
        return res.json(rooms);
    }
    catch(_err) {
        return res.json([]);
    }
})


/* GET ----- RENDER ROOM ----- */
router.get('/:roomId', async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.roomId)
                               .populate('host','_id,username')
        return res.json(room);
    }
    catch(_err) {
        const err = new Error("Room not found.");
        err.statusCode = 404;
        err.errors = { message: "No Room found." };
        return next(err);
    }
})


/* PATCH ----- UPDATE ROOM ----- */
router.patch('/:roomId', requireUser, async (req, res, next) => {
    try {
        let room = await Room.findById(req.params.roomId);

        if (room) {
            room.game = req.body.game || room.game;
            room.duration = req.body.duration || room.duration;
            room.privacy = req.body.privacy || room.privacy;
            room.title = req.body.title || room.title;
            room.members = req.body.members || room.members;
            room = await room.save();
            
        }
        return res.json(room);
    }
    catch(err) {
        next(err);
    }
})

/* PATCH ----- UPDATE ROOM/USER JOIN ROOM ----- */
router.patch('/:roomId/join/:userId', async(req, res, next) => {
    try {
        const room = await Room.findById(req.params.roomId);
        const user = await User.findById(req.params.userId);

        if (room) {
            room.members.push(user);
        }
        return res.json(room);
    }
    catch(err) {
        next(err)
    }
})


/* DELETE ----- DESTROY ROOM ----- */
router.delete('/:roomId', requireUser, async (req, res, next) => {
  Room
  .findByIdAndRemove(req.params.roomId)
  .exec()
  .then(data => {
    if (!data) {return res.status(404).end(); }
    return res.status(204).end();
  })
  .catch(err => next(err))
});


module.exports = router;
