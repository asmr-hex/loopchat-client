import React, {Component} from 'react'
import {connect} from 'react-redux'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import {connectAndJoinSession} from '../../redux/actions/connection/index'
import {connectMidiDevices} from '../../redux/actions/midi/index'
import {connectionStatus} from '../../types/connectionStatus'
import {Header} from '../header/header'
import {Dashboard} from '../dashboard/dashboard'
import {grey, orange} from '../../styles/palette.css'

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
    const isLoading = this.props.connectionStatus === connectionStatus.CONNECTING
    const loading = isLoading
          ? 'loading'
          : 'hide'

    return (
      <div>
        {
          isLoading ? [] : <Header session={this.props.session}/>
        }
        <RefreshIndicator
          top={(window.innerHeight-100)/2}
          left={(window.innerWidth-100)/2}
          style={{backgroundColor:grey}}
          status={loading}
          size={100}
          loadingColor={orange}
          zDepth={0}/>
        {
            isLoading ? [] : <Dashboard session={this.props.session}/>
        }
      </div>
    )
  }
}
