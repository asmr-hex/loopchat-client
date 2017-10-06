import React, { Component } from 'react'
import { connect } from 'react-redux'
import {DropDownMenu, MenuItem} from 'material-ui'
import { map, filter, get } from 'lodash'
import uuidV4 from 'uuid/v4'
import './timelineControls.css'
import {activateMidiInputDevice, deactivateMidiInputDevice} from '../../redux/actions/midi/index'
import {startNewMidiRecording, stopMidiOverdub} from '../../redux/actions/recordings/midi/midi'

const actions = {
  activateMidiInputDevice,
  deactivateMidiInputDevice,
  startNewMidiRecording,
  stopMidiOverdub,
}

@connect((state) => ({}), actions)
export class TimelineControls extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 0, recordingId: undefined, overdubId: undefined}
  }

  handleChange = (event, index, deviceId) => {
    const oldDeviceId = this.state.value
    this.setState({value: deviceId})
    if (deviceId !== 0) {
      this.props.activateMidiInputDevice(deviceId)
    }
    if (oldDeviceId !== 0) {
      this.props.deactivateMidiInputDevice(oldDeviceId)
    }
  }

  render() {
    const {width, height, background} = this.props
    const left = (window.innerWidth - width)/2

    const styles = {
      width,
      height,
      left,
      background,
    }

    const inputs = [
      {id: 0, name: 'No Input'},
      ...filter(this.props.inputs, input => input.type === 'input'),
    ]

    const recording = get(filter(this.props.inputs, i => i.id === this.state.value), '0.recording', false)
    const selectedDeviceId = this.state.value
    const recordingId = this.state.recordingId
    const overdubId = this.state.overdubId

    return (
      <div className='timeline-controls' style={styles}>
        timeline
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {
            map(inputs, (input, idx) => <MenuItem value={input.id} key={idx} primaryText={input.name} />)
          }
        </DropDownMenu>
        <button onClick={() => this.handleRecording(selectedDeviceId, recording, recordingId, overdubId)}>
          {
            recording ? 'stop' : 'record'
          }
        </button>
      </div>
    )
  }

  handleRecording(deviceId, isRecording, recordingId = uuidV4(), overdubId = uuidV4()) {
    const {startNewMidiRecording, stopMidiOverdub} = this.props

    if (deviceId === 0) return

    if (!isRecording) {
      startNewMidiRecording(deviceId, recordingId, overdubId)
      this.setState({
        ...this.state,
        recordingId,
        overdubId,
      })
    } else {
      stopMidiOverdub(deviceId, recordingId, overdubId)
      this.setState({
        ...this.state,
        recordingId: undefined,
        overdubId: undefined,
      })
    }
  }
}
