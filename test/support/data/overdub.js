import uuidV4 from 'uuid/v4'
import {getSampleMidiOnOffSequence} from './midiEvent'

const defaultOverdub = {
  id: '942ce26c-bf6e-497d-94c1-51c7977f4e02',
  start: 304.3845804988662,
  offset: 0,
  events: getSampleMidiOnOffSequence(5, 3),
  overwrite: true,
}

export const getSampleOverdub = (overrides={}) => ({
  ...defaultOverdub,
  ...overrides,
})
