import {connected, disconnected} from '../../redux/actions/connection/status'

export const onOpen = (store, token) => event => {
  // authenticate with server
  // TODO (cw|1.20.2017) write authentication logic

  // perform connected action against state
  store.dispatch(connected())
}

export const onClose = store => event => {
  // perform disconnected action against state
  store.dispatch(disconnected())
}
