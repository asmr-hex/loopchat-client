import { times } from 'lodash'

const defaultMidiDevice = {
  id: '31459',
  name: 'Saturn MKUltra',
  manufacturer: 'Strange Beats Engineering',
  type: 'input', // input || output
  state: 'connected', // connected || disconnected
}

export const getSampleMidiDevices = (n, overrides={}) =>
  times(n, t => ({
    ...defaultMidiDevice,
    ...overrides,
    id: `1234${t}`,
  }))