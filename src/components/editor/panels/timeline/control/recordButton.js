import React, {Component} from 'react'
import {string} from 'prop-types'
import {connect, bool} from 'react-redux'
import uuidV4 from 'uuid/v4'
import {forEach, filter, map, reduce} from 'lodash'
import {startMidiOverdubs, stopMidiOverdubs} from '../../../../../redux/actions/recordings/midi/midi'
import {updateRecordingStatus} from '../../../../../redux/actions/timelines/timelines'
import {sendMessage} from '../../../../../redux/actions/messages'
import {NULL_DEVICE} from '../../../../../types/midiDevice'
import {
  getTimelineProperty,
  getActiveTracksFromTimeline,
} from '../../../../../redux/selectors/timelines'
import {getUserMidiOverdubFromTrack} from '../../../../../redux/selectors/tracks/recordings'


const actions = {
  startMidiOverdubs,
  stopMidiOverdubs,
  updateRecordingStatus,
  sendMessage,
}

const mapStateToProps = (state, ownProps) => {
  const userId = 'Dr. Temporary' // TODO (cw|11.2.2017) CHANGE THIS TO USE THE REAL USER ID ONCE USER DATA IS BUILT OUT FOR REAL
  const activeTracks = getActiveTracksFromTimeline(state, ownProps.timelineId)
  const trackOverdubsByThisUser = reduce(
    activeTracks,
    (acc, track) => ({...acc, [track.id]: getUserMidiOverdubFromTrack(state, track.id, userId)}),
    {},
  )

  return {
    activeTracks,
    trackOverdubsByThisUser,
    recordingInProgress: getTimelineProperty(state, ownProps.timelineId, 'recording'),  
  }
}

@connect(mapStateToProps, actions)
export class RecordButton extends Component {
  static propTypes = {
    timelineId: string.isRequired,
  }

  handleRecording() {
    const {
      sendMessage,
      activeTracks,
      trackOverdubsByThisUser,
      timelineId,
      recordingInProgress,
      startMidiOverdubs,
      stopMidiOverdubs,
      updateRecordingStatus,
    } = this.props

    // filter out tracks which don't have an input device set
    const tracks = filter(activeTracks, track => track.inputDeviceId !== NULL_DEVICE) // TODO (cw|10.25.2017) make the NULL device a constant

    if (tracks.length === 0) return

    const recordingContexts = map(
      tracks,
      track => ({
        recordingId: track.recordingId,
        inputDeviceId: track.inputDeviceId,
        overdub: trackOverdubsByThisUser[track.id] // TODO (cw|11.2.2017) this is undefined sometimes, debug this.
      }),
    )

    sendMessage("YOOOOOOOOOOOOO TESTING")
    
    if (!recordingInProgress) {
      startMidiOverdubs(recordingContexts, timelineId)
      
    } else {
      stopMidiOverdubs(recordingContexts, timelineId)
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
