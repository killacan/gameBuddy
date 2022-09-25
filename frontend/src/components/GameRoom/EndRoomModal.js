import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserReview from "./UserReview";
import { destroyRoom } from "../../store/rooms";


const EndRoomModal = ({setShowEndRoomModal, room}) => {

    console.log(room)
    const dispatch = useDispatch();
    const history = useHistory();
    const room1 = Object.values(room)

    console.log(room1, 'adfdsf');
    const members = room1[2];
    //mockData! --> need to pull from state.rooms._id.members = [user1,user2,user3]
    // const users = ["matt", "mimi", "cameron", "daniel"]

    const handleSubmit = async(e) => {
        e.preventDefault();
        const delRoom = await dispatch(destroyRoom(room._id))
        history.push("/games")
    }


    let reviewShow;
    if (members.length > 0){
        reviewShow = (
            <div>
                {(members).map(user => 
                    <UserReview {...user}/>
                    )}
            </div>
        )
    }
    
    return(
        <>
            <div className="blur-background" onClick={() => setShowEndRoomModal(false)}></div>
            <div id="modal-bg-container"></div>
            <div className="bg-modal">
                <form className="end-room-form" onSubmit={handleSubmit}>
                    <h1 id="session-end-title">Session Ended!</h1>
                    <h2 id="review-title">Write a Review</h2>
                    {reviewShow}
                        <button id="close-room" type="submit">
                            Close
                        </button>
                </form>
            </div>
        </>
    )
}
export default EndRoomModal