import React from "react"
import { useSelector } from "react-redux"


const ReviewItem = () => {
    const sessionUser = useSelector(state => state.session.user)    
    return(
        <>
        <div className="review-box">
            <div id="top-box">
            </div>
        </div>
        
        </>
    )
}

export default ReviewItem