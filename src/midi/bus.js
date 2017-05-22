import { forEach } from 'lodash'

export const MIDI_MSG_RECEIVED = 'MIDI_MSG_RECEIVED'

// Since the MidiAccess object cannot change object reference
// (i.e. we cannot process it through a reducer since it should
// never referentially change), we will handle state changes to
// processing midi in the MidiEventBus and dispatch state changes
// to the store in order to keep the redux store in sync with the
// midi state.
export class MidiEventBus {
  constructor() {
    this.handlers = [e => console.log(e)]
  }

  dispatchEvent(event) {
    switch (event.type) {
    case MIDI_MSG_RECEIVED:
      this.process(event.payload)
      return
    default:
      return
    }
  }

  process(event) {
    forEach(this.handlers, handler => {
      handler(event)
    })
  }

  
  
  flush() {
    this.handlers = []
  }
}









