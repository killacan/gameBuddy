import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRoom } from '../../store/rooms';
import './WebSocket.css'


function WebSocketComp () {
    const dispatch = useDispatch();
    const {roomId} = useParams();
    const room = useSelector(state => state.rooms[roomId])
    const currentUser = useSelector(state => state.session.user)
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState();
    const [messages, setMessages] = useState([]);
    const sessionUser = useSelector(state => state.session.user)
    


    useEffect(()=> {
        dispatch(fetchRoom(roomId))
    },[roomId, messages])


    useEffect(() => {
        // const messages = document.getElementById('messages');
        let urlString
        if (process.env.NODE_ENV !== 'production') {
            urlString = `ws://localhost:5000/?roomId=${roomId}`
        } else {
            urlString = `ws:/gamebuddy-app.herokuapp.com/?roomId=${roomId}`
        }
        
        const socketNew = new WebSocket(urlString);

        socketNew.onopen = (event) => {
            console.log('Websocket is connected!')
            const id = Math.round(Math.random() * 100)
            console.log('sending...', id)
            console.log(sessionUser)
            socketNew.send(JSON.stringify({message: `has joined the room`, roomId: roomId, userName: sessionUser.username}))
            // const data = JSON.stringify(
            // [
            //     {
            //     id,
            //     name: `[${id}] Jimmothy`,
            //     address: {
            //         street: '123 Main St',
            //         city: 'Anytown',
            //         state: 'CA'
            //     },
            //     profession: 'developer'
            // },
            // {
            //     id,
            //     name: `[${id}] Juan`,
            //     address: {
            //         street: '123 Main St',
            //         city: 'Anytown',
            //         state: 'CA'
            //     },
            //     profession: 'developer'
            // },
            // {
            //     id,
            //     name: `[${id}] Marry Santos`,
            //     address: {
            //         street: '123 Main St',
            //         city: 'Anytown',
            //         state: 'CA'
            //     },
            //     profession: 'developer'
            // }])
    
            // setInterval(() => {
            //     socket.send(data)
            // }, 2000)
        }

        socketNew.onmessage = (message) => {
            console.log('I got a message', JSON.parse(message.data));
            setMessages(messages => [...messages, JSON.parse(message.data)])
            // messages.innerHTML += `<br/>${message}`
        }

        socketNew.onerror = (error) => console.log(`WebSocket error: ${error}`);
        // socketNew.onclose = (event) => socketNew.send(JSON.stringify({type: 'close', data: 'bye'}));
        setSocket(socketNew);
        return () => socketNew.close()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('sending...', message)
        socket.send(JSON.stringify({message: message, roomId: roomId, userName: currentUser.username}))
        setMessage("")
    }


    const handleMouseOver = (e) => {
        e.preventDefault();

    }
    if (!socket) return null;

    return (
        <div className="chat-outer-container">
            <div className='chat-container'>
                <div className='room-messages-container'>
                        <div id="msg-bg"></div>
                    {messages.map (message => {
                       
                        return <div id="user-messages">{`${message.userName}: `}{message.message}</div>
                        })
                    }
                </div>
                <div className='room-input-container'>
                    <form className="websocket-form"onSubmit={handleSubmit}>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='message-input' placeholder='Type a message...' />
                        <button type="submit" className='message-submit'>Send</button>
                    </form>
                </div>
            </div>

            <div className="display-room-members">
                <h1 id="room-member">Room Members:</h1>
                {room.members.map(member => (
                    <div id="member-room-username" >
                        {member.username}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WebSocketComp;

