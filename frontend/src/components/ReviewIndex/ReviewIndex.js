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
    console.log(reviews,'asdf')

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
                    {/* <div className="review-tags">
                        <div>{review.friendly && <div id="tags-1">friendly </div>}</div>
                        <div>{review.griefing && <div id="tags-2">griefing</div>}</div>
                        <div>{review.leader && <div id="tags-3">leader </div>}</div>
                        <div>{review.skilled && <div id="tags-4">skilled </div>}</div>
                        <div>{review.teamPlayer && <div id="tags-5">teamPlayer </div>}</div>
                        <div>{review.toxic && <div id="tags-6">toxic</div>}</div>
                    </div> */}
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