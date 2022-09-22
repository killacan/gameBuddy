import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';



function WebSocketComp () {
    const dispatch = useDispatch();
    const {roomId} = useParams();

    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState();
    const [messages, setMessages] = useState([]);
    


    useEffect(() => {
        // const messages = document.getElementById('messages');
        const socketNew = new WebSocket(`ws://localhost:5000/?roomId=${roomId}`);


        socketNew.onopen = (event) => {
            console.log('Websocket is connected!')
            const id = Math.round(Math.random() * 100)
            console.log('sending...', id)
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
        socketNew.onclose = (event) => socket.send(JSON.stringify({type: 'close', data: 'bye'}));
        setSocket(socketNew);
        return () => socketNew.close()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('sending...', message)
        socket.send(JSON.stringify({message: message, roomId: roomId}))
    }

    if (!socket) return null;

    return (
        <>
            <div className='chat-container'>
                <div className='room-messages-container'>
                    {messages.map (message => {
                        return <div>{message.message}</div>
                        })
                    }
                </div>
                <div className='room-input-container'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='message-input' placeholder='Type a message...' />
                        <button type="submit" className='message-submit'>Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default WebSocketComp;

