import {reduce} from 'lodash'
import modules from './modules'
import prefabs from './prefabs'


// TODO (cw|11.17.2017) subscribe to redux store? So we can dispatch actions?
export class InstrumentLibrary {
  constructor() {
    // initialize library of modules and instruments
    this.modules = this.makeModuleClassMap(modules)
    this.prefabs = this.instantiateObjectsFrom(prefabs)
    this.custom = {} // TODO (cw|11.17.2017) populate this with custom made synths
  }

  /**
   * create a map from the module name to the class constructor. Since we will want
   * to instantiate a new module each time we begin building new instruments, we only
   * want to store the constructor for each module. In order to get the proper names as
   * the keys of this map, we need to instantiate the module since we do not have access
   * to static class attributes (only static methods).
   * @param {Object} modules: an export map from ./modules/index
   * @return {Object} {[name]: constructor}
   */
  makeModuleClassMap(modules) {
    return reduce(
      modules,
      (acc, Cls) => {
        const instance = new Cls()

        return {
          ...acc,
          [instance.name]: Cls,
        }
      },
      {},
    )
  }

  /**
   * instantiate all objects from a map of class constructors. This allows us to dynamically
   * instantiate any prefabs/custom instruments which are exported from those directories.
   * @param {Object} classMap: an export map of classes from either ./prefabs or ./custom
   * @return {Object} {[name]: instance}
   */
  instantiateObjectsFrom(classMap) {
    return reduce(
      classMap,
      (acc, Cls) => {
        let instance = new Cls()

        return {...acc, [instance.name]: instance}
      },
      {},
    )
  }
}

