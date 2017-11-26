import tone from 'tone'
import {freq} from 'tonal-note'
import {Module} from './module'
import {
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
} from '../../types/midiEvent'


export class Oscillator extends Module {
  constructor() {
    super('oscillator')

    // for now, just use ToneJS oscillator; TODO (cw|11.17.2017) abstract this out to use the Adaptor pattern
    this.module = new tone.OmniOscillator()

    this.setDefaultKeyboardControls()
  }

  setDefaultKeyboardControls() {
    const kbdControlSignalOn = {type: MIDI_NOTE_ON}
    const kbdControlSignalOff = {type: MIDI_NOTE_OFF}
    let onOffCounter = 0  // this allows for smoother transitions between note changes

    // set control for midi note on control signal
    this.setControl(
      kbdControlSignalOn,
      midiOnEvent => {
        const {note} = midiOnEvent

        this.module.set('frequency', freq(note))
        if (onOffCounter === 0) this.module.start()

        onOffCounter++
      },
      true,
    )

    // set control for midi note off control signal
    this.setControl(
      kbdControlSignalOff,
      midiOffEvent => {
        onOffCounter--
        
        if (onOffCounter === 0) this.module.stop() 
      },
      true,
    )
  }
}
