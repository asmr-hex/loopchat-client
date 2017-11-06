import {CONNECT, DISCONNECT} from '../../redux/actions/connection/index'
import {connecting, disconnected} from '../../redux/actions/connection/status'
import {SEND_MESSAGE} from '../../redux/actions/messages/index'
import {onClose, onOpen} from './connect'
import {onMessage, sendMessage, relayAction} from './messages'
import {
  MIDI_RECORDING_CREATED,
  MIDI_EVENT_RECORDED,
  MIDI_OVERDUB_RECORDING_STARTED,
  MIDI_OVERDUB_RECORDING_STOPPED,
} from '../../redux/actions/recordings/midi/midi'
import {
  MIDI_TRACK_CREATED,
  MIDI_TRACK_DELETED,
} from '../../redux/actions/tracks/midi'
import {
  TIMELINE_CREATED,
  TIMELINE_DELETED,
  TRACK_ADDED_TO_TIMELINE,
} from '../../redux/actions/timelines/timelines'


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
    case TIMELINE_CREATED:
    case TIMELINE_DELETED:
    case TRACK_ADDED_TO_TIMELINE:
    case MIDI_TRACK_CREATED:
    case MIDI_TRACK_DELETED:
    case MIDI_RECORDING_CREATED:
    case MIDI_EVENT_RECORDED:
    case MIDI_OVERDUB_RECORDING_STARTED:
    case MIDI_OVERDUB_RECORDING_STOPPED:
      relayAction(socket, action)
      return next(action)
    default:
      return next(action)
    }
  }
})()

export default socketMiddleware
