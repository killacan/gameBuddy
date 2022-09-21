import React from "react"
import { useSelector } from "react-redux"


const ReviewItem = () => {
    const sessionUser = useSelector(state => state.session.user)
    console.log(sessionUser)
    
    return(
        <>
        <div className="review-box">
            <div id="top-box">
                {/* <p>Hello from Review Item</p> */}
                {/* <h2 id="rating">Rating:{starRating()}</h2> */}
                {/* {deleteUpdateButtons} */}
            </div>
        </div>
        
        </>
    )
}

export default ReviewItem