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
    const {tracks, id} = this.props

    return map(
      tracks,
      (track, idx) => (
        <Track
          key={idx}
          id={track.id}
          type={track.type}
          timelineId={id}
          />
      )
    )
  }
  
  render() {
    const {id} = this.props

    return (
      <div className={css.timelineContainer}>
        <TimeAxis timelineId={id}/>
        <div className={css.tracksContainer}>
          {this.renderTracks()}
        </div>
      </div>
    )
  }
}
