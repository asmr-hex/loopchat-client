
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
    active: [],
    complete: [],
  },
})

// Maybe this is just an action...
// export const newOverdub = (recordingId, overdubId = uuidV4(), startTime = tone.now(), overwrite = false) => ({
//
// })


const recording = {
  id: 'soemthing',
  master: [],
  overdubs: {
    'time': [{}],
  },
}

const event = {
  user: 'me',
  time: 'something',
  overwrite: true,
}