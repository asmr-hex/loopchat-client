import uuidV4 from 'uuid/v4'


export const newTrack = (id = uuidV4()) => ({
  id,
  type: 'midi', // TODO (cw|10.17.2017) parameterize this!
  timeSignature: '4/4',
  mute: false,
  recording: {}, // TODO (cw|10.17.2017) create a blank recording object for each new track
  inputDevice: undefined,
  outputDevice: undefined,
})
