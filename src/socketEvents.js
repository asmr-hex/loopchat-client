import io from 'socket.io-client'

const handleWebSocketEvents = () => {
  // TODO (cw|1.15.2017) change hard-coded address to programmatic
  let ws = new WebSocket('ws://127.0.0.1:3145/ws')

  // on websocket open
  ws.onopen = (event) => {
    ws.send('sup')
    console.log('OPENED!')
  }

  // on incoming message
  ws.onmessage = ({data}) => {
    console.log(data)
  }
}

export default handleWebSocketEvents







