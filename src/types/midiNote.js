import uuidV4 from 'uuid/v4'


/**
 * newMidiNote creates a new midi note which encapsulates a MIDI_ON
 * and MIDI_OFF event into a single note instance. This format will
 * be used in recording master arrays, while the midiEvent format will
 * be used within midi overdub arrays. MidiNotes are distinct in type
 * from midiControl and midiPitchBend structures which convey different
 * information about what we are controlling.
 *
 * @param pitch :: string : scientific pitch notation; default 'C4'
 * @param overrides :: {}
 */
export const newMidiNote = (pitch = 'C4', overrides = {}) => ({
  id: uuidV4(),
  pitch,
  velocity: 1,
  start: 0,
  end: 1,
  channel: 0,
  ...overrides,
})
