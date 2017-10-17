import React, { Component } from 'react'
import {array, bool, number, object, string} from 'prop-types'
import './timeline.css'
import {TimelineControls} from '../timeline/timelineControls'
import {KeyboardUnderlay} from './underlays/keyboard'
import {TimeGrid} from './underlays/timeGrid'
import {MidiNotes} from './midi/notes'
import {TimeAxis} from './panels/time/axis'
import {Scrubber} from './controls/scrubber'


export class Timeline extends Component {
  static propTypes = {
    id: string.isRequired,
    tracks: array.isRequired,
    selections: object.isRequired,
    tempo: number.isRequired,
    timeSignature: string.isRequired,
    playing: bool.isRequired,
    scrubberTime: number.isRequired,
    inputDevices: array.isRequired, // TODO (cw|10.17.2017) move this to track component
    styles: object,
  }

  static defaultProps = {
    style: {
      width: 800,
      height: 200,
      background: '#ffbf75',
    }
  }
  
  constructor(props) {
    super(props)
  }

  getTimelineStyles() {
    const {width, height, background} = this.props
    const top = (window.innerHeight - height)/2
    const left = (window.innerWidth - width)/2

    return ({width, height, top, left, background})
  }

  getSampleData() {
    const notes = [
      {start: 4.00, end: 5.00, pitch: 4, id: 0},
      {start: 4.99, end: 8.23, pitch: 6, id: 1},
      {start: 10.01, end: 13.70, pitch: 6, id: 2},
      {start: 12.02, end: 13.88, pitch: 9, id: 3},
      {start: 13.88, end: 18.23, pitch: 1, id: 4},
    ]

    const view = {
      x: 0,
      y: 0,
      width: this.props.width,
      height: this.props.height,
    }

    const timeInterval = {
      start: 0.00,
      end: 24.00,
    }

    const pitchInterval = {
      start: 0,
      end: 12,
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

    // partition different views
    const timeAxisView = {x: 0, y:0, width: view.width, height: 20}
    const notesView = {x: 0, y: timeAxisView.height, width: view.width, height: view.height - timeAxisView.height}

    // compute visual scale (NOTE: this is for the notesView)
    // TODO (cw|10.12.2017) each panel should have its own scale
    const scale = {
      x: notesView.width / (timeInterval.end - timeInterval.start),
      y: notesView.height / (pitchInterval.end - pitchInterval.start + 1),
    }
    
    return (
      <div>
        <TimelineControls
          width={800}
          height={200}
          background={'#ffffff'}
          inputs={this.props.inputDevices}
          timelineId={this.props.id}
          playing={this.props.playing}
          />
        <div className='timeline-container' style={styles}>
          <svg
            className='timeline'
            ref={element => this.element = element}
            width={styles.width}
            height={styles.height}
            >
            <KeyboardUnderlay
              show={showKeyboardGrid}
              x={notesView.x}
              y={notesView.y}
              width={notesView.width}
              height={notesView.height}
              pitchStart={pitchInterval.start}
              pitchEnd={pitchInterval.end}
              />
            <TimeGrid
              show={showTimeGrid}
              view={notesView}
              timeInterval={timeInterval}
              scale={scale}
              />
            <MidiNotes
              notes={notes}
              view={notesView}
              timeInterval={timeInterval}
              pitchInterval={pitchInterval}
              scale={scale}
              />
            <TimeAxis
              show={true}
              view={timeAxisView}
              timeInterval={timeInterval}
              scale={scale}
              />
            <Scrubber
              view={view}
              time={this.props.scrubberTime}
              scale={scale}
              playing={this.props.playing}
              timelineId={this.props.id}
              />
          </svg>
        </div>
      </div>
    )
  }
}
