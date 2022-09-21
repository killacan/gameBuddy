import './Rooms.css';
import { useState } from 'react';
import CreateRoomModal from './CreateRoomModal';
import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Rooms = () => {

 
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

    const handleClick = (e) =>{
        e.preventDefault();
        setShowCreateRoomModal(true)
    }

    const location = useLocation();
    const {state} = location;
    console.log(state)

    const showStar = (rating)=>{
        if (rating===1){
             return (
                 <div>
                     <FaStar id="star-value" />
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                 </div>
             )
         } 
        if (rating===2){
         return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===3){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===4){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===5){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
              </div>
         )
         } 
     }




    return (
        <>
            <div className="room-container">
                <div className="create-room">
                    <div className="left-create-room-container">
                        <div id="room-title">Title :</div>
                        <div id="room-body">Body :</div>
                        <div className="player-rating">
                            <div id="hosted-by">Hosted By :</div>
                            <div id="showstar-rating">{showStar(3)}</div>
                        </div>
                    </div>
                    <div className="right-create-room-container">
                        <div id="room-duration">Room Duration: 3 Hours</div>
                        <button onClick={handleClick}>Create Room</button>
                        <div id="display-num-user">display number of users (count)</div>
                    </div>
                </div>
                <div className="join-room">

                </div>
            </div>
            {showCreateRoomModal && <CreateRoomModal setShowCreateRoomModal={setShowCreateRoomModal}  />}
        </>
    )
}

export default Rooms;