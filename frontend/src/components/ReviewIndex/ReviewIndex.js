import { useEffect, useState } from "react"
import ReviewItem from "../ReviewIndexItem/ReviewItem"
import ReviewForm from "../ReviewForm/ReviewForm"
import { useDispatch, useSelector } from "react-redux"
import "./Reviews.css"
import { fetchReviews } from "../../store/reviews"


const ReviewIndex = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchReviews())
    },[])
    const reviews = useSelector(state => Object.values(state.reviews))
    console.log(reviews)

    return(
        <div className="reviewIndex-container">
                <div className="star-rating">
        
                </div>
                <div className="review-tags">

                </div>
        </div>
    )
}

export default ReviewIndex;