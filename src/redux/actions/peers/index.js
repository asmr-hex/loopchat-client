
// the JOINED_BY_USERS action is dispatched by the socketMiddleware
export const JOINED_BY_PEERS = 'JOINED_BY_PEERS'
export const joinedByPeers = peers => dispatch => {
  dispatch({ type: JOINED_BY_PEERS, payload: peers })
}
