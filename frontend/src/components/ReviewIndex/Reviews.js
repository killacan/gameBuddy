
const ReviewIndex = ({reviews}) => {

    return(
        <>
        <div>
            <div id="top">
                <h1 id="review-title">All Reviews</h1>
            </div>
            <div id="bot">
                <ul id="products">
                    {/* {reviews.map(review=>(
                        <h1>i am a review</h1>
                        // <ProductIndexItem product={product} key={product.id}></ProductIndexItem>
                    ))} */}
                </ul>    
            </div>
        </div>
        </>
    )
}

export default ReviewIndex