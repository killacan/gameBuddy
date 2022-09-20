
function WebSocketComp () {

    const messages = document.getElementById('messages');
    const socket = new WebSocket('ws://localhost:5000');

    socket.onopen = (event) => {
        console.log('Websocket is connected!')
        const id = Math.round(Math.random() * 100)
        console.log('sending...', id)
        const data = JSON.stringify(
        [
            {
            id,
            name: `[${id}] Jimmothy`,
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA'
            },
            profession: 'developer'
        },
        {
            id,
            name: `[${id}] Juan`,
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA'
            },
            profession: 'developer'
        },
        {
            id,
            name: `[${id}] Marry Santos`,
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA'
            },
            profession: 'developer'
        }])

        socket.send(data)
    }
    socket.onmessage = (msg) => {
        const message = JSON.parse(msg.data)
        console.log('I got a message', message);
        // messages.innerHTML += `<br/>${message}`
    }
    socket.onerror = (error) => console.log(`WebSocket error: ${error}`);
    socket.onclose = (event) => console.log('Disconnected from WebSocket server');

    if (!messages) return null

    return (
        <>
            <output id="messages"></output>
        </>
    )
}

export default WebSocketComp;

