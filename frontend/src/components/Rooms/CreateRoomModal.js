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
  const [privacyPassword, setPrivacyPassword] = useState("");

  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    let labelPassword = document.getElementById("room-password")
    let inputPrivacyPassword = document.getElementById("room-password-input")
    if (e.target.checked) {
      setPrivacy(true);
      labelPassword.classList.remove("hidden")
      inputPrivacyPassword.classList.remove("hidden")
    } else {
      setPrivacy(false);
      setPrivacyPassword("")
      labelPassword.classList.add("hidden")
      inputPrivacyPassword.classList.add("hidden")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let roomInfo = {
      title: title,
      game: game,
      host: user,
      members: members,
      duration: duration,
      privacy: privacy,
      password: privacyPassword
    };
    const room = await dispatch(createRoom(roomInfo));
    console.log(roomInfo)
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
          <label id="room-password" className="hidden">
            Room Password
            <input
              className="hidden"
              id="room-password-input"
              name="room-password-input"
              type="password"
              value={privacyPassword}
              onChange={(e) => setPrivacyPassword(e.target.value)}
            />
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
