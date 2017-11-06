import {map, flatMap, times} from 'lodash'
import {fromMidi} from 'tonal-note'
import {MIDI_CONTROL_CHANGE, MIDI_NOTE_OFF, MIDI_NOTE_ON, MIDI_PITCH_BEND} from '../../../src/types/midiEvent'

// TODO (cw|10.22.2017) move this to types!
const defaultMidiNoteOnEvent = {
  type: MIDI_NOTE_ON,
  channel: 1, // 1-16,
  note: 'C4',
  velocity: 0.7480314960629921, // 0-1
  time: 0.080181405895692, // 0 - infinity
}

const defaultMidiNoteOffEvent = {
  type: MIDI_NOTE_OFF,
  channel: 1, // 1-16,
  note: 'C4',
  velocity: 0, //
  time: 0.980181405895692, // 0 - infinity
}

const defaultMidiControlChangeEvent = {
  type: MIDI_CONTROL_CHANGE,
  channel: 1, // 1-16,
  control: 120, // 0-127
  value: 0.9480314960629921, // 0-1
  time: 0.180181405895692, // 0 - infinity
}

const defaultMidiPitchBendEvent = {
  type: MIDI_PITCH_BEND,
  channel: 1, // 1-16,
  control: 121, // 0-127
  value: 0.9480314960629921, // 0-1
  time: 0.380181405895692, // 0 - infinity
}

export const getSampleMidiNoteOnEvent = (time=0, overrides={}) => ({
  ...defaultMidiNoteOnEvent,
  time: defaultMidiNoteOnEvent.time + time,
  ...overrides,
})

export const getSampleMidiNoteOffEvent = (time=0, overrides={}) => ({
  ...defaultMidiNoteOffEvent,
  time: defaultMidiNoteOffEvent.time + time,
  ...overrides,
})

export const getSampleMidiControlChangeEvent = (time=0, overrides={}) => ({
  ...defaultMidiControlChangeEvent,
  time: defaultMidiControlChangeEvent.time + time,
  ...overrides,
})

export const getSampleMidiPitchBendEvent = (time=0, overrides={}) => ({
  ...defaultMidiPitchBendEvent,
  time: defaultMidiPitchBendEvent.time + time,
  ...overrides,
})

export const getSampleMidiOnOffSequence = (n=10, timeOffset=0, randomNotes=true) =>
  map(
    // create a chronological array of on off events
    flatMap(times(n, (t) => [getSampleMidiNoteOnEvent(t + timeOffset), getSampleMidiNoteOffEvent(t + timeOffset + 0.01)])),
    e => ({
      ...e,
      // return a random note or not
      note: randomNotes
        ? fromMidi(Math.floor(Math.random()*127))
        : e.note
    })
  )

