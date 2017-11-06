import { expect } from 'chai'
import {map} from 'lodash'
import {getDefaultState} from '../../../../support/state'
import {newMidiTrack} from '../../../../../src/types/track'
import {newTimeline, newTimelineUI} from '../../../../../src/types/timeline'
import {getTimelineUIProperty} from '../../../../../src/redux/selectors/ui/timelines'


describe('timeline selectors', () => {

  const sampleTimeline = newTimeline()
  const sampleTimelineUI = newTimelineUI()
  
  const state = getDefaultState({
    ui: {
      timelines: {
        [sampleTimeline.id]: sampleTimelineUI,
      }
    }
  })

  describe('#getTimelineUIProperty', () => {

    it('returns the value of a top-level timeline ui property', () => {
      expect(getTimelineUIProperty(state, sampleTimeline.id, 'styles')).eql(sampleTimelineUI.styles)
    })

    it('returns the value of a n-level timeline ui property', () => {
      expect(getTimelineUIProperty(state, sampleTimeline.id, 'styles.height')).eql(sampleTimelineUI.styles.height)
    })

    it('returns "undefined" for a nonexistent timeline ui property', () => {
      expect(getTimelineUIProperty(state, sampleTimeline.id, 'nonexistence')).to.be.undefined
    })
  })
})
