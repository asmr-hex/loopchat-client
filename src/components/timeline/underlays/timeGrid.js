import React, {Component} from 'react'
import {object, bool} from 'prop-types'
import {ceil, map, range} from 'lodash'


export class TimeGrid extends Component {
  static propTypes = {
    view: object.isRequired,
    timeInterval: object.isRequired,
    scale: object.isRequired,
    show: bool,
    style: object,
  }

  static defaultProps = {
    view: {
      x: 0,
      y: 0,
      width: 300,
      height: 100,
    },
    timeInterval: {
      start: 0,
      end: 30,
    },
    scale: {
      x: 1,
      y: 1,
    },
    show: true,
    style: {
      stroke: 'green',
      strokeDasharray: '3,5',
    },
  }
  
  constructor(props) {
    super(props)
  }
  
  renderTimeGrid() {
    const {show, view, timeInterval, scale} = this.props

    // if we aren't showing the time grid, just return an empty array immediately
    if (!show) return []

    return map(
      range(ceil(timeInterval.end - timeInterval.start)),
      offset => this.renderGridLine(
        ceil(timeInterval.start + offset) * scale.x,
        view.y,
        view.height,
        offset,
      )
    )
  }

  renderGridLine(x, y, height, id) {
    const {style} = this.props

    return (
      <line
        x1={x}
        x2={x}
        y1={y}
        y2={y + height}
        style={style}
        key={id}
      />
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
