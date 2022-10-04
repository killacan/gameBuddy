import dayjs from "dayjs"


const getRemainingTimeUntilMsTimestamp= (timestampMs) => {
    const timestampDayjs = dayjs(timestampMs)
    const nowDayjs = dayjs();
    if (timestampDayjs.isBefore(nowDayjs)){
        return {
            seconds: "00",
            minutes: "00"
        }
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