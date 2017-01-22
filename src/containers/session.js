import { connect } from 'react-redux'
import { connect as socketConnect } from '../action/creators'
import Root from '../components/root/index'

const host = '127.0.0.1'
const port = '3145'

const mapStateToProps = (state, { params }) => {
  // check for sessionID from router
  let sessionID = params.sessionID || ''

  return {
    connected: state.connected,
    connecting: state.connecting,
    session: state.session.toJS(),
    sessionID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinSession: (sessionID='') => {
      let delimiter = sessionID === '' ? '':'/'
      let endpoint = `ws://${host}:${port}/ws${delimiter}${sessionID}`
      dispatch(socketConnect(endpoint, ''))
    }
  }
}

const Session = connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)

export default Session











