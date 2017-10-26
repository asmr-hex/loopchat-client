export const NULL_DEVICE = 'NULL_DEVICE'

export const newMidiInputDevice = (name = 'No Input', overrides = {}) => ({
  id: NULL_DEVICE,
  name,
  manufacturer: 'photosynthesizers inc.',
  type: 'input',
  state: 'connected',
  activated: false,
  recording: false,
  ...overrides,
})
