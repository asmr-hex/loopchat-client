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
  registerHandlerTo('.midi-note-right-boundary', midiNoteRightBoundary => {
    return drag().on('drag', () => {
      const midiNoteId = midiNoteRightBoundary.attr('data-note-id')
      const leftBoundaryX = parseFloat(select(`#midi-note-left-boundary-${midiNoteId}`).attr('x1'))
      const rightBoundaryX = parseFloat(select(`#midi-note-right-boundary-${midiNoteId}`).attr('x1'))
      const midiNote = select(`#midi-note-${midiNoteRightBoundary.attr('data-note-id')}`)
      const {x,dx} = currentEvent

      console.log("dx", dx)
      console.log("rightBoundaryX: ", midiNoteRightBoundary.attr('x1'))
      console.log("dx type: ", typeof(dx))
      
      // constrain resizing
      if (rightBoundaryX + dx <= leftBoundaryX || x + dx <= leftBoundaryX) return

      console.log("WE ARE HERE")

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
const registerHandlerTo = (elements, f) =>
      selectAll(elements).each(function () {
        const element = select(this)
        
        element.call(f(element))
      })
