import {Instrument} from '../instrument'
import {Oscillator as OscillatorModule} from '../modules/oscillator'
import {Master} from '../modules/master'


export class Oscillator extends Instrument {
  constructor() {
    super('oscillator')

    let oscillator = new OscillatorModule()
    let master = new Master()

    // add some modules
    this.addModule(oscillator)
    this.addModule(master)

    // wire em up
    this.connect(oscillator.id, master.id)
  }

  
}
