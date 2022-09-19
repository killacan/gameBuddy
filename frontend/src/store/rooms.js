import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_ROOMS = "rooms/RECEIVE_ROOMS"
const RECEIVE_ROOM = "rooms/RECEIVE_ROOM"
const DELETE_ROOM = "rooms/DELETE_ROOM"
const RECEIVE_ROOM_ERRORS = "rooms/RECEIVE_ROOMS_ERRORS"
const CLEAR_ROOM_ERRORS = "rooms/CLEAR_TWEET_ERRORS"

const receiveRooms = rooms => ({
    type: RECEIVE_ROOMS,
    rooms
})

const receiveRoom = room => ({
    type: RECEIVE_ROOM,
    room
})

const deleteRoom = room => ({
    type: DELETE_ROOM,
    room
})

const receiveErrors = errors => ({
    type: RECEIVE_ROOM_ERRORS,
    errors
})

const clearRoomErrors = errors => ({
    type: CLEAR_ROOM_ERRORS,
    errors
})

export const fetchRooms = () => async dispatch => {
    try {
        const res = await jwtFetch(`/api/rooms`);
        const rooms = await res.json();
        dispatch(receiveRooms(rooms))
    }catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors))
        }
    }
};

export const fetchRoom = (roomId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/rooms/${roomId}`);
        const room = await res.json();
        dispatch(receiveRoom(room))
    }catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400){
            return dispatch(receiveErrors(resBody.errors))
        }
    }
};
// fetch room, fetch rooms, 

