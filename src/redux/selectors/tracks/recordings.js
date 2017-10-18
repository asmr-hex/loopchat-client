import {get} from 'lodash'


export const getMidiRecordingOf = (state, trackId) => {
  const recordingId = get(state, `tracks.${trackId}.recording`, '')

  return get(state, `recordings.midi.${recordingId}`)
}
