import {filter, get, keys, reduce} from 'lodash'


/**
 * get a full recording object from a track.
 * @param {Object} state - full Redux state tree
 * @param {string} trackId - the track of interest
 * @returns {Object} - recording object
 */
export const getMidiRecordingFromTrack = (state, trackId) => {
  const recordingId = get(state, `tracks.midi.${trackId}.recordingId`, '')

  return get(state, `recordings.midi.masters.${recordingId}`)  
}

/**
 * Gets the master midi track of a track's recording given the trackId. 
 * @param {Object} state - full Redux state tree.
 * @param {string} trackId - the id of the track we want the master recording of.
 * @returns {array} - the master midi track which is an array (sequence) of midi notes.
 */
export const getMidiMasterRecordingFromTrack = (state, trackId) =>
  getMidiRecordingFromTrack(state, trackId).master

/**
 * Gets the in-progress overdubs which are currently being recorded to a track's recording.
 * @param {Object} state - full Redux state tree
 * @param {string} trackId - the id of the track we want the in-progress recordings of.
 * @returns {Object} - id-keyed map of overdubs currently being recorded to a track.
 */
export const getMidiInProgressOverdubsFromTrack = (state, trackId) => {
  const recordingId = get(state, `tracks.midi.${trackId}.recordingId`, '')

  const overdubIds = keys(get(state, `recordings.midi.masters.${recordingId}.overdubs`))

  return reduce(
    overdubIds,
    (acc, overdubId) => ({
      ...acc,
      [overdubId]: get(state, `recordings.midi.overdubs.${overdubId}`),
    }),
    {},
  )
}

/**
 * gets the actively recording overdub associated with this track for the user who
 * created it.
 * @param {Object} state - full Redux state tree
 * @param {string} trackId - the track we want the overdub for
 * @param {string} userId - the userId of the overdub creator we want.
 */
export const getUserMidiOverdubFromTrack = (state, trackId, userId) =>
  filter(
    getMidiInProgressOverdubsFromTrack(state, trackId),
    overdub => overdub.creator === userId,
  )[0]
