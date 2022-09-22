import "./Rooms.css";
import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import { FaStar } from "react-icons/fa";
import { fetchRooms } from "../../store/rooms";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

  return (
    <>
      <div className="game-banner">
        <div className="banner">
          {game}
        </div>
      </div>
      <div className="room-container">
        <div className="create-room">
          <div className="left-create-room-container">
          </div>
          <div className="right-create-room-container">       
            <button id="create-rm-btn" onClick={handleClick}>
              Create Room
            </button>           
          </div>
        </div>
        <div className="join-room">
          {allRooms.map(room=>(
            <>
              <div className="left-create-room-container">
                <div id="room-title">{room.title} :</div>
                <div id="hosted-by">Hosted By : Mimi Ly</div>
                <div id="showstar-rating">{showStar(3)}</div>
              </div>
              <div className="right-create-room-container">
                <div id="room-duration">Room Duration: {room.duration}</div>
                <button id="create-rm-btn" onClick={handleJoinRoom(room)}>
                 Join Room
                </button>
               <div id="display-num-user">{room.members.length}/5</div>
              </div>
            </>
          ))}

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
