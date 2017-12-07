import React, {Component} from 'react'
import {connect} from 'react-redux'
import {number, shape, string} from 'prop-types'
import {addNewTrackToTimeline} from '../../../../../redux/actions/timelines/timelines'
import {getTimelineProperty} from '../../../../../redux/selectors/timelines'
import {PlayButton} from './playButton'
import {RecordButton} from './recordButton'
import styles from './index.css'


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
  }

  newTrack() {
    const {timelineId, addNewTrackToTimeline} = this.props

    addNewTrackToTimeline(timelineId)
  }
  
  render() {
    const {timelineId} = this.props

    return (
      <div className={styles.timelineControls}>
        <PlayButton
          timelineId={this.props.timelineId}
          playing={this.props.playing}
          />
        <RecordButton
          timelineId={timelineId}
        />
      </div>
   )
  }
}  
