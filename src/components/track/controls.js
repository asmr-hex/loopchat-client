import React, {Component} from 'react'
import {map} from 'lodash'


export class TrackControlPanel extends Component {
  constructor(props) {
    super(props)
  }

  renderTrackControls() {
    const {tracks, view} = this.props

    return map(
      tracks,
      (track, idx) => (
        <TrackControl
          key={idx}
        />
      )
    )
  }
  
  render() {

    return (
      <div
        width={view.width}
        height={view.height}
        backgroundColor={'red'}
        >
      </div>
    )
  }
}

export class TrackControl extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {view, index, id, trackCount} = this.props
    const width = view.width
    const height = view.height / trackCount
    const top = height * index
    
    return (
      <div
        width={width}
        height={height}
        top={top}
        backgroundColor={'#000000'}
        >
        {id}
      </div>
    )
  }
}
