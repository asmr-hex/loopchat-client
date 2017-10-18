import uuidV4 from 'uuid/v4'

export const newTimeline = (id = uuidV4()) => ({
  id,
  tracks: [],
  selections: {},
  tempo: 120, // bpm
  timeSignature: '4/4',
  playing: false,
  scrubberTime: 0.0,
})

const TIMELINE_WIDTH_DEFAULT = 800
const TIMELINE_HEIGHT_DEFAULT = 200

export const newTimelineUI = () => ({
  styles: {
    width: TIMELINE_WIDTH_DEFAULT,
    height: TIMELINE_HEIGHT_DEFAULT,
    top: (window.innerHeight - TIMELINE_HEIGHT_DEFAULT) / 2,
    left: (window.innerWidth - TIMELINE_WIDTH_DEFAULT) / 2,
    position: 'absolute',
    backgroundColor: '#ffbf75',
  },
  timeInterval: { // TODO (cw|10.17.2017) maybe this should be in React internal state...
    start: 0,
    end: 45,
  },
})

export const newTimelineTimeAxisUI = () => ({
  styles: {},
  view: {
    x: 0,
    y: 0,
    width: TIMELINE_WIDTH_DEFAULT,
    height: TIMELINE_HEIGHT_DEFAULT,
  },
})
