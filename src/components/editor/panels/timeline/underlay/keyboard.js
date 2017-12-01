import React, {Component} from 'react'
import {map, range} from 'lodash'
import {
  DEFAULT_NOTE_PIXELS_PER_HEIGHT_PIXELS,
  DEFAULT_TIMELINE_LENGTH,
  DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE,
  MIDI_NOTE_MAX,
} from '../constants'


export class KeyboardUnderlay extends Component {
  constructor(props) {
    super(props)
  }

  renderKeyUnderlays() {
    const {show, x, y, width, height, pitchStart, pitchEnd} = this.props

    // return nothing if keyboard underlay is disabled
    if (!show) return []

    return map(
      range(MIDI_NOTE_MAX),
      offset => {
        const currentPitch = MIDI_NOTE_MAX - offset
        const pitchY = (MIDI_NOTE_MAX - currentPitch) * DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE
        
        return this.renderKeyRect(
          x,
          pitchY,
          width,
          0, // get rid of this
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
        x={0}
        y={y}
        width={DEFAULT_TIMELINE_LENGTH}
        height={DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE}
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
