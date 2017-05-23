import {CONNECT, DISCONNECT} from '../../redux/actions/connection/index'
import {connecting, disconnected} from '../../redux/actions/connection/status'
import {SEND_MESSAGE} from '../../redux/actions/messages/index'
import {onClose, onOpen} from './connect'
import {onMessage, sendMessage} from './messages'

const socketMiddleware = (() => {
  // use a closure to hide the global websocket variable
  let socket = null

  // return a curried function which will catch a subset of the available
  // actions and, instead of dispatching to the redux store directly, will
  // execute some middleware (e.g. establishing Websocket connections, send
  // a message to a server, etc.). This is made possible by using a thunk.
  return store => next => action => {
    switch(action.type) {
    case CONNECT:
      // close any existing socket connections
      if (socket != null) socket.close()

      // dispatch that we are currently connection.
      store.dispatch(connecting())

      // attempt to connect
      // TODO (cw|1.20.2017) attempt to connect with retries
      socket = new WebSocket(action.payload.endpoint)

      // provide socket handlers
      socket.onopen = onOpen(store, action.payload.token)
      socket.onclose = onClose(store)
      socket.onmessage = onMessage(store)
      break
    case DISCONNECT:
      // close socket connection if it exists
      if (socket != null) socket.close()
      socket = null

      store.dispatch(disconnected())
      break
    case SEND_MESSAGE:
      sendMessage(socket, action)
      break
    default:
      return next(action)
    }
  }
})()

export default socketMiddleware
