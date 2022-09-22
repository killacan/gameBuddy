import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_ROOMS = "rooms/RECEIVE_ROOMS";
const RECEIVE_ROOM = "rooms/RECEIVE_ROOM";
const RECEIVE_NEW_ROOM = "rooms/RECEIVE_NEW_ROOM";
const DELETE_ROOM = "rooms/DELETE_ROOM";


const RECEIVE_ROOM_ERRORS = "rooms/RECEIVE_ROOM_ERRORS";
const CLEAR_ROOM_ERRORS = "rooms/CLEAR_ROOM_ERRORS";

export const receiveRooms = (rooms) => ({
  type: RECEIVE_ROOMS,
  rooms
});

export const receiveRoom = (room) => ({
  type: RECEIVE_ROOM,
  room,
});

export const receiveNewRoom = (room) => ({
  type: RECEIVE_NEW_ROOM,
  room,
});

export const deleteRoom = (roomId) => ({
  type: DELETE_ROOM,
  roomId,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ROOM_ERRORS,
  errors,
});

export const clearRoomErrors = (errors) => ({
  type: CLEAR_ROOM_ERRORS,
  errors,
});


// fetch rooms, fetch room, create room, update room, destroy room
export const fetchRooms = () => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/rooms`);
    const rooms = await res.json();
    dispatch(receiveRooms(rooms));
  } catch (err) {
    const resBody = await err;
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchRoom = (roomId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/rooms/${roomId}`);
    const room = await res.json();
    dispatch(receiveRoom(room));
  } catch (err) {
    const resBody = await err;
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};
export const createRoom = (roomData) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/rooms/create`, {
      method: "POST",
      body: JSON.stringify(roomData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const room = await res.json();
    dispatch(receiveNewRoom(room));
    return room;
  } catch (err) {
    const resBody = await err;
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};
export const updateRoom = (roomData) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/rooms/${roomData._id}`, {
      method: "PATCH",
      body: JSON.stringify(roomData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const room = await res.json();
    dispatch(receiveRoom(room));
    return room;
  } catch (err) {
    const resBody = await err;
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const destroyRoom = (roomId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/rooms/${roomId}`, {
      method: "DELETE",
    });
    console.log("hello after fetch")
    dispatch(deleteRoom(roomId));
  } catch (err) {
    const resBody = await err;
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

//joinRoom Thunk #1 NOT TESTED YET
export const joinRoom = (roomId, userId) => async (dispatch) => {
  try{
    const res = await jwtFetch(`/api/rooms/${roomId}/join/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const roomUsers = await res.json();
    dispatch(receiveRoom(roomUsers));
  } catch (err){
      const resBody = await EvalError.json();
      if (resBody.statusCode == 400){
        return dispatch(receiveErrors(resBody.errors))
      }
  }
}
//Thunk #2 using roomData, userData -> roomData.id, userData.id
//id vs _id?
// export const joinRoom = (roomData, userData) => async (dispatch) => {
//   try{
//     const res = await jwtFetch(`/api/rooms/${roomData.id}/join/${userData.id}`, {
//       method: "POST",
//       body: JSON.stringify(roomData),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     const roomUsers = await res.json();
//     dispatch(receiveRoom(roomUsers));
//   } catch (err){
//       const resBody = await EvalError.json();
//       if (resBody.statusCode == 400){
//         return dispatch(receiveErrors(resBody.errors))
//       }
//   }
// }


//nullError
const nullErrors = null;

export const roomErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_ROOM_ERRORS:
      return action.errors;
    case RECEIVE_NEW_ROOM:
    case CLEAR_ROOM_ERRORS:
      return nullErrors;
    default:
      return state;
  };
};

//Rooms Reducer

// const roomsReducer = (
//   state = { all: {}, user: {}, new: undefined },
//   action
//         ) => {
//   switch (action.type) {
//     case RECEIVE_ROOMS:
//       return { ...state, all: action.rooms, new: undefined };
//     case RECEIVE_ROOM:
//       return { ...state, user: action.rooms, new: undefined };
//     case RECEIVE_NEW_ROOM:
//       return { ...state, new: action.room };
//     case RECEIVE_USER_LOGOUT:
//       return { ...state, user: {}, new: undefined };
//     case DELETE_ROOM:
//         return {...state, all: {}, user: {}, new: undefined}
//     default:
//       return state;
//   }
// };



const roomsReducer = (state={},action) => {
  // debugger
    Object.freeze(state);
    const newState = {...state}
    switch(action.type){
        case RECEIVE_ROOMS: 
            action.rooms.forEach(room => newState[room._id] = room)
            return newState;
        case RECEIVE_ROOM:
            newState[action.room._id] = action.room
            return newState
        case RECEIVE_NEW_ROOM:
            newState[action.room._id] = action.room
            return newState;
        case DELETE_ROOM: 
            delete newState[action.roomId]
            return newState
        default: 
            return state; 
    }
}


export default roomsReducer;
