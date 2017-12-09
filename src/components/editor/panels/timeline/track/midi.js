import React, {Component} from 'react'
import {connect} from 'react-redux'
import {array, bool, number, object, string} from 'prop-types'
import {map, reduce} from 'lodash'
import {midi as toMidi} from 'tonal-note'
import {
  getMidiMasterRecordingFromTrack,
  getMidiInProgressOverdubsFromTrack,
} from '../../../../../redux/selectors/tracks/recordings'
import {KeyboardUnderlay} from '../underlay/keyboard'
import {TimeGrid} from '../underlay/timeGrid'
import {MidiNotes} from '../midi/notes'
import {Scrubber} from '../scrubber'
import css from './index.css'
import {trackHeightBasis} from '../../input/index.css'
import {
  MIDI_NOTE_MAX,
  DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE,
} from '../constants'
import {newTransform, translate} from '../transforms'


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  // include midi pitch representation in addition to scientific pitch notation
  recording: getMidiMasterRecordingFromTrack(state, ownProps.id),
  inProgressRecordings: getMidiInProgressOverdubsFromTrack(state, ownProps.id),
})

@connect(mapStateToProps, actions)
export class MidiTrack extends Component {
  static propTypes = {
    id: string.isRequired,
    timelineId: string.isRequired,
  }

  constructor(props) {
    super(props)

    this.onVerticalWheel = newTransform(
      [translate('y', event => event.deltaY, {min: parseFloat(trackHeightBasis) - (MIDI_NOTE_MAX * DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE), max: 0})],
    )([`#track-${this.props.id}`])

    this.onHorizontalWheel = newTransform([
      translate('x', event => event.deltaX, {min: -30000, max: 0}),
    ])(['.track', '.time-axis'])
  }

  handleWheel(e) {
    this.onVerticalWheel(e)
    this.onHorizontalWheel(e)
  }

  render() { 
    const {id, timelineId} = this.props
    
    return (
      <div className={css.timelineTrackContainer}>
        <svg width={'100%'} height={'100%'} onWheel={(e) => this.handleWheel(e)}>
          <g className={'track'} id={`track-${id}`} ref={(elem) => {this.trackElement = elem}}>
            <KeyboardUnderlay show={true}/>
            <TimeGrid show={true}/>
            <Scrubber timelineId={timelineId}/>
          </g>
        </svg>
      </div>
    )
  }
}

// <MidiNotes
//   notes={this.props.recording}
//   inProgressRecordings={this.props.inProgressRecordings}
//   view={view}
//   timeInterval={timeInterval}
//   pitchInterval={pitchInterval}
//   scale={scale}
//   />
