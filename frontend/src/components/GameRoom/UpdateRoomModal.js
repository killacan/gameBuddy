import { updateRoom } from '../../store/rooms';
import './GameRoom.css'
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';

const UpdateRoomModal = ({setShowUpdateRoomModal, room}) => {

    const [updateTitle,setUpdateTitle] = useState(room.title);
    const [updateMembers,setUpdateMembers] = useState([]);
    const [updateDuration, setUpdateDuration] = useState(room.duration);
    const [updatePrivacy,setUpdatePrivacy] = useState(room.privacy);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = async(e) => {
        e.preventDefault();
        let roomInfo = {
          ...room,
          title: updateTitle,
          game: room.game,
          host: user,
          members: updateMembers,
          duration: updateDuration,
          privacy: updatePrivacy
        };
        const newRoomInfo = await dispatch(updateRoom(roomInfo));
        setShowUpdateRoomModal(false)
    }

    const handleChange = (e) => {
        if (e.target.checked) {
            setUpdatePrivacy(true);
        } else {
            setUpdatePrivacy(false);
        }
      };

    return (
        <>
            <div
                className="blur-background"
                onClick={() => setShowUpdateRoomModal(false)}></div>
            <div id="modal-bg-container"></div>
            <div className="bg-modal">
                <div id="form-close">
                <div onClick={() => setShowUpdateRoomModal(false)}></div>
                </div>
                <form className="update-room-form" onSubmit={handleSubmit}>
                <h1 id="updating-room">Update Room</h1>
                <label id="room-title">
                    Room Title
                    <input
                    id="title-input"
                    type="text"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    required
                    />
                </label>
                <label id="game-duration">
                    Game Duration (minutes)
                    <select
                    id="game-duration-input"
                    onChange={(e) => setUpdateDuration(e.target.value)}
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
                    value={updatePrivacy}
                    onChange={handleChange}
                    />
                    Yes
                </label>
                <button id="update-room" type="submit">
                    submit
                </button>
                </form>
            </div>
        
        </>
    )
}

export default UpdateRoomModal;