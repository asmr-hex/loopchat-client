import { forEach, get, omit, has, noop } from 'lodash'

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

    // recording is a string-keyed, boolean-valued map which indicates
    // whether a device corresponding to a deviceId is currently recording
    // or not.
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
    this.recording[device.id] = false

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
    const toggle = data[0] & 0xf0 // on (144) / off (128) toggle
    const note = data[1] // note number (5-124)?
    const velocity = data[2] // velocity (0-127)

    console.log(`Toggle: ${toggle}  Note: ${note}  Velocity: ${velocity}`)

    return { note, velocity, toggle }
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
    const isRecording = get(this.recording, deviceId, false)
    const play = get(this.assignedInstrument, deviceId, noop)

    if (!isActivated) return // ignore events from deactivated devices

    // process event (convert to usable data)
    const music = this.process(event)

    // record be dispatching to the redux store
    if (isRecording) this.record(music)

    // send music to instrument
    play(music)
  }

  record(music) {
    // TBD
  }
}