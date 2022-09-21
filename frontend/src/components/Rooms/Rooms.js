import "./Rooms.css";
import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import { FaStar } from "react-icons/fa";
const Rooms = () => {
  const game = new URL(window.location.href).searchParams.get("game");
  console.log(game);

  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowCreateRoomModal(true);
  };

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

  let val = "Valorant";

  const toggle = () => {
    if (val === "Valorant") {
      return "val-banner";
    } else if (val === "League of Legends") {
      return "league-banner";
    } else {
      return "tft-banner";
    }
  };

  return (
    <>
      <div className="game-banner">
        <div className={toggle()}></div>
      </div>
      <div className="room-container">
        <div className="create-room">
          <div className="left-create-room-container">
            <div id="room-title">Title :</div>
            <div id="hosted-by">Hosted By : Mimi Ly</div>
            <div id="showstar-rating">{showStar(3)}</div>
          </div>
          <div className="right-create-room-container">
            <div id="room-duration">Room Duration: 3 Hours</div>
            <button id="create-rm-btn" onClick={handleClick}>
              Create Room
            </button>
            <div id="display-num-user">display number of users (count)</div>
          </div>
        </div>
        <div className="join-room">
        



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

export default Rooms;
