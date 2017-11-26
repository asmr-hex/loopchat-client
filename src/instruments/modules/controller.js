import {Module} from './index'


// QUESTION (cw|11.17.2017) do we even need a keyboard module?? It would effectively
// just be an intermediate interface and is most likely superfluous.
export class Keyboard extends Module {
  constructor() {
    super()
  }
}
