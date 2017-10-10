import React, { Component } from 'react'
import {select, selectAll, event as currentEvent} from 'd3-selection'
import {drag} from 'd3-drag'
import {forEach} from 'lodash'
import './timeline.css'
import {KeyboardUnderlay} from './underlays/keyboard'
import {TimeGrid} from './underlays/timeGrid'
import {MidiNotes} from './midi/notes'


export class Timeline extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
  }

  componentDidUpdate(){
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
      {start: 4.23, pitch: 4, id: 0},
      {start: 4.99, pitch: 6, id: 1},
      {start: 6.01, pitch: 2, id: 2},
      {start: 12.02, pitch: 9, id: 3},
      {start: 13.88, pitch: 1, id: 4},
    ]

    const view = {
      x: 0,
      y: 0,
      width: this.props.width,
      height: this.props.height,
    }

    const timeInterval = {
      start: 0.00,
      end: 16.00,
    }

    const pitchInterval = {
      start: 0,
      end: 14,
    }

    const showKeyboardGrid = true
    const showTimeGrid = true

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

    // compute visual scale
    const scale = {
      x: view.width / (timeInterval.end - timeInterval.start),
      y: view.height / (pitchInterval.end - pitchInterval.start + 1),
    }

    
    return (
      <div className='timeline-container' style={styles}>
        <svg
          className='timeline'
          ref={element => this.element = element}
          width={styles.width}
          height={styles.height}
          >
          <KeyboardUnderlay
            show={showKeyboardGrid}
            x={0}
            y={0}
            width={view.width}
            height={view.height}
            pitchStart={pitchInterval.start}
            pitchEnd={pitchInterval.end}
          />
          <TimeGrid
            show={showTimeGrid}
            view={view}
            timeInterval={timeInterval}
            scale={scale}
          />
          <MidiNotes
            notes={notes}
            view={view}
            timeInterval={timeInterval}
            pitchInterval={pitchInterval}
            scale={scale}
          />
        </svg>
      </div>
    )
  }
}
