import React, {Component} from 'react'
import {number, shape, string} from 'prop-types'
import {connect} from 'react-redux'
import {map} from 'lodash'
import {getTimelineProperty, getTracksFromTimeline} from '../../../../redux/selectors/timelines'
import {getTimelineUIProperty} from '../../../../redux/selectors/ui/timelines'
import {Track} from './track/track'
import {TimeAxis} from './timeAxis'
import {Scrubber} from './scrubber'


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
    layout: shape({
      x: number.isRequired,
      y: number.isRequired,
      width: number.isRequired,
      height: number.isRequired,
    }).isRequired
  }

  constructor(props) {
    super(props)

    this.state = this.computeInitialSubPanelLayouts()
  }

  computeInitialSubPanelLayouts() {
    const {width, height} = this.props.layout
    
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

  renderTracks() {
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
          />
      )
    )
  }
  
  render() {
    const styles = {
      width: this.props.layout.width,
      height: this.props.layout.height,
      left: this.props.layout.x,
      top: this.props.layout.y,
      backgroundColor: 'green',
    }
    
    return (
      <div className={`timeline-container-${this.props.id}`} style={{...styles}}>
        <svg viewBox={`0 0 ${styles.width} ${styles.height}`} className={`timeline-${this.props.id}`} ref={element => this.element = element}>
          {this.renderTracks()}
          <TimeAxis
            show={true}
            view={this.state.timeAxisView}
            timeInterval={this.props.timeInterval}
            />
          <Scrubber
            view={this.props.layout}
            time={this.props.scrubberTime}
            timeInterval={this.props.timeInterval}
            playing={this.props.playing}
            timelineId={this.props.id}
            />
        </svg>
      </div>
    )
  }
}
