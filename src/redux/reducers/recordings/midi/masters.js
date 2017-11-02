import {filter, first, findIndex, get, isUndefined, keys, last, map, merge, omit, pullAt, reduce, reverse, set, slice, sortBy} from 'lodash'
import {
  MIDI_EVENT_RECORDED,
  MIDI_OVERDUB_RECORDING_STARTED,
  MIDI_OVERDUB_RECORDING_STOPPED,
  MIDI_RECORDING_CREATED
} from '../../../actions/recordings/midi/midi'
import {MIDI_NOTE_OFF, MIDI_NOTE_ON} from '../../../../types/midiEvent'
import {newOverdub} from '../../../../types/recording'


/**
 * midi recording reducer
 */
export const masters = (state = {}, action) => {
  switch (action.type) {
  case MIDI_RECORDING_CREATED:
    return createMidiRecording(state, action.payload.recording)
  case MIDI_OVERDUB_RECORDING_STARTED:
    return createOverdubs(state, action.payload.recordingContexts)
  case MIDI_OVERDUB_RECORDING_STOPPED:
    return processRecordings(state, action.payload.recordingContexts)
  default:
    return state
  }
}

/**
 * createMidiRecording returns a new state with a recording added byId. Note
 * if a recording with the same id has already been created, it will be overwritten!
 *
 * @param state
 * @param recording
 */
export const createMidiRecording = (state, recording) => ({
  ...state,
  [recording.id]: recording,
})

/**
 * createOverdubs bulk creates new overdubs. 
 *
 * @param state :: {}
 * @param recordingContexts :: [{recordingId, inputDevice, overdub}]
 */
export const createOverdubs = (state, recordingContexts) =>
  reduce(
    recordingContexts,
    (oldState, recordingContext) => ({
      ...oldState,
      ...createOverdub(state, recordingContext.recordingId, recordingContext.overdub.id),
    }),
    state,
  )

/**
 * createOverdub merges a new overdub into the 'currently recording' branch of the
 * recording state. Note that if an overdub with the same id has already been created,
 * it will be overwritten!
 *
 * @param state
 * @param recordingId
 * @param overdub
 */
export const createOverdub = (state, recordingId, overdub) =>
  merge(state, {[recordingId]: {overdubs: {[overdub.id]: true }}})

/**
 * processRecordings bulk processes recording when recording is complete. 
 *
 * @param state :: {}
 * @param recordingContexts :: [{id, inputDevice, overdub}]
 */
export const processRecordings = (state, recordingContexts) =>
  reduce(
    recordingContexts,
    (oldState, recordingContext) => ({
      ...oldState,
      ...processRecording(
        state,
        recordingContext.recordingId,
        recordingContext.overdub,
      )
    }),
    state,
  )

/**
 * processRecording is called when an overdub is finished recording. This function
 * performs three important tasks:
 *  (1) normalizes the overdub event times to be relative to the overall recording timeline
 *  (2) removes the overdub from 'recording' and puts into 'recorded'
 *  (3) re-processes the master array of events in this recording to merge in the newly finished overdub
 *
 * @param state
 * @param recordingId
 * @param overdubId
 * @returns {{}}
 */
export const processRecording = (state, recordingId, unprocessedOverdub) => {
  const unprocessedRecording = get(state, `${recordingId}`)
  const unprocessedMaster = get(unprocessedRecording, `master`)
  
  // process overdub times
  const overdub = normalizeOverdubTime(unprocessedOverdub)

  // process master timeline and completed overdub
  const master = processMaster(unprocessedMaster, overdub)

  return {
    ...state,
    [recordingId]: {
      ...unprocessedRecording,
      master,
      overdubs: omit(get(state, `${recordingId}.overdubs`, overdub.id)),
    }
  }
}

/**
 * processMaster takes the master events array and the newly finished overdub and
 * either overwrites the overdub onto the master timeline or overlays it.
 *
 * @param master
 * @param overdub
 */
