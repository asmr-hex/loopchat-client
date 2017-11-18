import {reduce} from 'lodash'
import modules from './modules'
import prefabs from './prefabs'


// TODO (cw|11.17.2017) subscribe to redux store? So we can dispatch actions?
export class Instruments {
  constructor() {
    // initialize library of modules and instruments
    this.modules = modules
    this.prefabs = this.instantiateObjectsFrom(prefabs)
    this.custom = {} // TODO (cw|11.17.2017) populate this with custom made synths
  }

  instantiateObjectsFrom(classMap) {
    return reduce(
      classMap,
      (acc, Cls) => {
        let cls = new Cls()

        return {...acc, [cls.name]: cls}
      },
      {},
    )
  }
}

