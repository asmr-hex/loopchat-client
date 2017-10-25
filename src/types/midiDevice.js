export const newMidiInputDevice = (name = 'No Input', overrides = {}) => ({
  id: 0,
  name,
  manufacturer: 'photosynthesizers inc.',
  type: 'input',
  state: 'connected',
  activated: false,
  recording: false,
  ...overrides,
})
