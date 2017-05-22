import { CONNECT, DISCONNECT } from '../actions/connection'
import { connecting, connected, disconnected } from '../actions/connection/status'
import { receivedMessage, SEND_MESSAGE } from '../actions/messages'
import { joinedSession } from '../actions/session'
import { joinedByPeers } from '../actions/peers'

const socketMiddleware = (function(){
  let socket = null

  const onOpen = (ws, store, token) => evt => {
    // authenticate with server
    // TODO (cw|1.20.2017) write authentication logic
    
    // perform connected action against state
    store.dispatch(connected())
  }

  const onClose = (ws, store) => evt => {
    // perform disconnected action against state
    store.dispatch(disconnected())
  }

  const onMessage = (ws, store) => event => {
    let msg = JSON.parse(event.data)
    switch(msg.type) {
    case 'chat':
      store.dispatch(receivedMessage(msg))
      break
    case 'session':
      store.dispatch(joinedSession(msg.payload))
      break
    case 'users':
      store.dispatch(joinedByPeers(msg.payload))
      break
    default:
      console.log('Received message of unkown type "' + msg.type + '"')
    }
  }

  // return a curried function which will catch a subset of the available
  // actions and, instead of dispatching to the redux store directly, will
  // execute some middleware (e.g. establishing Websocket connections, send
  // a message to a server, etc.). This is made possible by using a thunk.
  return store => next => action => {
    switch(action.type) {
    case CONNECT:
      // close any existing socket connections
      if (socket != null) {
        socket.close()
      }

      // dispatch that we are currently connection.
      store.dispatch(connecting())

      // attempt to connect
      // TODO (cw|1.20.2017) attempt t connect with retries
      socket = new WebSocket(action.payload.endpoint)

      // provide socket handlers
      socket.onopen = onOpen(socket, store, action.payload.token)
      socket.onclose = onClose(socket, store)
      socket.onmessage = onMessage(socket, store)

      break
    case DISCONNECT:
      // close socket connection if it exists
      if (socket != null) {
        socket.close()
      }
      socket = null

      store.dispatch(disconnected())

      break
    case SEND_MESSAGE:
      socket.send(JSON.stringify(action.payload.message))

      break
    default:
      return next(action)
    }
  }
})()

export default socketMiddleware
