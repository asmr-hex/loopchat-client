import React, {Component} from 'react'


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  recording: getMidiRecordingOf(ownProps.id),
})


@connect(mapStateToProps, actions)
export class MidiTrack extends Component {
  static propTypes = {
    id: string.isRequired,
    type: bool.isRequired,
    recording: object.isRequired, // TODO (cw|10.17.2017) a new midi track should auto make a new recording.
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {id} = this.props

    return (
      <g className={`track-${id}`}>
        <KeyboardUnderlay
          show={showKeyboardGrid}
          x={notesView.x}
          y={notesView.y}
          width={notesView.width}
          height={notesView.height}
          pitchStart={pitchInterval.start}
          pitchEnd={pitchInterval.end}
          />
        <TimeGrid
          show={showTimeGrid}
          view={notesView}
          timeInterval={timeInterval}
          scale={scale}
          />
        <MidiNotes
          notes={notes}
          view={notesView}
          timeInterval={timeInterval}
          pitchInterval={pitchInterval}
          scale={scale}
          />
        <TimeAxis
          show={true}
          view={timeAxisView}
          timeInterval={timeInterval}
          scale={scale}
          />
        <Scrubber
          view={view}
          time={this.props.scrubberTime}
          scale={scale}
          playing={this.props.playing}
          timelineId={this.props.id}
          />
      </g>
    )
  }
}
