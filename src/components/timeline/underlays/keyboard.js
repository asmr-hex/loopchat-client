import React, {Component} from 'react'
import {map, range} from 'lodash'
import {DEFAULT_NOTE_PIXELS_PER_HEIGHT_PIXELS} from '../constants'


export class KeyboardUnderlay extends Component {
  constructor(props) {
    super(props)
  }

  renderKeyUnderlays() {
    const {show, x, y, width, height, pitchStart, pitchEnd} = this.props

    // return nothing if keyboard underlay is disabled
    if (!show) return []

    const pitchRange = pitchEnd - pitchStart + 1 // must be inclusive of start and end
    const yScalingFactor = height / pitchRange

    return map(
      range(pitchRange),
      offset => {
        const currentPitch = pitchEnd - offset
        const pitchY = (pitchEnd - currentPitch) * yScalingFactor
        
        return this.renderKeyRect(
          x,
          y + pitchY,
          width,
          yScalingFactor,
          this.isBlackKey(currentPitch),
          offset,
        )
      }
    )
  }

  renderKeyRect(x, y, width, height, keyIsBlack, id, blackKeyColor='#eb8291', whiteKeyColor='#ffc97f') {
    const style = {
      fill: keyIsBlack ? blackKeyColor : whiteKeyColor
    }

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={style}
        key={id}
      />
    )
  }

  isBlackKey(keyNumber) {
    const octaveBlackKeys = {
      0: false,
      1: true,
      2: false,
      3: true,
      4: false,
      5: false,
      6: true,
      7: false,
      8: true,
      9: false,
      10: true,
      11: false,
    }

    return octaveBlackKeys[keyNumber % 12]
  }
  
  render() {    
    return (
      <g>
        {this.renderKeyUnderlays()}
      </g>
    )
  }
}
