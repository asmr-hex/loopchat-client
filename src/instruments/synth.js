import tone from 'tone'
import {forEach} from 'lodash'


var synth = new tone.PolySynth().toMaster()

export const play = (data) => {
  const {note, velocity} = data
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease(note, '8n', tone.Time(), velocity)
}

export const playback = tracks =>
  forEach(
    tracks,
    trackData => forEach(
      trackData,
      datum => {
        const {note, velocity, start, end} = datum

        synth.triggerAttackRelease(note, end - start, tone.Time() + start, velocity)
      }
    )
  )


// const synthFactory = (synthType) => {

//   const myNewSynth = tone.PolySynth().toMaster()

//   return (notes) => {
//     myNewSynth.triggerAttackRelease(note,...)
    
//   }
// }
