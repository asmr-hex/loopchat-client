
// connectAndJoinSession is an action creator for connecting and
// joining a session. This action creator can be used in the views.
export const connectAndJoinSession = (host, port, sessionID = '') => dispatch => {
  // TODO (cw|5.21.2017) validate host/port
  const delimiter = sessionID === '' ? '':'/'
  const endpoint = `ws://${host}:${port}/ws${delimiter}${sessionID}`
  dispatch(connect(endpoint, ''))
}

// The CONNECT action is intercepted by socketMiddleware
// Thus, there is no corresponding reducer
export const CONNECT = 'CONNECT'
export function connect(endpoint, token) {
  return { type: CONNECT, endpoint, token }
}

// The DISCONNECT action is intercepted by socketMiddleware
// Thus, there is no corresponding reducer
export const DISCONNECT = 'DISCONNECT'
export function disconnect() {
  return { type: DISCONNECT }
}
