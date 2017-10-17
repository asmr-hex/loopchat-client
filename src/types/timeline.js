import {uuidV4} from 'uuid'

export const newTimeline = (id = uuidV4()) => ({
  id,
  tracks: [],
  selections: {},
  tempo: 120, // bpm
  timeSignature: '4/4',
  playing: false,
  scrubberTime: 0.0,
})
