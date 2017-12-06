import React, {Component} from 'react'
import {object, bool} from 'prop-types'
import {ceil, floor, map, range} from 'lodash'
import css from './index.css'
import {timeAxisHeight} from '../input/index.css'
import {
  DEFAULT_TIMELINE_LENGTH,
  DEFAULT_UNIT_LENGTH_PER_SECOND,
  DEFAULT_N_SECONDS,
} from './constants.js'
import {newTransform, scale, translate} from './transforms'
import {midGrey, lightGrey} from '../../../../styles/palette.css'


export class TimeAxis extends Component {
  static propTypes = {
    show: bool,
    style: object,
  }

  static defaultProps = {
    show: true,
    style: {
      fill: 'pink',
    },
  }
  
  constructor(props) {
    super(props)

    // setup onWheel handler.
    this.onWheel = newTransform([
      scale('x', event => Math.abs(event.deltaY) < 15 ? 0 : event.deltaY / 1000),
      translate('x', event => event.deltaX, {min: -30000, max: 0}),
    ])(['.time-axis', '.track'])
  }

  renderTicks() {
    // compute tick coordinates
    const tickHeightRatio = 0.30
    const tickHeight = parseFloat(timeAxisHeight) * tickHeightRatio
    const tickHeightCompliment = parseFloat(timeAxisHeight) * (1 - tickHeightRatio)
    const y1 = tickHeightCompliment
    const y2 = y1 + tickHeight
    
    return map(
      range(DEFAULT_N_SECONDS),
      idx => (
        <g key={idx}>
          <line
            x1={idx * DEFAULT_UNIT_LENGTH_PER_SECOND}
            y1={y1}
            x2={idx * DEFAULT_UNIT_LENGTH_PER_SECOND}
            y2={y2}
            stroke={lightGrey}
            strokeWidth={1}
            />
          <text
            x={idx * DEFAULT_UNIT_LENGTH_PER_SECOND - 4}
            y={tickHeightCompliment - 5}
            fontFamily={'helvetica'}
            fontSize={'8px'}
            fill={lightGrey}
          >
            {idx}
          </text>
        </g>
      )
    )    
  }

  render() {

    return (
      <div className={css.timelineAxisContainer}>
        <svg width={'100%'} height={'100%'} onWheel={(e) => this.onWheel(e)}>
          <g className='time-axis' ref={(elem) => {this.timeAxisElem = elem}}>
            <rect
              x={0}
              y={0}
              width={DEFAULT_TIMELINE_LENGTH} // this width should be the total timeline width
              height={timeAxisHeight}
              fill={midGrey}
              />
            {this.renderTicks()}
          </g>
        </svg>
      </div>
    )
  }
}
