import React from 'react'
import {select, selectAll, event as currentEvent} from 'd3-selection'
import {drag} from 'd3-drag'

export const handleMidiNoteDragging = () =>
  registerHandlerTo('.midi-note', midiNote => {
    
    return drag().on('drag', () => {
      console.log(midiNote)
      console.log(midiNote.id)
      midiNote.attr('x', currentEvent.x + currentEvent.dx)
    })
  })

export const handleMidiNoteResize = () =>
  registerHandlerTo('.midi-note', midiNote => {

    return 
  })

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
