import React, {Component} from 'react'
import {connect} from 'react-redux'
import {string, bool, array} from 'prop-types'
import {startPlayback, stopPlayback} from '../../../../../redux/actions/timelines/timelines'


const actions = {
  startPlayback,
  stopPlayback,
}

@connect(state =>({}), actions)
export class PlayButton extends Component {
  static propTypes = {
    timelineId: string.isRequired,
    playing: bool.isRequired,
  }

  handlePlayback() {
    const {timelineId, playing, startPlayback, stopPlayback} = this.props
    
    if (!playing) {
      startPlayback(timelineId)
    } else {
      stopPlayback(timelineId)
    }
  }
  
  render() {
    const {playing} = this.props
    
    return (
      <button onClick={() => this.handlePlayback()}>
        {
          playing ? 'stop' : 'play'
        }
      </button>
    )
  }
}
