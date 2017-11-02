import { forEach, get, omit, has, noop } from 'lodash'
import uuidV4 from 'uuid/v4'
import tone from 'tone'
import {fromMidi} from 'tonal-note'
import {play, playback} from '../../instruments/synth'
import {getMidiEventTypeAndChannel, MIDI_NOTE_OFF, MIDI_NOTE_ON} from '../../types/midiEvent'
import {recordMidiEvent} from '../../redux/actions/recordings/midi/midi'
import {getUnmutedMasterRecordingsFromTimeline} from '../../redux/selectors/timelines'


// Since the MidiAccess object cannot change object reference
// (i.e. we cannot process it through a reducer since it should
// never referentially change), we will handle state changes to
// processing midi in the MidiEventBus and dispatch state changes
// to the store in order to keep the redux store in sync with the
// midi state.
export class MidiEventBus {
  constructor() {
    // dispatch should be the same dispatch function used in the Redux
    // store. Initially it is set to nop, but once the middleware has
    // access to the redux dispatcher, it must be provided to the bus.
    this.dispatch = noop

    // activated is a string-keyed, boolean-valued map which indicates
    // whether a device corresponding to a deviceId is activated or
    // deactivated.
    this.activated = {}

    // recording is a string-keyed, string-valued map which indicates
    // whether a device corresponding to a deviceId is currently recording
    // or not. The string values correspond to the recordingId of the recording
    // this device is ... err ... recording to.
    this.recording = {}

    // assignedInstrument is a string-keyed, function-valued map which provides
    // a device corresponding to a deviceId an instrument which will play the
    // data contained in incoming midi events. The functions should accept the
    // processed data of an event.
    this.assignedInstrument = {}
  }

  /**
   * setDispatcher takes a redux store dispatch function and sets it internally
   * so the MidiEventBus can dispatch actions to the redux store.
   *
   * @param dispatch
   */
  setDispatcher(dispatch) {
    this.dispatch = dispatch
  }

  /**
   * register is similar to the midi reducers which handle
   * REGISTERED_MIDI_*_DEVICE events, but tracks the state
   * of the registered devices in the MidiEventBus.
   *
   * @param device
   */
  register(device) {
    // set the device as registered but deactivated
    this.activated[device.id] = false

    // set the device as not recording
    this.recording[device.id] = null

    // set the assigned instrument as a nop
    this.assignedInstrument[device.id] = noop
  }

  /**
   * unregister is similar to the midi reducers which handle
   * UNREGISTERED_MINI_*_DEVICE events, but tracks the state
   * of the registered devices in the MidiEventBus.
   *
   * @param device
   */
  unregister(device) {
    // set the device as unregistered
    delete this.activated[device.id]

    delete this.recording[device.id]

    delete this.assignedInstrument[device.id]
  }

  /**
   * activateDevice sets the activated status of a midi input device
   * to true.
   *
   * @param deviceId
   */
  activateDevice(deviceId) {
    // ensure this device has been registered already
    if (!has(this.activated, deviceId)) {
      // TODO (cw|5.27.2017) dispatch an error?
      return
    }

    // set activated to true in the MidiEventBus
    this.activated[deviceId] = true

    this.assignedInstrument[deviceId] = play
  }

  /**
   * deactivateDevice sets the activated status of an input midi device
   * to false.
   *
   * @param deviceId
   */
  deactivateDevice(deviceId) {
    // ensure this device has been registered already
    if (!has(this.activated, deviceId)) {
      // TODO (cw|5.27.2017) dispatch an error?
      return
    }

    // set activated to true in the MidiEventBus
    this.activated[deviceId] = false
  }

  /**
   * process takes a midi event and converts it into a usable format by
   * the application.
   *
   * @param event
   */
  process(event) {
    const { data } = event
    const command = data[0] & 0xf0 // on (144) / off (128) toggle
    const note = data[1] // note number (0-127)?
    const velocity = data[2]/127 // velocity (0-127)
    const time = tone.now()

    // get the midi event type and channel from the event command code
    const { type, channel } = getMidiEventTypeAndChannel(command)

    // MIDI_NOTE_ON/OFF events have slightly different formats than other events
    // related to parameter controls (e.g. MIDI_CONTROL_CHANGE, MIDI_PITCH_BEND)
    const processedEvent = type === MIDI_NOTE_ON || type === MIDI_NOTE_OFF
          ? { id: uuidV4(), type, channel, note: fromMidi(note), pitch: note, velocity, time }
          : { id: uuidV4(), type, channel, control: note, value: velocity, time }

    // for debugging only...
    if (type === MIDI_NOTE_ON || type === MIDI_NOTE_OFF) {
      console.log(`Event: ${type}  Channel: ${channel} Note: ${fromMidi(note)}  Velocity: ${velocity} Time: ${time}`)
    } else {
      console.log(`Event: ${type}  Channel: ${channel} Control: ${note}  Value: ${velocity} Time: ${time}`)
    }

    return processedEvent
  }

  /**
   * handleEvent is assigned as each midi device's onmidimessage handler.
   * This function reads the status of the device which triggered the
   * event and decides to ignore or process the event, record the processed
   * data, and play the processed data.
   *
   * @param event
   */
  handleEvent(event) {
    const deviceId = get(event, `target.id`)
    const isActivated = get(this.activated, deviceId, false)
    const isRecording = get(this.recording, deviceId, null) !== null
    const play = get(this.assignedInstrument, deviceId, noop)

    if (!isActivated) return // ignore events from deactivated devices

    // process event (convert to usable data)
    const music = this.process(event)
    
    // record be dispatching to the redux store
    if (isRecording) this.record(deviceId, music)

    // send music to instrument
    play(music)
  }

  // NOTE: the assumption here is that recording multiple tracks/overdubs with
  // the same input device is not useful and thus only one will actually be recorded.
  startRecording(recordings) {
    forEach(
      recordings,
      recording => {
        // set the recording for this device
        this.recording[recording.inputDeviceId] = {
          recordingId: recording.id,
          overdubId: recording.overdubId,
        }
      }
    )
  }

  stopRecording(recordings) {
    forEach(
      recordings,
      recording => {
        this.recording[recording.inputDeviceId] = null
      }
    )
  }

  record(deviceId, music) {
    const {overdubId} = this.recording[deviceId]
    
    this.dispatch(recordMidiEvent(overdubId, music))
  }

  startPlayback(state, timelineId) {
    const recordings = getUnmutedMasterRecordingsFromTimeline(state, timelineId)
    
    // send recordings to synth
    playback(recordings)
  }

  stopPlayback(state, timelineId) {
    
  }
}
