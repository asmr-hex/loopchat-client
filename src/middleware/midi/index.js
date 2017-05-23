import {MidiEventBus} from './bus'
import {connect} from './connect'
import {ADD_MIDI_EVENT_HANDLER, CONNECT_MIDI_DEVICES} from '../../redux/actions/midiDevices/index'

export const midiMiddleware = (() => {
  // hide global midiEventBus using a closure
  let midiEventBus = new MidiEventBus()

  // return middleware we can apply using thunk-middleware
  return store => next => action => {
    switch (action.type) {
    case CONNECT_MIDI_DEVICES:
      connect(midiEventBus, store)
      break
    case ADD_MIDI_EVENT_HANDLER:
      midiEventBus.addHandler(action.payload)
    default:
      return next(action)
    }

  }
})()


// NOTE (cw|5.20.17) this is the code to process the midi data
// msg => {
//   const { data } = msg
//   const toggle = data[0] & 0xf0 // on (144) / off (128) toggle
//   const note = data[1] // note number (5-124)?
//   const vel = data[2] // velocity (0-127)

//   console.log(`Toggle: ${toggle}  Note: ${note}  Velocity: ${vel}`)
// }





