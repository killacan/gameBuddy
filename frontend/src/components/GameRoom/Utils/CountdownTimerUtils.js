import dayjs from "dayjs"
import { useParams } from "react-router-dom";
import { destroyRoom } from "../../../store/rooms";
import { useSelector } from "react-redux";


const getRemainingTimeUntilMsTimestamp = (timestampMs) => {
    const timestampDayjs = dayjs(timestampMs)
    const nowDayjs = dayjs();

    // const {roomId} = useParams();
    // const room = useSelector(state => state.rooms[roomId]);

    if (timestampDayjs.isBefore(nowDayjs)){
        return {
            seconds: "00",
            minutes: "00"
        }
        // dispatchEvent(destroyRoom(roomId))
    }
    return {
        seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes: getRemainingMinutes(nowDayjs, timestampDayjs)
    };
}

//refactor
const getRemainingSeconds = (nowDayjs, timestampDayjs) =>{
    const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
    return padWithZeros(seconds, 2);
}

const getRemainingMinutes = (nowDayjs, timestampDayjs) => {
    const minutes = timestampDayjs.diff(nowDayjs, 'minutes');
    return padWithZeros(minutes, 2);
}

const padWithZeros = (number, minLength) => {
    const numberString = number.toString();
    if (numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) + numberString
}

export default getRemainingTimeUntilMsTimestamp;