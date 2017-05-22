
// The JOINED_SESSION action is dispatched by the socketMiddleware
export const JOINED_SESSION = 'JOINED_SESSION'
export const joinedSession = session => dispatch => {
  console.info(`%cSuccessfully Joined Session %c${session.id}`,
               'color:green; font-weight:bold',
               'color:blue; font-weight:bold'
              )
  dispatch({ type: JOINED_SESSION, payload: session })
}
