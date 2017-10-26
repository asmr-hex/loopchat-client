import React, {Component} from 'react'
import {string} from 'prop-types'
import {connect, bool} from 'react-redux'
import uuidV4 from 'uuid/v4'
import {forEach, filter, map} from 'lodash'
import {startMidiOverdubs, stopMidiOverdubs} from '../../../../../redux/actions/recordings/midi/midi'
import {updateRecordingStatus} from '../../../../../redux/actions/timelines/timelines'
import {NULL_DEVICE} from '../../../../../types/midiDevice'
import {
  getTimelineProperty,
  getActiveTracksFromTimeline
} from '../../../../../redux/selectors/timelines'


const actions = {
  startMidiOverdubs,
  stopMidiOverdubs,
  updateRecordingStatus,
}

const mapStateToProps = (state, ownProps) => ({
  activeTracks: getActiveTracksFromTimeline(state, ownProps.timelineId),
  recordingInProgress: getTimelineProperty(state, ownProps.timelineId, 'recording')
})
  

@connect(mapStateToProps, actions)
export class RecordButton extends Component {
  static propTypes = {
    timelineId: string.isRequired,
  }

  handleRecording() {
    const {
      activeTracks,
      recordingInProgress,
      startMidiOverdubs,
      stopMidiOverdubs,
      updateRecordingStatus,
    } = this.props

    // filter out tracks which don't have an input device set
    const tracks = filter(activeTracks, track => track.inputDeviceId !== NULL_DEVICE) // TODO (cw|10.25.2017) make the NULL device a constant

    if (tracks.length === 0) return

    const recordings = map(
      tracks,
      track => ({id: track.recordingId, inputDeviceId: track.inputDeviceId}),
    )
    
    if (!recordingInProgress) {
      startMidiOverdubs(recordings)
      
    } else {
      stopMidiOverdubs(recordings)
    }

    updateRecordingStatus(this.props.timelineId, !recordingInProgress)
  }

  render() {
    const {recordingInProgress} = this.props

    return (
      <button onClick={() => this.handleRecording()}>
        {
          recordingInProgress ? 'stop' : 'record'
        }
      </button>
    )
  }
}
