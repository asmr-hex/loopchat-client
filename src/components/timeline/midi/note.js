import React, {Component} from 'react'
import {object, number, string} from 'prop-types'
import {
  DEFAULT_NOTE_PIXELS_PER_HEIGHT_PIXELS,
  DEFAULT_NOTE_PIXELS_PER_WIDTH_PIXELS,
} from '../constants'


export class MidiNote extends Component {
  
  static propTypes = {
    view: object.isRequired,
    timeInterval: object.isRequired,
    pitchInterval: object.isRequired,
    scale: object.isRequired,
    note: object.isRequired,
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
    pitchInterval: {
      start: 0,
      end: 16,
    },
    scale: {
      x: 1,
      y: 1,
    },
    note: {
      start: 0,
      end: 1,
      pitch: 0,
      id: 'fill-in',
    },
    style: {
      fill: '#c9e7db',
      cursor: 'move',
    }
  }
  
  constructor(props) {
    super(props)
  }

  renderMidiNoteRect(x, y, width, height) {
    const {note, style} = this.props

    return (
      <rect
        className={'midi-note'}
        id={`midi-note-${note.id}`}
        x={x}
        y={y}
        width={width}
        height={height}
        style={style}
        data-note-id={note.id}
        data-pitch={note.pitch}
      />
    )
  }

  renderMidiNoteBoundary(x, y1, y2, side) {
    const {note} = this.props
    
    const style = {
      cursor: 'ew-resize',
      stroke: 'black',
      strokeWidth: 3,
      opacity: 100,
    }

    return (
      <line
        className={`midi-note-${side}-boundary`}
        id={`midi-note-${side}-boundary-${note.id}`}
        x1={x}
        x2={x}
        y1={y1}
        y2={y2}
        style={style}
        data-note-id={note.id}
      />
    )
  }
  
  computeGeometry(scale) {
    const {view, timeInterval, pitchInterval, note} = this.props
    
    // compute dimensions of this midi note
    // TODO (cw|10.9.2017) modify width definition to take into account midi length
    const width = view.width * DEFAULT_NOTE_PIXELS_PER_WIDTH_PIXELS
    const height = view.height * DEFAULT_NOTE_PIXELS_PER_HEIGHT_PIXELS
    
    // compute position of this midi note
    const x1 = (note.start - timeInterval.start) * scale.x
    const y1 = (pitchInterval.end - note.pitch) * scale.y
    const x2 = x1 + width
    const y2 = y1 + height

    return {x1, y1, x2, y2, width, height}
  }
  
  render() {
    const {scale, note} = this.props
    const {x1, y1, x2, y2, width, height} = this.computeGeometry(scale)
    
    return (
      <g key={note.id}>
        {this.renderMidiNoteRect(x1, y1, width, height)}
        {this.renderMidiNoteBoundary(x1, y1, y2, 'left')}
        {this.renderMidiNoteBoundary(x2, y1, y2, 'right')}
      </g>
    )
  }
}
