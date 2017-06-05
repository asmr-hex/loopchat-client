import tone from 'tone'

var synth = new tone.PolySynth().toMaster()

export const play = (data) => {
  const {note, velocity} = data
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease(note, '8n', tone.Time(), velocity)
}