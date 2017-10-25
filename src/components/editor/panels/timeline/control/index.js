import React, {Component} from 'react'
import {connect} from 'react-redux'
import {number, shape, string} from 'prop-types'
import {addNewTrackToTimeline} from '../../../../../redux/actions/timelines/timelines'
import {getTimelineProperty} from '../../../../../redux/selectors/timelines'
import {PlayButton} from './playButton'


const actions = {
  addNewTrackToTimeline,
}

const mapStateToProps = (state, ownProps) => ({
  playing: getTimelineProperty(state, ownProps.timelineId, 'playing'),
})

@connect(mapStateToProps, actions)
export class TimelineControlPanel extends Component {
  static propTypes = {
    timelineId: string.isRequired,
    layout: shape({
      x: number.isRequired,
      y: number.isRequired,
      width: number.isRequired,
      height: number.isRequired,
    }).isRequired
  }

  newTrack() {
    const {timelineId, addNewTrackToTimeline} = this.props

    addNewTrackToTimeline(timelineId)
  }
  
  render() {
    const {id} = this.props
    const styles = {
      width: this.props.layout.width,
      height: this.props.layout.height,
      left: this.props.layout.x,
      top: this.props.layout.y,
      backgroundColor: 'orange',
    }

    return (
      <div className={`timeline-controls-${id}`} style={{...styles}}>
        timeline controls
        <button onClick={() => this.newTrack()}>
          + Track
        </button>
        <PlayButton
          timelineId={this.props.timelineId}
          playing={this.props.playing}
        />
        <button onClick={() => this.handleRecording(selectedDeviceId, recording, recordingId, overdubId)}>
          {
            recording ? 'stop' : 'record'
          }
        </button>
      </div>
    )
  }
}
