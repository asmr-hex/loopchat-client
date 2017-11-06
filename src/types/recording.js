import tone from 'tone'
import uuidV4 from 'uuid/v4'


export const recordingStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
}

export const newRecording = (recordingId = uuidV4(), startTime = tone.now()) => ({
  id: recordingId,
  start: startTime,
  status: recordingStatus.IN_PROGRESS,
  master: [],
  overdubs: {},
})

export const newOverdub = (overdubId = uuidV4(), timeOffset = 0, startTime = tone.now(), overwrite=true) => ({
  id: overdubId,
  start: startTime,
  offset: timeOffset,
  events: [],
  overwrite,
  creator: 'Dr. Temporary', // TODO (cw|6.6.2017) incorporate user info
})

/**
 * creates a new recordingContext data structure.
 * @param {string} recordingId - the id of the recording in this recording context
 * @param {string} inputDeviceId - the input device id for this recording context
 * @param {Overdub} newOverdub - the overdub for this recording context
 */
export const newRecordingContext = (recordingId, inputDeviceId, overdub = newOverdub()) => ({
  recordingId,
  inputDeviceId,
  overdub,
})
