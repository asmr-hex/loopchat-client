import React, { Component } from 'react'
import { connect } from 'react-redux'
import {DropDownMenu, MenuItem} from 'material-ui'
import { map, filter } from 'lodash'
import './timeline.css'
import {activateMidiInputDevice, deactivateMidiInputDevice} from '../../redux/actions/midi/index'

@connect(_, {activateMidiInputDevice, deactivateMidiInputDevice})
export class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 0}
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

    return (
      <div className='timeline' style={styles}>
        timeline
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {
            map(inputs, (input, idx) => <MenuItem value={input.id} key={idx} primaryText={input.name} />)
          }
        </DropDownMenu>
      </div>
    )
  }
}
