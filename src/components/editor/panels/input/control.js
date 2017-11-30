import React, {Component} from 'react'
import {connect} from 'react-redux'
import {number, shape, string} from 'prop-types'
import {map} from 'lodash'
import {getTracksFromTimeline} from '../../../../redux/selectors/timelines'
import {addNewTrackToTimeline} from '../../../../redux/actions/timelines/timelines'
import {TrackInput} from './trackInput'
import styles from './index.css'


const actions = {
  addNewTrackToTimeline,
}

const mapStateToProps = (state, ownProps) => ({
  tracks: getTracksFromTimeline(state, ownProps.timelineId),
})

@connect(mapStateToProps, actions)
export class InputControlPanel extends Component {
  static propTypes = {
    timelineId: string.isRequired,
  }

  renderTrackInputs() {
    const {tracks} = this.props

    return map(
      tracks,
      (track, idx) => (
        <TrackInput key={idx} trackId={track.id}/>
      )
    )
  }

  addTrack() {
    const {timelineId, addNewTrackToTimeline} = this.props

    addNewTrackToTimeline(timelineId)
  }

  render() {

    return (
      <div className={styles.inputControlPanel}>
        <div className={styles.inputControlMenu} onClick={() => this.addTrack()}></div>
        <div className={styles.trackInputPanelContainer}>
          {this.renderTrackInputs()}
        </div>
      </div>
    )
  }
}

  
