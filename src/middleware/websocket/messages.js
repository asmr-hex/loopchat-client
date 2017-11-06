import {receivedMessage} from '../../redux/actions/messages/index'
import {joinedSession} from '../../redux/actions/session/index'
import {joinedByPeers} from '../../redux/actions/peers/index'


export const ACTION_RELAYED = 'ACTION_RELAYED'

export const onMessage = store => event => {
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
  case ACTION_RELAYED:
    store.dispatch(msg.payload)
    break
  default:
    console.log('Received message of unknown type "' + msg.type + '"')
  }
}

// TODO (cw|11.2.2017) maybe rename this to sendAction
export const sendMessage = (socket, action) =>
  socket.send(JSON.stringify(action.payload))

export const relayAction = (socket, action) =>
  socket.send(JSON.stringify({type: ACTION_RELAYED, payload: {
    ...action,
    type: `${action.type}_BY_PEER`,
  }}))
