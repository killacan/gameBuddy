import { useEffect, useState } from "react"
import ReviewItem from "../ReviewIndexItem/ReviewItem"
import ReviewForm from "../ReviewForm/ReviewForm"
import { useDispatch, useSelector } from "react-redux"
import "./Reviews.css"
import { fetchReviews } from "../../store/reviews"
import { useParams } from "react-router-dom"
import { FaStar } from 'react-icons/fa';


const ReviewIndex = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchReviews())
    },[])

    const {userId} = useParams();
    const reviews = useSelector(state => Object.values(state.reviews))

    const showStar = (rating)=>{
        if (rating===1){
             return (
                 <div>
                     <FaStar id="star-value" />
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                 </div>
             )
         } 
        if (rating===2){
         return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===3){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===4){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===5){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
              </div>
         )
         } 
     }

    return(
        <>
            {reviews.map(review => (
            review.reviewee._id === userId  ? 
                <div className="user-rating-profile">
                    <div className="star-rating">
                        {showStar(review.rating)}
                    </div>
                    <div className="review-comments">
                        {review.comments}
                    </div>
                </div>
                :
                ""
            ))}
                
        </>
    )
}

export default ReviewIndex;