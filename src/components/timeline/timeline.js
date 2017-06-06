import React, { Component } from 'react'
import { connect } from 'react-redux'
import {DropDownMenu, MenuItem} from 'material-ui'
import { map, filter, get } from 'lodash'
import uuidV4 from 'uuid/v4'
import './timeline.css'
import {activateMidiInputDevice, deactivateMidiInputDevice} from '../../redux/actions/midi/index'
import {createMidiRecording, stopMidiRecording} from '../../redux/actions/recordings/midi/midi'

const actions = {
  activateMidiInputDevice,
  deactivateMidiInputDevice,
  createMidiRecording,
  stopMidiRecording,
}

@connect((state) => ({}), actions)
export class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 0, recordingId: undefined}
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
    const top = (window.innerHeight - height)/2
    const left = (window.innerWidth - width)/2

    const styles = {
      width,
      height,
      top,
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

    return (
      <div className='timeline' style={styles}>
        timeline
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {
            map(inputs, (input, idx) => <MenuItem value={input.id} key={idx} primaryText={input.name} />)
          }
        </DropDownMenu>
        <button onClick={() => this.handleRecording(selectedDeviceId, recording, recordingId)}>
          {
            recording ? 'stop' : 'record'
          }
        </button>
      </div>
    )
  }

  handleRecording(deviceId, isRecording, recordingId = uuidV4()) {
    const {startMidiRecording, stopMidiRecording} = this.props

    if (deviceId === 0) return

    if (!isRecording) {
      startMidiRecording(deviceId, recordingId)
      this.setState({
        ...this.state,
        recordingId,
      })
    } else {
      stopMidiRecording(deviceId, recordingId)
      this.setState({
        ...this.state,
        recordingId: undefined,
      })
    }
  }
}
