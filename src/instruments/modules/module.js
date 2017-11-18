import uuidV4 from 'uuid/v4'
import {get, isUndefined} from 'lodash'
import {
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
} from '../../types/midiEvent'


export class Module {
  constructor(name) {
    this.name = name
    this.id = uuidV4()
    this.controlSignalToFunction = {}
    this.module = undefined
  }

  /**
   * map input control signals to a function which will handle
   * events of those types. Since signals may be one of several
   * possible types (provided by the MIDI event specs, MIDI_NOTE_ON/OFF,
   * PITCH_BEND, CONTROL_CHANGE, etc.), but also a control id (e.g.
   * CONTROL_CHANGE for control 2), we can set the handler function for
   * either all events of a given type (regardles of the control id) or
   * all events of a given type for a specific control id.
   * @param {MidiEvent} controlSignal : input signal to assign handler to.
   * @param {function} controlFunction : the handler function.
   * @param {Boolean} applyToAllControlsOfThisType : apply the handler function
   *   to all control signals with the provided type regardless of control id.
   */
  setControl(controlSignal, controlFunction, applyToAllControlsOfthisType = false) {
    const {type} = controlSignal
    const control = this.getSignalControl(controlSignal)

    this.controlSignalToFunction[type] = applyToAllControlsOfthisType
      ? {'*': controlFunction}
      : {...get(this.controlSignalToFunction, type, {}), [control]: controlFunction}
  }

  patchTo(input) {
    // TOD (cw|11.17.2017) dispatch an error?
    if (isUndefined(this.module)) return
    if (isUndefined(input.module)) return

    // NOTE (cw|11.17.2017) for now we are assuming that these are ToneJS
    // AudioNodes, but eventually it would be great to abstract this out.
    this.module.connect(input.module)
  }

  process(controlSignal) {
    const {type} = controlSignal
    const control = this.getSignalControl(controlSignal)

    const process = get(
      this.controlSignalToFunction, `${type}.*`,
      get(this.controlSignalToFunction, `${type}.${control}`),
    )

    // only process if there exists a handler to control this signal
    if (isUndefined(process)) return

    // process the signal
    process(controlSignal)
  }

  getSignalControl(controlSignal) {
    const {type} = controlSignal
    
    return type === MIDI_NOTE_ON || type === MIDI_NOTE_OFF
      ? controlSignal.note
      : controlSignal.control
  }
}
