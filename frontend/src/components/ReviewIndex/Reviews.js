import { useEffect, useState } from "react"
import ReviewItem from "../ReviewIndexItem/ReviewItem"
import ReviewForm from "../ReviewForm/ReviewForm"
import { useDispatch, useSelector } from "react-redux"
import "./Reviews.css"
import { fetchReviews } from "../../store/reviews"


const ReviewIndex = () => {

    const reviews = useSelector(state => Object.values(state.reviews))
    console.log(reviews)

    const [showReviewForm, setShowReviewForm] = useState(false)


    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchReviews)
    }, [reviews.length])
    
    let reviewShow
    if (reviews.length > 0){
        reviewShow = (
            <div>
            {/* {reviews.map(review => (
                <ReviewItem review={review} 
                key={review.id} 
                setShowReviewForm={setShowReviewForm}
                setSelectedReview={setSelectedReview}/>
            ))} */}
            <p>I am here!</p>
            </div>
        )
    }else{
        reviewShow = (
            <div><p>There are no reviews for this user yet</p></div>
        )
    }
    return(
        <>
        <div className="review-index-main">
            <div className="top">
                {/* <div>
                    <ReviewForm setShowReviewForm={setShowReviewForm} />
                </div> */}
            </div>
            <div id="bot">
                <ul id="products">
                    <p>Hello From review index</p>
                    {reviewShow}
                </ul>    
            </div>
        </div>
        </>
    )
}

export default ReviewIndex