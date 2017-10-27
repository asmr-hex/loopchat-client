import {get} from 'lodash'


export const getMidiMasterRecordingFromTrack = (state, trackId) => {
  const recordingId = get(state, `tracks.midi.${trackId}.recordingId`, '')

  return get(state, `recordings.midi.${recordingId}.master`)
}

export const getMidiInProgressRecordingsFromTrack = (state, trackId) => {
  const recordingId = get(state, `tracks.midi.${trackId}.recordingId`, '')

  return get(state, `recordings.midi.${recordingId}.overdubs.recording`, {})
}
