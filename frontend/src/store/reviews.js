import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
const RECEIVE_NEW_REVIEW = "reviews/RECEIVE_NEW_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const RECEIVE_REVIEW_ERRORS = "reviews/RECEIVE_REVIEW_ERRORS";
const CLEAR_REVIEW_ERRORS = "reviews/CLEAR_REVIEW_ERRORS";

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

const receiveNewReview = review => ({
    type: RECEIVE_NEW_REVIEW,
    review
});

const deleteReview = review => ({
    type: DELETE_REVIEW,
    review
});

const receiveErrors = errors => ({
    type: RECEIVE_REVIEW_ERRORS,
    errors
});

const clearReviewErrors = receiveErrors => ({
    type: CLEAR_REVIEW_ERRORS,
    errors
});

// review, reviews, createReview, updateReview, deleteReview

export const fetchReviews = () => async dispatch => {
    try {
        const res = jwtFetch(`/api/reviews`);
        const reviews = await res.json();
        dispatch(receiveReviews(reviews));
    }catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors));
        };
    };
};

export const fetchReview = (reviewId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/reviews/${reviewId}`);
        const review = await res.json();
        dispatch(receiveReview(review));
    }catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400){
            return dispatch(receiveErrors(resBody.errors));
        };
    };
};

export const createReview = (reviewData) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/rooms`, {
            method: "POST",
            body: JSON.stringify(reviewData),
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const review = await res.json();
        dispatch(receiveNewReview(review));
    }catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400){
            return dispatch(receiveErrors(resBody.errors));
        };
    };
};

export const updateReview = (reviewData) => async dispatch =>{
    try {
        const res = await jwtFetch(`/api/reviews/${reviewData.id}`,
        {
            method: "PATCH",
            body: JSON.stringify(reviewData),
            headers: {
                "Content-Type": 'application/json'
            }
        });
    } catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        };
    };
};

export const destroyReview = (reviewId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/reviews/${reviewId}`,{
            method: "DELETE",
        });
        const review = await res.json();
        dispatch(deleteReview(review));
    }catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        };
    };
};

//nullErrors
const nullErrors = null;

export const reviewErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_REVIEW_ERRORS:
            return action.errors;
        case RECEIVE_NEW_REVIEW:
        case CLEAR_REVIEW_ERRORS:
            return nullErrors;
        default:
            return state
    };
};

//reviewReducer

const reviewReducer = (state = {all: {}, user: {}, new: undefined}, action) => {
    switch(action.type){
        case RECEIVE_REVIEWS:
            return {...state, all: action.reviews, new: undefined};
        case RECEIVE_REVIEW:
            return {...state, user: action.reviews, new: undefined};
        case RECEIVE_NEW_REVIEW:
            return {...state, new: action.review};
        case RECEIVE_USER_LOGOUT:
            return {...state, user: {}, new: undefined};
        default: 
            return state;
    };
};

export default reviewReducer