import React, {Component} from 'react'
import {object, bool} from 'prop-types'
import {ceil, map, range} from 'lodash'
import {
  DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE,
  DEFAULT_UNIT_LENGTH_PER_SECOND,
  DEFAULT_N_SECONDS,
  MIDI_NOTE_MAX,
} from '../constants'
import {lightGrey} from '../../../../../styles/palette.css'


export class TimeGrid extends Component {
  static propTypes = {
    show: bool,
    style: object,
  }

  static defaultProps = {
    show: true,
    style: {
      stroke: lightGrey,
      // strokeDasharray: '3,5',
    },
  }
  
  constructor(props) {
    super(props)
  }
  
  renderTimeGrid() {
    const {show, style} = this.props

    // if we aren't showing the time grid, just return an empty array immediately
    if (!show) return []

    return map(
      range(DEFAULT_N_SECONDS),
      offset => {
        const x = offset * DEFAULT_UNIT_LENGTH_PER_SECOND
        const height = DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE * MIDI_NOTE_MAX
        
        return (
          <line
            x1={x}
            x2={x}
            y1={0}
            y2={height}
            style={style}
            key={offset}
            />
        )
      }
    )
  }

  render() {
    return (
      <g>
        {this.renderTimeGrid()}
      </g>
    )
  }
}
