import React, {Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Dashboard from '../../components/dashboard'

const host = '127.0.0.1'
const port = '3145'

class Session extends Component {
  componentDidMount() {
    this.props.joinSession(this.props.sessionID)
  }

  render() {
    const loading = this.props.connected ? 'hide':'loading'
    return (
      <div>
        <RefreshIndicator
          top={window.innerHeight/2}
          left={window.innerWidth/2}
          style={{backgroundColor:'#FFF59D'}}
          status={loading}
          size={100}
          loadingColor={'#80DEEA'}
          zDepth={0}/>
        <Dashboard session={this.props.session}/>
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => {
  // check for sessionID from router
  let sessionID = params.sessionID || ''

  return {
    connected: state.connected,
    session: state.session.toJS(),
    sessionID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinSession: (sessionID='') => {
      let delimiter = sessionID === '' ? '':'/'
      let endpoint = `ws://${host}:${port}/ws${delimiter}${sessionID}`
      dispatch(actions.connect(endpoint, ''))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session)
