import React, {Component} from 'react'
import {connect} from 'react-redux'
import {string, bool, array} from 'prop-types'
import {IconButton} from 'material-ui'
import ForwardIcon from 'material-ui/svg-icons/av/skip-next'
import BackIcon from 'material-ui/svg-icons/av/skip-previous'
import {startPlayback, stopPlayback} from '../../../../../redux/actions/timelines/timelines'
import {blue, green, orange, red} from '../../../../../styles/palette.css'

const actions = {}

@connect(state =>({}), actions)
export class SkipButton extends Component {
  static propTypes = {
    timelineId: string.isRequired,
    direction: string.isRequired,
  }

  render() {
    const {direction} = this.props
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
      <IconButton onClick={() => console.log(`skipping to ${direction}`)} iconStyle={iconStyles} style={buttonStyles}>
        {
          direction === 'end' ? <ForwardIcon color={blue} hoverColor={green}/> : <BackIcon color={blue} hoverColor={green}/>
        }
      </IconButton>
    )
  }
}
