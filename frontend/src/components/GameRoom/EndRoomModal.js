import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserReview from "./UserReview";
import { destroyRoom } from "../../store/rooms";


const EndRoomModal = ({setShowEndRoomModal, room}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    console.log(room, 'bababooey');
    const members = room.members;
    console.log(members, 'members')

    //mockData! --> need to pull from state.rooms._id.members = [user1,user2,user3]
    // const users = ["matt", "mimi", "cameron", "daniel"]

    const handleSubmit = async(e) => {
        e.preventDefault();
        const delRoom = await dispatch(destroyRoom(room._id))
        history.push("/games")
    }

    console.log(Object.values(members))
    let reviewShow;
    if (Object.values(members).length > 0){
        reviewShow = (
            <div>
                {(Object.values(members)).map(member => (
                    <UserReview member={member}/>
               ))}
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