export const processMaster = (master, overdub) =>
  overdub.overwrite
    ? overwrite(master, overdub) // overwrite overdub into master
    : overlay(master, overdub)// overlay overdub into master

/**
 * overlay just sorts the concat'd master events and overdub events by time.
 *
 * @param master
 * @param overdub
 */
const overlay = (master, overdub) =>
      sortBy([...master, ...consolidateNotes(overdub.events)], e => e.start)

/**
 * overwrite updates the master events array s.t. the overdub overwrites any
 * events which occur within the time window in which the overdubs occur.
 *
 * It is important to note that since MIDI_NOTE_ON/OFF are coupled (i.e. a MIDI_NOTE_ON
 * is *always* followed by a corresponding MIDI_NOTE_OFF), we want to exclude any
 * events within the master events array whose corresponding ON/OFF pair occurs
 * within the overdub time window.
 *
 * @param master
 * @param overdub
 */
const overwrite = (master, overdub) => {
  const events = consolidateNotes(overdub.events)
  
  return [
    ...filterBefore(master, first(events).time),
    ...events,
    ...filterAfter(master, last(events).time),
  ]
}

export const consolidateNotes = events => {
  const onEvents = filter(events, e => e.type === MIDI_NOTE_ON)
  let offEvents = filter(events, e => e.type === MIDI_NOTE_OFF)
  
  return reduce(
    onEvents,
    (acc, onEvent) => {
      const idx = findIndex(offEvents, offEvent => offEvent.note == onEvent.note)

      const offEvent = idx < 0 ? {time: -1} : first(pullAt(offEvents, idx))

      return [
        ...acc,
        omit({...onEvent, start: onEvent.time, end: offEvent.time,}, ['time', 'type'])
      ]
    },
    [],
  )
}

/**
 * filterBefore takes a master events array and removes all events which occur
 * after the startTime provided. Additionally, any MIDI_NOTE_ON events which do
 * not have a corresponding MIDI_NOTE_OFF event before the startTime will be
 * excluded.
 *
 * @param master
 * @param startTime
 */
export const filterBefore = (master, startTime) =>
  filter(
    filter(master, e => e.start < startTime), // get all events before startTime
    (e, idx) => {
      // if this is not a midi on event, do not filter out
      if (e.type !== MIDI_NOTE_ON) return true

      // the event is guaranteed to be a midi on event

      const pairedWithMidiOffEvent = reduce(
        slice(master, idx+1),
        (acc, nextEvent) => acc || (nextEvent.type === MIDI_NOTE_OFF && nextEvent.note === e.note),
        false,
      )

      return pairedWithMidiOffEvent
    }
  )

/**
 * filterAfter takes a master events array and removes all events which occur
 * before the endTime provided. Additionally, any MIDI_NOTE_OFF events which do
 * not have a corresponding MIDI_NOTE_ON event after the endTime will be excluded.
 *
 * @param master
 * @param endTime
 */
export const filterAfter = (master, endTime) =>
  filter(
    filter(master, e => e.end > endTime), // get all events after endTime
    (e, idx) => {
      // if this is not a midi off event, do not filter out
      if (e.type !== MIDI_NOTE_OFF) return true

      // the event is guaranteed to be a midi off event
      const pairedWithMidiOnEvent = reduce(
        reverse(slice(master, 0, idx)),
        (acc, nextEvent) => acc || (nextEvent.type === MIDI_NOTE_ON && nextEvent.note === e.note),
        false,
      )

      return pairedWithMidiOnEvent
    }
)

/**
 * normalizeOverdubTime normalizes to overdub event times to conform to the global timeline.
 *
 * @param overdub
 */
export const normalizeOverdubTime = overdub => ({
  ...overdub,
  events: map(
    overdub.events,
    event => ({
      ...event,
      time: event.time - overdub.start,
    }),
  )
})
