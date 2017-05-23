
// The CONNECTING action is dispatched by the socketMiddleware
export const CONNECTING = 'CONNECTING'
export const connecting = () => {
  return { type: CONNECTING }
}

// The CONNECTED action is dispatched by the socketMiddleware
export const CONNECTED = 'CONNECTED'
export const connected = () => {
  return { type: CONNECTED }
}

// The DISCONNECTED action is dispatched by the socketMiddleware
export const DISCONNECTED = 'DISCONNECTED'
export const disconnected = () => {
  return { type: DISCONNECTED }
}
