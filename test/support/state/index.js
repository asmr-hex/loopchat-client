import {connectionStatus} from '../../../src/types/connectionStatus'


/**
 * Get the empty, default redux state tree.
 * @param {Object} overrides - optional overrides to change values of returned object.
 */
export const getDefaultState = (overrides = {}) => ({
  connection: {
    status: connectionStatus.DISCONNECTED,
  },
  messages: {
    sent: [],
    received: [],
  },
  session: {},
  midi: {
    input: {},
    output: {},
  },
  peers: [],
  timelines: {
    byId: {},
    visible: [],
  },
  tracks: {
    midi: {},
  },
  recordings: {
    midi: {
      masters: {},
      overdubs: {},
    },
  },
  ui: {
    timelines: {},
    tracks: {
      audio: {},
      midi: {},
    },
  },
  ...overrides,
})
