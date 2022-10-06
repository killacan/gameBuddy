import './GameRoom.css'
import { useState } from 'react'
import ReviewForm from '../ReviewForm/ReviewForm.js'

const UserReview = ({member,user}) => {
    console.log(member, "hello checking what member")
    const [showReviewForm, setShowReviewForm] = useState(false)

    return (
        <>
            <div className="review-box">
            {member._id === user._id ? "" 
                    :
                    <>          
                        <div className="review-username">
                            <p id="username-text">{member.username}</p>
                                
                        </div>
                        <div className="review-button">
                            <div onClick={() => setShowReviewForm(true)}>
                                <p id="review-text">Review this User</p>
                            </div>
                        </div>
                    </>
            }
            </div>  
            {showReviewForm && <ReviewForm setShowReviewForm={setShowReviewForm} member={member}/> }
        </>
    )
}

export default UserReview