import React, { Component } from 'react'
import {select, selectAll, event as currentEvent} from 'd3-selection'
import {drag} from 'd3-drag'
import {forEach} from 'lodash'
import './timeline.css'
import {renderVisibleNotes} from './notes'
import {renderKeyboardUnderlay} from './keyboardUnderlay'
import {renderTimeGridUnderlay} from './timeGridUnderlay'
import {
  handleMidiNoteDragging,
  handleMidiNoteResize
} from './eventHandlers'

export class Timeline extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    // this.handleUserSVGInteractions()
  }

  componentDidUpdate(){
    this.handleUserSVGInteractions()
  }

  handleUserSVGInteractions() {
    handleMidiNoteDragging()
    handleMidiNoteResize()
  }

  getTimelineStyles() {
    const {width, height, background} = this.props
    const top = (window.innerHeight - height)/2
    const left = (window.innerWidth - width)/2

    return ({
      width,
      height,
      top,
      left,
      background,
    })
  }

  getSampleData() {
    const notes = [
      {start: 4.23, pitch: 4},
      {start: 4.99, pitch: 6},
      {start: 6.01, pitch: 2},
      {start: 12.02, pitch: 9},
      {start: 13.88, pitch: 1},
    ]

    const view = {
      width: this.props.width,
      height: this.props.height,
    }

    const timeInterval = {
      start: 0.00,
      end: 16.00,
      duration: 16.00,
    }

    const pitchInterval = {
      start: 0,
      end: 14,
      length: 15,
    }

    const showKeyboardGrid = false
    const showTimeGrid = false

    return {
      notes,
      view,
      timeInterval,
      pitchInterval,
      showKeyboardGrid,
      showTimeGrid,
    }
  }
  
  render() {
    const styles = this.getTimelineStyles()
    const {
      notes,
      view,
      timeInterval,
      pitchInterval,
      showKeyboardGrid,
      showTimeGrid,
    } = this.getSampleData()
    
    return (
      <div className='timeline-container' style={styles}>
        <svg
          className='timeline'
          ref={element => this.element = element}
          width={styles.width}
          height={styles.height}
          >
          {renderKeyboardUnderlay(showKeyboardGrid, view, pitchInterval)}
          {renderTimeGridUnderlay(showTimeGrid, view, timeInterval)}
          {renderVisibleNotes(notes, view, timeInterval, pitchInterval)}
        </svg>
      </div>
    )
  }
}
