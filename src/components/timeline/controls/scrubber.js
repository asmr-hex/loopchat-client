import React, {Component} from 'react'
import {object, number, bool, string} from 'prop-types'
import {timer} from 'd3-timer'
import {select} from 'd3-selection'


export class Scrubber extends Component {
  static propTypes = {
    view: object.isRequired,
    time: number.isRequired,
    timeInterval: object.isRequired,
    playing: bool.isRequired,
    timelineId: string.isRequired
  }

  static defaultProps = {
    view: {
      x: 0,
      y: 0,
      width: 300,
      height: 100,
    },
    time: 5.4,
    scale: {
      x: 1,
      y: 1,
    },
    style: {
      stroke: 'black',
    },
    playing: false,
    timelineId: undefined,
  }

  constructor(props) {
    super(props)

    this.state = {playing: this.props.playing}

    // compute scaling factor
    this.computeScalingFactor()
  }

  componentWillUpdate() {
    // recompute scaling factor
    this.computeScalingFactor()
  }
  
  componentDidUpdate() {
    // if no state change has occurred, do nothing
    if (this.state.playing === this.props.playing) return

    this.setState({playing: this.props.playing})
    
    if (this.props.playing) this.animatePlayback()
  }

  computeScalingFactor() {
    const {view, timeInterval} = this.props

    // the scaling only depends on time, thus we only need x
    const scale = {
      x: view.width / (timeInterval.end - timeInterval.start),
    }

    this.scale = scale
  }
  
  animatePlayback() {
    const {time, view} = this.props
    const {scale} = this
    let t = time, last = 0

    // create a closure which can access local state (t and last)
    // this way we don't have to introduce React internal state and
    // just encapsulate state within this specific timer.
    const playbackTimer = timer((elapsed) => {
      t = t + (elapsed - last) / 1000
      last = elapsed
      const x = t * scale.x
      
      select('.scrubber').attr('x1', x).attr('x2', x)
      // .attr("transform", d => {return "translate(" + x + "," + d.get('y') + ")";});

      if (!this.state.playing) playbackTimer.stop()
      
      return !this.state.playing
    })
  }
  
  render() {
    const {view, time, style} = this.props
    const {scale} = this

    return (
      <line
        className={'scrubber'}
        x1={time * scale.x}
        y1={view.y}
        x2={time * scale.x}
        y2={view.y + view.height}
        style={style}
      />
    )
  }
}
