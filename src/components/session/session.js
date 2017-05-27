import React, {Component} from 'react'
import {connect} from 'react-redux'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import {connectAndJoinSession} from '../../redux/actions/connection/index'
import {connectMidiDevices} from '../../redux/actions/midi/index'
import {connectionStatus} from '../../types/connectionStatus'
import {Header} from '../header/header'
import {Dashboard} from '../dashboard/dashboard'

const host = '127.0.0.1'
const port = '3145'

const mapStateToProps = (state, { params }) => {
  // check for sessionID from router
  let sessionID = params.sessionID || ''
  
  return {
    connectionStatus: state.connection.status,
    session: state.session,
    sessionID,
  }
}

const actions = {
  connectAndJoinSession,
  connectMidiDevices,
}

@connect(mapStateToProps, actions)
export default class Session extends Component {
  
  componentDidMount() {
    const {
      connectAndJoinSession,
      connectMidiDevices,
      sessionID,
    } = this.props
    
    // join a session
    connectAndJoinSession(host, port, sessionID)

    // setup MIDI
    connectMidiDevices()
  }

  render() {
    const loading = this.props.connectionStatus === connectionStatus.CONNECTING
          ? 'loading'
          : 'hide'

    return (
      <div>
        <Header session={this.props.session}/>
        <RefreshIndicator
          top={(window.innerHeight-100)/2}
          left={(window.innerWidth-100)/2}
          style={{backgroundColor:'#ffffffff'}}
          status={loading}
          size={100}
          loadingColor={'#80DEEA'}
          zDepth={0}/>
        <Dashboard session={this.props.session}/>
      </div>
    )
  }
}
