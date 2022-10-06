import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserReview from "./UserReview";
import { destroyRoom } from "../../store/rooms";


const EndRoomModal = ({setShowEndRoomModal, room, user,currentUserId}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const members = room.members;

    //mockData! --> need to pull from state.rooms._id.members = [user1,user2,user3]
    // const users = ["matt", "mimi", "cameron", "daniel"]

    const handleCloseReviewModal = async(e) => {
        e.preventDefault();
        if (currentUserId === room.host._id) {
            const delRoom = await dispatch(destroyRoom(room._id))
            history.push("/games")
        }else{
            setShowEndRoomModal(false)
        }
    }

    let reviewShow;
    if (members.length > 0){
        reviewShow = (
            <div>
                {(members).map(member => (
                    <UserReview member={member} user={user}  />
               ))}
            </div>
        )
    }
    
    return(
        <>
            <div className="blur-background" onClick={() => setShowEndRoomModal(false)}></div>
            <div id="modal-bg-container"></div>
            <div className="bg-modal">
                <div className="end-room-form" /*onSubmit={handleSubmit}*/>
                    
                    <h1 id="session-end-title">Session Ended!</h1>
                    <h2 id="review-title">Write a Review</h2>
                    {reviewShow}
                        <button onClick={handleCloseReviewModal} id="close-room" type="submit">
                            Close
                        </button>
                </div>
            </div>
        </>
    )
}
export default EndRoomModal