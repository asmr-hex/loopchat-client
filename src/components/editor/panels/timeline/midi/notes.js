import React, {Component} from 'react'
import {object, array} from 'prop-types'
import {filter, flatMap, map, values} from 'lodash'
import {select, selectAll, event as currentEvent} from 'd3-selection'
import {drag} from 'd3-drag'
import {DEFAULT_NOTE_PIXELS_PER_HEIGHT_PIXELS} from '../constants'
import {MidiNote} from './note'
import {
  consolidateNotes,
  normalizeOverdubTime,
} from '../../../../../redux/reducers/recordings/midi/midi'


export class MidiNotes extends Component {
  static propTypes = {
    notes: array.isRequired,
    inProgressRecordings: object.isRequired,
    view: object.isRequired,
    timeInterval: object.isRequired,
    pitchInterval: object.isRequired,
    scale: object.isRequired,
  }

  // TODO (cw|1027.2017) get rid of defaultProps and just describe the
  // shape of the props within propTypes.
  static defaultProps = {
    notes: [],
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
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    this.registerEventHandlers()
  }
  
  filterVisibleNotes(notes, timeInterval, pitchInterval) {
    return filter(
      notes,
      note =>
        note.start >= timeInterval.start
        && note.start <= timeInterval.end
        && note.pitch >= pitchInterval.start
        && note.pitch <= pitchInterval.end
    )
  }

  registerEventHandlers() {
    this.registerDragHandlers()
    this.registerResizeHandlers()
  }

  registerDragHandlers() {
    const {view, pitchInterval, scale} = this.props

    this._registerHandlerTo('.midi-note', note => {
      return drag().on('drag', () => {
        const {dx, dy} = currentEvent
        const eventY = currentEvent.y
        const id = note.attr('data-note-id')
        const x = parseFloat(note.attr('x'))
        const y = parseFloat(note.attr('y'))
        const width = parseFloat(note.attr('width'))
        const height = parseFloat(note.attr('height'))

        const rBound = select(`#midi-note-right-boundary-${id}`)
        const lBound = select(`#midi-note-left-boundary-${id}`)
        
        // drag midiNote rectangle
        note.attr('x', x + dx)

        // select right boundary and adjust its position
        rBound.attr('x1', x + width + dx).attr('x2', x + width + dx)

        // select left boundary and adjust its position
        lBound.attr('x1', x + dx).attr('x2', x + dx)

        // handle vertical movement on the pitch axis
        if (Math.abs(eventY - y) >= (height)) {
          const pitch = parseInt(note.attr('data-pitch'))
          const newPitch = pitch - Math.sign(dy)
          const newY = view.y + (pitchInterval.end - newPitch) * scale.y

          note.attr('y', newY)
          note.attr('data-pitch', newPitch)

          // select right boundary and adjust its position
          rBound.attr('y1', newY).attr('y2', newY + height)
        
          // select left boundary and adjust its position
          lBound.attr('y1', newY).attr('y2', newY + height)
        }
      })
    })    
  }

  registerResizeHandlers() {
    // register left boundary
    this._registerHandlerTo('.midi-note-left-boundary', lBoundary => {
      return drag().on('drag', () => {
        const {dx} = currentEvent
        const id = lBoundary.attr('data-note-id')
        const rX = parseFloat(select(`#midi-note-right-boundary-${id}`).attr('x1'))
        const lX = parseFloat(select(`#midi-note-left-boundary-${id}`).attr('x1'))
        const note = select(`#midi-note-${id}`)

        // constrain resizing
        if (lX + dx >= rX) return
        
        // move right boundary
        lBoundary.attr('x1', lX + dx)
        lBoundary.attr('x2', lX + dx)

        // adjust width of midinote element
        note.attr('width', parseFloat(note.attr('width')) - dx)
        note.attr('x', parseFloat(note.attr('x')) + dx)
      })
    })

    // register right boundary
    this._registerHandlerTo('.midi-note-right-boundary', rBoundary => {
      return drag().on('drag', () => {
        const {dx} = currentEvent
        const id = rBoundary.attr('data-note-id')
        const lX = parseFloat(select(`#midi-note-left-boundary-${id}`).attr('x1'))
        const rX = parseFloat(select(`#midi-note-right-boundary-${id}`).attr('x1'))
        const note = select(`#midi-note-${rBoundary.attr('data-note-id')}`)

        // constrain resizing
        if (rX + dx <= lX) return

        // move right boundary
        rBoundary.attr('x1', rX + dx)
        rBoundary.attr('x2', rX + dx)

        // adjust width of midinote element
        note.attr('width', parseFloat(note.attr('width')) + dx)
      })
    })
  }
  
  /**
   * registerHandlerTo selects all elements of a specified class and registers the
   * provided event handlers to them.
   * Note that we must use the 'function' keyword s.t. the 'this' keyword is lexically
   * bound to the 'each' callback function.
   *
   * @param elements
   * @param f
   */
  _registerHandlerTo(elements, f) {
    selectAll(elements).each(function () {
      const element = select(this)
      
      element.call(f(element))
    }) 
  }

  transformInProgressRecordings() {
    const {inProgressRecordings} = this.props

    const transformedNotes = flatMap(
      values(inProgressRecordings),
      inProgressRecording => map(
        consolidateNotes(normalizeOverdubTime(inProgressRecording).events),
        note => ({...note, inProgress: true, overdubId: inProgressRecording.id})
      )
    )

    return transformedNotes
  }
  
  render() {
    const {notes, view, timeInterval, pitchInterval, scale} = this.props
    
    // filter out non-visible notes
    const visibleNotes = [
      ...map(this.filterVisibleNotes(notes, timeInterval, pitchInterval), n => ({...n, inProgress: false})),
      ...this.transformInProgressRecordings(),
    ]
    
    
    // transform midiNotes?

    return (
      <g>
        {
          map(
            visibleNotes,
            note => (
              <MidiNote
                view={view}
                timeInterval={timeInterval}
                pitchInterval={pitchInterval}
                scale={scale}
                note={note}
                key={note.id}
              />
            )
          )
        }
      </g>
    )
  }
}
