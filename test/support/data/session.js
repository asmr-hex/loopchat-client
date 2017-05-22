
const defaultSession = {
  id: '1234',
}

export const getSampleSession = (overrides = {}) => ({
  ...defaultSession,
  ...overrides,
})