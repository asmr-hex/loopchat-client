import { times } from 'lodash'

const defaultPeer = {
  id: '1234',
  name: 'Bobson Dugnutt'
}

export const getSamplePeers = (n, overrides) =>
  times(n, t => ({
    ...defaultPeer,
    ...overrides,
    id: `123${t}`,
  }))