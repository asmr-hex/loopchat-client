import React, {Component} from 'react'
import {object, bool} from 'prop-types'
import {ceil, floor, map, range} from 'lodash'
import css from './index.css'


export class TimeAxis extends Component {
  static propTypes = {
    view: object,
    timeInterval: object.isRequired,
    show: bool,
    style: object,
  }

  static defaultProps = {
    view: {
      x: 0,
      y: 0,
      width: 1075.2,
      height: 32,
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

    // compute the x scaling factor for this component (only depends on time units)
    this.computeScalingFactor()

    this.translation = 0
    this.xScale = 1
  }

  componentWillUpdate() {
    // recompute the scaling factor
    this.computeScalingFactor()
  }
  
  computeScalingFactor() {
    const {view, timeInterval} = this.props

    // we only care about the x scaling factor in this component since the y axis has no units
    const scale = {
      x: view.width / (timeInterval.end - timeInterval.start),
    }

    this.scale = scale
  }
  
  renderTicks() {
    const {view, timeInterval} = this.props
    const {scale} = this

    // how many seconds are contained
    const duration = timeInterval.end - timeInterval.start
    const firstTick = ceil(timeInterval.start)
    const nTicks = floor(duration) + 100

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

  handleWheel(e) {
    this.translate(e)
    this.scaleX(e)

    const {view} = this.props
    
    if (this.translate(e) || this.scaleX(e)) {
      this.timeAxisElem.setAttribute('transform', `translate(${this.translation}, 0), scale(${this.xScale}, 1)`)
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
      this.xScale *= 1 + (deltaY / 1000)

      return true
    }
  }
  
  render() {
    const {view, style} = this.props

    // viewBox={`0 0 ${20} ${32}`}
    
    return (
      <div className={css.timelineAxisContainer}>
        <svg className={css.timelineAxis} width={'100%'} height={'100%'} onWheel={(e) => this.handleWheel(e)} ref={(elem) => {this.svgElem = elem}}>
          <g ref={(elem) => {this.timeAxisElem = elem}}>
            <rect
              className='time-axis'
              x={0}
              y={0}
              width={view.width + 300} // this width should be the total timeline width
              height={view.height}
              fill={'pink'}
              />
            {this.renderTicks()}
          </g>
        </svg>
      </div>
    )
  }
}
