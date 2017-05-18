/** 
 * setupMIDI provides access to the WebMIDI API and takes a handler
 * for routing the input MIDI data.
 *
 * params: handleMIDIMsg (Function)
 */
export const setupMIDI = registerDevices => {

  // ensure that your browser has access to the WebMIDI API
  if (!navigator.requestMIDIAccess) {
    alert('Browser does not support MIDI.')
    return
  }

  // attempt to gain access to MIDI
  navigator.requestMIDIAccess({
    sysex: false, // do not request system exclusive support
  }).then(
    // we're in business!
    r => initMIDIAccess(r, registerDevices),
  ).catch(
    e => MIDIAccessFailure(e),
  )
}

const initMIDIAccess = (midi, registerDevices) => {

  // assign on state change handler
  midi.onstatechange = event => {
    // on connection/disconnection, re-initialize MIDIAccess
    if (event instanceof MIDIConnectionEvent) {
      initMIDIAccess(event.target, registerDevices)
    }
  }

  const devices = midi.inputs.values()

  // register all connected devices
  registerDevices(devices)

  // for (let input = devices.next(); input && !input.done; input = devices.next()) {
  //   // input.value.onmidimessage = msg => {
  //   //   const { data } = msg
  //   //   const toggle = data[0] & 0xf0 // on (144) / off (128) toggle
  //   //   const note = data[1] // note number (5-124)?
  //   //   const vel = data[2] // velocity (0-127)
  //   // }
  // }
}

const MIDIAccessFailure = err => console.log(`Could not gain access to MIDI: ${err}`)

// onMIDIStateChange handles MIDIConnectionEvents and MIDIDisconnectionEvernts
const onMIDIStateChange = event => {
  // handle connection events

}
