import * as actions from './types'

/*
 * Action Creators
 */

// The CONNECT action is intercepted by socketMiddleware
// Thus, there is no corresponding reducer
export function connect(endpoint, token) {
  return { type: actions.CONNECT, endpoint, token }
}

// The DISCONNECT action is intercepted by socketMiddleware
// Thus, there is no corresponding reducer
export function disconnect() {
  return { type: actions.DISCONNECT }
}

// The SEND_MESSAGE action is intercepted by socketMiddleware
// Thus, there is no corresponding reducer
export function sendMessage(message) {
  return { type: actions.SEND_MESSAGE, message }
}

// The CONNECTING action is dispatched by the socketMiddleware
export function connecting() {
  return { type: actions.CONNECTING }
}

// The CONNECTED action is dispatched by the socketMiddleware
export function connected() {
  return { type: actions.CONNECTED }
}

// The DISCONNECTED action is dispatched by the socketMiddleware
export function disconnected() {
  return { type: actions.DISCONNECTED }
}

// The RECEIVED_MESSAGE action is dispatched by the socketMiddleware
export function receivedMessage(message) {
  return { type: actions.RECEIVED_MESSAGE, message }
}

// The JOINED_SESSION action is dispatched by the socketMiddleware
export function joinedSession(session) {
  console.info(`%cSuccessfully Joined Session %c${session.id}`,
              'color:green; font-weight:bold',
              'color:blue; font-weight:bold'
             )
  return { type: actions.JOINED_SESSION, session }
}
