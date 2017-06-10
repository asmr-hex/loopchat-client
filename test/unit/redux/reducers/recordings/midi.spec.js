import { expect } from 'chai'
import {each, first, last} from 'lodash'
import {getSampleOverdub} from '../../../../support/data/overdub'
import {filterBefore, processMaster, normalizeOverdubTime} from '../../../../../src/redux/reducers/recordings/midi/midi'
import {getSampleRecording} from '../../../../support/data/recording'
import {getSampleMidiOnOffSequence} from '../../../../support/data/midiEvent'

describe('midi recording reducer', () => {

  const sampleOverdubs = [
    getSampleOverdub({events: getSampleMidiOnOffSequence(2, 0)}), // event times -> 0.080181405895692 0.990181405895692 1.080181405895692 1.990181405895692
    getSampleOverdub({events: getSampleMidiOnOffSequence(1, 0.6), overwrite: false}), // 0.680181405895692 1.590181405895692
    getSampleOverdub({events: getSampleMidiOnOffSequence(1, 0.6), overwrite: true}), // 0.680181405895692 1.590181405895692
  ]
  const sampleRecording = getSampleRecording({
    master: sampleOverdubs[0].events,
    overdubs: {
      recording: {
        [sampleOverdubs[1].id]: sampleOverdubs[1],
        [sampleOverdubs[2].id]: sampleOverdubs[2],
      },
    }
  })

  describe('createMidiRecording', () => {

    it('removes completed overdub from recording overdubs', () => {

    })

    it('adds completed overdub to recorded overdubs', () => {

    })

    it('processes master given newly completed overdub', () => {

    })
  })

  describe('createOverdub', () => {

  })

  describe('recordEvent', () => {

  })

  describe('processRecording', () => {

  })

  describe('processMaster', () => {

    it('processes completed overlay overdub into master', () => {
      expect(processMaster(sampleRecording.master, sampleOverdubs[1])).to.eql([
        sampleOverdubs[0].events[0],
        sampleOverdubs[1].events[0],
        sampleOverdubs[0].events[1],
        sampleOverdubs[0].events[2],
        sampleOverdubs[1].events[1],
        sampleOverdubs[0].events[3],
      ])
    })

    it('processes completed overwrite overdub into master', () => {
      expect(processMaster(sampleRecording.master, sampleOverdubs[2])).to.eql([
        sampleOverdubs[2].events[0],
        sampleOverdubs[2].events[1],
      ])
    })
  })

  describe('normalizeOverdubTime', () => {

    it('normalizes event times by the overdub start time', () => {
      const startTime = sampleOverdubs[0].start

      const processedOverdub = normalizeOverdubTime(sampleOverdubs[0])
      each(
        processedOverdub.events,
        (e, idx) => expect(e.time).to.eql(sampleOverdubs[0].events[idx].time - startTime)
      )
    })
  })

  describe('filterBefore', () => {

    it('excludes MIDI_NOTE_ON events paired with MIDI_NOTE_OFF events which occur after startTime', () => {
      const master = sampleOverdubs[0].events
      const startTime = first(sampleOverdubs[1].events).time

      expect(filterBefore(master, startTime)).to.eql([])
    })
  })

  describe('filterAfter', () => {

    it('excludes MIDI_NOTE_OFF events paired with MIDI_NOTE_ON events which occur before endTime', () => {
      const master = sampleOverdubs[0].events
      const endTime = last(sampleOverdubs[1].events).time

      expect(filterBefore(master, endTime)).to.eql([])
    })
  })
})