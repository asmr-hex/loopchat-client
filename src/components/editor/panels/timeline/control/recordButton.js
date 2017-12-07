import React, {Component} from 'react'
import {string} from 'prop-types'
import {connect, bool} from 'react-redux'
import uuidV4 from 'uuid/v4'
import {forEach, filter, map, reduce} from 'lodash'
import {IconButton} from 'material-ui'
import RecordIcon from 'material-ui/svg-icons/toggle/radio-button-checked'
import RecordingIcon from 'material-ui/svg-icons/av/album'
import {startMidiOverdubs, stopMidiOverdubs} from '../../../../../redux/actions/recordings/midi/midi'
import {updateRecordingStatus} from '../../../../../redux/actions/timelines/timelines'
import {sendMessage} from '../../../../../redux/actions/messages'
import {NULL_DEVICE} from '../../../../../types/midiDevice'
import {
  getTimelineProperty,
  getActiveTracksFromTimeline,
} from '../../../../../redux/selectors/timelines'
import {getUserMidiOverdubFromTrack} from '../../../../../redux/selectors/tracks/recordings'
import {blue, grey, orange, purple, red} from '../../../../../styles/palette.css'


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
  const recordableTracks = filter(
    activeTracks,
    track => track.inputDeviceId !== NULL_DEVICE,
  )

  return {
    activeTracks,
    trackOverdubsByThisUser,
    recordingInProgress: getTimelineProperty(state, ownProps.timelineId, 'recording'),
    recordableTracks,
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
      recordableTracks,
      trackOverdubsByThisUser,
      timelineId,
      recordingInProgress,
      startMidiOverdubs,
      stopMidiOverdubs,
      updateRecordingStatus,
    } = this.props

    // filter out tracks which don't have an input device set
    if (recordableTracks.length === 0) return

    const recordingContexts = map(
      recordableTracks,
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
    const {recordingInProgress, recordableTracks} = this.props
    const disabled = recordableTracks.length === 0
    const disabledMsg = 'plz select trax 2 record ^-^'
    const iconStyles = {
      height: 36,
      width: 36,
    }
    const buttonStyles = {
      width: 72,
      height: 72,
      padding: 16,
    }

    const icon = recordingInProgress
          ? (<RecordingIcon color={red} hoverColor={orange}/>)
          : (<RecordIcon color={disabled ? grey : purple} hoverColor={disabled ? grey : blue}/>)      
    
    return disabled
      ? (
         <IconButton iconStyle={iconStyles} style={buttonStyles} tooltip={disabledMsg}>
           {icon}
         </IconButton>
        )
     : (
         <IconButton
           iconStyle={iconStyles}
           style={buttonStyles}
           onClick={() => this.handleRecording()}>
           {icon}
         </IconButton>
       )
  }
}
