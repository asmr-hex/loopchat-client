import React, {Component} from 'react'
import {connect} from 'react-redux'
import {number, shape, string} from 'prop-types'
import {DropDownMenu, MenuItem} from 'material-ui'
import {map} from 'lodash'
import {getMidiInputDevices} from '../../../../redux/selectors/midi/input'
import {NULL_DEVICE} from '../../../../types/midiDevice'
import {
  assignInputDeviceToMidiTrack,
  activateMidiTrack,
  deactivateMidiTrack
} from '../../../../redux/actions/tracks/midi'
import styles from './index.css'


const actions = {
  assignInputDeviceToMidiTrack,
  activateMidiTrack,
  deactivateMidiTrack,
}

const mapStateToProps = (state, ownProps) => ({
  inputs: getMidiInputDevices(state),
})

@connect(mapStateToProps, actions)
export class TrackInput extends Component {
  static propTypes = {
    trackId: string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {selectedDeviceId: NULL_DEVICE}  // this device id corresponds to the 'No Input' device
  }

  updateSelectedInput = (_, __, newDeviceId) => {
    const {
      trackId,
      assignInputDeviceToMidiTrack,
      activateMidiTrack,
      deactivateMidiTrack
    } = this.props
    const oldDeviceId = this.state.selectedDeviceId

    this.setState({selectedDeviceId: newDeviceId})

    if (newDeviceId !== NULL_DEVICE) {
      assignInputDeviceToMidiTrack(trackId, newDeviceId)
      activateMidiTrack(trackId, newDeviceId)
    }

    if (oldDeviceId !== NULL_DEVICE) deactivateMidiTrack(trackId, newDeviceId)
  }
  
  render() {
    const {trackId, inputs} = this.props

    return (
      <div className={styles.trackInputPanel}>
        <DropDownMenu value={this.state.value} onChange={this.updateSelectedInput}>
          {
            map(inputs, (input, idx) => <MenuItem value={input.id} key={idx} primaryText={input.name} />)
          }
        </DropDownMenu>
      </div>
    )
  }
}
