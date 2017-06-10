import tone from 'tone'

export const recordingStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
}

export const newRecording = (recordingId = uuidV4(), startTime = tone.now()) => ({
  id: recordingId,
  start: startTime,
  status: recordingStatus.IN_PROGRESS,
  master: [],
  overdubs: {
    recording: {},
    recorded: {},
  },
})

export const newOverdub = (overdubId = uuidV4(), timeOffset = 0, startTime = tone.now(), overwrite=true) => ({
  id: overdubId,
  start: startTime,
  offset: timeOffset,
  events: [],
  overwrite,
  // creator: user, // TODO (cw|6.6.2017) incorporate user info
})
