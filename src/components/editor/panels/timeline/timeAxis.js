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

    this.translation = 0
    this.scale = 1
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
            stroke={'#b24c72'}
            strokeWidth={1}
            />
          <text
            x={idx * DEFAULT_UNIT_LENGTH_PER_SECOND}
            y={tickHeightCompliment}
            fontFamily={'helvetica'}
            fontSize={'8px'}
            fill={'black'}
          >
            {idx}
          </text>
        </g>
      )
    )    
  }

  handleWheel(e) {

    if (this.translate(e) || this.scaleX(e)) {
      this.timeAxisElem.setAttribute(
        'transform',
        `translate(${this.translation}, 0), scale(${this.scale}, 1)`,
      )
    }
  }
  
  translate({deltaX}) {
    if (deltaX !== 0 && this.translation <= 0) {
      // truncate deltaX if it causes translation to be greater than 0
      const dX = this.translation + deltaX > 0 ? deltaX - (this.translation + deltaX) : deltaX      
      this.translation += dX

      return true
    }
  }

  scaleX({deltaY}) {
    if (Math.abs(deltaY) > 15) {
      this.scale *= 1 + (deltaY / 1000)

      return true
    }
  }
  
  render() {

    return (
      <div className={css.timelineAxisContainer}>
        <svg width={'100%'} height={'100%'} onWheel={(e) => this.handleWheel(e)}>
          <g className='time-axis' ref={(elem) => {this.timeAxisElem = elem}}>
            <rect
              x={0}
              y={0}
              width={DEFAULT_TIMELINE_LENGTH} // this width should be the total timeline width
              height={timeAxisHeight}
              fill={'pink'}
              />
            {this.renderTicks()}
          </g>
        </svg>
      </div>
    )
  }
}
