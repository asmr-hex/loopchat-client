import WebSocket from 'ws'

const handleWebSocketEvents = () => {
  // TODO (cw|1.15.2017) change hard-coded address to programmatic
  const ws = new WebSocket('ws://127.0.0.1:6666/ws')

  ws.on('open', () => {
    ws.send('Hello')
  })

  ws.on('message', (msg, flags) => {
    // for now just print out the received msg
    console.log(msg)
  })
}




















