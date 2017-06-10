import {recordingStatus} from '../../../src/types/recording'
import {getSampleOverdub} from './overdub'

const defaultRecording = {
  id: 'a35a0058-5c5d-47b8-8cb2-af6771c549fd',
  start: 239.91437641723357,
  status: recordingStatus.IN_PROGRESS,
  master: getSampleOverdub().events,
  overdubs: {
    recording: {},
    recorded: {},
  },
}

export const getSampleRecording = (overrides={}) =>({
  ...defaultRecording,
  ...overrides,
})
