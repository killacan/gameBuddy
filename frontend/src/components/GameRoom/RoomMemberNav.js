import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import './GameRoom.css'

const RoomMemberNav = ({mem,playersArr,idx}) => {
    
    const [showMemberInfo, setShowMemberInfo] = useState(false);

    const history = useHistory();

  const routeChange = () => { 
    let path = `/profile/${mem._id}`; 
    history.push(path, {state: mem});
  }

    const playerEnter = (e) => {
        e.target.style.background='black';
        e.target.style.opacity=.8; 
        setShowMemberInfo(true)
    }

    const playerLeave = (e) => {
        e.target.style.background = "transparent"
        e.target.style.opacity=1;
        setShowMemberInfo(false)
    }

    return (
        <div onMouseEnter={playerEnter} onMouseLeave={playerLeave}>
            {mem.username}<img id="p1" src={playersArr[idx]}  />
            {showMemberInfo && 
                <div id="player-nav-bar" >
                    {/* <NavLink id="view-prof" exact to={`/profile/${mem._id}`}>
                        View Profile
                    </NavLink> */}
                    <button
            onClick={routeChange}>
                View Profile
                    </button>

                </div>
            }
        </div>
    )
}

export default RoomMemberNav; 