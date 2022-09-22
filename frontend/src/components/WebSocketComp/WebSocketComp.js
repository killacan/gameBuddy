import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';



function WebSocketComp () {
    const dispatch = useDispatch();
    const {roomId} = useParams;

    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(new WebSocket('ws://localhost:5000'));
    


    useEffect(() => {
        // const messages = document.getElementById('messages');

        socket.onopen = (event) => {
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

        socket.onmessage = (message) => {
            const mesData = JSON.parse(message)
            console.log('I got a message', mesData);
            // messages.innerHTML += `<br/>${message}`
        }

        socket.onerror = (error) => console.log(`WebSocket error: ${error}`);
        socket.onclose = (event) => console.log('Disconnected from WebSocket server');

        return () => socket.close()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('sending...', message)
        socket.send({message: message, roomId: roomId})
    }

    if (!socket) return null;

    return (
        <>
            <output id="messages"></output>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='message-input' placeholder='Type a message...' />
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default WebSocketComp;

