import './GameRoom.css';
import { useDispatch,useSelector } from 'react-redux';
import { useParams,useHistory } from 'react-router-dom';
import { destroyRoom,fetchRoom } from '../../store/rooms';
import { useEffect,useState } from 'react';
import UpdateRoomModal from './UpdateRoomModal';
import EndRoomModal from './EndRoomModal';

const GameRoom = () => {

    const dispatch = useDispatch();
    const {roomId} = useParams();
    const history = useHistory();
    let user = useSelector(state => state.session.user)

    useEffect(()=> {
        dispatch(fetchRoom(roomId))
    },[roomId])

    const currentUserId = useSelector(state => state.session.user._id)
    const room = useSelector(state => state.rooms[roomId]);

    const [showUpdateRoomModal, setShowUpdateRoomModal] = useState(false);
    const [showEndRoomModal, setShowEndRoomModal] = useState(false);
    const gameUser = useSelector(state => state.session.user)


    // useEffect(() =>{
    //     dispatch()
    // },[room.members])

    const handleUpdate = (e) => {
        e.preventDefault();
        setShowUpdateRoomModal(true);
    }

    //handleClick changed to handleEnd, send to handlesubmit in EndRoomModel to destroy
    const handleEnd = async(e) => {
        e.preventDefault();
        setShowEndRoomModal(true);
    }



    if (!room) return null; 

    

    return (
        <div className="game-room-container">
            <div className="top-game-room-container">
                <div className="top-left-container">
                    <div id="game-room-title">Room Title : {room.title}</div>
                    <div id="game-room-name"> {room.game}</div>
                </div>
                <div className="top-right-container">
                    <div className="host-info">
                        <div>Room Leader : </div>
                        <div>{user._id}</div>
                    </div>
                    <div className="update-del-room-btns">
                        {currentUserId === room.host ? 
                        <>
                            <button id="end-session-btn" onClick={handleEnd}>End Session</button>
                            <button id="handle-update-btn" onClick={handleUpdate}> Update Session</button>
                        </>
                            : "" }
                    </div>
                </div>

            </div>
            <div className="bottom-game-room-container">

            </div>
            {showUpdateRoomModal && <UpdateRoomModal setShowUpdateRoomModal={setShowUpdateRoomModal} room={room}/>}
            {showEndRoomModal && <EndRoomModal setShowEndRoomModal={setShowEndRoomModal} room={room}/>}
        </div>
    )
}

export default GameRoom;