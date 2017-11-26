import tone from 'tone'
import {Module} from './module'


export class Master extends Module {
  constructor() {
    super('master')
    this.module = tone.Master
  }
}
