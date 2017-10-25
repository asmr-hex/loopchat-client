import React, {Component} from 'react'
import {connect} from 'react-redux'
import {number, shape, string} from 'prop-types'
import {map} from 'lodash'
import {getTracksFromTimeline} from '../../../../redux/selectors/timelines'
import {TrackInput} from './trackInput'


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  tracks: getTracksFromTimeline(state, ownProps.id),
})

@connect(mapStateToProps, actions)
export class InputControlPanel extends Component {
  static propTypes = {
    id: string.isRequired,
    layout: shape({
      x: number.isRequired,
      y: number.isRequired,
      width: number.isRequired,
      height: number.isRequired,
      yOffset: number.isRequired,
    }).isRequired
  }

  renderTrackInputs() {
    const {tracks, layout} = this.props

    return map(
      tracks,
      (track, idx) => (
        <TrackInput
          key={idx}
          trackId={track.id}
          layout={{
            x: 0,
            y: 0,
            width: layout.width,
            height: (layout.height - layout.yOffset) / tracks.length,
          }}
        />
      )
    )
  }
  
  render() {
    const {id} = this.props
    const styles = {
      display: 'flex',
      flexDirection: 'column',
      width: this.props.layout.width,
      height: this.props.layout.height,
      left: this.props.layout.x,
      top: this.props.layout.y,
      backgroundColor: 'red',
    }

    return (
      <div className={`input-control-panel-${id}`} style={{...styles}}>
        <div className={'input-controls-toggle'} style={{...styles, height: this.props.layout.yOffset}}/>
        {this.renderTrackInputs()}
      </div>
    )
  }
}
