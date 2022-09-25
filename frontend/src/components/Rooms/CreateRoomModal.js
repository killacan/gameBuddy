import "./Rooms.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom, joinRoom } from "../../store/rooms";
import { useSelector } from "react-redux";
// import { set } from 'mongoose';
import { useHistory } from "react-router-dom";

const CreateRoomModal = ({ setShowCreateRoomModal, game }) => {
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [duration, setDuration] = useState(30);
  const [privacy, setPrivacy] = useState(false);

  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.checked) {
      setPrivacy(true);
      // console.log("checked")
    } else {
      setPrivacy(false);
      // console.log("unchecked")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let roomInfo = {
      title: title,
      game: game,
      host: user._id,
      members: members,
      duration: duration,
      privacy: privacy,
    };
    const room = await dispatch(createRoom(roomInfo));
    // console.log(room._id, user._id, "room and user id");
    // const send = await dispatch(joinRoom(room._id, user._id));
    history.push(`/games/rooms/${room._id}`);
  };

  return (
    <>
  
      <div
        className="blur-background"
        onClick={() => setShowCreateRoomModal(false)}
      ></div>
      <div id="modal-bg-container"></div>
      <div className="bg-modal">
        <form className="create-room-form" onSubmit={handleSubmit}>
          <h1 id="creating-room">Creating Room</h1>
          <label id="room-title">
            Room Title
            <input
              id="title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label id="game-duration">
            Game Duration (minutes)
            <select
              id="game-duration-input"
              onChange={(e) => setDuration(e.target.value)}
            >
              {[...Array(11)].map((time, i) => {
                const durationValue = 30 + i*15;
                return <option value={durationValue}>{durationValue}</option>;
              })}
            </select>
          </label>
          <label id="private-room">
            Private room?
            <input
              id="a-checkbox"
              name="a-checkbox"
              type="checkbox"
              value={privacy}
              onChange={handleChange}
            />
            Yes
          </label>
          <button id="submit-room" type="submit">
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRoomModal;
