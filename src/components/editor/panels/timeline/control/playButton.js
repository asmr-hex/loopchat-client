import React, {Component} from 'react'
import {connect} from 'react-redux'
import {string, bool, array} from 'prop-types'
import {IconButton} from 'material-ui'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import StopIcon from 'material-ui/svg-icons/av/stop'
import {startPlayback, stopPlayback} from '../../../../../redux/actions/timelines/timelines'
import {blue, green, orange, red} from '../../../../../styles/palette.css'

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
    const iconStyles = {
      height: 36,
      width: 36,
    }
    const buttonStyles = {
      width: 72,
      height: 72,
      padding: 16,
    }

    return (
      <IconButton onClick={() => this.handlePlayback()} iconStyle={iconStyles} style={buttonStyles}>
        {
          playing ? <StopIcon color={red} hoverColor={orange}/> : <PlayIcon color={blue} hoverColor={green}/>
        }
      </IconButton>
    )
  }
}
