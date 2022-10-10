import './GameRoom.css';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { destroyRoom,fetchRoom, joinRoom, updateRoom } from '../../store/rooms';
import { useEffect,useState } from 'react';
import UpdateRoomModal from './UpdateRoomModal';
import WebSocketComp from '../WebSocketComp/WebSocketComp';
import EndRoomModal from './EndRoomModal';
import gameRoomBg from './background-gameroom.jpg';
import player1 from './player1.png';
import player2 from './player2.png';
import player3 from './player3.png';
import player4 from './player4.png';
import player5 from './player5.png';
import Timer from './Timer';
import RoomMemberNav from './RoomMemberNav';



const GameRoom = () => {

    const dispatch = useDispatch();
    const {roomId} = useParams();
    const room = useSelector(state => state.rooms[roomId]);
    let user = useSelector(state => state.session.user)

    
    useEffect(()=> {
        dispatch(fetchRoom(roomId)).then((res) => {
            let flag = false;
            res.members.forEach(member => {
                if (member._id === user._id) {
                    flag = true;
                }}) 
                
                if (!flag) {
                    res.members.push(user)
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
            // .then(() => {
            //     if (user._id === room.host._id) {
            //         dispatch(destroyRoom(roomId))}})
                }
    },[])

    const currentUserId = useSelector(state => state.session.user._id)

    const [showUpdateRoomModal, setShowUpdateRoomModal] = useState(false);
    const [showEndRoomModal, setShowEndRoomModal] = useState(false);

    const playersArr = [player1, player2, player3, player4, player5]

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

    //timer
    
    const getTimeFromDurationMs = () => {
        const duration = room.duration //in miuntes * 60 = seconds * 1000 = ms
        const durationInMs = (duration * 60 * 1000)
        const nowInMs = Date.now();
        const timeFromDurationMs = durationInMs + nowInMs
        console.log(timeFromDurationMs)
        return timeFromDurationMs
    }    

    return (
        <>
            <img className="game-room-bg-img" src={gameRoomBg}/>
            <div className="game-room-container">
                <div className="top-game-room-container">
                    <div className="top-container-info">
                        <div className="top-left-container">
                            <div id="game-room-title">Room Title : {room.title}</div>
                            <div id="game-room-name"> {room.game}</div>
                        </div>
                        <div className="top-right-container">
                            <div className="host-info">
                                <div id="room-leader">Room Leader : </div>
                                <div>{room.host.username}</div>
                            </div>
                            <div><Timer countdownTimestampMs={getTimeFromDurationMs()}/></div>
                            <div className="update-del-room-btns">
                                {currentUserId === room.host._id ? 
                                <>
                                    <button id="end-session-btn" onClick={handleEnd}>End Session</button>
                                    <button id="handle-update-btn" onClick={handleUpdate}> Update Session</button>
                                </>
                                    : <button id="end-session-btn" onClick={handleEnd}>Review Players</button> }
                            </div>
                        </div>
                    </div>
                    <div className="loading-screen-images">
                        {room.members.map((mem,idx) => (
                              <div id="player">
                                <div>
                                    <RoomMemberNav mem={mem} idx={idx} playersArr={playersArr} />
                                </div>
                            </div>
                        ))}
                         {[...Array(5 - room.members.length)].map((ele,i) => { 
                            const leftOverMems = 4 - i ; 
                            return (
                                <div id="player">
                                    <div>
                                        <img id="p1" src={playersArr[leftOverMems]}/>
                                    </div>
                                </div>
                            )
                        })}
                        {/* <div id="player1">
                            <div>
                                {room.members[0]?.username}<img id="p1" src={player1} onMouseEnter={playerEnter} onMouseLeave={playerLeave}/>
                            </div>
                            <NavLink id="direct-profile" to ={`/profile/${room.members[0]?._id}`}></NavLink>
                        </div>

                        <div id="player2"> 
                            <div>{room.members[1]?.username}<img id="p2" src={player2} onMouseEnter={playerEnter} onMouseLeave={playerLeave}/></div>
                        </div>
                        <div id="player3"> 
                            <div>{room.members[2]?.username}<img id="p3" src={player3} onMouseEnter={playerEnter} onMouseLeave={playerLeave}/></div>
                        </div>
                        <div id="player4">
                            <div>{room.members[3]?.username}<img id="p4" src={player4} onMouseEnter={playerEnter} onMouseLeave={playerLeave}/></div>
                        </div>
                        <div id="player5">
                            <div>{room.members[4]?.username}<img id="p5" src={player5} onMouseEnter={playerEnter} onMouseLeave={playerLeave}/></div>
                        </div> */}
                    </div>

                </div>
                <div className="bottom-game-room-container">
                    <WebSocketComp />
                </div>
                {showUpdateRoomModal && <UpdateRoomModal setShowUpdateRoomModal={setShowUpdateRoomModal} room={room}/>}
                {showEndRoomModal && <EndRoomModal setShowEndRoomModal={setShowEndRoomModal} currentUserId={currentUserId}room={room} user={user} />}
            </div>
        </>
    )
}

export default GameRoom;