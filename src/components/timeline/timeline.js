import React, { Component } from 'react'
import {connect} from 'react-redux'
import {array, bool, number, object, string} from 'prop-types'
import {get, map} from 'lodash'
import './timeline.css'
import {TimelineControls} from '../timeline/timelineControls'
import {TimeAxis} from './panels/time/axis'
import {Scrubber} from './controls/scrubber'
import {Track} from '../track/track'
import {getTracksFromTimeline} from '../../redux/selectors/timelines'
import {newTrack} from '../../types/track' // TODO (cw|10.17.2017) we don't need this! (ONLY FOR TESTING)


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  ...get(state, `timelines.${ownProps.id}`, {}),
  ...get(state, `ui.timelines.${ownProps.id}`, {}),
  tracks: getTracksFromTimeline(state, ownProps.id),
})

@connect(mapStateToProps, actions)
export class Timeline extends Component {
  static propTypes = {
    id: string.isRequired,
    tracks: array.isRequired,
    selections: object.isRequired,
    tempo: number.isRequired,
    timeSignature: string.isRequired,
    playing: bool.isRequired,
    scrubberTime: number.isRequired,
    inputDevices: array.isRequired, // TODO (cw|10.17.2017) move this to track component
    timeInterval: object.isRequired,
    styles: object,
  }

  static defaultProps = {
    styles: {
      width: 800,
      height: 200,
      background: '#ffbf75',
    }
  }
  
  constructor(props) {
    super(props)

    this.state = this.computeInitialPanelViews()
  }

  computeInitialPanelViews() {
    const {width, height} = this.props.styles
    
    // timeAxis
    const timeAxisView = {
      x: 0,
      y: 0,
      width,
      height: 20,
    }

    // tracksView
    const tracksView = {
      x: 0,
      y: timeAxisView.height,
      width,
      height: height - timeAxisView.height,
    }

    return {timeAxisView, tracksView}
  }

  getTimelineStyles() {
    const {width, height, background} = this.props
    const top = (window.innerHeight - height)/2
    const left = (window.innerWidth - width)/2

    return ({width, height, top, left, background})
  }

  getSampleData() {
    const notes = [
      {start: 4.00, end: 5.00, pitch: 4, id: 0},
      {start: 4.99, end: 8.23, pitch: 6, id: 1},
      {start: 10.01, end: 13.70, pitch: 6, id: 2},
      {start: 12.02, end: 13.88, pitch: 9, id: 3},
      {start: 13.88, end: 18.23, pitch: 1, id: 4},
    ]

    const view = {
      x: 0,
      y: 0,
      width: this.props.width,
      height: this.props.height,
    }

    const timeInterval = {
      start: 0.00,
      end: 24.00,
    }

    const pitchInterval = {
      start: 0,
      end: 12,
    }

    const showKeyboardGrid = true
    const showTimeGrid = true

    return {
      notes,
      view,
      timeInterval,
      pitchInterval,
      showKeyboardGrid,
      showTimeGrid,
    }
  }

  renderTracks(notes) {
    const {timeInterval, tracks} = this.props // TODO (cw|10.17.2017) get tracks array from here
    const {tracksView} = this.state
    
    return map(
      tracks,
      (track, idx) => (
        <Track
          key={idx}
          index={idx}
          id={track.id}
          type={track.type}
          view={tracksView}
          timeInterval={timeInterval}
          trackCount={tracks.length}
          notes={notes}
        />
      )
    )
  }
  
  render() {
    const styles = this.getTimelineStyles()
    const {
      notes,
      view,
      pitchInterval,
      showKeyboardGrid,
      showTimeGrid,
    } = this.getSampleData()

    return (
      <div>
        <TimelineControls
          width={800}
          height={200}
          background={'#ffffff'}
          inputs={this.props.inputDevices}
          timelineId={this.props.id}
          playing={this.props.playing}
        />
        <div className='timeline-container' style={styles}>
          <svg
            className='timeline'
            ref={element => this.element = element}
            width={styles.width}
            height={styles.height}
          >
            {this.renderTracks(notes)}
            <TimeAxis
              show={true}
              view={this.state.timeAxisView}
              timeInterval={this.props.timeInterval}
            />
            <Scrubber
              view={view}
              time={this.props.scrubberTime}
              timeInterval={this.props.timeInterval}
              playing={this.props.playing}
              timelineId={this.props.id}
            />
          </svg>
        </div>
      </div>
    )
  }
}
