import React, {Component} from 'react'
import {object, array} from 'prop-types'
import {filter, map} from 'lodash'
import {select, selectAll, event as currentEvent} from 'd3-selection'
import {drag} from 'd3-drag'
import {MidiNote} from './note'


export class MidiNotes extends Component {
  static propTypes = {
    notes: array.isRequired,
    view: object.isRequired,
    timeInterval: object.isRequired,
    pitchInterval: object.isRequired,
    scale: object.isRequired,
  }

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
    this._registerHandlerTo('.midi-note', midiNote => {
      return drag().on('drag', () => {
        const midiNoteId = midiNote.attr('data-note-id')
        const midiNoteX = parseFloat(midiNote.attr('x'))
        const {dx} = currentEvent
        const width = parseFloat(midiNote.attr('width'))

        // drag midiNote rectangle
        midiNote.attr('x', midiNoteX + dx)

        // select left boundary and adjust its position
        select(`#midi-note-left-boundary-${midiNoteId}`)
          .attr('x1', midiNoteX + dx)
          .attr('x2', midiNoteX + dx)

        // select right boundary and adjust its position
        select(`#midi-note-right-boundary-${midiNoteId}`)
          .attr('x1', midiNoteX + width + dx)
          .attr('x2', midiNoteX + width + dx)
      })
    })    
  }

  registerResizeHandlers() {
    // register left boundary
    this._registerHandlerTo('.midi-note-left-boundary', midiNoteLeftBoundary => {
      return drag().on('drag', () => {
        const midiNoteId = midiNoteLeftBoundary.attr('data-note-id')
        const rightBoundary = parseFloat(select(`#midi-note-right-boundary-${midiNoteId}`).attr('x1'))
        const leftBoundary = parseFloat(select(`#midi-note-left-boundary-${midiNoteId}`).attr('x1'))
        const midiNote = select(`#midi-note-${midiNoteId}`)
        const {dx} = currentEvent

        // constrain resizing
        if (leftBoundary + dx >= rightBoundary) return
        
        // move right boundary
        midiNoteLeftBoundary.attr('x1', leftBoundary + dx)
        midiNoteLeftBoundary.attr('x2', leftBoundary + dx)

        // adjust width of midinote element
        midiNote.attr('width', parseFloat(midiNote.attr('width')) - dx)
        midiNote.attr('x', parseFloat(midiNote.attr('x')) + dx)
      })
    })

    // register right boundary
    this._registerHandlerTo('.midi-note-right-boundary', midiNoteRightBoundary => {
      return drag().on('drag', () => {
        const midiNoteId = midiNoteRightBoundary.attr('data-note-id')
        const leftBoundaryX = parseFloat(select(`#midi-note-left-boundary-${midiNoteId}`).attr('x1'))
        const rightBoundaryX = parseFloat(select(`#midi-note-right-boundary-${midiNoteId}`).attr('x1'))
        const midiNote = select(`#midi-note-${midiNoteRightBoundary.attr('data-note-id')}`)
        const {x,dx} = currentEvent

        // constrain resizing
        if (rightBoundaryX + dx <= leftBoundaryX) return

        // adjust width of midinote element
        midiNote.attr('width', parseFloat(midiNote.attr('width')) + dx)
        
        // move right boundary
        midiNoteRightBoundary.attr('x1', rightBoundaryX + dx)
        midiNoteRightBoundary.attr('x2', rightBoundaryX + dx)
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
  
  render() {
    const {notes, view, timeInterval, pitchInterval, scale} = this.props
    
    // filter out non-visible notes
    const visibleNotes = this.filterVisibleNotes(notes, timeInterval, pitchInterval)
    
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
