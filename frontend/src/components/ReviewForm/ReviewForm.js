import React, { useState } from "react"; 
import { FaLessThanEqual, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviews";
import { useParams } from "react-router-dom"

import './ReviewForm.css'

const ReviewForm = ({setShowReviewForm}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const {_id} = useParams();


    const [selectedReview, setSelectedReview] = useState({
        rating: 0,
        comments: "",
        toxic: false,
        friendly: false,
        skilled: false,
        griefing: false,
        teamPlayer: false,
        leader: false,
        reviwer: sessionUser,
        reviewee: _id
    });

    const [rating, ,setRating] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello you have submitted")
        console.log(selectedReview.comments)
        dispatch(createReview(selectedReview));
    }

    return(
        <>
            <form className='review-form' onSubmit={handleSubmit}>
                <label className='rating-box'>Rating:
                    <div id='rating-starts'>
                        {[...Array(5)].map((star,i) => {
                            const ratingValue = i + 1;
                            
                            return(
                                <label >
                                    <input 
                                    type="radio"
                                    name="rating"  
                                    value={ratingValue} 
                                    onClick={(e)=> setSelectedReview({...selectedReview, rating: e.target.value})}>
                                    </input>
                                    <FaStar className="star" color={ratingValue <= (rating) ? "#ecc8f8" : "#e4e5e9"}/>
                                </label>
                                
                            )
                        })}
                    </div>
                </label>
                <label>comments
                    <input type="text" onChange={(e) => setSelectedReview({...selectedReview, comments: e.target.value})}></input>
                </label>
                <label>Toxic
                    <input type="radio"></input>
                </label>
                <label>Friendly
                    <input type="radio"></input>
                </label>
                <label>Skilled
                    <input type="radio"></input>
                </label>
                <label>Griefing
                    <input type="radio"></input>
                </label>
                <label>Team Player
                    <input type="radio"></input>
                </label>
                <label>Leader
                    <input type="radio"></input>
                </label>
                <button type="submit" id="post-review-button">Post Review</button>
             </form>
        </>
    )
}
export default ReviewForm