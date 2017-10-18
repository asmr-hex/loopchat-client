import React, {Component} from 'react'
import {connect} from 'react-redux'
import {array, bool, number, object, string} from 'prop-types'
import {getMidiRecordingOf} from '../../redux/selectors/tracks/recordings'
import {KeyboardUnderlay} from '../timeline/underlays/keyboard' // TODO (cw|10.17.2017) move this underlay into this directory!
import {MidiNotes} from '../timeline/midi/notes'


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  recording: {}, // getMidiRecordingOf(ownProps.id), // TODO (cw|10.17.2017) put this back in!
})

@connect(mapStateToProps, actions)
export class MidiTrack extends Component {
  static propTypes = {
    id: string.isRequired,
    type: string.isRequired,
    view: object.isRequired,
    timeInterval: object.isRequired,
    trackCount: number.isRequired,
    // recording: object.isRequired, // TODO (cw|10.17.2017) a new midi track should auto make a new recording.
    notes: array, // get rid of this (only for quick testing)
  }

  constructor(props) {
    super(props)

    this.state = {scale: {}, view: {}, pitchInterval: {start: 0, end: 16}}
  }

  componentDidMount() {
    // initialize visible pitchInterval
    this.computeVisiblePitchInterval()
    
    // initialize scaling factors
    this.computeScalingFactors()

    // initialize this track's view
    this.computeTrackView()
  }
  
  componentWillUpdate() {
    // recompte scaling factors incase something has changed. TODO (cw|10.17.2017) further optimization
    // is possible to only recompute when necessary.
    this.computeScalingFactors()

    // recompute this track's view
    this.computeTrackView()
  }
  
  computeScalingFactors() {
    const {view, timeInterval, pitchInterval, trackCount} = this.props
    
    const scale = {
      x: view.width / (timeInterval.end - timeInterval.start),
      y: (view.height / trackCount) / (pitchInterval.end - pitchInterval.start + 1),
    }

    this.setState({scale})
  }

  computeTrackView() {
    const {view, key, trackCount} = this.props
    const height = view.height / trackCount
    
    const trackView = {
      x: view.x,
      y: view.y + (height * key),
      width: view.width,
      height,
    }

    this.setState({view: trackView})
  }

  computeVisiblePitchInterval() {
    // get range of all the notes within this track's recording
    const pitchInterval = {
      start: 0, // TODO (cw|10.17.2017) fix this :)
      end: 16,
    }

    this.setState({pitchInterval})
  }

  render() {
    const {id, timeInterval} = this.props
    const {scale, view, pitchInterval} = this.state

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
