import React, {Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import FlatButton from 'material-ui/FlatButton'
import Dashboard from '../../components/dashboard'
import { setupMIDI } from '../../midi'

const host = '127.0.0.1'
const port = '3145'

const mapStateToProps = (state, { params }) => {
  // check for sessionID from router
  let sessionID = params.sessionID || ''
  
  return {
    connected: state.connected,
    session: state.session.toJS(),
    sessionID,
    midiDevices: state.midiDevices,
  }
}

// TODO (cw|5.19.2017) make these into selectors!
const mapDispatchToProps = dispatch => {
  return {
    joinSession: (sessionID='') => {
      const delimiter = sessionID === '' ? '':'/'
      const endpoint = `ws://${host}:${port}/ws${delimiter}${sessionID}`
      dispatch(actions.connect(endpoint, ''))
    },
    registerMidiDevice: device => {
      dispatch(actions.registerMIDIDevice(device))
    },
    unregisterMidiDevice: device => {
      dispatch(actions.unregisterMidiDevice(device))
    }, 
    assignMsgHandlerToDevice: (deviceId, msgHandler) => {
      dispatch(actions.assignMidiMsgHandlerTo(deviceId, msgHandler))
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Session extends Component {
  
  componentDidMount() {
    const {
      joinSession,
      registerMidiDevice,
      unregisterMidiDevice,
      sessionID,
    } = this.props
    
    // join a session
    joinSession(sessionID)

    // setup MIDI
    setupMIDI(registerMidiDevice, unregisterMidiDevice)

  }

  assignHandler(e) {
    if (this.props.midiDevices[0]) {
      console.log("hereok")
      const d = this.props.midiDevices[0]
      this.props.assignMsgHandlerToDevice(d.id, msg => console.log(msg))
    }
  }
  
  render() {
    const loading = this.props.connected ? 'hide':'loading'
    let devices = this.props.midiDevices
//    console.log(devices)

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
