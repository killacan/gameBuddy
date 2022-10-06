import "./Rooms.css";
import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import RoomPasswordModal from "./RoomPasswordModal";
import { FaStar } from "react-icons/fa";
import { fetchRooms,fetchRoom,updateRoom, destroyRoom } from "../../store/rooms";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import { AiOutlineUnlock} from "react-icons/ai";
import valBanner from "./val-banner.png"
import tftBanner from "./tft-banner.png"
import leagueBanner from "./league-banner.png"
import brimstoneGif from "./brimstone-gif.gif"
import zoeyGif from "./zoey-gif.gif"
import tftGif from "./tft-gif.gif"
import WebsocketRoomIndex from "../WebsocketRoomIndex";


const RoomsIndex = () => {
  const game = new URL(window.location.href).searchParams.get("game");

  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [socket, setSocket] = useState(); 

  const handleClick = (e) => {
    e.preventDefault();
    setShowCreateRoomModal(true);
  };

  const dispatch = useDispatch();
  const rooms = useSelector(state=> state.rooms)
  const allRooms = Object.values(rooms)

  useEffect(()=>{
    // dispatch(fetchRooms())

    let urlString
    if (process.env.NODE_ENV !== 'production') {
      urlString = `ws://localhost:5000/rooms?game=${game}`
    } else {
      urlString = `wss://gamebuddy-app.herokuapp.com/rooms?game=${game}`
    }
    
    const socketNew = new WebSocket(urlString)
    
    setSocket(socketNew)

    socketNew.onopen = () => {
        // console.log("I'm a little socket short and stout")
        socketNew.send(JSON.stringify({message: 'I am a message!', userName: user.userName, gameId: game}))
    }


    socketNew.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data)
      // console.log(parsedMessage)
      if (parsedMessage.message === "I am a message!") {
  
        setTimeout(dispatch(fetchRooms()), 5000)
      } else if (parsedMessage.message === 'destroy room message') {
        dispatch(destroyRoom(parsedMessage.destroyId))
      }
    }


    return () => {
      socketNew.send(JSON.stringify({message: 'I am a message!', userName: user.userName, gameId: game}))
      socketNew.close()
    }
  },[])

  // const msgRoomUpdate = () => {
  //   console.log("I am an update request")
  //   socket.send(JSON.stringify({message: 'I am a message!', userName: user.userName, gameId: game}))

  // }

 

  // if (!socket) return null

  const showStar = (rating) => {
    if (rating === 1) {
      return (
        <div>
          <FaStar id="star-value" />
          <FaStar id="non-star-value" />
          <FaStar id="non-star-value" />
          <FaStar id="non-star-value" />
          <FaStar id="non-star-value" />
        </div>
      );
    }
    if (rating === 2) {
      return (
        <div>
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="non-star-value" />
          <FaStar id="non-star-value" />
          <FaStar id="non-star-value" />
        </div>
      );
    }
    if (rating === 3) {
      return (
        <div>
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="non-star-value" />
          <FaStar id="non-star-value" />
        </div>
      );
    }
    if (rating === 4) {
      return (
        <div>
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="non-star-value" />
        </div>
      );
    }
    if (rating === 5) {
      return (
        <div>
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="star-value" />
          <FaStar id="star-value" />
        </div>
      );
    }
  };



  const history = useHistory();
  const user = useSelector(state => state.session.user)


  // const handleJoinRoom = (field) => {
  //   return async e => {
  //     e.preventDefault();
  //     //await dispatch update room
  //     if (field.privacy === true){
  //       setShowRoomPasswordModal(true)
  //     } else{
  //       dispatch(fetchRoom(field._id)).then((res) => {
  //         console.log(res)
  //         let flag = false;
  //         res.members.forEach(member =>  {
  //             if (member._id === user._id) {
  //                 flag = true;
  //             }}) 
              
  //             if (!flag) {
  //                 res.members.push(user)
  //                 dispatch(updateRoom(res)).then(history.push(`/games/rooms/${field._id}`))
  
  //       } 
  //     })
  //     }
  //   }
  // }

  const toggleGameIndexBg = () => {
    if (game === "Valorant"){
      return './val-game-index-bg.png';
    }else if (game === "League of Legends"){
      return "";
    }else{
      return "";
    }

  }
  const toggle = () => {
    if (game === "Valorant"){
      return valBanner;
    }else if (game === "League of Legends"){
      return leagueBanner;
    }else{
      return tftBanner;
    }
  }
  const toggleMsg = () => {
    if (game === "Valorant"){
      return  "Stand tall. We are Valorant. We are fighters!"
    }else if (game === "League of Legends"){
      return "I have found my limit a thousand times, and still I press further."
    }else{
      return "The brighter my light, the stronger your shadow.";
    }
  }
  const toggleGif = () => {
    if (game === "Valorant"){
      return  brimstoneGif;
    }else if (game === "League of Legends"){
      return zoeyGif;
    }else{
      return tftGif
    }
  }

  if (!allRooms) return null;

  return (
    <>
    {/* <WebsocketRoomIndex game={game} user={user} msgRoomUpdate={msgRoomUpdate} /> */}
      <div className="game-banner">
        <div className="banner" >
          {game}
        </div>
      </div>
      <div className="gif-room-container">
        <div id="gif-container">
          <img id="gif" src={toggleGif()}/>
        </div> 
        <div className="room-container">
          <div className="create-room">
            <img id="img-banner" src={toggle()} />
            <div id="quotes-container">
              <h1 id="quotes">{toggleMsg()}</h1>
            </div>
            <div className="left-create-room-container"></div>
            <div className="right-create-room-container">   
              <button id="create-rm-btn" onClick={handleClick}>
                Create Room
              </button>           
            </div>
          </div>
          <div className="game-index-bg-container">
            <div id="game-index-bg" src={toggleGameIndexBg()}></div>
            <div className="join-room">
              {allRooms.map(room=>( 
                room.game === game ? 
                <div className="single-room-container">
                  <div className="left-create-room-container">
                    <div id="room-title">Title : {room.title} </div>
                    <div className="host-leader-info"> 
                      <div id="hosted-by">Hosted By : </div>
                      <div id="host-username">{room.host.username}</div>
                    </div>
                    <div id="showstar-rating">{showStar(3)}</div>
                  </div>
                  <div className="right-create-room-container">
                    <div id="room-duration">Room Duration: {room.duration}</div>
                    <div className="render-room-components">
                        {room.privacy === true ? <AiFillLock id="lock" /> : <AiOutlineUnlock id="unlock"/>}
                        {room.members.length > 5 ? 
                          <button id="room-full-btn">Full Room</button>
                          :
                          // <button id="create-rm-btn" onClick={handleJoinRoom(room)}>Join Room</button>
                          <RoomPasswordModal  room={room} user={user}/>

                        }
                    </div>
                      
                  <div id="display-num-user">{room.members.length}/5</div>
                  </div>
                 
          
                </div>
                :
                ""
              ))}
            </div>
          </div>
        </div>
      </div>
      {showCreateRoomModal && (
        <CreateRoomModal
          setShowCreateRoomModal={setShowCreateRoomModal}
          game={game}
        />
      )}
      
    </>
  );
};

export default RoomsIndex;
