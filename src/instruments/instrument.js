import uuidV4 from 'uuid/v4'
import {forEach, get, isUndefined} from 'lodash'


export class Instrument {
  constructor(name) {
    this.name = name
    this.id = uuidV4()
    this.modules = {}
  }

  addModule(module) {
    this.modules = {
      ...this.modules,
      [module.id]: module,
    }
  }

  connect(outputModuleId, inputModuleId) {
    let outputModule = get(this.modules, `${outputModuleId}`)
    let inputModule = get(this.modules, `${inputModuleId}`)

    // TODO (cw|11.17.2017) dispatch error?
    if (isUndefined(outputModule)) return
    if (isUndefined(inputModule)) return

    outputModule.patchTo(inputModule)
  }

  setControlOf(moduleId, ctrlSig, ctrlFn, applyToAll = false) {
    let module = get(this.modules, `${moduleId}`)

    // TODO (cw|11.17.2017) dispatch error?
    if (isUndefined(module)) return

    module.setControl(ctrlSig, ctrlFn, applyToAll)
  }

  process(ctrlSig) {
    forEach(this.modules, module => module.process(ctrlSig))
  }

  startPlayback(recordedEvents) {
    // TODO (cw|11.17.2017) move playback into here!
  }

  stopPlayback() {
    // TODO (cw|11.17.2017) move playback into here!
  }
}
