import {filter, get, map} from 'lodash'


export const getUnmutedMasterRecordingsFromTimeline = (state, timelineId) =>
  map(
    filter(
      map(
        get(state, `timelines.${timelineId}.tracks`, []),
        trackId => get(state, `tracks.midi.${trackId}`),
      ),
      track => !track.mute,
    ),
    unmutedTrack => get(state, `recordings.midi.${unmutedTrack.recordingId}.master`, []),
  )

