import {MidiEventBus} from './bus'
import {connect} from './connect'
import {REGISTERED_MIDI_OUTPUT_DEVICE, UNREGISTERED_MIDI_OUTPUT_DEVICE} from '../../redux/actions/midi/output/output'
import {REGISTERED_MIDI_INPUT_DEVICE, UNREGISTERED_MIDI_INPUT_DEVICE} from '../../redux/actions/midi/input/input'
import {
  ACTIVATE_MIDI_INPUT_DEVICE,
  CONNECT_MIDI_DEVICES,
  DEACTIVATE_MIDI_INPUT_DEVICE
} from '../../redux/actions/midi/index'
import {
  MIDI_OVERDUB_RECORDING_STOPPED,
  MIDI_OVERDUB_RECORDING_STARTED
} from '../../redux/actions/recordings/midi/midi'
import {
  TIMELINE_PLAYBACK_STARTED,
  TIMELINE_PLAYBACK_STOPPED,
} from '../../redux/actions/timelines/timelines'


export const midiMiddleware = (() => {
  // hide global midiEventBus using a closure
  let midiEventBus = new MidiEventBus()

  // return middleware we can apply using thunk-middleware
  return store => next => action => {

    switch (action.type) {

    // MIDI DEVICE CONNECTION
    case CONNECT_MIDI_DEVICES:
      connect(midiEventBus, store)
      return next(action)

    case ACTIVATE_MIDI_INPUT_DEVICE:
      midiEventBus.activateDevice(action.payload)
      return next(action)

    case DEACTIVATE_MIDI_INPUT_DEVICE:
      midiEventBus.deactivateDevice(action.payload)
      return next(action)

    case REGISTERED_MIDI_INPUT_DEVICE:
    case REGISTERED_MIDI_OUTPUT_DEVICE:
      // handle registering input/output midi devices similarly
      midiEventBus.register(action.payload)
      return next(action)

    case UNREGISTERED_MIDI_INPUT_DEVICE:
    case UNREGISTERED_MIDI_OUTPUT_DEVICE:
      // handle unregistering input/output midi devices similarly
      midiEventBus.unregister(action.payload)
      return next(action)

    // MIDI RECORDINGS
    case MIDI_OVERDUB_RECORDING_STARTED:
      midiEventBus.startRecording(action.payload.recordingContexts)
      return next(action)

    case MIDI_OVERDUB_RECORDING_STOPPED:
      midiEventBus.stopRecording(action.payload.recordingContexts)
      return next(action)

    case TIMELINE_PLAYBACK_STARTED:
      midiEventBus.startPlayback(store.getState(), action.payload.timelineId)
      return next(action)
      
    case TIMELINE_PLAYBACK_STOPPED:
      midiEventBus.stopPlayback(store.getState(), action.payload.timelineId)
      return next(action)
      
    default:
      return next(action)
    }

  }
})()

