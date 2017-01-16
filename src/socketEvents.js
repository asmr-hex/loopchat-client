import io from 'socket.io-client'

const handleWebSocketEvents = () => {
  // TODO (cw|1.15.2017) change hard-coded address to programmatic
  let ws = new WebSocket('ws://127.0.0.1:5555/ws')

  ws.onopen = (event) => {
    console.log('OPENED!')
  }
}

export default handleWebSocketEvents







