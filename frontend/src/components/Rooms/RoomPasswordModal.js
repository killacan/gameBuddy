import { useDispatch } from "react-redux";
import { fetchRoom,updateRoom } from "../../store/rooms";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const RoomPasswordModal = ({room,user}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [showRoomPasswordModal,setShowRoomPasswordModal] = useState(false);
    const [confirmRoomPassword,setConfirmRoomPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        let invalidRoomPw = document.getElementById("invalid-room-pw");
        if (room.password === confirmRoomPassword){
            dispatch(fetchRoom(room._id)).then((res) => {
                let flag = false;
                res.members.forEach(member =>  {
                    if (member._id === user._id) {
                        flag = true;
                    }}) 
                    
                    if (!flag) {
                        res.members.push(user)
                        dispatch(updateRoom(res)).then(history.push(`/games/rooms/${room._id}`))
              } 
            })
        }else{
            invalidRoomPw.classList.remove("hidden")
            setConfirmRoomPassword("")
        }
    }

    const handleJoinRoom = (field) => {
        return async e => {
          e.preventDefault();
          //await dispatch update room
          if (field.privacy === true){
            setShowRoomPasswordModal(!showRoomPasswordModal)
          } else{
            dispatch(fetchRoom(field._id)).then((res) => {
              console.log(res)
              let flag = false;
              res.members.forEach(member =>  {
                  if (member._id === user._id) {
                      flag = true;
                  }}) 
                  
                  if (!flag) {
                      res.members.push(user)
                      dispatch(updateRoom(res)).then(history.push(`/games/rooms/${field._id}`))
      
            } 
          })
          }
        }
      }

    return (

        <>

        <button id="create-rm-btn" onClick={handleJoinRoom(room)}>Join Room</button>
        { showRoomPasswordModal && 
        <div>
            <form onSubmit={handleSubmit}>
                    <label id="enter-rm-pw"> Enter Room Password:
                        <input id="enter-pw"
                         type="password"
                         value={confirmRoomPassword}
                         onChange={(e)=>setConfirmRoomPassword(e.target.value)}
                        />

                    </label>
                    <h1 id="invalid-room-pw" className="hidden">Password does not match</h1>
            </form>
        </div>
        }
        </>

    )
}

export default RoomPasswordModal;