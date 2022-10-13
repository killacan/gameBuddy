import { useState, useEffect } from "react";

function WebSocketRoomIndex ({game, user, msgRoomUpdate}) {

    const [socket, setSocket] = useState(); 

    useEffect(() => {

        const socketNew = new WebSocket(`ws://localhost:5000/rooms?game=${game}`)

        socketNew.onopen = () => {
            // console.log("I'm a little socket short and stout")
            socketNew.send(JSON.stringify({message: 'I am a message!', userName: user.userName, gameId: game}))
        }


        socketNew.onmessage = (message) => {
            // console.log(JSON.parse(message.data))
            msgRoomUpdate()
        }

        setSocket(socketNew)

        return () => socketNew.close()
    }, [])

    if (!socket) return null

    return (
        <>
        
        </>
    )
}

export default WebSocketRoomIndex;