import React, {Component} from 'react'
import {connect} from 'react-redux'
import {array, bool, number, object, string} from 'prop-types'
import {getMidiRecordingOf} from '../../redux/selectors/tracks/recordings'
import {KeyboardUnderlay} from '../timeline/underlays/keyboard' // TODO (cw|10.17.2017) move this underlay into this directory!
import {TimeGrid} from '../timeline/underlays/timeGrid'
import {MidiNotes} from '../timeline/midi/notes'


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  recording: getMidiRecordingOf(state, ownProps.id), // TODO (cw|10.17.2017) put this back in!
})

@connect(mapStateToProps, actions)
export class MidiTrack extends Component {
  static propTypes = {
    id: string.isRequired,
    type: string.isRequired, // the type of this track: *must* be of type midi
    view: object.isRequired, // the view dimensions for the entire tracks panel in this timeline
    timeInterval: object.isRequired, // supplied by the timeline component to which this belongs
    trackCount: number.isRequired, // number of tracks
    // recording: object.isRequired, // TODO (cw|10.17.2017) a new midi track should auto make a new recording.
    notes: array, // get rid of this (only for quick testing)
  }

  constructor(props) {
    super(props)

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
    // get range of all the notes within this track's recording
    const pitchInterval = {
      start: 0, // TODO (cw|10.17.2017) fix this :)
      end: 16,
    }

    this.pitchInterval = pitchInterval
  }

  render() {
    // recompute this track's view
    this.computeTrackView()
    
    // recompte scaling factors incase something has changed. TODO (cw|10.17.2017) further optimization
    // is possible to only recompute when necessary.
    this.computeScalingFactors()

    const {id, timeInterval} = this.props
    const {scale, view, pitchInterval} = this

    console.log("RENDERING ", this.props.id)
    
    return (
      <g className={`track-${id}`}>
        <KeyboardUnderlay
          show={true}
          x={view.x}
          y={view.y}
          width={view.width}
          height={view.height}
          pitchStart={pitchInterval.start}
          pitchEnd={pitchInterval.end}
          />
        <TimeGrid
          show={true}
          view={view}
          timeInterval={timeInterval}
          scale={scale}
          />
        <MidiNotes
          notes={this.props.notes}
          view={view}
          timeInterval={timeInterval}
          pitchInterval={pitchInterval}
          scale={scale}
          />
      </g>
    )
  }
}
