import './GameRoom.css'

const UserReview = ({user}) => {

    return (
        <>
            <div className="review-box">
                <div className="review-username">
                    <p id="username-text">{user}</p>
                </div>
                <div className="review-button">
                    <p id="review-text">Review this User</p>
                </div>
            </div>  
        </>
    )
}

export default UserReview