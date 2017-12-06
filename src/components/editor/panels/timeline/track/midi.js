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
    type: string.isRequired, // the type of this track: *must* be of type midi
    view: object.isRequired, // the view dimensions for the entire tracks panel in this timeline
    timeInterval: object.isRequired, // supplied by the timeline component to which this belongs
    trackCount: number.isRequired, // number of tracks
    notes: array, // get rid of this (only for quick testing)
  }

  constructor(props) {
    super(props)

    this.onVerticalWheel = newTransform(
      [translate('y', event => event.deltaY, {min: parseFloat(trackHeightBasis) - (MIDI_NOTE_MAX * DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE), max: 0})],
    )([`#track-${this.props.id}`])

    this.onHorizontalWheel = newTransform([
      translate('x', event => event.deltaX, {min: -30000, max: 0}),
    ])(['.track', '.time-axis'])
    
    // NOTE: we aren't using React's internal state to store the following
    // parameters because their values are derivatives of the props passed
    // into the component. And, since we want to update these parameters
    // whenever the relevant props change, we want to use React's lifecycle
    // methods to update the values, but we cannot use setState within these
    // lifecycle methods or it will trigger an infinite component update loop.

    // initialize visible pitchInterval
    this.computeVisiblePitchInterval()

    // initialize this track's view
    this.computeTrackView()
    
    // initialize scaling factors
    this.computeScalingFactors()

    this.yTranslation = 0
  }

  componentWillUpdate() {

    // // recompute this track's view
    // this.computeTrackView()
    
    // // recompte scaling factors incase something has changed. TODO (cw|10.17.2017) further optimization
    // // is possible to only recompute when necessary.
    // this.computeScalingFactors()

    // console.log("RECOMPUTED SCALOING FACTORS FOR ", this.props.id)
  }
  
  computeScalingFactors() {
    const {timeInterval, trackCount} = this.props
    const {view, pitchInterval} = this
    
    const scale = {
      x: view.width / (timeInterval.end - timeInterval.start),
      y: (view.height / trackCount) / (pitchInterval.end - pitchInterval.start + 1),
    }

    this.scale = scale
  }

  computeTrackView() {
    const {view, index, trackCount} = this.props
    const height = view.height / trackCount

    const trackView = {
      x: view.x,
      y: view.y + (height * index),
      width: view.width,
      height,
    }

    this.view = trackView
  }

  computeVisiblePitchInterval() {
    const {recording} = this.props

    // get range of all the notes within this track's recording
    const pitchInterval = recording.length === 0
          ? {
            start: 48,
            end: 60,
          }
          : {
            start: reduce(recording, (acc, note) => note.pitch < acc ? note.pitch : acc, 127),
            end: reduce(recording, (acc, note) => note.pitch > acc ? note.pitch : acc, 0),
          }
    
    this.pitchInterval = pitchInterval
  }

  handleWheel(e) {
    this.onVerticalWheel(e)
    // if (this.scrollKbd(e)) {
    //   this.trackElement.setAttribute('transform', `translate(0, ${this.yTranslation})`) 
    // }
  }

  scrollTime({deltaX}) {
    const minBound = -DEFAULT_TIMELINE_LENGTH
    const xTranslation = parseFloat(this.trackElement.getAttribute('transform').match(/translate\(\s*(-?[\d.]*)\s*[,]\s*(-?[\d.]*)\s*/)[1])
    
    if (deltaX !== 0 && xTranslation <= 0 && xTranslation >= minBound) {
      const transl = xTranslation + deltaX
      const hitMaxBound = transl > 0
      const hitMinBound = transl < minBound
      const outOfBounds = hitMaxBound || hitMinBound

      const dx = outOfBounds ? hitMaxBound ? deltaX - transl : deltaX + (minBound - transl) : deltaX

      return true
    }

    return false
  }
  
  scrollKbd({deltaY}) {
    const minBound = parseFloat(trackHeightBasis) - (MIDI_NOTE_MAX * DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE)
    
    if (deltaY !== 0 && this.yTranslation <= 0 && this.yTranslation >= minBound) {
      const transl = this.yTranslation + deltaY
      const hitMaxBound = transl > 0
      const hitMinBound = transl < minBound
      const outOfBounds = hitMaxBound || hitMinBound
      
      const dy = outOfBounds ? hitMaxBound ? deltaY - transl : deltaY + (minBound - transl) : deltaY
            
      this.yTranslation += dy

      return true
    }

    return false
  }
  
  render() {
    // recompute the visible pitch interval
    this.computeVisiblePitchInterval()
    
    // recompute this track's view
    this.computeTrackView()
    
    // recompte scaling factors incase something has changed. TODO (cw|10.17.2017) further optimization
    // is possible to only recompute when necessary.
    this.computeScalingFactors()

    const {id, timeInterval} = this.props
    const {scale, view, pitchInterval} = this
    
    return (
      <div className={css.timelineTrackContainer}>
        <svg width={'100%'} height={'100%'} onWheel={(e) => this.handleWheel(e)}>
          <g className={'track'} id={`track-${id}`} ref={(elem) => {this.trackElement = elem}}>
            <KeyboardUnderlay
              show={true}
              x={view.x}
              y={view.y}
              width={view.width}
              height={view.height}
              pitchStart={pitchInterval.start}
              pitchEnd={pitchInterval.end}
              />
          </g>
        </svg>
      </div>
    )
  }
}


//   <TimeGrid
// show={true}
// view={view}
// timeInterval={timeInterval}
// scale={scale}
//   />
//   <MidiNotes
// notes={this.props.recording}
// inProgressRecordings={this.props.inProgressRecordings}
// view={view}
// timeInterval={timeInterval}
// pitchInterval={pitchInterval}
// scale={scale}
//   />
