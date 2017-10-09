import React from 'react'
import {select, selectAll, event as currentEvent} from 'd3-selection'
import {drag} from 'd3-drag'

export const handleMidiNoteDragging = () =>
  registerHandlerTo('.midi-note', midiNote => {
    return drag().on('drag', () => {
      const midiNoteId = midiNote.attr('data-note-id')
      const {x, dx} = currentEvent
      const width = parseFloat(midiNote.attr('width'))

      // drag midiNote rectangle
      midiNote.attr('x', x + dx)

      // select left boundary and adjust its position
      select(`#midi-note-left-boundary-${midiNoteId}`)
        .attr('x1', x + dx)
        .attr('x2', x + dx)

      // select right boundary and adjust its position
      select(`#midi-note-right-boundary-${midiNoteId}`)
        .attr('x1', x + width + dx)
        .attr('x2', x + width + dx)
    })
  })

export const handleMidiNoteResize = () => {
  // register left boundary
  registerHandlerTo('.midi-note-left-boundary', midiNoteLeftBoundary => {
    return drag().on('drag', () => {
      const midiNoteId = midiNoteLeftBoundary.attr('data-note-id')
      const rightBoundary = select(`#midi-note-right-boundary-${midiNoteId}`).attr('x1')
      const midiNote = select(`#midi-note-${midiNoteId}`)
      const {x, dx} = currentEvent

      // constrain resizing
      if (x + dx >= rightBoundary) return
      
      // move right boundary
      midiNoteLeftBoundary.attr('x1', x + dx)
      midiNoteLeftBoundary.attr('x2', x + dx)

      // adjust width of midinote element
      midiNote.attr('width', parseInt(midiNote.attr('width')) - dx)
      midiNote.attr('x', parseInt(midiNote.attr('x')) + dx)
    })
  })

  // register right boundary
  registerHandlerTo('.midi-note-right-boundary', midiNoteRightBoundary => {
    return drag().on('drag', () => {
      const midiNoteId = midiNoteRightBoundary.attr('data-note-id')
      const leftBoundary = select(`#midi-note-left-boundary-${midiNoteId}`).attr('x1')
      const midiNote = select(`#midi-note-${midiNoteRightBoundary.attr('data-note-id')}`)
      const {x, dx} = currentEvent

      // constrain resizing
      if (x + dx <= leftBoundary) return

      // adjust width of midinote element
      midiNote.attr('width', parseInt(midiNote.attr('width')) + dx)
      
      // move right boundary
      midiNoteRightBoundary.attr('x1', x + dx)
      midiNoteRightBoundary.attr('x2', x + dx)
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
const registerHandlerTo = (elements, f) =>
      selectAll(elements).each(function () {
        const element = select(this)
        
        element.call(f(element))
      })
