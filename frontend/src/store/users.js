import jwtFetch from "./jwt";


const RECEIVE_ALL_USERS = "users/RECEIVE_ALL_USERS";
const RECEIVE_USERS_ERRORS = "users/RECEIVE_USERS_ERRORS"
const CLEAR_USERS_ERRORS = "users/RECEIVE_USERS_ERRORS"

export const receiveAllUsers = (users) => ({
    type: RECEIVE_ALL_USERS,
    users
})

export const receiveErrors = (errors) => ({
    type: RECEIVE_USERS_ERRORS,
    errors
})
export const clearRoomErrors = (errors) => ({
    type: CLEAR_USERS_ERRORS,
    errors
})

export const fetchAllUsers = () => async (dispatch) => {
    try{
        const res = await jwtFetch(`/api/users/`);
        const users = await res.json();
        dispatch(receiveAllUsers(users))
    }catch(err) {
        const resBody = await err;
        if (resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors))
        }
    }
}



const usersReducer = (state ={}, action) => {
    Object.freeze(state)
    const newState = {...state}
    switch(action.type){
        case RECEIVE_ALL_USERS:
            // return {...newState, ...action.users}
            action.users.forEach(user => newState[user._id] = user)
            return newState;
        default:
            return state
    }
}

export default usersReducer;