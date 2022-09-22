import React, { useState } from "react"; 
import { FaLessThanEqual, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom"

import './ReviewForm.css'

const ReviewForm = ({setShowReviewForm}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const {userId} = useParams();
    const history = useHistory();


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
        reviewee: userId
    });

    const [rating, ,setRating] = useState()
    // let path = (`profile/${userId}`)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userId)
        dispatch(createReview(selectedReview));
        setSelectedReview({...selectedReview, 
            rating: 0,
            comments: "",
            toxic: null,
            friendly: null,
            skilled: null,
            griefing: false,
            teamPlayer: false,
            leader: false,
            reviwer: sessionUser,
            reviewee: userId})
        }

    return(
        <>
            <div className="blur-background-review" onClick={() => setShowReviewForm(false)}></div>      
            <div id="modal-bg-container-review"></div>
            <div className="bg-modal">
                <form className='end-review-form' onSubmit={handleSubmit}>
                    <h1 id="review-end-title">Review</h1>
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
                    <label className="review-buttons">comments
                        <input type="text" value={selectedReview.comments} onChange={(e) => setSelectedReview({...selectedReview, comments: e.target.value})}></input>
                    </label>
                    <label className="review-buttons">Toxic
                        <input type="radio" value={selectedReview.toxic} onChange={(e) => setSelectedReview({...selectedReview, toxic: true})}></input>
                    </label>
                    <label className="review-buttons">Friendly
                        <input type="radio" value={selectedReview.friendly} onChange={(e) => setSelectedReview({...selectedReview, friendly: true})}></input>
                    </label>
                    <label className="review-buttons">Skilled
                        <input type="radio" value={selectedReview.skilled} onChange={(e) => setSelectedReview({...selectedReview, skilled: true})}></input>
                    </label>
                    <label className="review-buttons">Griefing
                        <input type="radio" value={selectedReview.griefing} onChange={(e) => setSelectedReview({...selectedReview, griefing: true})}></input>
                    </label>
                    <label className="review-buttons">Team Player
                        <input type="radio" value={selectedReview.teamPlayer} onChange={(e) => setSelectedReview({...selectedReview, teamPlayer: true})}></input>
                    </label>
                    <label className="review-buttons">Leader
                        <input type="radio" value={selectedReview.leader} onChange={(e) => setSelectedReview({...selectedReview, leader: true})}></input>
                    </label>
                    <button type="submit" id="post-review-button">Post Review</button>
                </form>
            </div>
        </>
    )
}
export default ReviewForm