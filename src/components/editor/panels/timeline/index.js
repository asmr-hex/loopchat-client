import React, {Component} from 'react'
import {number, shape, string} from 'prop-types'
import {connect} from 'react-redux'
import {map} from 'lodash'
import {getTimelineProperty, getTracksFromTimeline} from '../../../../redux/selectors/timelines'
import {getTimelineUIProperty} from '../../../../redux/selectors/ui/timelines'
import {Track} from './track/track'
import {TimeAxis} from './timeAxis'
import {Scrubber} from './scrubber'
import css from './index.css'


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  scrubberTime: getTimelineProperty(state, ownProps.id, 'scrubberTime'),
  playing: getTimelineProperty(state, ownProps.id, 'playing'),
  timeInterval: getTimelineUIProperty(state, ownProps.id, 'timeInterval'),
  tracks: getTracksFromTimeline(state, ownProps.id),
})

@connect(mapStateToProps, actions)
export class Timeline extends Component {
  static propTypes = {
    id: string.isRequired,
  }

  constructor(props) {
    super(props)
  }

  renderTracks() {
    const {tracks} = this.props

    return map(
      tracks,
      (track, idx) => (
        <Track
          key={idx}
          id={track.id}
          type={track.type}
          />
      )
    )
  }
  
  render() {
    return (
      <div className={css.timelineContainer}>
        <TimeAxis/>
        <div className={css.tracksContainer}>
          {this.renderTracks()}
        </div>
      </div>
    )
  }
}
