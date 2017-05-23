
// The SEND_MESSAGE action is intercepted by socketMiddleware
// Thus, there is no corresponding reducer
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const  sendMessage = message => dispatch => {
  dispatch({ type: SEND_MESSAGE, payload: message })
}

// The RECEIVED_MESSAGE action is dispatched by the socketMiddleware
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE'
export const receivedMessage = message => dispatch => {
  dispatch({ type: RECEIVED_MESSAGE, payload: message })
}
