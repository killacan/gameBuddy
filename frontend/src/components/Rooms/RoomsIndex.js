import "./Rooms.css";
import { useState,useEffect } from "react";
import CreateRoomModal from "./CreateRoomModal";
import { FaGift, FaStar } from "react-icons/fa";
import { fetchRooms } from "../../store/rooms";
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

const RoomsIndex = () => {
  const game = new URL(window.location.href).searchParams.get("game");
  console.log(game);

  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowCreateRoomModal(true);
  };

  const dispatch = useDispatch();
  const rooms = useSelector(state=> state.rooms)
  const allRooms = Object.values(rooms)

  console.log(allRooms)
  useEffect(()=>{
    dispatch(fetchRooms())
  },[])

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

  const handleJoinRoom = (field) => {
    console.log(field._id)
    return e => {
      e.preventDefault();
      field.members.push(user)
      history.push(`/games/rooms/${field._id}`)
    }
    
  }
  console.log(game)
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

  return (
    <>
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
          <div className="join-room">
            {allRooms.map(room=>( 
              room.game === game? 
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
                        <button id="create-rm-btn" onClick={handleJoinRoom(room)}>Join Room</button>
                      }
                  </div>
                    
                <div id="display-num-user">{room.members.length}/5 players </div>
                </div>
              </div>
              :
              ""
            ))}
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
