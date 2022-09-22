import './GameRoom.css'
import { useState } from 'react'
import ReviewForm from '../ReviewForm/ReviewForm.js'

const UserReview = ({user}) => {

    const [showReviewForm, setShowReviewForm] = useState(false)

    return (
        <>
            <div className="review-box">
                <div className="review-username">
                    <p id="username-text">{user}</p>
                </div>
                <div className="review-button">
                    <div onClick={() => setShowReviewForm(true)}>
                        <p id="review-text">Review this User</p>
                    </div>
                </div>
            </div>  
            {showReviewForm && <ReviewForm setShowReviewForm={setShowReviewForm}/> }
        </>
    )
}

export default UserReview