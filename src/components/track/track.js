import React, {Component} from 'react'


export class Track extends Component {
  static propTypes = {
    id: string.isRequired,
    type: bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className='timeline-container' style={styles}>
        <svg
          className='timeline'
          ref={element => this.element = element}
          width={styles.width}
          height={styles.height}
          >
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
        </svg>
      </div>
    )
  }
}
