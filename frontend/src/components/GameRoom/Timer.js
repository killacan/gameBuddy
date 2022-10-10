import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import getRemainingTimeUntilMsTimestamp from "./Utils/CountdownTimerUtils";

const defaultRemainingTime = {
    seconds: "00",
    minutes: "00"
}

const Timer = ({countdownTimestampMs}) => {
    // console.log(countdownTimestampMs, "from timer" )
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const user = useSelector(state => state.session.user)
    // console.log(user, "from timer")
    const {roomId} = useParams();
    const room = useSelector(state => state.rooms[roomId])
    // console.log(room, "from timer")

    useEffect(() => {
        // if (user._id === room.host._id){
            const intervalId = setInterval(()=> {
                updateRemainingTime(countdownTimestampMs);
            }, 1000)
            return () => clearInterval(intervalId);
        // } 
    },[countdownTimestampMs])
    
    const updateRemainingTime = (countdown) => {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }
    
        
    return (
        <>
            <div className="countDown-timer">
                <span>Time Remaining: </span>
                <span className="two-numbers">{remainingTime.minutes} </span>
                <span>Minutes </span>
                <span className="two-numbers">{remainingTime.seconds} </span>
                <span>Seconds </span>
            </div>
        </>
    )
}

export default Timer