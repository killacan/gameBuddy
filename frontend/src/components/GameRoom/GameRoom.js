import './GameRoom.css';
import { useDispatch,useSelector } from 'react-redux';
import { useParams,useHistory } from 'react-router-dom';
import { destroyRoom,updateRoom,fetchRoom } from '../../store/rooms';
import { getRoom } from '../../store/rooms';
import { useEffect } from 'react';
import { useState } from 'react';
import UpdateRoomModal from './UpdateRoomModal';

const GameRoom = () => {

    const dispatch = useDispatch();
    const {roomId} = useParams();
    const history = useHistory();

    const handleClick = async(e) => {
        e.preventDefault();
        const delRoom = await dispatch(destroyRoom(roomId))
        history.push('/games')
    }
    
    useEffect(()=> {
        dispatch(fetchRoom(roomId))
    },[roomId])

    const currentUserId = useSelector(state => state.session.user._id)
    const room = useSelector(state => state.rooms[roomId]);
    console.log(room)

    const [showUpdateRoomModal, setShowUpdateRoomModal] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        setShowUpdateRoomModal(true);
    }

    if (!room) return null; 

    return (
        <div className="game-room-container">
            <div className="top-game-room-container">
                <div className="top-left-container">
                    <div>Game Title</div>
                    <div>Game Name</div>
                </div>
                <div className="top-right-container">
                    <div className="host-info">
                        <div>Room Leader:</div>
                        <div>Mimi Ly</div>
                    </div>
                    <div className="update-del-room-btns">
                        {currentUserId === room.host ? 
                        <>
                            <button onClick={handleClick}>End Session</button>
                            <button onClick={handleUpdate}> Update Session</button>
                        </>
                            : "" }
                    </div>
                </div>

            </div>
            <div className="bottom-game-room-container">

            </div>
            {showUpdateRoomModal && <UpdateRoomModal setShowUpdateRoomModal={setShowUpdateRoomModal} room={room}/>}
        </div>
    )
}

export default GameRoom;