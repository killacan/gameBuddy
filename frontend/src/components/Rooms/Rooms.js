import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchRooms, clearRoomErrors } from "../../store/rooms";



const Rooms = () => {
    const rooms = useSelector(state => Object.values(state.rooms.all))
    const dispatch = useDispatch();

    // useEffect( ()=>{
    //     dispatch(fetchRooms());
    //     return () => dispatch(clearRoomErrors())
    // }, [dispatch])

    if (rooms.length === 0){
        return (
            <div>There are currently no Rooms</div>
        );
    };

    return(
        <>
            <h1>HELLO I AM DANIEL </h1>
            <h2>All Tweets</h2>
            {rooms.map(room => {
                return room
            })}
        </>
    )
}

export default Rooms