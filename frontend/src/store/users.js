import jwtFetch from "./jwt";


const RECEIVE_ALL_USERS = "users/RECEIVE_ALL_USERS";
const RECEIVE_USERS_ERRORS = "users/RECEIVE_USERS_ERRORS"
const CLEAR_USERS_ERRORS = "users/RECEIVE_USERS_ERRORS"
const RECEIVE_USER = "users/RECEIVE_USER"
const DELETE_USER = "users/DELETE_USER"

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

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId
})
 
export const editUser = (userData) => async(dispatch) => {
    try{
        const res = await jwtFetch(`/api/users/${userData._id}`,
        {
            method: 'PATCH',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type' : 'application/json',
            },
        });
        const user = await res.json();
        dispatch(receiveUser(user));
    }catch(err) {
        const resBody = await err;
        if (resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors))
        } 
    }
}

export const removeUser = (userId) => async(dispatch) => {
    console.log(userId)
    try{
        const res = await jwtFetch(`/api/users/${userId}`,{
            method: 'DELETE'
        })
        dispatch(deleteUser(userId))
    }catch (err) {
        const resBody = await err;
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        };
    };
}




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
            action.users.forEach(user => newState[user._id] = user)
            return newState;
        case RECEIVE_USER:
            newState[action.user._id] = action.user
            return newState
        case DELETE_USER: 
            delete newState[action.userId]
            return newState;
        default:
            return state
    }
}

export default usersReducer;