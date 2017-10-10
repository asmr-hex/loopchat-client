import React, {Component} from 'react'
import {object, bool} from 'prop-types'


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

  render() {
    const {view, style} = this.props

    return (
      <rect
        className='time-axis'
        x={view.x}
        y={view.y}
        width={view.width}
        height={view.height}
        style={style}
      />
    )
  }
}
