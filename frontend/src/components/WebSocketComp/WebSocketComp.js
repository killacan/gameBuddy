
function WebSocketComp () {

    const messages = document.getElementById('messages');
    const socket = new WebSocket('ws://localhost:5000');

    socket.onopen = (event) => {
        console.log('Websocket is connected!')
        const id = Math.round(Math.random() * 100)
        console.log('sending...', id)
        const data = JSON.stringify({
            id,
            name: `[${id}] Jimmothy`,
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA'
            },
            profession: 'developer'
        })

        socket.send(data)
    }
    socket.onmessage = (msg) => console.log('I got a message', msg);
    socket.onerror = (error) => console.log(`WebSocket error: ${error}`);
    socket.onclose = (event) => console.log('Disconnected from WebSocket server');

    return (
        <>
            <output id="messages"></output>
        </>
    )
}

export default WebSocketComp;

