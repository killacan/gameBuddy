import './GameRoom.css';
import { useDispatch,useSelector } from 'react-redux';
import { useParams,useHistory } from 'react-router-dom';
import { destroyRoom,fetchRoom, joinRoom, updateRoom } from '../../store/rooms';
import { useEffect,useState } from 'react';
import UpdateRoomModal from './UpdateRoomModal';
import WebSocketComp from '../WebSocketComp/WebSocketComp';
import EndRoomModal from './EndRoomModal';


const GameRoom = () => {

    const dispatch = useDispatch();
    const {roomId} = useParams();
    const history = useHistory();
    const room = useSelector(state => state.rooms[roomId]);
    let user = useSelector(state => state.session.user)
    const [roomLoad, setRoomLoad] = useState(false);

    useEffect(()=> {
        dispatch(fetchRoom(roomId)).then((res) => {
            let flag = false;
            res.members.forEach(member => {
                if (member._id === user._id) {
                    flag = true;
                }}) 
                
                if (!flag) {
                    res.members.push(user)
                    console.log(res, "Hello There")
                    dispatch(updateRoom(res))
                } 
        })
        return () => {dispatch(fetchRoom(roomId))
            .then((res) => {
                let result = res.members.filter(member => member._id !== user._id) 
                let updatedRoom = Object.assign({}, res, {members: result})
                return updatedRoom})
            .then((res) => {
                return dispatch(updateRoom(res))})
            .then(() => {
                if (user._id === room.host._id) {
                    dispatch(destroyRoom(roomId))}})
                }
    },[])

    // useEffect(()=> {
    //     console.log("room changed")
    //     setRoomLoad(true)
    // }, [room])

    const currentUserId = useSelector(state => state.session.user._id)

    console.log(room, user, " I am a Room!")
    const [showUpdateRoomModal, setShowUpdateRoomModal] = useState(false);
    const [showEndRoomModal, setShowEndRoomModal] = useState(false);
    const [roomMembers, setRoomMembers] = useState([]);


    // useEffect(() =>{
    //     if (room) {
    //         console.log(room, roomMembers, "hit room update")
    //         dispatch(updateRoom({...room, members: roomMembers}))
    //     }
    // },[roomMembers])

    // useEffect(() => {
    //     console.log("no ifs")
    //     if (room) {
    //         console.log(user, "hit user update")
    //         setRoomMembers([room.members, user])
    //         dispatch(updateRoom({...room, members: roomMembers}))
    //     }
    // }, [roomLoad])

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
                        <div> {room.host.username}</div>
                    </div>
                    <div className="update-del-room-btns">
                        {currentUserId === room.host._id ? 
                        <>
                            <button id="end-session-btn" onClick={handleEnd}>End Session</button>
                            <button id="handle-update-btn" onClick={handleUpdate}> Update Session</button>
                        </>
                            : "" }
                    </div>
                </div>

            </div>
            <div className="bottom-game-room-container">
                <WebSocketComp roomId={roomId}/>
            </div>
            {showUpdateRoomModal && <UpdateRoomModal setShowUpdateRoomModal={setShowUpdateRoomModal} room={room}/>}
            {showEndRoomModal && <EndRoomModal setShowEndRoomModal={setShowEndRoomModal} room={room}/>}
        </div>
    )
}

export default GameRoom;