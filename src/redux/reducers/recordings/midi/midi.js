import {filter, first, get, isUndefined, last, map, merge, omit, reduce, reverse, set, slice, sortBy} from 'lodash'
import {
  MIDI_EVENT_RECORDED,
  MIDI_OVERDUB_RECORDING_STARTED,
  MIDI_OVERDUB_RECORDING_STOPPED,
  MIDI_RECORDING_CREATED
} from '../../../actions/recordings/midi/midi'
import {MIDI_NOTE_OFF, MIDI_NOTE_ON} from '../../../../types/midiEvent'

/**
 * midi recording reducer
 */
export const midi = (state = {}, action) => {
  switch (action.type) {
  case MIDI_RECORDING_CREATED:
    return createMidiRecording(state, action.payload.recording)
  case MIDI_OVERDUB_RECORDING_STARTED:
    return createOverdub(state, action.payload.recordingId, action.payload.overdub)
  case MIDI_OVERDUB_RECORDING_STOPPED:
    return processRecording(state, action.payload.recordingId, action.payload.overdubId)
  case MIDI_EVENT_RECORDED:
    return recordEvent(state, action.payload.recordingId, action.payload.overdubId, action.payload.event)
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
 * createOverdub merges a new overdub into the 'currently recording' branch of the
 * recording state. Note that if an overdub with the same id has already been created,
 * it will be overwritten!
 *
 * @param state
 * @param recordingId
 * @param overdub
 */
export const createOverdub = (state, recordingId, overdub) =>
  merge(state, {[recordingId]: {overdubs: {recording: {[overdub.id]: overdub }}}})

/**
 * recordEvent takes a recordingId, an overdubId, and a midiEvent and appends the new
 * midi event into the array of events within the overdub. When this function is called,
 * we assume that this overdub is currently recording, if this is not true, the event is
 * ignored.
 *
 * @param state
 * @param recordingId
 * @param overdubId
 * @param midiEvent
 * @returns {*}
 */
export const recordEvent = (state, recordingId, overdubId, midiEvent) => {
  const events = get(state, `${recordingId}.overdubs.recording.${overdubId}.events`)
  
  if (isUndefined(events)) return state // ignore this midiEvent if there is no overdub to record to!

  return set({...state}, `${recordingId}.overdubs.recording.${overdubId}.events`, [...events, midiEvent])
}

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
export const processRecording = (state, recordingId, overdubId) => {
  const unprocessedRecording = get(state, `${recordingId}`)
  const unprocessedOverdub = get(unprocessedRecording, `overdubs.recording.${overdubId}`)
  const recordedOverdubs = get(unprocessedRecording, `overdubs.recorded`)
  const recordingOverdubs = get(unprocessedRecording, `overdubs.recording`)
  const unprocessedMaster = get(unprocessedRecording, `master`)
  
  // process overdub times
  const overdub = normalizeOverdubTime(unprocessedOverdub)

  // new overdubs with overdub omitted from recording and added to recorded
  const overdubs = {
    recording: omit(recordingOverdubs, overdubId),
    recorded: {
      ...recordedOverdubs,
      [overdubId]: overdub,
    }
  }

  // process master timeline and completed overdub
  const master = processMaster(unprocessedMaster, overdub)

  return {
    ...state,
    [recordingId]: {
      ...unprocessedRecording,
      master,
      overdubs,
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
      sortBy([...master, ...consolidatNotes(overdub.events)], e => e.time)

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

const consolidateNotes = events => {
  const onEvents = filter(events, e => e.type === MIDI_NOTE_ON)
  let offEvents = filter(events, e => e.type === MIDI_NOTE_OFF)

  return reduce(
    onEvents,
    (acc, onEvent) => {
      const idx = findIndex(offEvents, offEvent => offEvent.note == onEvent.note)

      const offEvent = first(pullAt(offEvents, idx))

      return omit({
        ...onEvent,
        start: onEvent.time,
        end: offEvent.time,
      }, 'time')
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
    event => {
      event.time -= overdub.start
      return event
    },
  )
})
