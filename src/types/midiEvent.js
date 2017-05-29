// midi command codes
export const MIDI_CONTROL_CHANGE = 'MIDI_CONTROL_CHANGE'
export const MIDI_CONTROL_CHANGE_MIN = 176 // channel 1
export const MIDI_CONTROL_CHANGE_MAX = 191 // channel 16

export const MIDI_NOTE_ON = 'MIDI_NOTE_ON'
export const MIDI_NOTE_ON_MIN = 144 // channel 1
export const MIDI_NOTE_ON_MAX = 159 // channel 16

export const MIDI_NOTE_OFF = 'MIDI_NOTE_OFF'
export const MIDI_NOTE_OFF_MIN = 128 // channel 1
export const MIDI_NOTE_OFF_MAX = 143 // channel 16

export const MIDI_PITCH_BEND = 'MIDI_PITCH_BEND'
export const MIDI_PITCH_BEND_MIN = 224 //channel 1
export const MIDI_PITCH_BEND_MAX = 239 // channel 16

export const getMidiEventTypeAndChannel = code => {
  if (code >= MIDI_CONTROL_CHANGE_MIN && code <= MIDI_CONTROL_CHANGE_MAX) {
    return { type: MIDI_CONTROL_CHANGE, channel: code - MIDI_CONTROL_CHANGE_MIN + 1 }
  } else if (code >= MIDI_NOTE_ON_MIN && code <= MIDI_NOTE_ON_MAX) {
    return { type: MIDI_NOTE_ON, channel: code - MIDI_NOTE_ON_MIN + 1 }
  } else if (code >= MIDI_NOTE_OFF_MIN && code <= MIDI_NOTE_OFF_MAX) {
    return { type: MIDI_NOTE_OFF, channel: code - MIDI_NOTE_OFF_MIN + 1 }
  } else if (code >= MIDI_PITCH_BEND_MIN && code <= MIDI_PITCH_BEND_MAX) {
    return { type: MIDI_PITCH_BEND, channel: code - MIDI_PITCH_BEND_MIN + 1 }
  } else {
    // TODO (cw|5.29.2017) return an error here: "unknown midi command"
  }
}
