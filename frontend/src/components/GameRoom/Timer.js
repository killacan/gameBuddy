import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import getRemainingTimeUntilMsTimestamp from "./Utils/CountdownTimerUtils";

const defaultRemainingTime = {
    seconds: "00",
    minutes: "00"
}

const Timer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(()=> {
            updateRemainingTime(countdownTimestampMs);
        }, 1000)
        return () => clearInterval(intervalId);
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