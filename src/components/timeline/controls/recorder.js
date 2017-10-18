import React, {Component} from 'react'
import {array} from 'prop-types'
import {connect, bool} from 'react-redux'
import uuidV4 from 'uuid/v4'
import {startNewMidiRecording, stopMidiOverdub} from '../../../redux/actions/recordings/midi/midi'


const actions = {
  startNewMidiRecording,
  stopMidiOverdub,
}

@connect(state => ({}), actions)
export class RecordButton extends Component {
  static propTypes = {
    trackId: string.isRequired,
    inputDeviceId: string.isRequired,
    recording: bool.isRequired,
    recordingId: string.isRequired,
    overdubId: string.isRequired,
  }

  static defaultProps = {
    trackId: undefined,
    inputDeviceId: undefined,
    recording: false,
    recordingId: uuidV4(),
    overdubId: uuidV4(),
  }
  
  constructor(props) {
    super(props)
  }

  handleRecording(deviceId, isRecording, recordingId = uuidV4(), overdubId = uuidV4()) {
    const {startNewMidiRecording, stopMidiOverdub} = this.props

    if (!deviceId) return

    if (!isRecording) {
      startNewMidiRecording(deviceId, recordingId, overdubId)
    } else {
      stopMidiOverdub(deviceId, recordingId, overdubId)
    }
  }

  render() {
    const {recording, inputDeviceId, recordingId, overdubId} = this.props
    return (
      <button onClick={() => this.handleRecording(selectedDeviceId, recording, recordingId, overdubId)}>
        {
          recording ? 'stop' : 'record'
        }
      </button>
    )
  }
}
