import React, {Component} from 'react'
import {object, bool} from 'prop-types'
import {ceil, floor, map, range} from 'lodash'


export class TimeAxis extends Component {
  static propTypes = {
    view: object.isRequired,
    timeInterval: object.isRequired,
    show: bool,
    style: object,
  }

  static defaultProps = {
    view: {
      x: 0,
      y: 0,
      width: 300,
      height: 50,
    },
    timeInterval: {
      start: 0,
      end: 24,
    },
    show: true,
    style: {
      fill: 'pink',
    },
  }
  
  constructor(props) {
    super(props)
  }

  renderTicks() {
    const {view, timeInterval, scale} = this.props

    // how many seconds are contained
    const duration = timeInterval.end - timeInterval.start
    const firstTick = ceil(timeInterval.start)
    const nTicks = floor(duration)

    // compute tick coordinates
    const tickHeightRatio = 0.30
    const tickHeight = view.height * tickHeightRatio
    const tickHeightCompliment = view.height * (1 - tickHeightRatio)
    const y1 = view.y + tickHeightCompliment
    const y2 = y1 + tickHeight
    
    return map(
      range(nTicks),
      idx => (
        <g key={idx}>
          <line
            x1={view.x + (firstTick + idx) * scale.x}
            y1={y1}
            x2={view.x + (firstTick + idx) * scale.x}
            y2={y2}
            stroke={'#b24c72'}
            strokeWidth={2}
            />
          <text
            x={view.x + (firstTick + idx) * scale.x}
            y={view.y + tickHeightCompliment}
            fontFamily={'helvetica'}
            fontSize={'8px'}
            fill={'black'}
          >
            {firstTick + idx}
          </text>
        </g>
      )
    )
    
  }
  
  render() {
    const {view, style} = this.props
    
    return (
      <g>
        <rect
          className='time-axis'
          x={view.x}
          y={view.y}
          width={view.width}
          height={view.height}
          style={style}
        />
        {this.renderTicks()}
      </g>
    )
  }
}
