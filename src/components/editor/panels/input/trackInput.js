import React, {Component} from 'react'
import {connect} from 'react-redux'
import {number, shape, string} from 'prop-types'
import {DropDownMenu, MenuItem} from 'material-ui'
import {map} from 'lodash'
import {getMidiInputDevices} from '../../../../redux/selectors/midi/input'
import {
  assignInputDeviceToMidiTrack,
  activateMidiTrack,
  deactivateMidiTrack
} from '../../../../redux/actions/tracks/midi'


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
    layout: shape({
      x: number.isRequired,
      y: number.isRequired,
      width: number.isRequired,
      height: number.isRequired,
    }).isRequired
  }

  constructor(props) {
    super(props)

    this.state = {selectedDeviceId: 0}  // this device id corresponds to the 'No Input' device
  }

  updateSelectedInput = (event, index, newDeviceId) => {
    const {trackId} = this.props
    const oldDeviceId = this.state.selectedDeviceId

    this.setState({selectedDeviceId: newDeviceId})

    if (newDeviceId !== 0) {
      assignInputDeviceToMidiTrack(trackId, newDeviceId)
      activateMidiTrack(trackId, newDeviceId)
    }

    if (oldDeviceId !== 0) deactivateMidiTrack(trackId, newDeviceId)
  }
  
  render() {
    const {trackId, inputs} = this.props
    const styles = {
      width: this.props.layout.width,
      height: this.props.layout.height,
      left: this.props.layout.x,
      top: this.props.layout.y,
      backgroundColor: 'tomato',
      border: '1px solid black',
    }

    return (
      <div className={`input-control-panel-${trackId}`} style={{...styles}}>
        <DropDownMenu value={this.state.value} onChange={this.updateSelectedInput}>
          {
            map(inputs, (input, idx) => <MenuItem value={input.id} key={idx} primaryText={input.name} />)
          }
        </DropDownMenu>
      </div>
    )
  }
}
