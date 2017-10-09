import React, {Component} from 'react'
import {object, array} from 'prop-types'
import {filter, map} from 'lodash'
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
