import './GameRoom.css';
import { useDispatch } from 'react-redux';
import { useParams,useHistory } from 'react-router-dom';
import { destroyRoom } from '../../store/rooms';

const GameRoom = () => {

    const dispatch = useDispatch();
    const {roomId} = useParams();
    const history = useHistory();

    console.log(roomId);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(destroyRoom(roomId))
        history.push('/games')
    }
    return (
        <div>
            <h1>hello</h1>
            <button onClick={handleClick}>End Session</button>
        </div>
    )
}

export default GameRoom;