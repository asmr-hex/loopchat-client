
// the CONNECT_MIDI_DEVICES action is handled by the midiMiddleware, so there
// is no reducer which catches this case.
export const CONNECT_MIDI_DEVICES = 'CONNECT_MIDI_DEVICES'
export const connectMidiDevices = () => dispatch => {
  dispatch({
    type: CONNECT_MIDI_DEVICES,
  })
}

// the ADD_MIDI_EVENT_HANDLER action is handled by the midiMiddleware, so there
// is no corresponding reducer.
export const ADD_MIDI_EVENT_HANDLER = 'ADD_MIDI_EVENT_HANDLER'
export const addMidiEventHandler = (handler, deviceId) => dispatch => {
  dispatch({
    type: ADD_MIDI_EVENT_HANDLER,
    payload: {
      deviceId,
      handler,
    },
  })
}

// TODO (cw|10.24.2017) why is this not within the input/ dir?
// the ACTIVATE_MIDI_INPUT_DEVICE action is handled in *both* the midiMiddleware
// as well as in the input midi reducer to track the activation status of a device.
//
// Also note that there are two actions which result in the ACTIVATE_MIDI_INPUT_DEVICE
// action being dispatched: (1) this action-creator and (2) the activateMidiTrack in
// actions/tracks/midi. This is because, in the future, when we are designing virtual
// synths, we may want to activate a midi input to control our virtual synth outside of
// the context of a track (i.e. we aren't interested in recording, only hearing our synth).
export const ACTIVATE_MIDI_INPUT_DEVICE = 'ACTIVATE_MIDI_INPUT_DEVICE'
export const activateMidiInputDevice = deviceId => dispatch => {
  dispatch({
    type: ACTIVATE_MIDI_INPUT_DEVICE,
    payload: deviceId,
  })
}

// TODO (cw|10.24.2017) why is this not within the input/ dir?
// the DEACTIVATE_MIDI_INPUT_DEVICE action is handled in *both* the midiMiddleware
// as well as in the input midi reducer to track the activation status of a device.
//
// Again, similar to activateMidiInputDevice, the DEACTIVATE_MIDI_INPUT_DEVICE action
// is dispatched in two places. See the description above.
export const DEACTIVATE_MIDI_INPUT_DEVICE = 'DEACTIVATE_MIDI_INPUT_DEVICE'
export const deactivateMidiInputDevice = deviceId => dispatch => {
  dispatch({
    type: DEACTIVATE_MIDI_INPUT_DEVICE,
    payload: deviceId,
  })
}
